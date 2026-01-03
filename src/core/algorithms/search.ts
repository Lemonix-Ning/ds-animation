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
    description: `在BST中查找 ${target}`
  })
  
  let current = root
  
  while (current !== null) {
    frames.push({
      type: 'visit',
      nodeId: current.id,
      value: current.value,
      description: `访问节点 ${current.value}`
    })
    
    if (target === current.value) {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: `找到目标！${target} = ${current.value}`
      })
      return frames
    } else if (target < current.value) {
      frames.push({
        type: 'visit',
        nodeId: current.id,
        description: `${target} < ${current.value}，向左子树查找`
      })
      current = current.left
    } else {
      frames.push({
        type: 'visit',
        nodeId: current.id,
        description: `${target} > ${current.value}，向右子树查找`
      })
      current = current.right
    }
  }
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: `未找到 ${target}`
  })
  
  return frames
}

/**
 * BST 插入
 */
export function bstInsert(root: BSTNode | null, value: number): { root: BSTNode, frames: TreeFrame[] } {
  const frames: TreeFrame[] = []
  
  const newNode: BSTNode = {
    id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
      value: value,
      description: `树为空，${value} 成为根节点`
    })
    return { root: newNode, frames }
  }
  
  let current = root
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
      current = current.left!
      isLeft = true
    } else if (value > current.value) {
      frames.push({
        type: 'visit',
        nodeId: current.id,
        description: `${value} > ${current.value}，向右子树`
      })
      current = current.right!
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
    value: value,
    position: isLeft ? 'left' : 'right',
    description: `将 ${value} 插入为 ${parent!.value} 的${isLeft ? '左' : '右'}子节点`
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
    data: { array: arr, target }
  })
  
  let left = 0
  let right = arr.length - 1
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    
    frames.push({
      type: 'highlight',
      index: mid,
      description: `查找范围 [${left}, ${right}]，中间位置 mid = ${mid}`,
      data: { left, right, mid }
    })
    
    frames.push({
      type: 'compare',
      index: mid,
      key: arr[mid],
      description: `比较 arr[${mid}] = ${arr[mid]} 与目标 ${target}`
    })
    
    if (arr[mid] === target) {
      frames.push({
        type: 'found',
        index: mid,
        key: target,
        description: `找到目标！arr[${mid}] = ${target}`
      })
      return frames
    } else if ((arr[mid] ?? 0) < target) {
      frames.push({
        type: 'highlight',
        description: `${arr[mid]} < ${target}，在右半部分查找`
      })
      left = mid + 1
    } else {
      frames.push({
        type: 'highlight',
        description: `${arr[mid]} > ${target}，在左半部分查找`
      })
      right = mid - 1
    }
  }
  
  frames.push({
    type: 'not-found',
    key: target,
    description: `未找到 ${target}`
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
    data: { table: [...table] }
  })
  
  const hash = value % ht.size
  
  frames.push({
    type: 'highlight',
    index: hash,
    description: `计算哈希值: ${value} % ${ht.size} = ${hash}`
  })
  
  let index = hash
  let probeCount = 0
  
  while (table[index] !== null && probeCount < ht.size) {
    frames.push({
      type: 'probe',
      index: index,
      description: `位置 ${index} 已被 ${table[index]} 占用，发生冲突`
    })
    
    index = (index + 1) % ht.size
    probeCount++
    
    frames.push({
      type: 'highlight',
      index: index,
      description: `线性探测：尝试位置 ${index}`
    })
  }
  
  if (probeCount >= ht.size) {
    frames.push({
      type: 'not-found',
      description: `哈希表已满，无法插入 ${value}`
    })
    return frames
  }
  
  table[index] = value
  
  frames.push({
    type: 'insert',
    index: index,
    key: value,
    description: `将 ${value} 插入位置 ${index}${probeCount > 0 ? `（探测 ${probeCount} 次）` : ''}`,
    data: { table: [...table] }
  })
  
  return frames
}

export function hashSearch(ht: HashTable, target: number): SearchFrame[] {
  const frames: SearchFrame[] = []
  const table = ht.table
  
  frames.push({
    type: 'reset',
    description: `在哈希表中查找 ${target}`,
    data: { table: [...table] }
  })
  
  const hash = target % ht.size
  
  frames.push({
    type: 'highlight',
    index: hash,
    description: `计算哈希值: ${target} % ${ht.size} = ${hash}`
  })
  
  let index = hash
  let probeCount = 0
  
  while (table[index] !== null && probeCount < ht.size) {
    frames.push({
      type: 'compare',
      index: index,
      key: table[index]!,
      description: `比较位置 ${index}: ${table[index]} 与 ${target}`
    })
    
    if (table[index] === target) {
      frames.push({
        type: 'found',
        index: index,
        key: target,
        description: `找到目标！位置 ${index}${probeCount > 0 ? `（探测 ${probeCount} 次）` : ''}`
      })
      return frames
    }
    
    index = (index + 1) % ht.size
    probeCount++
    
    if (table[index] !== null) {
      frames.push({
        type: 'probe',
        index: index,
        description: `线性探测：检查位置 ${index}`
      })
    }
  }
  
  frames.push({
    type: 'not-found',
    key: target,
    description: `未找到 ${target}`
  })
  
  return frames
}

// 算法信息
export const searchAlgorithms = {
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
    description: '在有序数组中，每次排除一半的元素',
    timeComplexity: 'O(log n)',
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
