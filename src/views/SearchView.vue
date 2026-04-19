<template>
  <div class="search-view">
    <div class="content-header">
      <h2>第8章 查找</h2>
      <div class="header-actions">
        <el-select v-model="selectedAlgorithm" style="width: 150px">
          <el-option label="顺序查找" value="sequential" />
          <el-option label="二分查找" value="binary" />
          <el-option label="插值查找" value="interpolation" />
          <el-option label="跳跃查找" value="jump" />
          <el-option label="BST查找" value="bst" />
          <el-option label="哈希查找" value="hash" />
        </el-select>
        <el-select v-model="selectedPreset" placeholder="选择预设案例" style="width: 150px" @change="loadPreset">
          <el-option label="自定义" value="" />
          <el-option v-for="(preset, index) in currentPresets" :key="index" :label="preset.name" :value="index" />
        </el-select>
        <el-button @click="resetDemo">
          <el-icon><Refresh /></el-icon>
          重置
        </el-button>
        <el-button v-if="isArraySearch" type="primary" @click="generateRandomArray">
          <el-icon><Refresh /></el-icon>
          随机生成
        </el-button>
      </div>
    </div>

    <div class="content-body">
      <div class="main-layout">
        <div class="left-panel">
          <div class="info-card">
            <h3>{{ algorithmInfo.name }}</h3>
            <span class="name-en">{{ algorithmInfo.nameEn }}</span>
            <p>{{ algorithmInfo.description }}</p>
            <div class="complexity">
              <el-tag>时间: {{ algorithmInfo.timeComplexity }}</el-tag>
              <el-tag type="success">空间: {{ algorithmInfo.spaceComplexity }}</el-tag>
            </div>
          </div>

          <div class="input-card">
            <el-form :inline="true">
              <template v-if="isArraySearch">
                <el-form-item :label="isOrderedArraySearch ? '有序数组' : '数组'">
                  <el-input v-model="arrayInput" placeholder="如: 1,3,5,7,9,11" style="width: 300px" />
                </el-form-item>
                <el-form-item label="查找目标">
                  <el-input-number v-model="searchTarget" />
                </el-form-item>
              </template>

              <template v-if="selectedAlgorithm === 'bst'">
                <el-form-item label="BST序列">
                  <el-input v-model="bstInput" placeholder="如: 50,30,70,20,40" style="width: 300px" />
                </el-form-item>
                <el-form-item label="查找目标">
                  <el-input-number v-model="searchTarget" />
                </el-form-item>
              </template>

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

          <div class="animation-container">
            <div v-if="isArraySearch" class="binary-search-visual">
              <div class="array-row">
                <div v-for="(value, index) in displayArray" :key="index" class="array-cell" :class="getBinaryCellClass(index)">
                  <span class="cell-index">{{ index }}</span>
                  <span class="cell-value">{{ value }}</span>
                </div>
              </div>
              <div class="pointers">
                <div class="pointers-inner" :style="{ width: `${displayArray.length * 62 - 2}px` }">
                  <div class="pointer left" v-if="leftPointer >= 0" :style="{ left: `${leftPointer * 62 + 30}px` }"><span>L</span></div>
                  <div class="pointer mid" v-if="midPointer >= 0" :style="{ left: `${midPointer * 62 + 30}px` }"><span>M</span></div>
                  <div class="pointer right" v-if="rightPointer >= 0" :style="{ left: `${rightPointer * 62 + 30}px` }"><span>R</span></div>
                </div>
              </div>
            </div>

            <div v-if="selectedAlgorithm === 'bst'" class="bst-visual">
              <div class="tree-canvas" ref="bstCanvasRef">
                <svg class="tree-lines" width="100%" height="350">
                  <line v-for="line in bstLines" :key="line.id" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" stroke="#409eff" stroke-width="2" />
                </svg>

                <div
                  v-for="node in bstNodes"
                  :key="node.id"
                  class="tree-node"
                  :class="{ visited: visitedNodes.has(node.id), current: currentNodeId === node.id, found: foundNodeId === node.id }"
                  :style="{ left: `${node.x}px`, top: `${node.y}px` }"
                >
                  {{ node.value }}
                </div>
              </div>
            </div>

            <div v-if="selectedAlgorithm === 'hash'" class="hash-visual">
              <div class="hash-table">
                <div v-for="(value, index) in hashTable" :key="index" class="hash-cell" :class="getHashCellClass(index)">
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

          <div class="result-panel" v-if="searchResult !== null">
            <el-alert :title="searchResult >= 0 ? `查找成功，位置: ${searchResult}` : '未找到目标'" :type="searchResult >= 0 ? 'success' : 'warning'" show-icon :closable="false" />
          </div>

          <div class="info-panel" v-if="currentFrame">
            <h4>当前步骤</h4>
            <div class="step-info">
              <p><strong>操作:</strong> {{ getFrameTypeName(currentFrame.type) }}</p>
              <p><strong>描述:</strong> {{ currentFrame.description }}</p>
            </div>
          </div>
        </div>

        <div class="right-panel" :class="{ fullscreen: isCodeFullscreen }">
          <CodeEditorPanel
            :algorithm-code="currentAlgorithmCode"
            :algorithm-key="selectedAlgorithm"
            :input-array="displayArray"
            :is-playing="isPlaying"
            :highlight-line="currentHighlightLine"
            :use-pseudo-code="false"
            :enable-fullscreen="true"
            :is-fullscreen="isCodeFullscreen"
            @apply-code="handleApplyCode"
            @toggle-fullscreen="toggleCodeFullscreen"
          />
        </div>
      </div>
    </div>

    <ControlBar
      :current-index="currentIndex"
      :total-frames="totalFrames"
      :is-playing="isPlaying"
      :current-frame="currentFrame"
      :speed="config.speed"
      @play="handlePlay"
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
import { ref, computed, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {
  sequentialSearch,
  binarySearch,
  interpolationSearch,
  jumpSearch,
  bstSearch,
  hashInsert,
  hashSearch,
  searchAlgorithms,
  type BSTNode,
  type HashTable
} from '../core/algorithms/search'
import { searchPresets } from '../core/presets'
import { searchAlgorithmCode } from '../core/algorithmCode'
import type { AlgorithmCode } from '../core/algorithmCode'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { SearchFrame, TreeFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'
import CodeEditorPanel from '../components/common/CodeEditorPanel.vue'

const selectedAlgorithm = ref('binary')
const isCodeFullscreen = ref(false)
const selectedPreset = ref<number | ''>('')
const arrayInput = ref('1, 3, 5, 7, 9, 11, 13, 15, 17, 19')
const bstInput = ref('50, 30, 70, 20, 40, 60, 80')
const searchTarget = ref(11)
const searchResult = ref<number | null>(null)

const displayArray = ref<number[]>([])
const leftPointer = ref(-1)
const midPointer = ref(-1)
const rightPointer = ref(-1)
const highlightedIndex = ref<number | null>(null)
const foundIndex = ref<number | null>(null)

interface BSTDisplayNode {
  id: string
  value: number
  x: number
  y: number
}
const bstRoot = ref<BSTNode | null>(null)
const bstNodes = ref<BSTDisplayNode[]>([])
const bstLines = ref<{ id: string, x1: number, y1: number, x2: number, y2: number }[]>([])
const bstCanvasRef = ref<HTMLElement | null>(null)
const visitedNodes = ref<Set<string>>(new Set())
const currentNodeId = ref<string | null>(null)
const foundNodeId = ref<string | null>(null)

const hashTableSize = ref(11)
const hashTable = ref<(number | null)[]>([])
const hashInsertValue = ref(25)
const probingIndex = ref<number | null>(null)
const insertedIndex = ref<number | null>(null)

const userCustomFrames = ref<(SearchFrame | TreeFrame)[] | null>(null)

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

const algorithmInfo = computed(() => {
  const algos: Record<string, any> = searchAlgorithms
  return algos[selectedAlgorithm.value] || searchAlgorithms.binary
})

const currentPresets = computed(() => {
  const presets = searchPresets as Record<string, any[]>
  return presets[selectedAlgorithm.value] || []
})

const currentAlgorithmCode = computed<AlgorithmCode>(() => {
  const codeMap = searchAlgorithmCode as Record<string, AlgorithmCode>
  const selected = codeMap[selectedAlgorithm.value]
  if (selected) return selected
  return codeMap.binary as AlgorithmCode
})

const currentHighlightLine = computed(() => {
  if (!currentFrame.value) return undefined
  const frame = currentFrame.value as SearchFrame
  if (frame.highlightLine !== undefined) return frame.highlightLine

  const desc = frame.description || ''

  if (selectedAlgorithm.value === 'sequential') {
    if (frame.type === 'compare') return 1
    if (frame.type === 'found') return 2
    if (frame.type === 'not-found') return 6
    if (frame.type === 'reset') return 0
    return 1
  }

  if (selectedAlgorithm.value === 'binary') {
    if (frame.type === 'highlight') return 3
    if (frame.type === 'compare' || frame.type === 'found') return 4
    if (frame.type === 'update') {
      if (desc.includes('右半')) return 6
      return 8
    }
    if (frame.type === 'not-found') return 11
    if (frame.type === 'reset') return 0
    return 2
  }

  if (selectedAlgorithm.value === 'interpolation') {
    if (frame.type === 'highlight') return 6
    if (frame.type === 'compare') return 7
    if (frame.type === 'found') return 8
    if (frame.type === 'update') {
      if (desc.includes('右侧')) return 9
      return 10
    }
    if (frame.type === 'not-found') return 12
    if (frame.type === 'reset') return 0
    return 4
  }

  if (selectedAlgorithm.value === 'jump') {
    if (frame.type === 'highlight') return 4
    if (frame.type === 'update') return 9
    if (frame.type === 'compare' || frame.type === 'found') return 10
    if (frame.type === 'not-found') return 13
    if (frame.type === 'reset') return 0
    return 4
  }

  if (selectedAlgorithm.value === 'bst') {
    const treeFrame = currentFrame.value as TreeFrame
    if (treeFrame.type === 'visit') {
      if (desc.includes('左子树')) return 6
      if (desc.includes('右子树')) return 8
      return 3
    }
    if (treeFrame.type === 'highlight') return 4
    if (treeFrame.type === 'reset') return desc.includes('未找到') ? 12 : 0
    return 3
  }

  if (selectedAlgorithm.value === 'hash') {
    if (frame.type === 'highlight') return 1
    if (frame.type === 'compare') return 4
    if (frame.type === 'probe') return 7
    if (frame.type === 'found') return 5
    if (frame.type === 'insert') return 22
    if (frame.type === 'not-found') return 11
    if (frame.type === 'reset') return 0
    return 4
  }

  return 0
})

const isArraySearch = computed(() => {
  return ['sequential', 'binary', 'interpolation', 'jump'].includes(selectedAlgorithm.value)
})

const isOrderedArraySearch = computed(() => {
  return ['binary', 'interpolation', 'jump'].includes(selectedAlgorithm.value)
})

function getFrameTypeName(type: string) {
  const names: Record<string, string> = {
    compare: '比较',
    found: '找到',
    'not-found': '未找到',
    probe: '探测',
    insert: '插入',
    highlight: '高亮',
    update: '更新范围',
    visit: '访问',
    reset: '重置'
  }
  return names[type] || type
}

function getBinaryCellClass(index: number) {
  if (foundIndex.value === index) return 'found'
  if (highlightedIndex.value === index) return 'comparing'
  if (selectedAlgorithm.value === 'sequential') return ''
  if (index >= leftPointer.value && index <= rightPointer.value) return 'in-range'
  return 'out-range'
}

function getHashCellClass(index: number) {
  if (foundIndex.value === index) return 'found'
  if (insertedIndex.value === index) return 'inserted'
  if (probingIndex.value === index) return 'probing'
  if (highlightedIndex.value === index) return 'comparing'
  return ''
}

function handleFrameChange(frame: SearchFrame | TreeFrame | null) {
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

  if (searchFrame.data?.left !== undefined) {
    leftPointer.value = searchFrame.data.left
    rightPointer.value = searchFrame.data.right
    midPointer.value = searchFrame.data.mid
  }

  switch (frame.type) {
    case 'highlight':
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
      leftPointer.value = -1
      midPointer.value = -1
      rightPointer.value = -1
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
      leftPointer.value = -1
      midPointer.value = -1
      rightPointer.value = -1
      break
  }
}

function parseArray(): number[] {
  const parsed = arrayInput.value
    .split(/[,\s]+/)
    .map(s => parseInt(s.trim()))
    .filter(n => !isNaN(n))

  if (!isOrderedArraySearch.value) return parsed
  return parsed.sort((a, b) => a - b)
}

function generateRandomArray() {
  const length = Math.floor(Math.random() * 6) + 6
  const set = new Set<number>()
  while (set.size < length) {
    set.add(Math.floor(Math.random() * 90) + 1)
  }
  const arr = Array.from(set).sort((a, b) => a - b)
  arrayInput.value = arr.join(', ')
  displayArray.value = [...arr]
  resetVisualState()
  userCustomFrames.value = null
  load(buildDefaultFrames())
}

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

  nextTick(() => {
    calculateBSTPositions()
  })
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

  const canvasWidth = Math.max(bstCanvasRef.value?.clientWidth || 600, 420)
  const canvasHeight = 350
  const nodeWidth = 40
  const topPadding = 30

  function getDepth(node: BSTNode | null): number {
    if (!node) return 0
    return 1 + Math.max(getDepth(node.left), getDepth(node.right))
  }

  function inorder(node: BSTNode | null, result: BSTNode[]) {
    if (!node) return
    inorder(node.left, result)
    result.push(node)
    inorder(node.right, result)
  }

  const orderedNodes: BSTNode[] = []
  inorder(bstRoot.value, orderedNodes)
  const xIndexMap = new Map<string, number>()
  orderedNodes.forEach((node, idx) => {
    xIndexMap.set(node.id, idx)
  })

  const depth = Math.max(getDepth(bstRoot.value), 1)
  const usableHeight = canvasHeight - topPadding - 20
  const levelHeight = depth > 1 ? Math.max(50, Math.floor(usableHeight / (depth - 1))) : 70

  function getNodeCenterX(nodeId: string): number {
    const idx = xIndexMap.get(nodeId) ?? 0
    return ((idx + 1) * canvasWidth) / (orderedNodes.length + 1)
  }

  function traverse(node: BSTNode, depthLevel: number) {
    const xCenter = getNodeCenterX(node.id)
    const y = topPadding + depthLevel * levelHeight
    bstNodes.value.push({ id: node.id, value: node.value, x: xCenter - nodeWidth / 2, y })

    if (node.left) {
      const childX = getNodeCenterX(node.left.id)
      const childY = topPadding + (depthLevel + 1) * levelHeight
      bstLines.value.push({ id: `line-${node.id}-${node.left.id}`, x1: xCenter, y1: y + nodeWidth / 2, x2: childX, y2: childY })
      traverse(node.left, depthLevel + 1)
    }

    if (node.right) {
      const childX = getNodeCenterX(node.right.id)
      const childY = topPadding + (depthLevel + 1) * levelHeight
      bstLines.value.push({ id: `line-${node.id}-${node.right.id}`, x1: xCenter, y1: y + nodeWidth / 2, x2: childX, y2: childY })
      traverse(node.right, depthLevel + 1)
    }
  }

  traverse(bstRoot.value, 0)
}

function handleWindowResize() {
  if (selectedAlgorithm.value === 'bst' && bstRoot.value) {
    calculateBSTPositions()
  }
}

function initHashTable() {
  hashTable.value = new Array(hashTableSize.value).fill(null)
}

function handleHashInsert() {
  const ht: HashTable = { size: hashTableSize.value, table: [...hashTable.value] }
  const frames = hashInsert(ht, hashInsertValue.value)
  const lastFrame = frames[frames.length - 1] as SearchFrame
  if (lastFrame?.data?.table) {
    hashTable.value = [...lastFrame.data.table]
  }
  load(frames)
  hashInsertValue.value = Math.floor(Math.random() * 100)
}

function buildDefaultFrames(): (SearchFrame | TreeFrame)[] {
  switch (selectedAlgorithm.value) {
    case 'sequential':
      displayArray.value = parseArray()
      return sequentialSearch(displayArray.value, searchTarget.value)
    case 'binary':
      displayArray.value = parseArray()
      return binarySearch(displayArray.value, searchTarget.value)
    case 'interpolation':
      displayArray.value = parseArray()
      return interpolationSearch(displayArray.value, searchTarget.value)
    case 'jump':
      displayArray.value = parseArray()
      return jumpSearch(displayArray.value, searchTarget.value)
    case 'bst':
      buildBST()
      return bstSearch(bstRoot.value, searchTarget.value)
    case 'hash': {
      const ht: HashTable = { size: hashTableSize.value, table: [...hashTable.value] }
      return hashSearch(ht, searchTarget.value)
    }
    default:
      return []
  }
}

function runSearch() {
  searchResult.value = null
  foundIndex.value = null
  foundNodeId.value = null
  visitedNodes.value = new Set()

  if (userCustomFrames.value) {
    load(userCustomFrames.value)
    return
  }

  load(buildDefaultFrames())
}

function handlePlay() {
  if (currentIndex.value === -1) {
    runSearch()
  }
  play()
}

function toggleCodeFullscreen() {
  isCodeFullscreen.value = !isCodeFullscreen.value
}

function resetVisualState() {
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
}

function resetDemo() {
  stop()
  resetVisualState()

  if (isArraySearch.value) {
    displayArray.value = parseArray()
  } else if (selectedAlgorithm.value === 'bst') {
    buildBST()
  } else if (selectedAlgorithm.value === 'hash') {
    initHashTable()
  }

  if (userCustomFrames.value) {
    load(userCustomFrames.value)
  } else {
    load(buildDefaultFrames())
  }
}

function reset() {
  stop()
  resetVisualState()

  if (userCustomFrames.value) {
    load(userCustomFrames.value)
  } else {
    load(buildDefaultFrames())
  }
}

function loadPreset() {
  if (selectedPreset.value === '') return

  const preset = currentPresets.value[selectedPreset.value as number]
  if (!preset) return

  if (isArraySearch.value) {
    arrayInput.value = preset.data.join(', ')
    displayArray.value = [...preset.data]
  } else if (selectedAlgorithm.value === 'bst') {
    bstInput.value = preset.data.join(', ')
    buildBST()
  } else if (selectedAlgorithm.value === 'hash') {
    hashTableSize.value = preset.data.size
    initHashTable()
    preset.data.values.forEach((val: number) => {
      const ht: HashTable = { size: hashTableSize.value, table: [...hashTable.value] }
      const frames = hashInsert(ht, val)
      const lastFrame = frames[frames.length - 1] as SearchFrame
      if (lastFrame?.data?.table) {
        hashTable.value = [...lastFrame.data.table]
      }
    })
  }

  if (userCustomFrames.value) {
    load(userCustomFrames.value)
  } else {
    load(buildDefaultFrames())
  }
}

function handleApplyCode(code: string) {
  executeUserCode(code)
}

function executeUserCode(code: string) {
  try {
    const wrappedCode = `
      (function() {
        ${code}
        const functionNames = [
          'sequentialSearch', 'sequential_search', 'SequentialSearch',
          'binarySearch', 'binary_search', 'BinarySearch',
          'interpolationSearch', 'interpolation_search', 'InterpolationSearch',
          'jumpSearch', 'jump_search', 'JumpSearch',
          'bstSearch', 'bst_search', 'BstSearch',
          'hashSearch', 'hash_search', 'HashSearch',
          'search'
        ];
        for (const name of functionNames) {
          try {
            const fn = eval(name);
            if (typeof fn === 'function') {
              return fn;
            }
          } catch (e) {
          }
        }
        throw new Error('未找到有效的查找函数');
      })()
    `

    const searchFunction = eval(wrappedCode)
    if (typeof searchFunction !== 'function') {
      ElMessage.error('代码必须定义一个查找函数')
      return
    }

    let result: (SearchFrame | TreeFrame)[]

    switch (selectedAlgorithm.value) {
      case 'sequential':
        displayArray.value = parseArray()
        result = searchFunction([...displayArray.value], searchTarget.value)
        break
      case 'binary':
        displayArray.value = parseArray()
        result = searchFunction([...displayArray.value], searchTarget.value)
        break
      case 'interpolation':
        displayArray.value = parseArray()
        result = searchFunction([...displayArray.value], searchTarget.value)
        break
      case 'jump':
        displayArray.value = parseArray()
        result = searchFunction([...displayArray.value], searchTarget.value)
        break
      case 'bst':
        buildBST()
        result = searchFunction(bstRoot.value, searchTarget.value)
        break
      case 'hash': {
        const ht: HashTable = { size: hashTableSize.value, table: [...hashTable.value] }
        result = searchFunction(ht, searchTarget.value)
        break
      }
      default:
        result = []
        break
    }

    if (!Array.isArray(result)) {
      ElMessage.error('查找函数必须返回帧数组')
      return
    }

    if (result.length === 0 || !result[0]?.type) {
      ElMessage.error('返回的帧数组格式不正确')
      return
    }

    stop()
    userCustomFrames.value = result
    load(result)
    resetVisualState()

    if (totalFrames.value > 0) {
      goTo(0)
    }

  } catch (e: any) {
    ElMessage.error({
      message: `代码执行错误: ${e?.message || String(e)}`,
      duration: 5000,
      showClose: true
    })
  }
}

watch(selectedAlgorithm, () => {
  userCustomFrames.value = null
  selectedPreset.value = ''
  resetDemo()

  if (currentPresets.value.length > 0) {
    selectedPreset.value = 0
    loadPreset()
  }
})

watch(arrayInput, () => {
  if (!isArraySearch.value) return
  displayArray.value = parseArray()
  if (!isPlaying.value) {
    resetVisualState()
    if (userCustomFrames.value) {
      userCustomFrames.value = null
    }
    load(buildDefaultFrames())
  }
})

watch(hashTableSize, () => {
  initHashTable()
})

onMounted(() => {
  setOnFrameChange(handleFrameChange)
  window.addEventListener('resize', handleWindowResize)

  if (currentPresets.value.length > 0) {
    selectedPreset.value = 0
    loadPreset()
  } else {
    displayArray.value = parseArray()
    initHashTable()
  }

  if (userCustomFrames.value) {
    load(userCustomFrames.value)
  } else {
    load(buildDefaultFrames())
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize)
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

.main-layout {
  display: flex;
  gap: 20px;
  height: 100%;
  align-items: flex-start;
  position: relative;
}

.left-panel {
  flex: 1;
  min-width: 0;
  margin-right: 420px;
}

.right-panel {
  width: 400px;
  flex-shrink: 0;
  position: fixed;
  right: 20px;
  top: 100px;
  bottom: 80px;
  z-index: 100;
  transition: left 0.3s ease, right 0.3s ease, width 0.3s ease;
}

.right-panel.fullscreen {
  position: fixed;
  left: calc(var(--sidebar-width, 220px) + 20px);
  right: 20px;
  top: 80px;
  bottom: 80px;
  width: auto;
  z-index: 200;
}

.info-card,
.input-card {
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

.binary-search-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.array-row {
  display: flex;
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
  width: 100%;
  display: flex;
  justify-content: center;
}

.pointers-inner {
  position: relative;
  display: inline-block;
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

.pointer.left::before {
  border-bottom-color: #409eff;
}

.pointer.left span {
  color: #409eff;
}

.pointer.mid::before {
  border-bottom-color: #f56c6c;
}

.pointer.mid span {
  color: #f56c6c;
}

.pointer.right::before {
  border-bottom-color: #67c23a;
}

.pointer.right span {
  color: #67c23a;
}

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

.hash-cell.found {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  border-color: #67c23a;
  color: #fff;
  transform: scale(1.08);
}

.hash-cell.found .cell-index,
.hash-cell.found .cell-value {
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
