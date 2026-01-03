import type { KMPFrame } from '../types'

/**
 * KMP字符串匹配算法
 */

// 计算 next 数组
export function computeNext(pattern: string): { next: number[], frames: KMPFrame[] } {
  const frames: KMPFrame[] = []
  const m = pattern.length
  const next = new Array(m).fill(0)
  
  frames.push({
    type: 'next-calc',
    textIndex: -1,
    patternIndex: -1,
    nextArray: [...next],
    description: `开始计算模式串 "${pattern}" 的 next 数组`
  })
  
  if (m === 0) return { next, frames }
  
  next[0] = 0
  frames.push({
    type: 'next-calc',
    textIndex: -1,
    patternIndex: 0,
    nextArray: [...next],
    description: `next[0] = 0（第一个字符没有真前缀）`
  })
  
  let len = 0 // 最长相等前后缀的长度
  let i = 1
  
  while (i < m) {
    frames.push({
      type: 'compare',
      textIndex: -1,
      patternIndex: i,
      nextArray: [...next],
      description: `比较 pattern[${i}]='${pattern[i]}' 和 pattern[${len}]='${pattern[len]}'`
    })
    
    if (pattern[i] === pattern[len]) {
      len++
      next[i] = len
      frames.push({
        type: 'match',
        textIndex: -1,
        patternIndex: i,
        nextArray: [...next],
        description: `匹配！next[${i}] = ${len}`
      })
      i++
    } else {
      if (len !== 0) {
        frames.push({
          type: 'mismatch',
          textIndex: -1,
          patternIndex: i,
          nextArray: [...next],
          description: `不匹配，回退 len = next[${len - 1}] = ${next[len - 1]}`
        })
        len = next[len - 1]
      } else {
        next[i] = 0
        frames.push({
          type: 'next-calc',
          textIndex: -1,
          patternIndex: i,
          nextArray: [...next],
          description: `len=0，next[${i}] = 0`
        })
        i++
      }
    }
  }
  
  frames.push({
    type: 'complete',
    textIndex: -1,
    patternIndex: -1,
    nextArray: [...next],
    description: `next 数组计算完成: [${next.join(', ')}]`
  })
  
  return { next, frames }
}

// KMP 匹配
export function kmpSearch(text: string, pattern: string): KMPFrame[] {
  const frames: KMPFrame[] = []
  const n = text.length
  const m = pattern.length
  
  frames.push({
    type: 'next-calc',
    textIndex: -1,
    patternIndex: -1,
    description: `主串: "${text}"，模式串: "${pattern}"`
  })
  
  if (m === 0) {
    frames.push({
      type: 'complete',
      textIndex: 0,
      patternIndex: 0,
      description: '模式串为空，匹配位置: 0'
    })
    return frames
  }
  
  // 计算 next 数组
  const { next, frames: nextFrames } = computeNext(pattern)
  frames.push(...nextFrames)
  
  frames.push({
    type: 'next-calc',
    textIndex: 0,
    patternIndex: 0,
    nextArray: next,
    description: '开始 KMP 匹配'
  })
  
  let i = 0 // text 指针
  let j = 0 // pattern 指针
  
  while (i < n) {
    frames.push({
      type: 'compare',
      textIndex: i,
      patternIndex: j,
      nextArray: next,
      description: `比较 text[${i}]='${text[i]}' 和 pattern[${j}]='${pattern[j]}'`
    })
    
    if (text[i] === pattern[j]) {
      frames.push({
        type: 'match',
        textIndex: i,
        patternIndex: j,
        nextArray: next,
        description: `匹配！i=${i}, j=${j}`
      })
      i++
      j++
      
      if (j === m) {
        frames.push({
          type: 'complete',
          textIndex: i - m,
          patternIndex: j,
          nextArray: next,
          description: `找到匹配！起始位置: ${i - m}`
        })
        return frames
      }
    } else {
      if (j !== 0) {
        frames.push({
          type: 'mismatch',
          textIndex: i,
          patternIndex: j,
          nextArray: next,
          description: `不匹配，j 回退到 next[${j - 1}] = ${next[j - 1]}`
        })
        j = next[j - 1] ?? 0
        
        frames.push({
          type: 'shift',
          textIndex: i,
          patternIndex: j,
          nextArray: next,
          description: `模式串右移，继续比较 text[${i}] 和 pattern[${j}]`
        })
      } else {
        frames.push({
          type: 'mismatch',
          textIndex: i,
          patternIndex: j,
          nextArray: next,
          description: `不匹配且 j=0，i 前进到 ${i + 1}`
        })
        i++
      }
    }
  }
  
  frames.push({
    type: 'complete',
    textIndex: -1,
    patternIndex: -1,
    nextArray: next,
    description: '未找到匹配'
  })
  
  return frames
}

// 朴素匹配算法（用于对比）
export function bruteForceSearch(text: string, pattern: string): KMPFrame[] {
  const frames: KMPFrame[] = []
  const n = text.length
  const m = pattern.length
  
  frames.push({
    type: 'next-calc',
    textIndex: -1,
    patternIndex: -1,
    description: `朴素匹配：主串 "${text}"，模式串 "${pattern}"`
  })
  
  for (let i = 0; i <= n - m; i++) {
    let j = 0
    
    frames.push({
      type: 'shift',
      textIndex: i,
      patternIndex: 0,
      description: `尝试从位置 ${i} 开始匹配`
    })
    
    while (j < m && text[i + j] === pattern[j]) {
      frames.push({
        type: 'compare',
        textIndex: i + j,
        patternIndex: j,
        description: `比较 text[${i + j}]='${text[i + j]}' 和 pattern[${j}]='${pattern[j]}'`
      })
      
      frames.push({
        type: 'match',
        textIndex: i + j,
        patternIndex: j,
        description: `匹配！`
      })
      j++
    }
    
    if (j === m) {
      frames.push({
        type: 'complete',
        textIndex: i,
        patternIndex: j,
        description: `找到匹配！起始位置: ${i}`
      })
      return frames
    }
    
    if (j < m && i + j < n) {
      frames.push({
        type: 'compare',
        textIndex: i + j,
        patternIndex: j,
        description: `比较 text[${i + j}]='${text[i + j]}' 和 pattern[${j}]='${pattern[j]}'`
      })
      
      frames.push({
        type: 'mismatch',
        textIndex: i + j,
        patternIndex: j,
        description: `不匹配，模式串右移一位`
      })
    }
  }
  
  frames.push({
    type: 'complete',
    textIndex: -1,
    patternIndex: -1,
    description: '未找到匹配'
  })
  
  return frames
}

// 算法信息
export const stringAlgorithms = {
  kmp: {
    name: 'KMP算法',
    nameEn: 'Knuth-Morris-Pratt',
    description: '利用已匹配的信息，通过 next 数组避免重复比较',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(m)'
  },
  bruteForce: {
    name: '朴素匹配',
    nameEn: 'Brute Force',
    description: '逐个位置尝试匹配，失败则右移一位',
    timeComplexity: 'O(n × m)',
    spaceComplexity: 'O(1)'
  }
}
