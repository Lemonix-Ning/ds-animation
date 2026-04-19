export type Language = 'js' | 'cpp' | 'java' | 'python' | 'csharp'

export interface LineMapEntry {
  displayLine: number
  jsExpr: string
  frameType: string
  patchable: boolean
}

export interface AlgorithmLanguageCache {
  algorithmName: string
  language: Language
  displayCode: string
  lineMap: LineMapEntry[]
  sourceHash: string
  createdAt: number
}

export interface TranslationResult {
  displayCode: string
  lineMap: LineMapEntry[]
  fromCache: boolean
}

export interface DiffPatchResult {
  patchedJs: string
  updatedLineMap: LineMapEntry[]
}

export interface DiffContext {
  oldLine: string
  newLine: string
  displayLine: number
}

export const LANGUAGE_CONFIG: Record<Language, { label: string; monacoId: string; fileExt: string }> = {
  js: { label: 'JavaScript', monacoId: 'javascript', fileExt: 'js' },
  cpp: { label: 'C++', monacoId: 'cpp', fileExt: 'cpp' },
  java: { label: 'Java', monacoId: 'java', fileExt: 'java' },
  python: { label: 'Python', monacoId: 'python', fileExt: 'py' },
  csharp: { label: 'C#', monacoId: 'csharp', fileExt: 'cs' }
}
