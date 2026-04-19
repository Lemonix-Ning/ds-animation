import type { Language } from './types'

export type PatchSyncStatus = 'patched' | 'no-diff' | 'not-animation-related' | 'no-effective-change' | 'failed'
export type PatchSyncReason =
  | 'no-diff'
  | 'out-of-range'
  | 'line-map-failed'
  | 'no-effective-change'

export interface PatchSyncResult {
  status: PatchSyncStatus
  patchedJs?: string
  reason?: PatchSyncReason
  lineNumber?: number
}

const PATCH_DEBUG = true

function logPatchDebug(stage: string, payload: Record<string, unknown>): void {
  if (!PATCH_DEBUG || typeof window === 'undefined') return
  try {
    console.log(`[PatchSync:${stage}]`, payload)
  } catch {
    // ignore debug log failure
  }
}

interface LineDiff {
  startLine: number
  oldSegment: string[]
  newSegment: string[]
}

type DiffOp =
  | { type: 'equal'; line: string }
  | { type: 'delete'; line: string }
  | { type: 'insert'; line: string }

const FRAME_ANCHOR_PATTERN = /\[(?:frame:[a-zA-Z0-9_-]+|帧:[\u4e00-\u9fa5a-zA-Z0-9_-]+)\]/
const ANIMATION_FIELD_PATTERN = /frames\.push|\b(type|highlightLine|description|indices|index|value|values|nodeId|edgeId|fromNode|toNode|distance|position|key|stats|data)\s*[:=]/
const CONTROL_FLOW_PATTERN = /\b(if|else\s+if|else|for|while|do|switch|case|break|continue|return|yield)\b/
const ASSIGNMENT_PATTERN = /(^|[^\w])([A-Za-z_][\w.\[\]]*)\s*(\+\+|--|[+\-*/%]?=)\s*/
const DATA_OPERATION_PATTERN = /\.(push|pop|shift|unshift|splice|sort|reverse|add|remove|offer|poll|enqueue|dequeue)\s*\(|\b(swap|compare|partition|merge|heapify|insert|delete|search|find|min|max)\b/
const DECLARATION_PATTERN = /\b(let|const|var|def|function|int|long|double|float|bool|boolean|char|string|auto|public|private|protected)\b/

function getLineDiffs(oldCode: string, newCode: string): LineDiff[] {
  const oldLines = oldCode.split('\n')
  const newLines = newCode.split('\n')
  const oldCount = oldLines.length
  const newCount = newLines.length

  if (oldCode === newCode) {
    return []
  }

  // Fast path: when line counts are equal, align by line index directly.
  // This avoids LCS drifting in repeated blocks (e.g. if/else patterns) and
  // makes single-operator edits like `<` -> `>` map to the intended JS line.
  if (oldCount === newCount) {
    const diffs: LineDiff[] = []
    let start = -1

    for (let i = 0; i < oldCount; i++) {
      const oldLine = oldLines[i] ?? ''
      const newLine = newLines[i] ?? ''

      if (oldLine !== newLine) {
        if (start < 0) start = i
        continue
      }

      if (start >= 0) {
        diffs.push({
          startLine: start + 1,
          oldSegment: oldLines.slice(start, i),
          newSegment: newLines.slice(start, i)
        })
        start = -1
      }
    }

    if (start >= 0) {
      diffs.push({
        startLine: start + 1,
        oldSegment: oldLines.slice(start),
        newSegment: newLines.slice(start)
      })
    }

    return diffs
  }

  const lcs: number[][] = Array.from({ length: oldCount + 1 }, () => Array(newCount + 1).fill(0))

  for (let i = 1; i <= oldCount; i++) {
    const row = lcs[i] ?? []
    const prevRow = lcs[i - 1] ?? []
    for (let j = 1; j <= newCount; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        row[j] = (prevRow[j - 1] ?? 0) + 1
      } else {
        row[j] = Math.max(prevRow[j] ?? 0, row[j - 1] ?? 0)
      }
    }
  }

  const ops: DiffOp[] = []
  let i = oldCount
  let j = newCount

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      ops.push({ type: 'equal', line: oldLines[i - 1] ?? '' })
      i--
      j--
      continue
    }

    const leftScore = lcs[i]?.[j - 1] ?? -1
    const upScore = lcs[i - 1]?.[j] ?? -1
    if (j > 0 && (i === 0 || leftScore >= upScore)) {
      ops.push({ type: 'insert', line: newLines[j - 1] ?? '' })
      j--
      continue
    }

    if (i > 0) {
      ops.push({ type: 'delete', line: oldLines[i - 1] ?? '' })
      i--
    }
  }

  ops.reverse()

  const diffs: LineDiff[] = []
  let currentDiff: LineDiff | null = null
  let oldLineNumber = 1

  for (const op of ops) {
    if (op.type === 'equal') {
      if (currentDiff) {
        diffs.push(currentDiff)
        currentDiff = null
      }
      oldLineNumber++
      continue
    }

    if (!currentDiff) {
      currentDiff = {
        startLine: oldLineNumber,
        oldSegment: [],
        newSegment: []
      }
    }

    if (op.type === 'delete') {
      currentDiff.oldSegment.push(op.line)
      oldLineNumber++
    } else {
      currentDiff.newSegment.push(op.line)
    }
  }

  if (currentDiff) {
    diffs.push(currentDiff)
  }

  return diffs
}

export function isAnimationRelevantLine(line: string): boolean {
  const trimmed = line.trim()
  if (!trimmed) return false

  if (FRAME_ANCHOR_PATTERN.test(line) || ANIMATION_FIELD_PATTERN.test(line)) {
    return true
  }

  if (/^(\/\/|#|\/\*|\*|\*\/)/.test(trimmed)) {
    return false
  }

  return (
    CONTROL_FLOW_PATTERN.test(line) ||
    ASSIGNMENT_PATTERN.test(line) ||
    DATA_OPERATION_PATTERN.test(line) ||
    DECLARATION_PATTERN.test(line)
  )
}

function tokenize(line: string): string[] {
  return line.match(/[A-Za-z_][\w]*|\d+|===|!==|==|!=|<=|>=|&&|\|\||[<>+\-*/%!=()\[\].,:]/g) || []
}

function firstTokenDiff(oldLine: string, newLine: string): { before: string; after: string } | null {
  const oldTokens = tokenize(oldLine)
  const newTokens = tokenize(newLine)

  const length = Math.min(oldTokens.length, newTokens.length)
  for (let i = 0; i < length; i++) {
    const before = oldTokens[i] ?? ''
    const after = newTokens[i] ?? ''
    if (before !== after) {
      return { before, after }
    }
  }

  if (oldTokens.length !== newTokens.length) {
    return {
      before: oldTokens.slice(length).join(' ').trim(),
      after: newTokens.slice(length).join(' ').trim()
    }
  }

  return null
}

function normalizeTokenToJs(token: string, language: Language): string {
  if (!token) return token

  if (language === 'python') {
    if (token === 'and') return '&&'
    if (token === 'or') return '||'
    if (token === 'not') return '!'
    if (token === 'True') return 'true'
    if (token === 'False') return 'false'
    if (token === 'None') return 'null'
  }

  if (token === '==') return '==='
  if (token === '!=') return '!=='

  return token
}

function replaceFirst(haystack: string, needle: string, replacement: string): string | null {
  const index = haystack.indexOf(needle)
  if (index < 0) return null
  return haystack.slice(0, index) + replacement + haystack.slice(index + needle.length)
}

function reverseNormalizeLineToJs(line: string, language: Language): string {
  let result = line

  if (language === 'python') {
    result = result
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null')
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\b/g, '!')
      .replace(/^\s*def\s+(\w+)\((.*)\):\s*$/, 'function $1($2) {')
      .replace(/^\s*elif\s+(.*):\s*$/, 'else if ($1) {')
      .replace(/^\s*if\s+(.*):\s*$/, 'if ($1) {')
      .replace(/^\s*while\s+(.*):\s*$/, 'while ($1) {')
      .replace(/^\s*else:\s*$/, 'else {')
  }

  if (language === 'cpp') {
    result = result
      .replace(/\bauto\b/g, 'let')
      .replace(/std::vector<Frame>\s+(\w+)\((.*)\)/, 'function $1($2)')
      .replace(/\bstd::floor\(/g, 'Math.floor(')
      .replace(/\.push_back\(/g, '.push(')
      .replace(/\.size\(\)/g, '.length')
  }

  if (language === 'java') {
    result = result
      .replace(/List<Frame>\s+(\w+)\((.*)\)/, 'function $1($2)')
      .replace(/\(int\)Math\.floor\(/g, 'Math.floor(')
      .replace(/\.add\(/g, '.push(')
      .replace(/\.size\(\)/g, '.length')
      .replace(/\bvar\b/g, 'let')
      .replace(/\bObject\s+/g, '')
  }

  if (language === 'csharp') {
    result = result
      .replace(/List<Frame>\s+(\w+)\((.*)\)/, 'function $1($2)')
      .replace(/\(int\)Math\.Floor\(/g, 'Math.floor(')
      .replace(/\.Add\(/g, '.push(')
      .replace(/\.Count\b/g, '.length')
      .replace(/\bdynamic\s+/g, '')
      .replace(/\bvar\b/g, 'let')
  }

  result = result
    .replace(/\b===\b/g, '===')
    .replace(/\b==\b/g, '===')
    .replace(/\b!=\b/g, '!==')

  return result
}

function applySingleLinePatch(jsLine: string, oldDisplayLine: string, newDisplayLine: string, language: Language): string | null {
  const tokenDiff = firstTokenDiff(oldDisplayLine, newDisplayLine)
  if (!tokenDiff) {
    const reverseLineNoToken = reverseNormalizeLineToJs(newDisplayLine, language)
    const indent = jsLine.match(/^\s*/)?.[0] || ''
    if (!reverseLineNoToken.trim()) return indent
    return `${indent}${reverseLineNoToken.trim()}`
  }

  const beforeJs = normalizeTokenToJs(tokenDiff.before, language)
  const afterJs = normalizeTokenToJs(tokenDiff.after, language)
  const patchedByToken = replaceFirst(jsLine, beforeJs, afterJs)
  if (patchedByToken && patchedByToken !== jsLine) {
    return patchedByToken
  }

  const reverseLine = reverseNormalizeLineToJs(newDisplayLine, language)
  if (!reverseLine.trim()) return null
  const indent = jsLine.match(/^\s*/)?.[0] || ''
  return `${indent}${reverseLine.trim()}`
}

export function patchJsFromDisplayEdit(
  jsSource: string,
  oldDisplayCode: string,
  newDisplayCode: string,
  language: Language
): PatchSyncResult {
  const diffs = getLineDiffs(oldDisplayCode, newDisplayCode)
  logPatchDebug('diffs', {
    language,
    diffCount: diffs.length,
    diffPreview: diffs.slice(0, 3).map((d) => ({
      startLine: d.startLine,
      oldLength: d.oldSegment.length,
      newLength: d.newSegment.length,
      oldHead: d.oldSegment[0] || '',
      newHead: d.newSegment[0] || ''
    }))
  })

  if (diffs.length === 0) {
    logPatchDebug('no-diff', { reason: 'no-diff' })
    return { status: 'no-diff', reason: 'no-diff' }
  }

  const jsLines = jsSource.split('\n')
  let lineOffset = 0

  for (const diff of diffs) {
    const startIndex = diff.startLine - 1 + lineOffset
    const oldLength = diff.oldSegment.length
    const newLength = diff.newSegment.length

    if (startIndex < 0 || startIndex > jsLines.length) {
      logPatchDebug('failed', {
        reason: 'out-of-range',
        lineNumber: diff.startLine,
        startIndex,
        jsLineCount: jsLines.length
      })
      return {
        status: 'failed',
        reason: 'out-of-range',
        lineNumber: diff.startLine
      }
    }

    const overlap = Math.min(oldLength, newLength)

    for (let i = 0; i < overlap; i++) {
      const lineIndex = startIndex + i
      if (lineIndex >= jsLines.length) break

      const oldDisplayLine = diff.oldSegment[i] ?? ''
      const newDisplayLine = diff.newSegment[i] ?? ''
      const currentJsLine = jsLines[lineIndex] ?? ''

      if (oldDisplayLine === newDisplayLine) continue

      const patched = applySingleLinePatch(currentJsLine, oldDisplayLine, newDisplayLine, language)
      if (!patched) {
        logPatchDebug('failed', {
          reason: 'line-map-failed',
          lineNumber: diff.startLine + i,
          oldDisplayLine,
          newDisplayLine,
          currentJsLine
        })
        return {
          status: 'failed',
          reason: 'line-map-failed',
          lineNumber: diff.startLine + i
        }
      }
      jsLines[lineIndex] = patched
    }

    // 删除多余行
    if (oldLength > newLength) {
      const deleteCount = oldLength - newLength
      jsLines.splice(startIndex + overlap, deleteCount)
    }

    // 插入新增行
    if (newLength > oldLength) {
      const insertLines = diff.newSegment
        .slice(overlap)
        .map((line) => reverseNormalizeLineToJs(line, language))

      jsLines.splice(startIndex + overlap, 0, ...insertLines)
    }

    lineOffset += newLength - oldLength
  }

  const patchedSource = jsLines.join('\n')
  if (patchedSource === jsSource) {
    logPatchDebug('no-effective-change', { reason: 'no-effective-change' })
    return { status: 'no-effective-change', reason: 'no-effective-change' }
  }

  logPatchDebug('patched', {
    changed: patchedSource !== jsSource,
    beforeLineCount: jsSource.split('\n').length,
    afterLineCount: patchedSource.split('\n').length
  })

  return {
    status: 'patched',
    patchedJs: patchedSource
  }
}
