import type { TreeFrame } from '../types'

/**
 * 树节点接口
 */
export interface TreeNode {
  id: string
  value: any
  weight?: number
  left?: TreeNode | null
  right?: TreeNode | null
  parent?: string | null
  x?: number
  y?: number
}

/**
 * 二叉树遍历算法
 */

// 前序遍历
export function preorderTraversal(root: TreeNode | null): TreeFrame[] {
  const frames: TreeFrame[] = []
  const visited: string[] = []
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始前序遍历（根-左-右）'
  })
  
  function traverse(node: TreeNode | null) {
    if (!node) return
    
    // 访问当前节点
    frames.push({
      type: 'visit',
      nodeId: node.id,
      value: node.value,
      description: `访问节点 ${node.value}`
    })
    visited.push(node.value)
    
    frames.push({
      type: 'highlight',
      nodeId: node.id,
      description: `遍历序列: [${visited.join(', ')}]`
    })
    
    // 遍历左子树
    if (node.left) {
      frames.push({
        type: 'visit',
        nodeId: node.id,
        description: `进入左子树`
      })
      traverse(node.left)
    }
    
    // 遍历右子树
    if (node.right) {
      frames.push({
        type: 'visit',
        nodeId: node.id,
        description: `进入右子树`
      })
      traverse(node.right)
    }
  }
  
  traverse(root)
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: `前序遍历完成: [${visited.join(', ')}]`
  })
  
  return frames
}

// 中序遍历
export function inorderTraversal(root: TreeNode | null): TreeFrame[] {
  const frames: TreeFrame[] = []
  const visited: string[] = []
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始中序遍历（左-根-右）'
  })
  
  function traverse(node: TreeNode | null) {
    if (!node) return
    
    // 遍历左子树
    if (node.left) {
      frames.push({
        type: 'visit',
        nodeId: node.id,
        description: `从 ${node.value} 进入左子树`
      })
      traverse(node.left)
    }
    
    // 访问当前节点
    frames.push({
      type: 'visit',
      nodeId: node.id,
      value: node.value,
      description: `访问节点 ${node.value}`
    })
    visited.push(node.value)
    
    frames.push({
      type: 'highlight',
      nodeId: node.id,
      description: `遍历序列: [${visited.join(', ')}]`
    })
    
    // 遍历右子树
    if (node.right) {
      frames.push({
        type: 'visit',
        nodeId: node.id,
        description: `从 ${node.value} 进入右子树`
      })
      traverse(node.right)
    }
  }
  
  traverse(root)
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: `中序遍历完成: [${visited.join(', ')}]`
  })
  
  return frames
}

// 后序遍历
export function postorderTraversal(root: TreeNode | null): TreeFrame[] {
  const frames: TreeFrame[] = []
  const visited: string[] = []
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始后序遍历（左-右-根）'
  })
  
  function traverse(node: TreeNode | null) {
    if (!node) return
    
    // 遍历左子树
    if (node.left) {
      frames.push({
        type: 'visit',
        nodeId: node.id,
        description: `从 ${node.value} 进入左子树`
      })
      traverse(node.left)
    }
    
    // 遍历右子树
    if (node.right) {
      frames.push({
        type: 'visit',
        nodeId: node.id,
        description: `从 ${node.value} 进入右子树`
      })
      traverse(node.right)
    }
    
    // 访问当前节点
    frames.push({
      type: 'visit',
      nodeId: node.id,
      value: node.value,
      description: `访问节点 ${node.value}`
    })
    visited.push(node.value)
    
    frames.push({
      type: 'highlight',
      nodeId: node.id,
      description: `遍历序列: [${visited.join(', ')}]`
    })
  }
  
  traverse(root)
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: `后序遍历完成: [${visited.join(', ')}]`
  })
  
  return frames
}

// 层序遍历
export function levelOrderTraversal(root: TreeNode | null): TreeFrame[] {
  const frames: TreeFrame[] = []
  const visited: string[] = []
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始层序遍历（逐层从左到右）'
  })
  
  if (!root) {
    frames.push({
      type: 'reset',
      nodeId: '',
      description: '树为空'
    })
    return frames
  }
  
  const queue: TreeNode[] = [root]
  let level = 0
  
  while (queue.length > 0) {
    const levelSize = queue.length
    const levelNodes: string[] = []
    
    frames.push({
      type: 'highlight',
      nodeId: '',
      description: `第 ${level + 1} 层，共 ${levelSize} 个节点`
    })
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!
      
      frames.push({
        type: 'visit',
        nodeId: node.id,
        value: node.value,
        description: `访问节点 ${node.value}`
      })
      
      visited.push(node.value)
      levelNodes.push(node.value)
      
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    
    frames.push({
      type: 'highlight',
      nodeId: '',
      description: `第 ${level + 1} 层: [${levelNodes.join(', ')}]`
    })
    
    level++
  }
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: `层序遍历完成: [${visited.join(', ')}]`
  })
  
  return frames
}

/**
 * 哈夫曼树构建
 */
export interface HuffmanNode extends TreeNode {
  weight: number
  char?: string
}

interface AVLNode extends TreeNode {
  height: number
  left: AVLNode | null
  right: AVLNode | null
}

export function buildHuffmanTree(weights: { char: string, weight: number }[]): TreeFrame[] {
  const frames: TreeFrame[] = []
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: `开始构建哈夫曼树，共 ${weights.length} 个字符: ${weights.map(w => `${w.char}(${w.weight})`).join(', ')}`
  })
  
  // 创建初始节点
  let nodes: HuffmanNode[] = weights.map((w, i) => ({
    id: `node-${i}`,
    value: w.char,
    weight: w.weight,
    char: w.char,
    left: null,
    right: null
  }))
  
  // 辅助函数：将树节点转换为可序列化的格式
  function serializeNode(node: HuffmanNode): any {
    return {
      id: node.id,
      value: node.value,
      weight: node.weight,
      char: node.char,
      left: node.left ? node.left.id : null,
      right: node.right ? node.right.id : null
    }
  }
  
  // 辅助函数：收集所有节点（包括子节点）
  function collectAllNodes(nodeList: HuffmanNode[]): any[] {
    const allNodes = new Map<string, any>()
    
    function traverse(node: HuffmanNode) {
      if (allNodes.has(node.id)) return
      allNodes.set(node.id, serializeNode(node))
      if (node.left) traverse(node.left as HuffmanNode)
      if (node.right) traverse(node.right as HuffmanNode)
    }
    
    nodeList.forEach(node => traverse(node))
    return Array.from(allNodes.values())
  }
  
  frames.push({
    type: 'create-node',
    nodeId: '',
    description: `初始化：创建 ${nodes.length} 个叶子节点（每个字符一个节点）`,
    data: { nodes: collectAllNodes(nodes) }
  })
  
  let nodeCounter = weights.length
  let step = 1
  
  while (nodes.length > 1) {
    // 按权值排序
    nodes.sort((a, b) => a.weight - b.weight)
    
    frames.push({
      type: 'highlight',
      nodeId: '',
      description: `步骤${step}: 对剩余 ${nodes.length} 个节点按权值排序: ${nodes.map(n => `${n.char || n.id}(${n.weight})`).join(', ')}`,
      data: { nodes: collectAllNodes(nodes) }
    })
    
    // 取出两个最小的
    const left = nodes.shift()!
    const right = nodes.shift()!
    
    const leftDisplay = left.char || `节点(${left.weight})`
    const rightDisplay = right.char || `节点(${right.weight})`
    
    frames.push({
      type: 'highlight',
      nodeId: left.id,
      description: `步骤${step}: 选择权值最小的两个节点: ${leftDisplay}(权值=${left.weight}) 和 ${rightDisplay}(权值=${right.weight})`,
      data: { 
        selected: [left.id, right.id],
        nodes: collectAllNodes([left, right, ...nodes])
      }
    })
    
    // 创建新的父节点
    const parent: HuffmanNode = {
      id: `node-${nodeCounter++}`,
      value: left.weight + right.weight,
      weight: left.weight + right.weight,
      left: left,
      right: right
    }
    
    frames.push({
      type: 'merge',
      nodeId: parent.id,
      description: `步骤${step}: 合并 - 创建新父节点${parent.id}，权值 = ${left.weight} + ${right.weight} = ${parent.weight}`,
      data: { 
        parent: serializeNode(parent),
        leftId: left.id,
        rightId: right.id,
        nodes: collectAllNodes([parent, ...nodes])
      }
    })
    
    nodes.push(parent)
    
    frames.push({
      type: 'connect',
      nodeId: parent.id,
      description: `步骤${step}: 连接 - ${leftDisplay}作为左子节点(编码0)，${rightDisplay}作为右子节点(编码1)，剩余${nodes.length}个节点`,
      data: { 
        nodes: collectAllNodes(nodes)
      }
    })
    
    step++
  }
  
  const totalWeight = nodes[0]?.weight || 0
  frames.push({
    type: 'reset',
    nodeId: nodes[0]?.id || '',
    description: `哈夫曼树构建完成！共进行了${step - 1}次合并，根节点总权值=${totalWeight}`,
    data: { 
      root: nodes[0],
      nodes: collectAllNodes(nodes)
    }
  })
  
  return frames
}

// 生成哈夫曼编码
export function generateHuffmanCodes(root: HuffmanNode | null): Map<string, string> {
  const codes = new Map<string, string>()
  
  function traverse(node: HuffmanNode | null, code: string) {
    if (!node) return
    
    if (node.char) {
      codes.set(node.char, code || '0')
    }
    
    if (node.left) traverse(node.left as HuffmanNode, code + '0')
    if (node.right) traverse(node.right as HuffmanNode, code + '1')
  }
  
  traverse(root, '')
  return codes
}

function avlHeight(node: AVLNode | null): number {
  return node?.height ?? 0
}

function updateAVLHeight(node: AVLNode): void {
  node.height = Math.max(avlHeight(node.left), avlHeight(node.right)) + 1
}

function avlBalanceFactor(node: AVLNode | null): number {
  if (!node) return 0
  return avlHeight(node.left) - avlHeight(node.right)
}

function cloneAVLTree(node: AVLNode | null): AVLNode | null {
  if (!node) return null
  return {
    id: node.id,
    value: node.value,
    height: node.height,
    left: cloneAVLTree(node.left),
    right: cloneAVLTree(node.right)
  }
}

function collectAVLNodes(node: AVLNode | null): AVLNode[] {
  if (!node) return []
  return [node, ...collectAVLNodes(node.left), ...collectAVLNodes(node.right)]
}

function rotateRight(y: AVLNode): AVLNode {
  const x = y.left as AVLNode
  const t2 = x.right

  x.right = y
  y.left = t2

  updateAVLHeight(y)
  updateAVLHeight(x)
  return x
}

function rotateLeft(x: AVLNode): AVLNode {
  const y = x.right as AVLNode
  const t2 = y.left

  y.left = x
  x.right = t2

  updateAVLHeight(x)
  updateAVLHeight(y)
  return y
}

/**
 * AVL 树插入与自平衡演示（LL/RR/LR/RL）
 */
export function avlInsertSequence(values: number[]): TreeFrame[] {
  const frames: TreeFrame[] = []
  let root: AVLNode | null = null

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始 AVL 构建与平衡演示'
  })

  function pushSnapshot(type: TreeFrame['type'], description: string, nodeId: string | number = '', selected?: string[]) {
    frames.push({
      type,
      nodeId,
      description,
      data: {
        root: cloneAVLTree(root),
        nodes: collectAVLNodes(root),
        selected: selected || []
      }
    })
  }

  function insert(node: AVLNode | null, value: number): AVLNode {
    if (!node) {
      const newNode: AVLNode = {
        id: `node-${value}`,
        value,
        height: 1,
        left: null,
        right: null
      }
      pushSnapshot('insert', `插入节点 ${value}`, newNode.id, [newNode.id])
      return newNode
    }

    pushSnapshot('visit', `比较 ${value} 与节点 ${node.value}`, node.id, [String(node.id)])

    if (value < node.value) {
      node.left = insert(node.left, value)
    } else if (value > node.value) {
      node.right = insert(node.right, value)
    } else {
      pushSnapshot('highlight', `节点 ${value} 已存在，跳过重复插入`, node.id, [String(node.id)])
      return node
    }

    updateAVLHeight(node)
    const balance = avlBalanceFactor(node)

    // LL
    if (balance > 1 && value < (node.left as AVLNode).value) {
      pushSnapshot('highlight', `触发 LL 失衡，右旋节点 ${node.value}`, node.id, [String(node.id), String((node.left as AVLNode).id)])
      return rotateRight(node)
    }

    // RR
    if (balance < -1 && value > (node.right as AVLNode).value) {
      pushSnapshot('highlight', `触发 RR 失衡，左旋节点 ${node.value}`, node.id, [String(node.id), String((node.right as AVLNode).id)])
      return rotateLeft(node)
    }

    // LR
    if (balance > 1 && value > (node.left as AVLNode).value) {
      pushSnapshot('highlight', `触发 LR 失衡，先左旋 ${node.left?.value} 再右旋 ${node.value}`, node.id, [String(node.id), String((node.left as AVLNode).id)])
      node.left = rotateLeft(node.left as AVLNode)
      return rotateRight(node)
    }

    // RL
    if (balance < -1 && value < (node.right as AVLNode).value) {
      pushSnapshot('highlight', `触发 RL 失衡，先右旋 ${node.right?.value} 再左旋 ${node.value}`, node.id, [String(node.id), String((node.right as AVLNode).id)])
      node.right = rotateRight(node.right as AVLNode)
      return rotateLeft(node)
    }

    return node
  }

  for (const value of values) {
    if (!Number.isFinite(value)) continue
    root = insert(root, value)
    pushSnapshot('highlight', `当前已插入 ${value}，AVL 保持平衡`, root?.id || '')
  }

  pushSnapshot('reset', `AVL 构建完成，共 ${values.length} 次插入`)
  return frames
}

/**
 * 二叉搜索树（BST）插入
 */
export function bstInsert(root: TreeNode | null, value: number): TreeFrame[] {
  const frames: TreeFrame[] = []
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: `开始插入节点 ${value} 到二叉搜索树`
  })
  
  // 辅助函数：收集所有节点
  function collectNodes(node: TreeNode | null | undefined): TreeNode[] {
    if (!node) return []
    const result = [node]
    if (node.left) result.push(...collectNodes(node.left))
    if (node.right) result.push(...collectNodes(node.right))
    return result
  }
  
  // 如果树为空，创建根节点
  if (!root) {
    const newNode: TreeNode = {
      id: `node-${value}`,
      value: value
    }
    
    frames.push({
      type: 'insert',
      nodeId: newNode.id,
      value: value,
      description: `树为空，创建根节点 ${value}`,
      data: { nodes: [newNode], newNode: newNode.id }
    })
    
    frames.push({
      type: 'reset',
      nodeId: newNode.id,
      description: `插入完成！节点 ${value} 成为根节点`,
      data: { nodes: [newNode] }
    })
    
    return frames
  }
  
  // 查找插入位置
  let current: TreeNode | null = root
  let parent: TreeNode | null = null
  let isLeftChild = false
  
  while (current) {
    parent = current
    
    frames.push({
      type: 'visit',
      nodeId: current.id,
      description: `比较：${value} vs ${current.value}`,
      data: { nodes: collectNodes(root), current: current.id }
    })
    
    if (value < current.value) {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: `${value} < ${current.value}，向左子树查找`,
        data: { nodes: collectNodes(root), current: current.id }
      })
      
      if (!current.left) {
        isLeftChild = true
        break
      }
      current = current.left ?? null
    } else if (value > current.value) {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: `${value} > ${current.value}，向右子树查找`,
        data: { nodes: collectNodes(root), current: current.id }
      })
      
      if (!current.right) {
        isLeftChild = false
        break
      }
      current = current.right ?? null
    } else {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: `节点 ${value} 已存在，插入失败`,
        data: { nodes: collectNodes(root), current: current.id }
      })
      return frames
    }
  }
  
  // 创建新节点
  const newNode: TreeNode = {
    id: `node-${value}`,
    value: value
  }
  
  // 插入新节点
  if (isLeftChild) {
    parent!.left = newNode
    frames.push({
      type: 'insert',
      nodeId: newNode.id,
      parentId: parent!.id,
      value: value,
      position: 'left',
      description: `找到插入位置：作为节点 ${parent!.value} 的左子节点`,
      data: { nodes: collectNodes(root), newNode: newNode.id, parent: parent!.id }
    })
  } else {
    parent!.right = newNode
    frames.push({
      type: 'insert',
      nodeId: newNode.id,
      parentId: parent!.id,
      value: value,
      position: 'right',
      description: `找到插入位置：作为节点 ${parent!.value} 的右子节点`,
      data: { nodes: collectNodes(root), newNode: newNode.id, parent: parent!.id }
    })
  }
  
  frames.push({
    type: 'reset',
    nodeId: newNode.id,
    description: `插入完成！节点 ${value} 已成功插入到树中`,
    data: { nodes: collectNodes(root) }
  })
  
  return frames
}

/**
 * 二叉搜索树（BST）删除
 */
export function bstDelete(root: TreeNode | null, value: number): TreeFrame[] {
  const frames: TreeFrame[] = []
  
  frames.push({
    type: 'reset',
    nodeId: '',
    description: `开始删除节点 ${value} 从二叉搜索树`
  })
  
  // 辅助函数：收集所有节点
  function collectNodes(node: TreeNode | null | undefined): TreeNode[] {
    if (!node) return []
    const result = [node]
    if (node.left) result.push(...collectNodes(node.left))
    if (node.right) result.push(...collectNodes(node.right))
    return result
  }
  
  // 辅助函数：查找最小节点
  function findMin(node: TreeNode): TreeNode {
    while (node.left) {
      node = node.left
    }
    return node
  }
  
  if (!root) {
    frames.push({
      type: 'reset',
      nodeId: '',
      description: '树为空，无法删除'
    })
    return frames
  }
  
  // 查找要删除的节点
  let current: TreeNode | null = root
  let parent: TreeNode | null = null
  let isLeftChild = false
  
  while (current && current.value !== value) {
    parent = current
    
    frames.push({
      type: 'visit',
      nodeId: current.id,
      description: `查找节点：比较 ${value} vs ${current.value}`,
      data: { nodes: collectNodes(root), current: current.id }
    })
    
    if (value < current.value) {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: `${value} < ${current.value}，向左子树查找`,
        data: { nodes: collectNodes(root), current: current.id }
      })
      isLeftChild = true
      current = current.left ?? null
    } else {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: `${value} > ${current.value}，向右子树查找`,
        data: { nodes: collectNodes(root), current: current.id }
      })
      isLeftChild = false
      current = current.right ?? null
    }
  }
  
  if (!current) {
    frames.push({
      type: 'reset',
      nodeId: '',
      description: `未找到节点 ${value}，删除失败`
    })
    return frames
  }
  
  frames.push({
    type: 'highlight',
    nodeId: current.id,
    description: `找到目标节点 ${value}`,
    data: { nodes: collectNodes(root), current: current.id }
  })
  
  // 情况1：叶子节点（无子节点）
  if (!current.left && !current.right) {
    frames.push({
      type: 'delete',
      nodeId: current.id,
      description: `情况1：节点 ${value} 是叶子节点，直接删除`,
      data: { nodes: collectNodes(root), deleting: current.id }
    })
    
    if (!parent) {
      // 删除根节点
      frames.push({
        type: 'reset',
        nodeId: '',
        description: `删除完成！树变为空`,
        data: { nodes: [] }
      })
    } else if (isLeftChild) {
      parent.left = null
      frames.push({
        type: 'reset',
        nodeId: '',
        description: `删除完成！节点 ${value} 已从树中移除`,
        data: { nodes: collectNodes(root) }
      })
    } else {
      parent.right = null
      frames.push({
        type: 'reset',
        nodeId: '',
        description: `删除完成！节点 ${value} 已从树中移除`,
        data: { nodes: collectNodes(root) }
      })
    }
  }
  // 情况2：只有左子节点
  else if (!current.right) {
    frames.push({
      type: 'delete',
      nodeId: current.id,
      description: `情况2：节点 ${value} 只有左子节点，用左子节点替代`,
      data: { nodes: collectNodes(root), deleting: current.id }
    })
    
    if (!parent) {
      // 删除根节点
      frames.push({
        type: 'reset',
        nodeId: current.left!.id,
        description: `删除完成！左子节点 ${current.left!.value} 成为新的根节点`,
        data: { nodes: collectNodes(current.left) }
      })
    } else if (isLeftChild) {
      parent.left = current.left
      frames.push({
        type: 'reset',
        nodeId: '',
        description: `删除完成！节点 ${value} 已被其左子节点替代`,
        data: { nodes: collectNodes(root) }
      })
    } else {
      parent.right = current.left
      frames.push({
        type: 'reset',
        nodeId: '',
        description: `删除完成！节点 ${value} 已被其左子节点替代`,
        data: { nodes: collectNodes(root) }
      })
    }
  }
  // 情况3：只有右子节点
  else if (!current.left) {
    frames.push({
      type: 'delete',
      nodeId: current.id,
      description: `情况3：节点 ${value} 只有右子节点，用右子节点替代`,
      data: { nodes: collectNodes(root), deleting: current.id }
    })
    
    if (!parent) {
      // 删除根节点
      frames.push({
        type: 'reset',
        nodeId: current.right!.id,
        description: `删除完成！右子节点 ${current.right!.value} 成为新的根节点`,
        data: { nodes: collectNodes(current.right) }
      })
    } else if (isLeftChild) {
      parent.left = current.right
      frames.push({
        type: 'reset',
        nodeId: '',
        description: `删除完成！节点 ${value} 已被其右子节点替代`,
        data: { nodes: collectNodes(root) }
      })
    } else {
      parent.right = current.right
      frames.push({
        type: 'reset',
        nodeId: '',
        description: `删除完成！节点 ${value} 已被其右子节点替代`,
        data: { nodes: collectNodes(root) }
      })
    }
  }
  // 情况4：有两个子节点
  else {
    frames.push({
      type: 'highlight',
      nodeId: current.id,
      description: `情况4：节点 ${value} 有两个子节点，需要找到右子树的最小节点（中序后继）`,
      data: { nodes: collectNodes(root), current: current.id }
    })
    
    // 找到右子树的最小节点
    const successor = findMin(current.right)
    
    frames.push({
      type: 'highlight',
      nodeId: successor.id,
      description: `找到中序后继：节点 ${successor.value}（右子树的最小值）`,
      data: { nodes: collectNodes(root), current: current.id, successor: successor.id }
    })
    
    frames.push({
      type: 'delete',
      nodeId: current.id,
      description: `用节点 ${successor.value} 替换节点 ${value}`,
      data: { nodes: collectNodes(root), deleting: current.id, successor: successor.id }
    })
    
    // 保存后继节点的值
    const successorValue = successor.value
    
    // 递归删除后继节点（后继节点最多只有右子节点）
    bstDeleteNode(current.right ?? null, successor.value)
    
    // 用后继节点的值替换当前节点的值
    current.value = successorValue
    
    frames.push({
      type: 'reset',
      nodeId: current.id,
      description: `删除完成！节点 ${value} 已被替换为 ${successorValue}`,
      data: { nodes: collectNodes(root) }
    })
  }
  
  return frames
}

// 辅助函数：实际删除节点（不生成帧）
function bstDeleteNode(root: TreeNode | null, value: number): TreeNode | null {
  if (!root) return null
  
  if (value < root.value) {
    root.left = bstDeleteNode(root.left ?? null, value)
  } else if (value > root.value) {
    root.right = bstDeleteNode(root.right ?? null, value)
  } else {
    // 找到要删除的节点
    if (!root.left && !root.right) {
      return null
    } else if (!root.right) {
      return root.left ?? null
    } else if (!root.left) {
      return root.right ?? null
    } else {
      // 有两个子节点
      let minNode = root.right!
      while (minNode.left) {
        minNode = minNode.left
      }
      root.value = minNode.value
      root.right = bstDeleteNode(root.right ?? null, minNode.value)
    }
  }
  
  return root
}

// 算法信息
export const treeAlgorithms = {
  preorder: {
    name: '前序遍历',
    nameEn: 'Preorder Traversal',
    description: '访问顺序：根节点 → 左子树 → 右子树',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)'
  },
  inorder: {
    name: '中序遍历',
    nameEn: 'Inorder Traversal',
    description: '访问顺序：左子树 → 根节点 → 右子树',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)'
  },
  postorder: {
    name: '后序遍历',
    nameEn: 'Postorder Traversal',
    description: '访问顺序：左子树 → 右子树 → 根节点',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)'
  },
  levelorder: {
    name: '层序遍历',
    nameEn: 'Level Order Traversal',
    description: '逐层从左到右访问所有节点',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(w)'
  },
  huffman: {
    name: '哈夫曼树',
    nameEn: 'Huffman Tree',
    description: '带权路径长度最短的二叉树，用于数据压缩',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)'
  },
  avl: {
    name: 'AVL 树（自平衡）',
    nameEn: 'AVL Tree',
    description: '通过 LL/RR/LR/RL 四种旋转维持平衡因子，保证查找效率',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)'
  },
  bstInsert: {
    name: 'BST插入',
    nameEn: 'BST Insert',
    description: '向二叉搜索树中插入新节点，保持左小右大的性质',
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(1)'
  },
  bstDelete: {
    name: 'BST删除',
    nameEn: 'BST Delete',
    description: '从二叉搜索树中删除节点，分为4种情况处理',
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(1)'
  }
}
