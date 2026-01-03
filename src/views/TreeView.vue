<template>
  <div class="tree-view">
    <!-- 头部 -->
    <div class="content-header">
      <h2>第5章 树与二叉树</h2>
      <div class="header-actions">
        <el-select v-model="selectedAlgorithm" style="width: 150px">
          <el-option label="前序遍历" value="preorder" />
          <el-option label="中序遍历" value="inorder" />
          <el-option label="后序遍历" value="postorder" />
          <el-option label="层序遍历" value="levelorder" />
          <el-option label="哈夫曼树" value="huffman" />
        </el-select>
        <el-button type="primary" @click="runAlgorithm">
          <el-icon><VideoPlay /></el-icon>
          开始演示
        </el-button>
        <el-button @click="resetDemo">
          <el-icon><Refresh /></el-icon>
          重置
        </el-button>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="content-body">
      <!-- 算法信息 -->
      <div class="info-card">
        <h3>{{ algorithmInfo.name }}</h3>
        <span class="name-en">{{ algorithmInfo.nameEn }}</span>
        <p>{{ algorithmInfo.description }}</p>
        <div class="complexity">
          <el-tag>时间: {{ algorithmInfo.timeComplexity }}</el-tag>
          <el-tag type="success">空间: {{ algorithmInfo.spaceComplexity }}</el-tag>
        </div>
      </div>
      
      <!-- 哈夫曼树输入 -->
      <div class="input-card" v-if="selectedAlgorithm === 'huffman'">
        <el-form :inline="true">
          <el-form-item label="权值列表">
            <el-input 
              v-model="huffmanInput" 
              placeholder="如: A:5, B:9, C:12, D:13, E:16, F:45"
              style="width: 400px"
            />
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 二叉树输入 -->
      <div class="input-card" v-else>
        <el-form :inline="true">
          <el-form-item label="层序序列">
            <el-input 
              v-model="treeInput" 
              placeholder="如: A,B,C,D,E,F,G (null表示空节点)"
              style="width: 400px"
            />
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 动画演示区 -->
      <div class="animation-container">
        <div class="tree-canvas" ref="treeCanvasRef">
          <!-- SVG 连线 -->
          <svg class="tree-lines" :width="canvasWidth" :height="canvasHeight">
            <line 
              v-for="line in treeLines" 
              :key="line.id"
              :x1="line.x1" :y1="line.y1" 
              :x2="line.x2" :y2="line.y2"
              :class="{ highlighted: line.highlighted }"
              stroke="#409eff"
              stroke-width="2"
            />
          </svg>
          
          <!-- 树节点 -->
          <div 
            v-for="node in displayNodes" 
            :key="node.id"
            class="tree-node"
            :class="{ 
              visited: visitedNodes.has(node.id),
              current: currentNodeId === node.id,
              selected: selectedNodes.has(node.id)
            }"
            :style="{ left: `${node.x}px`, top: `${node.y}px` }"
          >
            <span class="node-value">{{ node.value }}</span>
            <span class="node-weight" v-if="node.weight !== undefined">({{ node.weight }})</span>
          </div>
        </div>
      </div>
      
      <!-- 遍历结果 -->
      <div class="result-panel" v-if="traversalResult.length > 0">
        <h4>遍历序列:</h4>
        <div class="result-sequence">
          <span 
            v-for="(val, index) in traversalResult" 
            :key="index"
            class="result-item"
          >
            {{ val }}
          </span>
        </div>
      </div>
      
      <!-- 哈夫曼编码结果 -->
      <div class="huffman-codes" v-if="selectedAlgorithm === 'huffman' && huffmanCodes.size > 0">
        <h4>哈夫曼编码:</h4>
        <el-table :data="huffmanCodesArray" style="width: 100%">
          <el-table-column prop="char" label="字符" width="100" />
          <el-table-column prop="code" label="编码" />
          <el-table-column prop="weight" label="权值" width="100" />
        </el-table>
      </div>
      
      <!-- 步骤信息 -->
      <div class="info-panel" v-if="currentFrame">
        <h4>当前步骤</h4>
        <div class="step-info">
          <p><strong>操作:</strong> {{ getFrameTypeName(currentFrame.type) }}</p>
          <p><strong>描述:</strong> {{ currentFrame.description }}</p>
        </div>
      </div>
    </div>
    
    <!-- 控制条 -->
    <ControlBar
      :current-index="currentIndex"
      :total-frames="totalFrames"
      :is-playing="isPlaying"
      :current-frame="currentFrame"
      :speed="config.speed"
      @play="play"
      @pause="pause"
      @reset="reset"
      @step-forward="stepForward"
      @step-backward="stepBackward"
      @go-to="goTo"
      @speed-change="setSpeed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { VideoPlay, Refresh } from '@element-plus/icons-vue'
import { 
  preorderTraversal, 
  inorderTraversal, 
  postorderTraversal, 
  levelOrderTraversal,
  buildHuffmanTree,
  generateHuffmanCodes,
  treeAlgorithms,
  type TreeNode,
  type HuffmanNode
} from '../core/algorithms/tree'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { TreeFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'

// 状态
const selectedAlgorithm = ref('preorder')
const treeInput = ref('A,B,C,D,E,F,G')
const huffmanInput = ref('A:5, B:9, C:12, D:13, E:16, F:45')
const treeCanvasRef = ref<HTMLElement | null>(null)
const canvasWidth = ref(800)
const canvasHeight = ref(400)

// 树节点
interface DisplayNode {
  id: string
  value: string
  weight?: number
  x: number
  y: number
  left?: string
  right?: string
}

const displayNodes = ref<DisplayNode[]>([])
const treeLines = ref<{ id: string, x1: number, y1: number, x2: number, y2: number, highlighted: boolean }[]>([])
const visitedNodes = ref<Set<string>>(new Set())
const currentNodeId = ref<string | null>(null)
const selectedNodes = ref<Set<string>>(new Set())
const traversalResult = ref<string[]>([])
const huffmanCodes = ref<Map<string, string>>(new Map())

// 播放器
const {
  currentIndex,
  totalFrames,
  isPlaying,
  currentFrame,
  config,
  load,
  play,
  pause,
  stop,
  stepForward,
  stepBackward,
  goTo,
  setSpeed,
  setOnFrameChange
} = useAnimationPlayer<TreeFrame>()

// 计算属性
const algorithmInfo = computed(() => {
  const algos: Record<string, any> = treeAlgorithms
  return algos[selectedAlgorithm.value] || treeAlgorithms.preorder
})

const huffmanCodesArray = computed(() => {
  return Array.from(huffmanCodes.value).map(([char, code]) => ({
    char,
    code,
    weight: huffmanWeights.value.get(char) || 0
  }))
})

const huffmanWeights = ref<Map<string, number>>(new Map())

// 获取帧类型名称
function getFrameTypeName(type: string) {
  const names: Record<string, string> = {
    visit: '访问',
    insert: '插入',
    delete: '删除',
    highlight: '高亮',
    connect: '连接',
    'create-node': '创建节点',
    merge: '合并',
    reset: '重置'
  }
  return names[type] || type
}

// 处理帧变化
function handleFrameChange(frame: TreeFrame | null, index: number) {
  currentNodeId.value = null
  
  if (!frame) {
    visitedNodes.value = new Set()
    selectedNodes.value = new Set()
    traversalResult.value = []
    return
  }
  
  // 对于哈夫曼树，所有帧都更新显示
  if (selectedAlgorithm.value === 'huffman' && frame.data?.nodes) {
    updateHuffmanDisplay(frame.data)
  }
  
  switch (frame.type) {
    case 'visit':
      currentNodeId.value = frame.nodeId as string
      if (frame.value) {
        visitedNodes.value.add(frame.nodeId as string)
        if (!traversalResult.value.includes(frame.value)) {
          traversalResult.value.push(frame.value)
        }
      }
      break
    case 'highlight':
      if (frame.nodeId) {
        currentNodeId.value = frame.nodeId as string
      }
      // 更新遍历结果显示
      if (frame.description.includes('遍历序列')) {
        const match = frame.description.match(/\[(.*)\]/)
        if (match && match[1]) {
          traversalResult.value = match[1].split(', ')
        }
      }
      if (frame.data?.selected) {
        selectedNodes.value = new Set(frame.data.selected)
      }
      break
    case 'create-node':
      // 哈夫曼树初始节点创建
      selectedNodes.value = new Set()
      break
    case 'merge':
      // 哈夫曼树合并节点
      if (frame.nodeId) {
        currentNodeId.value = frame.nodeId as string
      }
      if (frame.data?.leftId && frame.data?.rightId) {
        selectedNodes.value = new Set([frame.data.leftId, frame.data.rightId])
      }
      break
    case 'connect':
      // 哈夫曼树连接
      if (frame.nodeId) {
        currentNodeId.value = frame.nodeId as string
      }
      selectedNodes.value = new Set()
      break
    case 'reset':
      if (frame.description.includes('完成')) {
        selectedNodes.value = new Set()
        currentNodeId.value = null
      }
      if (frame.data?.root) {
        // 哈夫曼树构建完成，生成编码
        const rootNode = frame.data.root
        huffmanCodes.value = generateHuffmanCodes(rootNode)
      }
      break
  }
}

// 解析二叉树输入
function parseTreeInput(): TreeNode | null {
  const values = treeInput.value.split(',').map(s => s.trim())
  if (values.length === 0 || !values[0] || values[0] === '' || values[0].toLowerCase() === 'null') {
    return null
  }
  
  const nodes: (TreeNode | null)[] = values.map((v, i) => {
    if (v.toLowerCase() === 'null' || v === '') return null
    return { id: `node-${i}`, value: v, left: null, right: null }
  })
  
  // 构建树结构
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i]) {
      const leftIdx = 2 * i + 1
      const rightIdx = 2 * i + 2
      if (leftIdx < nodes.length) nodes[i]!.left = nodes[leftIdx]
      if (rightIdx < nodes.length) nodes[i]!.right = nodes[rightIdx]
    }
  }
  
  return nodes[0] ?? null
}

// 计算节点位置
function calculateNodePositions(root: TreeNode | null) {
  displayNodes.value = []
  treeLines.value = []
  
  if (!root) return
  
  const nodeWidth = 50
  const levelHeight = 80
  const startX = canvasWidth.value / 2
  const startY = 40
  
  function traverse(node: TreeNode, x: number, y: number, level: number, spread: number) {
    displayNodes.value.push({
      id: node.id,
      value: node.value as string,
      x: x - nodeWidth / 2,
      y: y
    })
    
    const childSpread = spread / 2
    
    if (node.left) {
      const childX = x - spread
      const childY = y + levelHeight
      treeLines.value.push({
        id: `line-${node.id}-${node.left.id}`,
        x1: x, y1: y + nodeWidth / 2,
        x2: childX, y2: childY,
        highlighted: false
      })
      traverse(node.left, childX, childY, level + 1, childSpread)
    }
    
    if (node.right) {
      const childX = x + spread
      const childY = y + levelHeight
      treeLines.value.push({
        id: `line-${node.id}-${node.right.id}`,
        x1: x, y1: y + nodeWidth / 2,
        x2: childX, y2: childY,
        highlighted: false
      })
      traverse(node.right, childX, childY, level + 1, childSpread)
    }
  }
  
  const initialSpread = Math.min(150, canvasWidth.value / 4)
  traverse(root, startX, startY, 0, initialSpread)
}

// 更新哈夫曼树显示
function updateHuffmanDisplay(data: any) {
  if (!data.nodes) return
  
  const nodes = data.nodes
  displayNodes.value = []
  treeLines.value = []
  
  // 建立节点映射
  const nodeMap = new Map<string, any>()
  nodes.forEach((n: any) => {
    nodeMap.set(n.id, { ...n })
  })
  
  // 找出所有根节点（没有被其他节点引用的节点）
  const rootIds = new Set(nodes.map((n: any) => n.id))
  nodes.forEach((n: any) => {
    if (n.left) rootIds.delete(n.left)
    if (n.right) rootIds.delete(n.right)
  })
  
  const roots = Array.from(rootIds).map((id: any) => nodeMap.get(id))
  
  // 计算每棵树的高度（用于布局）
  function getTreeHeight(nodeId: string, visited = new Set<string>()): number {
    if (visited.has(nodeId)) return 0
    visited.add(nodeId)
    
    const node = nodeMap.get(nodeId)
    if (!node) return 0
    
    if (!node.left && !node.right) return 1
    
    const leftHeight = node.left ? getTreeHeight(node.left, visited) : 0
    const rightHeight = node.right ? getTreeHeight(node.right, visited) : 0
    return Math.max(leftHeight, rightHeight) + 1
  }
  
  // 计算每棵树的叶子节点数（用于计算宽度）
  function getLeafCount(nodeId: string, visited = new Set<string>()): number {
    if (visited.has(nodeId)) return 0
    visited.add(nodeId)
    
    const node = nodeMap.get(nodeId)
    if (!node) return 0
    
    if (!node.left && !node.right) return 1
    
    const leftCount = node.left ? getLeafCount(node.left, visited) : 0
    const rightCount = node.right ? getLeafCount(node.right, visited) : 0
    return leftCount + rightCount
  }
  
  // 递归布局单棵树
  function layoutTree(nodeId: string, x: number, y: number, width: number, visited = new Set<string>()) {
    if (visited.has(nodeId)) return
    visited.add(nodeId)
    
    const node = nodeMap.get(nodeId)
    if (!node) return
    
    const nodeWidth = 50
    const levelHeight = 80
    
    // 当前节点位置
    const nodeX = x + width / 2
    const nodeY = y
    
    displayNodes.value.push({
      id: node.id,
      value: node.char || node.weight.toString(),
      weight: node.weight,
      x: nodeX - nodeWidth / 2,
      y: nodeY
    })
    
    // 布局子节点
    if (node.left || node.right) {
      const leftWidth = node.left ? getLeafCount(node.left, new Set()) * 60 : 0
      const rightWidth = node.right ? getLeafCount(node.right, new Set()) * 60 : 0
      
      if (node.left) {
        const leftX = x
        const leftY = y + levelHeight
        
        layoutTree(node.left, leftX, leftY, leftWidth, visited)
        
        const leftNode = displayNodes.value.find((n: DisplayNode) => n.id === node.left)
        if (leftNode) {
          treeLines.value.push({
            id: `line-${node.id}-${node.left}`,
            x1: nodeX, y1: nodeY + nodeWidth / 2,
            x2: leftNode.x + nodeWidth / 2, y2: leftNode.y,
            highlighted: false
          })
        }
      }
      
      if (node.right) {
        const rightX = x + leftWidth
        const rightY = y + levelHeight
        
        layoutTree(node.right, rightX, rightY, rightWidth, visited)
        
        const rightNode = displayNodes.value.find((n: DisplayNode) => n.id === node.right)
        if (rightNode) {
          treeLines.value.push({
            id: `line-${node.id}-${node.right}`,
            x1: nodeX, y1: nodeY + nodeWidth / 2,
            x2: rightNode.x + nodeWidth / 2, y2: rightNode.y,
            highlighted: false
          })
        }
      }
    }
  }
  
  // 按权值排序根节点（小的在左边）
  roots.sort((a, b) => (a?.weight || 0) - (b?.weight || 0))
  
  // 布局所有树（森林）
  let currentX = 50
  const startY = 50
  
  roots.forEach((root: any) => {
    if (!root) return
    
    const leafCount = getLeafCount(root.id, new Set())
    const treeWidth = Math.max(leafCount * 60, 100)
    
    layoutTree(root.id, currentX, startY, treeWidth, new Set())
    currentX += treeWidth + 50 // 树之间的间距
  })
}

// 解析哈夫曼输入
function parseHuffmanInput(): { char: string, weight: number }[] {
  const items = huffmanInput.value.split(',').map(s => s.trim())
  const result: { char: string, weight: number }[] = []
  
  for (const item of items) {
    const match = item.match(/(\w+):(\d+)/)
    if (match) {
      result.push({ char: match[1] ?? '', weight: parseInt(match[2] ?? '0') })
      huffmanWeights.value.set(match[1] ?? '', parseInt(match[2] ?? '0'))
    }
  }
  
  return result
}

// 运行算法
function runAlgorithm() {
  visitedNodes.value = new Set()
  selectedNodes.value = new Set()
  traversalResult.value = []
  huffmanCodes.value = new Map()
  
  if (selectedAlgorithm.value === 'huffman') {
    const weights = parseHuffmanInput()
    
    // 初始化显示所有叶子节点
    displayNodes.value = weights.map((w, i) => ({
      id: `node-${i}`,
      value: w.char,
      weight: w.weight,
      x: 100 + i * 120,
      y: 300
    }))
    treeLines.value = []
    
    const frames = buildHuffmanTree(weights)
    load(frames)
  } else {
    const root = parseTreeInput()
    calculateNodePositions(root)
    
    let frames: TreeFrame[] = []
    switch (selectedAlgorithm.value) {
      case 'preorder':
        frames = preorderTraversal(root)
        break
      case 'inorder':
        frames = inorderTraversal(root)
        break
      case 'postorder':
        frames = postorderTraversal(root)
        break
      case 'levelorder':
        frames = levelOrderTraversal(root)
        break
    }
    
    load(frames)
  }
}

// 重置演示
function resetDemo() {
  stop()
  visitedNodes.value = new Set()
  selectedNodes.value = new Set()
  currentNodeId.value = null
  traversalResult.value = []
  huffmanCodes.value = new Map()
  
  // 清空帧序列，禁用播放按钮
  load([])
  
  if (selectedAlgorithm.value !== 'huffman') {
    const root = parseTreeInput()
    calculateNodePositions(root)
  }
}

// 重置
function reset() {
  stop()
  visitedNodes.value = new Set()
  traversalResult.value = []
  currentNodeId.value = null
}

// 监听算法变化
watch(selectedAlgorithm, () => {
  resetDemo()
})

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
  const root = parseTreeInput()
  calculateNodePositions(root)
})
</script>

<style scoped>
.tree-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-header {
  padding: 15px 25px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.content-body {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.info-card, .input-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  display: inline;
  margin-right: 10px;
  color: #303133;
}

.info-card .name-en {
  color: #909399;
  font-size: 14px;
}

.info-card p {
  color: #606266;
  margin: 10px 0 15px;
}

.complexity {
  display: flex;
  gap: 10px;
}

.animation-container {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.tree-canvas {
  position: relative;
  width: 100%;
  height: 400px;
}

.tree-lines {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.tree-lines line {
  transition: stroke 0.3s ease;
}

.tree-lines line.highlighted {
  stroke: #f56c6c;
  stroke-width: 3;
}

.tree-node {
  position: absolute;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.tree-node .node-value {
  font-size: 16px;
  font-weight: bold;
}

.tree-node .node-weight {
  font-size: 10px;
  opacity: 0.8;
}

.tree-node.visited {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.tree-node.current {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  transform: scale(1.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.tree-node.selected {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.result-panel {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.result-panel h4 {
  margin-bottom: 15px;
  color: #606266;
}

.result-sequence {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.result-item {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.huffman-codes {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.huffman-codes h4 {
  margin-bottom: 15px;
  color: #606266;
}

.info-panel {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
}

.info-panel h4 {
  margin-bottom: 10px;
  color: var(--primary-color);
}

.step-info {
  font-size: 14px;
  line-height: 1.8;
}
</style>
