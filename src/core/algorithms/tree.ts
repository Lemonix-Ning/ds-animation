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
  }
}
