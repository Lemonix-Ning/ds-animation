import type { SearchFrame, TreeFrame } from '../types'

/**
 * 二叉搜索树节点
 */
export interface BSTNode {
  id: string
  value: number
  left: BSTNode | null
  right: BSTNode | null
}

/**
 * BST 查找
 */
export function bstSearch(root: BSTNode | null, target: number): TreeFrame[] {
  const frames: TreeFrame[] = []

  frames.push({
    type: 'reset',
    nodeId: '',
    description: `在 BST 中查找 ${target}`,
    highlightLine: 0
  })

  let current = root

  while (current !== null) {
    frames.push({
      type: 'visit',
      nodeId: current.id,
      value: current.value,
      description: `访问节点 ${current.value}`,
      highlightLine: 3
    })

    if (target === current.value) {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: `找到目标，${target} = ${current.value}`,
        highlightLine: 5
      })
      return frames
    } else if (target < current.value) {
      frames.push({
        type: 'visit',
        nodeId: current.id,
        description: `${target} < ${current.value}，向左子树查找`,
        highlightLine: 7
      })
      current = current.left
    } else {
      frames.push({
        type: 'visit',
        nodeId: current.id,
        description: `${target} > ${current.value}，向右子树查找`,
        highlightLine: 9
      })
      current = current.right
    }
  }

  frames.push({
    type: 'reset',
    nodeId: '',
    description: `未找到 ${target}`,
    highlightLine: 14
  })

  return frames
}

/**
 * BST 插入
 */
function bstInsert(root: BSTNode | null, value: number): { root: BSTNode, frames: TreeFrame[] } {
  const frames: TreeFrame[] = []

  const newNode: BSTNode = {
    id: `node-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    value,
    left: null,
    right: null
  }

  frames.push({
    type: 'reset',
    nodeId: '',
    description: `插入节点 ${value}`
  })

  if (root === null) {
    frames.push({
      type: 'insert',
      nodeId: newNode.id,
      value,
      description: `树为空，${value} 成为根节点`
    })
    return { root: newNode, frames }
  }

  let current: BSTNode | null = root
  let parent: BSTNode | null = null
  let isLeft = false

  while (current !== null) {
    frames.push({
      type: 'visit',
      nodeId: current.id,
      value: current.value,
      description: `访问节点 ${current.value}`
    })

    parent = current

    if (value < current.value) {
      frames.push({
        type: 'visit',
        nodeId: current.id,
        description: `${value} < ${current.value}，向左子树`
      })
      current = current.left
      isLeft = true
    } else if (value > current.value) {
      frames.push({
        type: 'visit',
        nodeId: current.id,
        description: `${value} > ${current.value}，向右子树`
      })
      current = current.right
      isLeft = false
    } else {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: `${value} 已存在，不重复插入`
      })
      return { root, frames }
    }
  }

  if (isLeft) {
    parent!.left = newNode
  } else {
    parent!.right = newNode
  }

  frames.push({
    type: 'insert',
    nodeId: newNode.id,
    parentId: parent!.id,
    value,
    position: isLeft ? 'left' : 'right',
    description: `将 ${value} 插入到 ${parent!.value} 的${isLeft ? '左' : '右'}子节点`
  })

  return { root, frames }
}

/**
 * 二分查找
 */
export function binarySearch(arr: number[], target: number): SearchFrame[] {
  const frames: SearchFrame[] = []

  frames.push({
    type: 'reset',
    description: `在有序数组中二分查找 ${target}`,
    data: { array: arr, target },
    highlightLine: 0
  })

  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    frames.push({
      type: 'highlight',
      index: mid,
      description: `查找范围 [${left}, ${right}]，中间位置 mid = ${mid}`,
      data: { left, right, mid },
      highlightLine: 4
    })

    frames.push({
      type: 'compare',
      index: mid,
      key: arr[mid],
      description: `比较 arr[${mid}] = ${arr[mid]} 与目标 ${target}`,
      data: { left, right, mid },
      highlightLine: 8
    })

    if (arr[mid] === target) {
      frames.push({
        type: 'found',
        index: mid,
        key: target,
        description: `找到目标，arr[${mid}] = ${target}`,
        data: { left, right, mid },
        highlightLine: 8
      })
      return frames
    } else if ((arr[mid] ?? 0) < target) {
      left = mid + 1
      frames.push({
        type: 'update',
        description: `${arr[mid]} < ${target}，在右半部分查找`,
        data: { left, right, mid },
        highlightLine: 10
      })
    } else {
      right = mid - 1
      frames.push({
        type: 'update',
        description: `${arr[mid]} > ${target}，在左半部分查找`,
        data: { left, right, mid },
        highlightLine: 13
      })
    }
  }

  frames.push({
    type: 'not-found',
    key: target,
    description: `未找到 ${target}`,
    highlightLine: 17
  })

  return frames
}

/**
 * 插值查找
 */
export function interpolationSearch(arr: number[], target: number): SearchFrame[] {
  const frames: SearchFrame[] = []

  frames.push({
    type: 'reset',
    description: `在有序数组中插值查找 ${target}`,
    data: { array: arr, target },
    highlightLine: 0
  })

  let left = 0
  let right = arr.length - 1

  while (left <= right && target >= (arr[left] ?? 0) && target <= (arr[right] ?? 0)) {
    if (left === right) {
      frames.push({
        type: 'compare',
        index: left,
        key: arr[left],
        description: `只剩一个元素，比较 arr[${left}] = ${arr[left]}`,
        data: { left, right, mid: left },
        highlightLine: 4
      })
      if (arr[left] === target) {
        frames.push({
          type: 'found',
          index: left,
          key: target,
          description: `找到目标，arr[${left}] = ${target}`,
          data: { left, right, mid: left },
          highlightLine: 5
        })
      } else {
        frames.push({
          type: 'not-found',
          key: target,
          description: `未找到 ${target}`,
          highlightLine: 20
        })
      }
      return frames
    }

    const denominator = (arr[right] ?? 0) - (arr[left] ?? 0)
    if (denominator === 0) break
    const pos = left + Math.floor(((target - (arr[left] ?? 0)) * (right - left)) / denominator)

    frames.push({
      type: 'highlight',
      index: pos,
      description: `估算位置 pos = ${pos}，范围 [${left}, ${right}]`,
      data: { left, right, mid: pos },
      highlightLine: 9
    })

    frames.push({
      type: 'compare',
      index: pos,
      key: arr[pos],
      description: `比较 arr[${pos}] = ${arr[pos]} 与目标 ${target}`,
      data: { left, right, mid: pos },
      highlightLine: 11
    })

    if (arr[pos] === target) {
      frames.push({
        type: 'found',
        index: pos,
        key: target,
        description: `找到目标，arr[${pos}] = ${target}`,
        data: { left, right, mid: pos },
        highlightLine: 12
      })
      return frames
    } else if ((arr[pos] ?? 0) < target) {
      left = pos + 1
      frames.push({
        type: 'update',
        description: `${arr[pos]} < ${target}，向右侧缩小范围`,
        data: { left, right, mid: pos },
        highlightLine: 14
      })
    } else {
      right = pos - 1
      frames.push({
        type: 'update',
        description: `${arr[pos]} > ${target}，向左侧缩小范围`,
        data: { left, right, mid: pos },
        highlightLine: 16
      })
    }
  }

  frames.push({
    type: 'not-found',
    key: target,
    description: `未找到 ${target}`,
    highlightLine: 20
  })

  return frames
}

/**
 * 跳跃查找
 */
export function jumpSearch(arr: number[], target: number): SearchFrame[] {
  const frames: SearchFrame[] = []

  frames.push({
    type: 'reset',
    description: `在有序数组中跳跃查找 ${target}`,
    data: { array: arr, target },
    highlightLine: 0
  })

  const n = arr.length
  const step = Math.floor(Math.sqrt(n))
  let prev = 0
  let curr = step

  while ((arr[Math.min(curr, n) - 1] ?? Number.POSITIVE_INFINITY) < target) {
    const blockEnd = Math.min(curr, n) - 1
    frames.push({
      type: 'highlight',
      index: blockEnd,
      description: `跳到块尾 index=${blockEnd}，比较 ${arr[blockEnd]} 与 ${target}`,
      data: { left: prev, right: blockEnd, mid: blockEnd },
      highlightLine: 5
    })

    prev = curr
    curr += step

    if (prev >= n) {
      frames.push({
        type: 'not-found',
        key: target,
        description: `未找到 ${target}`,
        highlightLine: 15
      })
      return frames
    }
  }

  const left = prev
  const right = Math.min(curr, n) - 1
  frames.push({
    type: 'update',
    description: `目标可能在块 [${left}, ${right}]，开始线性扫描`,
    data: { left, right, mid: left },
    highlightLine: 11
  })

  for (let i = left; i <= right; i++) {
    frames.push({
      type: 'compare',
      index: i,
      key: arr[i],
      description: `线性比较 arr[${i}] = ${arr[i]} 与目标 ${target}`,
      data: { left, right, mid: i },
      highlightLine: 12
    })

    if (arr[i] === target) {
      frames.push({
        type: 'found',
        index: i,
        key: target,
        description: `找到目标，arr[${i}] = ${target}`,
        data: { left, right, mid: i },
        highlightLine: 12
      })
      return frames
    }
  }

  frames.push({
    type: 'not-found',
    key: target,
    description: `未找到 ${target}`,
    highlightLine: 15
  })

  return frames
}

/**
 * 顺序查找
 */
export function sequentialSearch(arr: number[], target: number): SearchFrame[] {
  const frames: SearchFrame[] = []

  frames.push({
    type: 'reset',
    description: `在数组中顺序查找 ${target}`,
    data: { array: arr, target },
    highlightLine: 0
  })

  for (let i = 0; i < arr.length; i++) {
    frames.push({
      type: 'compare',
      index: i,
      key: arr[i],
      description: `比较 arr[${i}] = ${arr[i]} 与目标 ${target}`,
      data: { mid: i },
      highlightLine: 2
    })

    if (arr[i] === target) {
      frames.push({
        type: 'found',
        index: i,
        key: target,
        description: `找到目标，位置 ${i}`,
        data: { mid: i },
        highlightLine: 3
      })
      return frames
    }
  }

  frames.push({
    type: 'not-found',
    key: target,
    description: `未找到 ${target}`,
    highlightLine: 7
  })

  return frames
}

/**
 * 哈希表（线性探测法）
 */
export interface HashTable {
  size: number
  table: (number | null)[]
}

export function hashInsert(ht: HashTable, value: number): SearchFrame[] {
  const frames: SearchFrame[] = []
  const table = [...ht.table]

  frames.push({
    type: 'reset',
    description: `向哈希表插入 ${value}，表大小 = ${ht.size}`,
    data: { table: [...table] },
    highlightLine: 15
  })

  const hash = value % ht.size

  frames.push({
    type: 'highlight',
    index: hash,
    description: `计算哈希值: ${value} % ${ht.size} = ${hash}`,
    highlightLine: 16
  })

  let index = hash
  let probeCount = 0

  while (table[index] !== null && probeCount < ht.size) {
    frames.push({
      type: 'probe',
      index,
      description: `位置 ${index} 已被 ${table[index]} 占用，发生冲突`,
      highlightLine: 18
    })

    index = (index + 1) % ht.size
    probeCount++

    frames.push({
      type: 'highlight',
      index,
      description: `线性探测：尝试位置 ${index}`,
      highlightLine: 19
    })
  }

  if (probeCount >= ht.size) {
    frames.push({
      type: 'not-found',
      description: `哈希表已满，无法插入 ${value}`,
      highlightLine: 18
    })
    return frames
  }

  table[index] = value

  frames.push({
    type: 'insert',
    index,
    key: value,
    description: `将 ${value} 插入位置 ${index}${probeCount > 0 ? `（探测 ${probeCount} 次）` : ''}`,
    data: { table: [...table] },
    highlightLine: 22
  })

  return frames
}

export function hashSearch(ht: HashTable, target: number): SearchFrame[] {
  const frames: SearchFrame[] = []
  const table = ht.table

  frames.push({
    type: 'reset',
    description: `在哈希表中查找 ${target}`,
    data: { table: [...table] },
    highlightLine: 0
  })

  const hash = target % ht.size

  frames.push({
    type: 'highlight',
    index: hash,
    description: `计算哈希值: ${target} % ${ht.size} = ${hash}`,
    highlightLine: 1
  })

  let index = hash
  let probeCount = 0

  while (table[index] !== null && probeCount < ht.size) {
    frames.push({
      type: 'compare',
      index,
      key: table[index]!,
      description: `比较位置 ${index}: ${table[index]} 与 ${target}`,
      highlightLine: 5
    })

    if (table[index] === target) {
      frames.push({
        type: 'found',
        index,
        key: target,
        description: `找到目标，位置 ${index}${probeCount > 0 ? `（探测 ${probeCount} 次）` : ''}`,
        highlightLine: 6
      })
      return frames
    }

    index = (index + 1) % ht.size
    probeCount++

    if (table[index] !== null) {
      frames.push({
        type: 'probe',
        index,
        description: `线性探测：检查位置 ${index}`,
        highlightLine: 8
      })
    }
  }

  frames.push({
    type: 'not-found',
    key: target,
    description: `未找到 ${target}`,
    highlightLine: 12
  })

  return frames
}

export const searchAlgorithms = {
  sequential: {
    name: '顺序查找',
    nameEn: 'Sequential Search',
    description: '从头到尾逐个比较元素，适用于无序数组',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  bst: {
    name: 'BST查找',
    nameEn: 'Binary Search Tree',
    description: '利用二叉搜索树的性质，左小右大进行查找',
    timeComplexity: 'O(log n) ~ O(n)',
    spaceComplexity: 'O(1)'
  },
  binary: {
    name: '二分查找',
    nameEn: 'Binary Search',
    description: '在有序数组中，每次排除一半元素',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)'
  },
  interpolation: {
    name: '插值查找',
    nameEn: 'Interpolation Search',
    description: '根据目标值在区间中的比例估算位置，适合均匀分布数据',
    timeComplexity: 'O(log log n) ~ O(n)',
    spaceComplexity: 'O(1)'
  },
  jump: {
    name: '跳跃查找',
    nameEn: 'Jump Search',
    description: '按块跳跃定位区间，再在线性扫描块内元素',
    timeComplexity: 'O(√n)',
    spaceComplexity: 'O(1)'
  },
  hash: {
    name: '哈希查找',
    nameEn: 'Hash Search',
    description: '通过哈希函数直接定位，冲突时线性探测',
    timeComplexity: 'O(1) ~ O(n)',
    spaceComplexity: 'O(n)'
  }
}
