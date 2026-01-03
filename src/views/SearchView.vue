<template>
  <div class="search-view">
    <!-- 头部 -->
    <div class="content-header">
      <h2>第7章 查找</h2>
      <div class="header-actions">
        <el-select v-model="selectedAlgorithm" style="width: 150px">
          <el-option label="二分查找" value="binary" />
          <el-option label="BST查找" value="bst" />
          <el-option label="哈希表" value="hash" />
        </el-select>
        <el-button type="primary" @click="runSearch">
          <el-icon><Search /></el-icon>
          开始查找
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
      
      <!-- 输入区 -->
      <div class="input-card">
        <el-form :inline="true">
          <!-- 二分查找输入 -->
          <template v-if="selectedAlgorithm === 'binary'">
            <el-form-item label="有序数组">
              <el-input v-model="arrayInput" placeholder="如: 1,3,5,7,9,11,13,15" style="width: 300px" />
            </el-form-item>
            <el-form-item label="查找目标">
              <el-input-number v-model="searchTarget" />
            </el-form-item>
          </template>
          
          <!-- BST输入 -->
          <template v-if="selectedAlgorithm === 'bst'">
            <el-form-item label="BST序列">
              <el-input v-model="bstInput" placeholder="如: 50,30,70,20,40,60,80" style="width: 300px" />
            </el-form-item>
            <el-form-item label="查找目标">
              <el-input-number v-model="searchTarget" />
            </el-form-item>
          </template>
          
          <!-- 哈希表输入 -->
          <template v-if="selectedAlgorithm === 'hash'">
            <el-form-item label="表大小">
              <el-input-number v-model="hashTableSize" :min="5" :max="20" />
            </el-form-item>
            <el-form-item label="插入值">
              <el-input-number v-model="hashInsertValue" />
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="handleHashInsert">插入</el-button>
            </el-form-item>
            <el-form-item label="查找值">
              <el-input-number v-model="searchTarget" />
            </el-form-item>
          </template>
        </el-form>
      </div>
      
      <!-- 动画演示区 -->
      <div class="animation-container">
        <!-- 二分查找可视化 -->
        <div v-if="selectedAlgorithm === 'binary'" class="binary-search-visual">
          <div class="array-row">
            <div 
              v-for="(value, index) in displayArray" 
              :key="index"
              class="array-cell"
              :class="getBinaryCellClass(index)"
            >
              <span class="cell-index">{{ index }}</span>
              <span class="cell-value">{{ value }}</span>
            </div>
          </div>
          <div class="pointers">
            <div class="pointer left" v-if="leftPointer >= 0" :style="{ left: `${leftPointer * 62 + 25}px` }">
              <span>L</span>
            </div>
            <div class="pointer mid" v-if="midPointer >= 0" :style="{ left: `${midPointer * 62 + 25}px` }">
              <span>M</span>
            </div>
            <div class="pointer right" v-if="rightPointer >= 0" :style="{ left: `${rightPointer * 62 + 25}px` }">
              <span>R</span>
            </div>
          </div>
        </div>
        
        <!-- BST可视化 -->
        <div v-if="selectedAlgorithm === 'bst'" class="bst-visual">
          <div class="tree-canvas">
            <!-- SVG 连线 -->
            <svg class="tree-lines" width="100%" height="350">
              <line 
                v-for="line in bstLines" 
                :key="line.id"
                :x1="line.x1" :y1="line.y1" 
                :x2="line.x2" :y2="line.y2"
                stroke="#409eff"
                stroke-width="2"
              />
            </svg>
            
            <!-- 树节点 -->
            <div 
              v-for="node in bstNodes" 
              :key="node.id"
              class="tree-node"
              :class="{ 
                visited: visitedNodes.has(node.id),
                current: currentNodeId === node.id,
                found: foundNodeId === node.id
              }"
              :style="{ left: `${node.x}px`, top: `${node.y}px` }"
            >
              {{ node.value }}
            </div>
          </div>
        </div>
        
        <!-- 哈希表可视化 -->
        <div v-if="selectedAlgorithm === 'hash'" class="hash-visual">
          <div class="hash-table">
            <div 
              v-for="(value, index) in hashTable" 
              :key="index"
              class="hash-cell"
              :class="getHashCellClass(index)"
            >
              <span class="cell-index">{{ index }}</span>
              <span class="cell-value">{{ value !== null ? value : '-' }}</span>
            </div>
          </div>
          <div class="hash-info">
            <p>哈希函数: H(key) = key % {{ hashTableSize }}</p>
            <p>冲突解决: 线性探测法</p>
          </div>
        </div>
      </div>
      
      <!-- 查找结果 -->
      <div class="result-panel" v-if="searchResult !== null">
        <el-alert 
          :title="searchResult >= 0 ? `查找成功！位置: ${searchResult}` : '未找到目标'"
          :type="searchResult >= 0 ? 'success' : 'warning'"
          show-icon
          :closable="false"
        />
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
import { Search, Refresh } from '@element-plus/icons-vue'
import { 
  binarySearch, 
  bstSearch, 
  bstInsert,
  hashInsert, 
  hashSearch,
  searchAlgorithms,
  type BSTNode,
  type HashTable
} from '../core/algorithms/search'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { SearchFrame, TreeFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'

// 状态
const selectedAlgorithm = ref('binary')
const arrayInput = ref('1, 3, 5, 7, 9, 11, 13, 15, 17, 19')
const bstInput = ref('50, 30, 70, 20, 40, 60, 80')
const searchTarget = ref(11)
const searchResult = ref<number | null>(null)

// 二分查找状态
const displayArray = ref<number[]>([])
const leftPointer = ref(-1)
const midPointer = ref(-1)
const rightPointer = ref(-1)
const highlightedIndex = ref<number | null>(null)
const foundIndex = ref<number | null>(null)

// BST状态
interface BSTDisplayNode {
  id: string
  value: number
  x: number
  y: number
}
const bstRoot = ref<BSTNode | null>(null)
const bstNodes = ref<BSTDisplayNode[]>([])
const bstLines = ref<{ id: string, x1: number, y1: number, x2: number, y2: number }[]>([])
const visitedNodes = ref<Set<string>>(new Set())
const currentNodeId = ref<string | null>(null)
const foundNodeId = ref<string | null>(null)

// 哈希表状态
const hashTableSize = ref(11)
const hashTable = ref<(number | null)[]>([])
const hashInsertValue = ref(25)
const probingIndex = ref<number | null>(null)
const insertedIndex = ref<number | null>(null)

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
} = useAnimationPlayer<SearchFrame | TreeFrame>()

// 计算属性
const algorithmInfo = computed(() => {
  const algos: Record<string, any> = searchAlgorithms
  return algos[selectedAlgorithm.value] || searchAlgorithms.binary
})

// 获取帧类型名称
function getFrameTypeName(type: string) {
  const names: Record<string, string> = {
    compare: '比较',
    found: '找到',
    'not-found': '未找到',
    probe: '探测',
    insert: '插入',
    highlight: '高亮',
    visit: '访问',
    reset: '重置'
  }
  return names[type] || type
}

// 获取二分查找单元格样式
function getBinaryCellClass(index: number) {
  if (foundIndex.value === index) return 'found'
  if (highlightedIndex.value === index) return 'comparing'
  if (index >= leftPointer.value && index <= rightPointer.value) return 'in-range'
  return 'out-range'
}

// 获取哈希表单元格样式
function getHashCellClass(index: number) {
  if (insertedIndex.value === index) return 'inserted'
  if (probingIndex.value === index) return 'probing'
  if (highlightedIndex.value === index) return 'comparing'
  return ''
}

// 处理帧变化
function handleFrameChange(frame: SearchFrame | TreeFrame | null, index: number) {
  highlightedIndex.value = null
  probingIndex.value = null
  insertedIndex.value = null
  currentNodeId.value = null
  
  if (!frame) {
    leftPointer.value = -1
    midPointer.value = -1
    rightPointer.value = -1
    foundIndex.value = null
    foundNodeId.value = null
    visitedNodes.value = new Set()
    return
  }
  
  const searchFrame = frame as SearchFrame
  const treeFrame = frame as TreeFrame
  
  switch (frame.type) {
    case 'highlight':
      if (searchFrame.data?.left !== undefined) {
        leftPointer.value = searchFrame.data.left
        rightPointer.value = searchFrame.data.right
        midPointer.value = searchFrame.data.mid
      }
      highlightedIndex.value = searchFrame.index ?? null
      break
    case 'compare':
      highlightedIndex.value = searchFrame.index ?? null
      if (treeFrame.nodeId) {
        currentNodeId.value = treeFrame.nodeId as string
        visitedNodes.value.add(treeFrame.nodeId as string)
      }
      break
    case 'found':
      foundIndex.value = searchFrame.index ?? null
      searchResult.value = searchFrame.index ?? -1
      if (treeFrame.nodeId) {
        foundNodeId.value = treeFrame.nodeId as string
      }
      break
    case 'not-found':
      searchResult.value = -1
      break
    case 'probe':
      probingIndex.value = searchFrame.index ?? null
      break
    case 'insert':
      insertedIndex.value = searchFrame.index ?? null
      if (searchFrame.data?.table) {
        hashTable.value = [...searchFrame.data.table]
      }
      break
    case 'visit':
      currentNodeId.value = treeFrame.nodeId as string
      visitedNodes.value.add(treeFrame.nodeId as string)
      break
    case 'reset':
      if (searchFrame.data?.table) {
        hashTable.value = [...searchFrame.data.table]
      }
      break
  }
}

// 解析数组
function parseArray(): number[] {
  return arrayInput.value
    .split(/[,\s]+/)
    .map(s => parseInt(s.trim()))
    .filter(n => !isNaN(n))
    .sort((a, b) => a - b)
}

// 构建BST
function buildBST() {
  const values = bstInput.value
    .split(/[,\s]+/)
    .map(s => parseInt(s.trim()))
    .filter(n => !isNaN(n))
  
  bstRoot.value = null
  
  for (const value of values) {
    if (bstRoot.value === null) {
      bstRoot.value = {
        id: `node-${value}`,
        value,
        left: null,
        right: null
      }
    } else {
      insertIntoBST(bstRoot.value, value)
    }
  }
  
  calculateBSTPositions()
}

function insertIntoBST(node: BSTNode, value: number) {
  if (value < node.value) {
    if (node.left === null) {
      node.left = { id: `node-${value}`, value, left: null, right: null }
    } else {
      insertIntoBST(node.left, value)
    }
  } else if (value > node.value) {
    if (node.right === null) {
      node.right = { id: `node-${value}`, value, left: null, right: null }
    } else {
      insertIntoBST(node.right, value)
    }
  }
}

function calculateBSTPositions() {
  bstNodes.value = []
  bstLines.value = []
  
  if (!bstRoot.value) return
  
  const canvasWidth = 600
  const nodeWidth = 40
  const levelHeight = 70
  
  function traverse(node: BSTNode, x: number, y: number, spread: number) {
    bstNodes.value.push({
      id: node.id,
      value: node.value,
      x: x - nodeWidth / 2,
      y
    })
    
    if (node.left) {
      const childX = x - spread
      const childY = y + levelHeight
      bstLines.value.push({
        id: `line-${node.id}-${node.left.id}`,
        x1: x, y1: y + nodeWidth / 2,
        x2: childX, y2: childY
      })
      traverse(node.left, childX, childY, spread / 2)
    }
    
    if (node.right) {
      const childX = x + spread
      const childY = y + levelHeight
      bstLines.value.push({
        id: `line-${node.id}-${node.right.id}`,
        x1: x, y1: y + nodeWidth / 2,
        x2: childX, y2: childY
      })
      traverse(node.right, childX, childY, spread / 2)
    }
  }
  
  traverse(bstRoot.value, canvasWidth / 2, 30, 120)
}

// 初始化哈希表
function initHashTable() {
  hashTable.value = new Array(hashTableSize.value).fill(null)
}

// 哈希表插入
function handleHashInsert() {
  const ht: HashTable = { size: hashTableSize.value, table: [...hashTable.value] }
  const frames = hashInsert(ht, hashInsertValue.value)
  
  // 更新哈希表
  const lastFrame = frames[frames.length - 1] as SearchFrame
  if (lastFrame.data?.table) {
    hashTable.value = [...lastFrame.data.table]
  }
  
  load(frames)
  hashInsertValue.value = Math.floor(Math.random() * 100)
}

// 运行查找
function runSearch() {
  searchResult.value = null
  foundIndex.value = null
  foundNodeId.value = null
  visitedNodes.value = new Set()
  
  let frames: (SearchFrame | TreeFrame)[] = []
  
  switch (selectedAlgorithm.value) {
    case 'binary':
      displayArray.value = parseArray()
      frames = binarySearch(displayArray.value, searchTarget.value)
      break
    case 'bst':
      buildBST()
      frames = bstSearch(bstRoot.value, searchTarget.value)
      break
    case 'hash':
      const ht: HashTable = { size: hashTableSize.value, table: [...hashTable.value] }
      frames = hashSearch(ht, searchTarget.value)
      break
  }
  
  load(frames)
}

// 重置演示
function resetDemo() {
  stop()
  searchResult.value = null
  leftPointer.value = -1
  midPointer.value = -1
  rightPointer.value = -1
  highlightedIndex.value = null
  foundIndex.value = null
  foundNodeId.value = null
  visitedNodes.value = new Set()
  probingIndex.value = null
  insertedIndex.value = null
  
  if (selectedAlgorithm.value === 'binary') {
    displayArray.value = parseArray()
  } else if (selectedAlgorithm.value === 'bst') {
    buildBST()
  } else if (selectedAlgorithm.value === 'hash') {
    initHashTable()
  }
}

// 重置
function reset() {
  stop()
  leftPointer.value = -1
  midPointer.value = -1
  rightPointer.value = -1
  highlightedIndex.value = null
  foundIndex.value = null
  searchResult.value = null
  visitedNodes.value = new Set()
  foundNodeId.value = null
}

// 监听算法变化
watch(selectedAlgorithm, () => {
  resetDemo()
})

watch(hashTableSize, () => {
  initHashTable()
})

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
  displayArray.value = parseArray()
  initHashTable()
})
</script>

<style scoped>
.search-view {
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
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-height: 300px;
}

/* 二分查找样式 */
.binary-search-visual {
  position: relative;
}

.array-row {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-bottom: 60px;
}

.array-cell {
  width: 60px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.array-cell .cell-index {
  font-size: 10px;
  opacity: 0.7;
}

.array-cell .cell-value {
  font-size: 18px;
  font-weight: bold;
}

.array-cell.in-range {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.array-cell.out-range {
  background: #dcdfe6;
  color: #909399;
}

.array-cell.comparing {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  transform: scale(1.1);
}

.array-cell.found {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  transform: scale(1.15);
}

.pointers {
  position: relative;
  height: 40px;
}

.pointer {
  position: absolute;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: left 0.3s ease;
}

.pointer::before {
  content: '';
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 10px solid;
}

.pointer span {
  font-weight: bold;
  font-size: 14px;
}

.pointer.left::before { border-bottom-color: #409eff; }
.pointer.left span { color: #409eff; }

.pointer.mid::before { border-bottom-color: #f56c6c; }
.pointer.mid span { color: #f56c6c; }

.pointer.right::before { border-bottom-color: #67c23a; }
.pointer.right span { color: #67c23a; }

/* BST样式 */
.bst-visual {
  min-height: 350px;
}

.tree-canvas {
  position: relative;
  width: 100%;
  height: 350px;
}

.tree-lines {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.tree-node {
  position: absolute;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s ease;
  z-index: 10;
}

.tree-node.visited {
  background: linear-gradient(135deg, #e6a23c 0%, #f7ba2a 100%);
}

.tree-node.current {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  transform: scale(1.2);
}

.tree-node.found {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  transform: scale(1.3);
}

/* 哈希表样式 */
.hash-visual {
  text-align: center;
}

.hash-table {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 20px;
}

.hash-cell {
  width: 50px;
  height: 60px;
  background: #f5f7fa;
  border: 2px solid #dcdfe6;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.hash-cell .cell-index {
  font-size: 10px;
  color: #909399;
}

.hash-cell .cell-value {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.hash-cell.comparing {
  background: #ecf5ff;
  border-color: #409eff;
}

.hash-cell.probing {
  background: #fef0f0;
  border-color: #f56c6c;
}

.hash-cell.inserted {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  border-color: #67c23a;
  color: #fff;
}

.hash-cell.inserted .cell-index,
.hash-cell.inserted .cell-value {
  color: #fff;
}

.hash-info {
  color: #606266;
  font-size: 14px;
}

.hash-info p {
  margin: 5px 0;
}

.result-panel {
  margin-bottom: 20px;
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
