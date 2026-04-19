/**
 * 预设案例库
 */

export interface PresetCase {
  name: string
  description: string
  data: any
}

export const sortingPresets: Record<string, PresetCase[]> = {
  bubble: [
    { name: '随机数组', description: '10个随机数', data: [64, 34, 25, 12, 22, 11, 90, 88, 45, 50] },
    { name: '逆序数组', description: '最坏情况', data: [9, 8, 7, 6, 5, 4, 3, 2, 1] },
    { name: '已排序', description: '最好情况', data: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
  ],
  selection: [
    { name: '随机数组', description: '10个随机数', data: [64, 25, 12, 22, 11, 90, 88, 45, 50, 34] },
    { name: '逆序数组', description: '最坏情况', data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] },
    { name: '小数组', description: '5个元素', data: [5, 2, 8, 1, 9] }
  ],
  insertion: [
    { name: '随机数组', description: '10个随机数', data: [12, 11, 13, 5, 6, 7, 23, 45, 67, 89] },
    { name: '逆序数组', description: '最坏情况', data: [8, 7, 6, 5, 4, 3, 2, 1] },
    { name: '部分有序', description: '接近有序', data: [1, 2, 4, 3, 5, 7, 6, 8] }
  ],
  quick: [
    { name: '随机数组', description: '10个随机数', data: [10, 7, 8, 9, 1, 5, 3, 6, 4, 2] },
    { name: '已排序', description: '最坏情况之一', data: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    { name: '重复元素', description: '测试分区', data: [5, 2, 8, 2, 9, 1, 5, 5, 3] }
  ],
  heap: [
    { name: '随机数组', description: '10个随机数', data: [4, 10, 3, 5, 1, 8, 7, 6, 9, 2] },
    { name: '逆序数组', description: '建堆演示', data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] },
    { name: '小数组', description: '快速演示', data: [5, 3, 8, 1, 9, 2] }
  ],
  shell: [
    { name: '随机数组', description: '10个随机数', data: [12, 34, 54, 2, 3, 23, 45, 67, 89, 11] },
    { name: '逆序数组', description: '最坏情况', data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] },
    { name: '部分有序', description: '中等情况', data: [1, 3, 2, 5, 4, 7, 6, 9, 8, 10] }
  ],
  merge: [
    { name: '随机数组', description: '10个随机数', data: [38, 27, 43, 3, 9, 82, 10, 15, 67, 23] },
    { name: '逆序数组', description: '分治演示', data: [8, 7, 6, 5, 4, 3, 2, 1] },
    { name: '两段有序', description: '合并演示', data: [1, 3, 5, 7, 2, 4, 6, 8] }
  ]
}

export const linearPresets = {
  sequential: [
    { name: '小数组', description: '5个元素', data: [10, 20, 30, 40, 50] },
    { name: '中等数组', description: '10个元素', data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95] },
    { name: '空数组', description: '空表测试', data: [] }
  ],
  linked: [
    { name: '小链表', description: '5个节点', data: [10, 20, 30, 40, 50] },
    { name: '中等链表', description: '8个节点', data: [1, 2, 3, 4, 5, 6, 7, 8] },
    { name: '单节点', description: '边界情况', data: [100] }
  ]
}

export const stackQueuePresets = {
  stack: [
    { name: '空栈', description: '初始状态', data: [] },
    { name: '小栈', description: '3个元素', data: [10, 20, 30] },
    { name: '中等栈', description: '6个元素', data: [5, 10, 15, 20, 25, 30] }
  ],
  queue: [
    { name: '空队列', description: '初始状态', data: [] },
    { name: '小队列', description: '3个元素', data: [10, 20, 30] },
    { name: '中等队列', description: '6个元素', data: [5, 10, 15, 20, 25, 30] }
  ]
}

export const stringPresets = {
  kmp: [
    { name: '简单匹配', description: '基础案例', data: { text: 'ABABABABCA', pattern: 'ABABCA' } },
    { name: '部分匹配', description: 'next数组演示', data: { text: 'AABAACAABAA', pattern: 'AABAA' } },
    { name: '无匹配', description: '失败案例', data: { text: 'ABCDEFGH', pattern: 'XYZ' } }
  ],
  bruteForce: [
    { name: '简单匹配', description: '基础案例', data: { text: 'HELLO WORLD', pattern: 'WORLD' } },
    { name: '多次匹配', description: '第一次出现', data: { text: 'ABABAB', pattern: 'AB' } },
    { name: '无匹配', description: '失败案例', data: { text: 'ABCDEF', pattern: 'XYZ' } }
  ]
}

export const treePresets = {
  traversal: [
    { name: '完全二叉树', description: '7个节点', data: 'A,B,C,D,E,F,G' },
    { name: '小树', description: '3个节点', data: 'A,B,C' },
    { name: '单节点', description: '边界情况', data: 'A' }
  ],
  bst: [
    { name: '平衡BST', description: '7个节点', data: [50, 30, 70, 20, 40, 60, 80] },
    { name: '左偏BST', description: '不平衡', data: [50, 40, 30, 20, 10] },
    { name: '右偏BST', description: '不平衡', data: [10, 20, 30, 40, 50] }
  ],
  avl: [
    { name: 'LL 旋转案例', description: '触发右旋', data: [30, 20, 10, 25] },
    { name: 'RR 旋转案例', description: '触发左旋', data: [10, 20, 30, 25] },
    { name: 'LR/RL 综合', description: '触发双旋转', data: [30, 10, 20, 40, 35] }
  ],
  huffman: [
    { name: '经典案例', description: '6个字符', data: 'A:5, B:9, C:12, D:13, E:16, F:45' },
    { name: '简单案例', description: '4个字符', data: 'A:1, B:2, C:3, D:4' },
    { name: '相同权值', description: '稳定性测试', data: 'A:5, B:5, C:5, D:5' }
  ]
}

export const graphPresets = {
  dijkstra: [
    { name: '标准图', description: '6个节点', data: 'standard' },
    { name: '简单图', description: '4个节点', data: 'simple' },
    { name: '复杂图', description: '8个节点', data: 'complex' },
    { name: '稀疏图', description: '7个节点低连通', data: 'sparse' }
  ],
  prim: [
    { name: '标准图', description: '6个节点', data: 'standard' },
    { name: '简单图', description: '4个节点', data: 'simple' },
    { name: '复杂图', description: '8个节点', data: 'complex' },
    { name: '稀疏图', description: '7个节点低连通', data: 'sparse' }
  ],
  kruskal: [
    { name: '标准图', description: '6个节点', data: 'standard' },
    { name: '简单图', description: '4个节点', data: 'simple' },
    { name: '复杂图', description: '8个节点', data: 'complex' },
    { name: '稀疏图', description: '7个节点低连通', data: 'sparse' }
  ],
  dfs: [
    { name: '标准图', description: '6个节点', data: 'standard' },
    { name: '分支图', description: '适合深度回溯', data: 'branching' },
    { name: '稀疏图', description: '低连通图', data: 'sparse' },
    { name: '复杂图', description: '8个节点', data: 'complex' }
  ],
  bfs: [
    { name: '简单图', description: '4个节点', data: 'simple' },
    { name: '标准图', description: '6个节点', data: 'standard' },
    { name: '分支图', description: '适合层序扩展', data: 'branching' },
    { name: '复杂图', description: '8个节点', data: 'complex' }
  ]
}

export const searchPresets = {
  sequential: [
    { name: '无序数组', description: '基础线性扫描', data: [23, 5, 18, 9, 42, 11, 30] },
    { name: '目标在开头', description: '最佳情况', data: [10, 4, 7, 2, 9] },
    { name: '目标在末尾', description: '最坏情况之一', data: [3, 8, 1, 6, 15] },
    { name: '含重复元素', description: '返回首个匹配位置', data: [7, 2, 7, 9, 7, 1] }
  ],
  binary: [
    { name: '标准数组', description: '10个元素', data: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19] },
    { name: '小数组', description: '5个元素', data: [2, 4, 6, 8, 10] },
    { name: '大数组', description: '15个元素', data: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29] },
    { name: '单元素', description: '边界情况', data: [10] }
  ],
  interpolation: [
    { name: '均匀分布', description: '适合插值查找', data: [10, 20, 30, 40, 50, 60, 70, 80] },
    { name: '标准数组', description: '基础案例', data: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19] },
    { name: '大数组', description: '15个元素', data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30] }
  ],
  jump: [
    { name: '标准数组', description: '基础案例', data: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19] },
    { name: '大数组', description: '便于观察分块', data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32] },
    { name: '单元素', description: '边界情况', data: [10] }
  ],
  bst: [
    { name: '平衡树', description: '7个节点', data: [50, 30, 70, 20, 40, 60, 80] },
    { name: '小树', description: '3个节点', data: [20, 10, 30] },
    { name: '左偏树', description: '不平衡', data: [50, 40, 30, 20, 10] }
  ],
  hash: [
    { name: '小表', description: '表大小7', data: { size: 7, values: [14, 21, 28, 35] } },
    { name: '中表', description: '表大小11', data: { size: 11, values: [12, 23, 34, 45, 56] } },
    { name: '大表', description: '表大小13', data: { size: 13, values: [13, 26, 39, 52, 65, 78] } }
  ]
}
