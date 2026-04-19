import type { AlgorithmLanguageCache, Language } from './types'

const KEY_PREFIX = 'ds-vis:lang'
const TTL_MS = 7 * 24 * 60 * 60 * 1000

function buildKey(algorithmName: string, language: Language) {
  return `${KEY_PREFIX}:${algorithmName}:${language}`
}

export function hashSource(input: string): string {
  let hash = 5381
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i)
  }
  return (hash >>> 0).toString(16)
}

export class LangCache {
  get(algorithmName: string, language: Language, sourceHash: string): AlgorithmLanguageCache | null {
    const key = buildKey(algorithmName, language)
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return null

      const parsed = JSON.parse(raw) as AlgorithmLanguageCache
      if (!parsed.createdAt || Date.now() - parsed.createdAt > TTL_MS) {
        localStorage.removeItem(key)
        return null
      }

      if (parsed.sourceHash !== sourceHash) {
        localStorage.removeItem(key)
        return null
      }

      return parsed
    } catch {
      return null
    }
  }

  set(cacheData: AlgorithmLanguageCache): void {
    const key = buildKey(cacheData.algorithmName, cacheData.language)
    try {
      localStorage.setItem(key, JSON.stringify(cacheData))
    } catch {
      // localStorage 满了时静默失败，功能仍可继续
    }
  }

  clear(algorithmName: string, language: Language): void {
    const key = buildKey(algorithmName, language)
    localStorage.removeItem(key)
  }

  clearAlgorithm(algorithmName: string): void {
    const prefix = `${KEY_PREFIX}:${algorithmName}:`
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i)
      if (key?.startsWith(prefix)) {
        localStorage.removeItem(key)
      }
    }
  }
}
