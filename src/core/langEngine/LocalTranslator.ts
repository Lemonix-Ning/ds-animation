import { LangCache, hashSource } from './LangCache'
import type { Language, LineMapEntry, TranslationResult } from './types'
import { getExplicitTemplate, getJsTemplate } from './TemplateRegistry'

const cache = new LangCache()
const TRANSLATOR_VERSION = 'local-v2'

export interface TranslateOptions {
  preferSourceCode?: boolean
  disableExplicitTemplate?: boolean
}

function splitTemplateForDisplay(jsSource: string): string[] {
  // 保留完整实现行，包含 frames.push 与返回逻辑，确保“完整版”可用于教学讲解完整实现方式。
  return jsSource.split('\n')
}

function convertFunctionArgs(args: string, language: Language): string {
  const names = args
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  if (language === 'cpp') {
    return names.map((name) => `auto ${name}`).join(', ')
  }

  if (language === 'java') {
    return names.map((name) => `Object ${name}`).join(', ')
  }

  if (language === 'csharp') {
    return names.map((name) => `dynamic ${name}`).join(', ')
  }

  return names.join(', ')
}

function convertFunctionSignature(line: string, language: Language): string {
  return line.replace(/function\s+(\w+)\s*\(([^)]*)\)/, (_match, name: string, args: string) => {
    const convertedArgs = convertFunctionArgs(args, language)

    if (language === 'cpp') {
      return `std::vector<Frame> ${name}(${convertedArgs})`
    }

    if (language === 'java') {
      return `List<Frame> ${name}(${convertedArgs})`
    }

    if (language === 'csharp') {
      return `List<Frame> ${name}(${convertedArgs})`
    }

    return `def ${name}(${convertedArgs})`
  })
}

function applyCommonJsLikeReplacements(line: string, language: Exclude<Language, 'js' | 'python'>): string {
  let translated = line
    .replace(/===/g, '==')
    .replace(/!==/g, '!=')
    .replace(/\btrue\b/g, language === 'java' ? 'true' : 'true')
    .replace(/\bfalse\b/g, language === 'java' ? 'false' : 'false')
    .replace(/\bnull\b/g, 'null')

  translated = convertFunctionSignature(translated, language)

  if (language === 'cpp') {
    translated = translated
      .replace(/\bconst\b/g, 'auto')
      .replace(/\blet\b/g, 'auto')
      .replace(/\.length\b/g, '.size()')
      .replace(/\.push\(/g, '.push_back(')
      .replace(/Math\.floor\(/g, 'std::floor(')
      .replace(/\[\.\.\.(\w+)\]/g, '$1')
  }

  if (language === 'java') {
    translated = translated
      .replace(/\bconst\b/g, 'var')
      .replace(/\blet\b/g, 'var')
      .replace(/\.length\b/g, '.size()')
      .replace(/\.push\(/g, '.add(')
      .replace(/Math\.floor\(/g, '(int)Math.floor(')
      .replace(/\[\.\.\.(\w+)\]/g, 'new ArrayList<>($1)')
  }

  if (language === 'csharp') {
    translated = translated
      .replace(/\bconst\b/g, 'var')
      .replace(/\blet\b/g, 'var')
      .replace(/\.length\b/g, '.Count')
      .replace(/\.push\(/g, '.Add(')
      .replace(/Math\.floor\(/g, '(int)Math.Floor(')
      .replace(/\[\.\.\.(\w+)\]/g, 'new List<dynamic>($1)')
  }

  return translated
}

function convertJsForHeader(line: string): string {
  const forPattern = /for\s*\(\s*(?:let|var)?\s*(\w+)\s*=\s*(.+?)\s*;\s*\1\s*([<>]=?)\s*(.+?)\s*;\s*\1(\+\+|--)\s*\)/
  const forMatch = line.match(forPattern)
  if (forMatch) {
    const variable = forMatch[1]
    const startExpr = forMatch[2]
    const operator = forMatch[3]
    const endExpr = forMatch[4]
    const step = forMatch[5] === '--' ? -1 : 1

    if (operator === '<') {
      return `for ${variable} in range(${startExpr}, ${endExpr}):`
    }

    if (operator === '<=') {
      return `for ${variable} in range(${startExpr}, ${endExpr} + 1):`
    }

    if (operator === '>' || operator === '>=') {
      const endPart = operator === '>=' ? `${endExpr} - 1` : endExpr
      return `for ${variable} in range(${startExpr}, ${endPart}, ${step}):`
    }
  }

  const whilePattern = /while\s*\((.*)\)/
  const whileMatch = line.match(whilePattern)
  if (whileMatch) {
    return `while ${whileMatch[1]}:`
  }

  const ifPattern = /if\s*\((.*)\)/
  const ifMatch = line.match(ifPattern)
  if (ifMatch) {
    return `if ${ifMatch[1]}:`
  }

  const elseIfPattern = /else\s+if\s*\((.*)\)/
  const elseIfMatch = line.match(elseIfPattern)
  if (elseIfMatch) {
    return `elif ${elseIfMatch[1]}:`
  }

  if (/^else\b/.test(line)) {
    return 'else:'
  }

  return line
}

function applyPythonReplacements(line: string): string {
  let translated = line
    .replace(/===/g, '==')
    .replace(/!==/g, '!=')
    .replace(/\bconst\b/g, '')
    .replace(/\blet\b/g, '')
    .replace(/;/g, '')
    .replace(/\|\|/g, 'or')
    .replace(/&&/g, 'and')
    .replace(/\btrue\b/g, 'True')
    .replace(/\bfalse\b/g, 'False')
    .replace(/\bnull\b/g, 'None')
    .replace(/\.length\b/g, '__len__()')
    .replace(/Math\.floor\(/g, 'math.floor(')
    .replace(/\.push\(/g, '.append(')

  translated = convertFunctionSignature(translated, 'python')
  translated = convertJsForHeader(translated)

  translated = translated
    .replace(/\b__len__\(\)\b/g, '.__len__()')
    .replace(/(\w+)\.__len__\(\)/g, 'len($1)')
    .replace(/\[\.\.\.(\w+)\]/g, '$1[:]')

  return translated.trimEnd()
}

function translatePythonLines(lines: string[]): string[] {
  const output: string[] = []
  let indentLevel = 0

  for (const raw of lines) {
    const trimmed = raw.trim()

    if (!trimmed) {
      output.push('')
      continue
    }

    const startsWithClose = trimmed.startsWith('}') || trimmed.startsWith('};')
    if (startsWithClose) {
      indentLevel = Math.max(0, indentLevel - 1)
    }

    const withoutBraces = trimmed
      .replace(/^}\s*/, '')
      .replace(/\s*{\s*$/, '')
      .replace(/\s*}\s*$/, '')
      .trim()

    if (!withoutBraces) {
      output.push('')
    } else {
      const translated = applyPythonReplacements(withoutBraces)
      const indent = '  '.repeat(Math.max(indentLevel, 0))
      output.push(`${indent}${translated}`)
    }

    const openCount = (trimmed.match(/{/g) || []).length
    const closeCount = (trimmed.match(/}/g) || []).length
    const net = openCount - closeCount

    if (!startsWithClose && net > 0) {
      indentLevel += net
    }
  }

  return output
}

function mapLineToLanguage(line: string, language: Language): string {
  if (language === 'js') return line

  if (language === 'python') {
    return applyPythonReplacements(line)
  }

  return applyCommonJsLikeReplacements(line, language)
}

function buildLocalTranslation(templateSource: string, language: Language): { displayCode: string; lineMap: LineMapEntry[] } {
  const lines = splitTemplateForDisplay(templateSource)

  const translated = language === 'python'
    ? translatePythonLines(lines)
    : lines.map((line) => {
      const indent = line.match(/^\s*/)?.[0] || ''
      const body = line.trim()
      return `${indent}${mapLineToLanguage(body, language)}`
    })

  return {
    displayCode: translated.join('\n'),
    lineMap: lines.map((line, idx) => ({
      displayLine: idx + 1,
      jsExpr: line.trim(),
      frameType: 'unknown',
      patchable: false
    }))
  }
}

function buildExplicitTemplateResult(templateCode: string): { displayCode: string; lineMap: LineMapEntry[] } {
  const lines = templateCode.split('\n')
  return {
    displayCode: templateCode,
    lineMap: lines.map((line, idx) => ({
      displayLine: idx + 1,
      jsExpr: line.trim(),
      frameType: 'unknown',
      patchable: false
    }))
  }
}

export function translateAlgorithmLocal(
  algorithmName: string,
  jsSourceCode: string,
  language: Language,
  options: TranslateOptions = {}
): TranslationResult {
  const preferSourceCode = Boolean(options.preferSourceCode)
  const disableExplicitTemplate = Boolean(options.disableExplicitTemplate)

  if (language === 'js') {
    const jsTemplate = preferSourceCode ? jsSourceCode : getJsTemplate(algorithmName, jsSourceCode)
    return {
      displayCode: jsTemplate,
      lineMap: [],
      fromCache: true
    }
  }

  const jsTemplate = preferSourceCode ? jsSourceCode : getJsTemplate(algorithmName, jsSourceCode)
  const explicitTemplate = disableExplicitTemplate ? null : getExplicitTemplate(algorithmName, language)
  const templateFingerprint = explicitTemplate || jsTemplate
  const sourceHash = hashSource(
    `${TRANSLATOR_VERSION}:${algorithmName}:${language}:${preferSourceCode ? 'source' : 'template'}:${disableExplicitTemplate ? 'no-explicit' : 'explicit'}:${templateFingerprint}`
  )
  const cached = cache.get(algorithmName, language, sourceHash)
  if (cached) {
    return {
      displayCode: cached.displayCode,
      lineMap: cached.lineMap,
      fromCache: true
    }
  }

  const translated = explicitTemplate
    ? buildExplicitTemplateResult(explicitTemplate)
    : buildLocalTranslation(jsTemplate, language)

  cache.set({
    algorithmName,
    language,
    displayCode: translated.displayCode,
    lineMap: translated.lineMap,
    sourceHash,
    createdAt: Date.now()
  })

  return {
    ...translated,
    fromCache: false
  }
}

export function invalidateLocalTranslationCache(algorithmName: string): void {
  cache.clearAlgorithm(algorithmName)
}
