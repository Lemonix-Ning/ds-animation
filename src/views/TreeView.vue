<template>
  <div class="tree-view">
    <div class="content-header">
      <h2>第5章 树与二叉树</h2>
      <div class="header-actions">
        <el-select v-model="selectedAlgorithm" style="width: 150px">
          <el-option-group label="树遍历">
            <el-option label="前序遍历" value="preorder" />
            <el-option label="中序遍历" value="inorder" />
            <el-option label="后序遍历" value="postorder" />
            <el-option label="层序遍历" value="levelorder" />
          </el-option-group>
          <el-option-group label="二叉搜索树">
            <el-option label="BST插入" value="bstInsert" />
            <el-option label="BST删除" value="bstDelete" />
          </el-option-group>
          <el-option-group label="特殊树">
            <el-option label="AVL树" value="avl" />
            <el-option label="哈夫曼树" value="huffman" />
          </el-option-group>
        </el-select>

        <el-select v-model="selectedPreset" placeholder="选择预设案例" style="width: 150px" @change="loadPreset">
          <el-option label="自定义" value="" />
          <el-option v-for="(preset, index) in currentPresets" :key="index" :label="preset.name" :value="index" />
        </el-select>

        <el-button @click="resetDemo">
          <el-icon><Refresh /></el-icon>
          重置
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

          <div class="input-card" v-if="selectedAlgorithm === 'huffman'">
            <el-form :inline="true">
              <el-form-item label="权值列表">
                <el-input v-model="huffmanInput" placeholder="如: A:5, B:9, C:12, D:13, E:16, F:45" style="width: 400px" />
              </el-form-item>
            </el-form>
          </div>

          <div class="input-card" v-if="selectedAlgorithm === 'avl'">
            <el-form :inline="true">
              <el-form-item label="插入序列">
                <el-input v-model="avlInput" placeholder="如: 30,20,10,25,40,50" style="width: 320px" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="applyAVLInput">构建AVL</el-button>
              </el-form-item>
              <el-form-item label="当前序列">
                <el-tag v-for="val in avlValues" :key="`avl-${val}`" style="margin-right: 5px">{{ val }}</el-tag>
                <span v-if="avlValues.length === 0" style="color: #909399">未构建</span>
              </el-form-item>
            </el-form>
          </div>

          <div class="input-card" v-if="selectedAlgorithm === 'bstInsert' || selectedAlgorithm === 'bstDelete'">
            <el-form :inline="true">
              <el-form-item label="批量初始化">
                <el-input v-model="bstInitInput" placeholder="如: 50,30,70,20,40,60,80" style="width: 300px" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="applyBSTInitInput">初始化BST</el-button>
              </el-form-item>
              <el-form-item label="当前BST">
                <el-tag v-for="val in bstValues" :key="val" style="margin-right: 5px">{{ val }}</el-tag>
                <span v-if="bstValues.length === 0" style="color: #909399">空树</span>
              </el-form-item>
              <el-form-item :label="selectedAlgorithm === 'bstInsert' ? '插入值' : '删除值'">
                <el-input-number v-model="bstOperationValue" :min="1" :max="100" />
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="handleBSTOperation">
                  {{ selectedAlgorithm === 'bstInsert' ? '插入' : '删除' }}
                </el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="input-card" v-else-if="selectedAlgorithm !== 'huffman' && selectedAlgorithm !== 'avl'">
            <el-form :inline="true">
              <el-form-item label="层序序列">
                <el-input v-model="treeInput" placeholder="如: A,B,C,D,E,F,G (null表示空节点)" style="width: 400px" />
              </el-form-item>
            </el-form>
          </div>

          <div class="animation-container">
            <div class="tree-canvas" ref="treeCanvasRef">
              <svg class="tree-lines" :width="canvasWidth" :height="canvasHeight">
                <line
                  v-for="line in treeLines"
                  :key="line.id"
                  :x1="line.x1"
                  :y1="line.y1"
                  :x2="line.x2"
                  :y2="line.y2"
                  :class="{ highlighted: line.highlighted }"
                  stroke="#409eff"
                  stroke-width="2"
                />
              </svg>

              <div
                v-for="node in displayNodes"
                :key="node.id"
                class="tree-node"
                :class="{ visited: visitedNodes.has(node.id), current: currentNodeId === node.id, selected: selectedNodes.has(node.id) }"
                :style="{ left: `${node.x}px`, top: `${node.y}px` }"
              >
                <span class="node-value">{{ node.value }}</span>
                <span class="node-weight" v-if="node.weight !== undefined">({{ node.weight }})</span>
              </div>
            </div>
          </div>

          <div class="result-panel" v-if="traversalResult.length > 0">
            <h4>遍历序列:</h4>
            <div class="result-sequence">
              <span v-for="(val, index) in traversalResult" :key="index" class="result-item">{{ val }}</span>
            </div>
          </div>

          <div class="huffman-codes" v-if="selectedAlgorithm === 'huffman' && huffmanCodes.size > 0">
            <h4>哈夫曼编码</h4>
            <el-table :data="huffmanCodesArray" style="width: 100%">
              <el-table-column prop="char" label="字符" width="100" />
              <el-table-column prop="code" label="编码" />
              <el-table-column prop="weight" label="权值" width="100" />
            </el-table>
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
            :input-array="[]"
            :is-playing="isPlaying"
            :highlight-line="currentHighlightLine"
            :use-pseudo-code="false"
            :enable-fullscreen="true"
            :is-fullscreen="isCodeFullscreen"
            @toggle-fullscreen="toggleCodeFullscreen"
            @apply-code="handleApplyCode"
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
      :allow-play-when-empty="true"
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
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { treeAlgorithmCode } from '../core/algorithmCode'
import type { AlgorithmCode } from '../core/algorithmCode'
import {
  preorderTraversal,
  inorderTraversal,
  postorderTraversal,
  levelOrderTraversal,
  buildHuffmanTree,
  generateHuffmanCodes,
  avlInsertSequence,
  bstInsert,
  bstDelete,
  treeAlgorithms,
  type TreeNode
} from '../core/algorithms/tree'
import { treePresets } from '../core/presets'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { TreeFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'
import CodeEditorPanel from '../components/common/CodeEditorPanel.vue'

const selectedAlgorithm = ref('preorder')
const selectedPreset = ref<number | ''>('')
const isCodeFullscreen = ref(false)
const userCustomFrames = ref<TreeFrame[] | null>(null)

const treeInput = ref('A,B,C,D,E,F,G')
const huffmanInput = ref('A:5, B:9, C:12, D:13, E:16, F:45')
const treeCanvasRef = ref<HTMLElement | null>(null)
const canvasWidth = ref(800)
const canvasHeight = ref(400)

const bstRoot = ref<TreeNode | null>(null)
const bstValues = ref<number[]>([])
const bstOperationValue = ref(25)
const bstInitInput = ref('50,30,70,20,40,60,80')
const avlInput = ref('30,20,10,25,40,50')
const avlValues = ref<number[]>([])
let traversalInputTimer: ReturnType<typeof setTimeout> | null = null

interface DisplayNode {
  id: string
  value: string
  weight?: number
  x: number
  y: number
}

const displayNodes = ref<DisplayNode[]>([])
const treeLines = ref<{ id: string, x1: number, y1: number, x2: number, y2: number, highlighted: boolean }[]>([])
const visitedNodes = ref<Set<string>>(new Set())
const currentNodeId = ref<string | null>(null)
const selectedNodes = ref<Set<string>>(new Set())
const traversalResult = ref<string[]>([])
const huffmanCodes = ref<Map<string, string>>(new Map())
const huffmanWeights = ref<Map<string, number>>(new Map())

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

const algorithmInfo = computed(() => {
  const algos: Record<string, any> = treeAlgorithms
  return algos[selectedAlgorithm.value] || treeAlgorithms.preorder
})

const currentPresets = computed(() => {
  if (selectedAlgorithm.value === 'huffman') return treePresets.huffman
  if (selectedAlgorithm.value === 'avl') return treePresets.avl
  if (selectedAlgorithm.value === 'bstInsert' || selectedAlgorithm.value === 'bstDelete') return treePresets.bst
  return treePresets.traversal
})

const huffmanCodesArray = computed(() => {
  return Array.from(huffmanCodes.value).map(([char, code]) => ({
    char,
    code,
    weight: huffmanWeights.value.get(char) || 0
  }))
})

const fallbackAlgorithmCode: AlgorithmCode = {
  title: '树算法',
  language: 'javascript',
  code: '// 暂无代码'
}

const currentAlgorithmCode = computed<AlgorithmCode>(() => {
  return treeAlgorithmCode[selectedAlgorithm.value] ?? treeAlgorithmCode.preorder ?? fallbackAlgorithmCode
})

const currentHighlightLine = computed(() => {
  if (!currentFrame.value) return undefined
  if (currentFrame.value.highlightLine !== undefined) return currentFrame.value.highlightLine

  const frame = currentFrame.value
  const frameType = frame.type
  const desc = frame.description || ''

  if (selectedAlgorithm.value === 'preorder') {
    if (frameType === 'visit') {
      if (desc.includes('左子树')) return 5
      if (desc.includes('右子树')) return 6
      return 4
    }
    if (frameType === 'highlight') return 4
    if (frameType === 'reset') return desc.includes('完成') ? 9 : 0
    return 0
  }

  if (selectedAlgorithm.value === 'inorder') {
    if (frameType === 'visit') {
      if (desc.includes('左子树')) return 4
      if (desc.includes('右子树')) return 6
      return 5
    }
    if (frameType === 'highlight') return 5
    if (frameType === 'reset') return desc.includes('完成') ? 9 : 0
    return 0
  }

  if (selectedAlgorithm.value === 'postorder') {
    if (frameType === 'visit') {
      if (desc.includes('左子树')) return 4
      if (desc.includes('右子树')) return 5
      return 6
    }
    if (frameType === 'highlight') return 6
    if (frameType === 'reset') return desc.includes('完成') ? 9 : 0
    return 0
  }

  if (selectedAlgorithm.value === 'levelorder') {
    if (frameType === 'visit') return 5
    if (frameType === 'highlight') return 3
    if (frameType === 'reset') {
      if (desc.includes('空') || desc.includes('完成')) return 8
      return 0
    }
    return 0
  }

  if (selectedAlgorithm.value === 'avl') {
    if (frameType === 'insert') return 34
    if (frameType === 'visit') return 35
    if (frameType === 'highlight') {
      if (desc.includes('已存在')) return 38
      if (desc.includes('LL')) return 43
      if (desc.includes('RR')) return 44
      if (desc.includes('LR')) return 45
      if (desc.includes('RL')) return 48
      if (desc.includes('当前已插入')) return 52
      return 41
    }
    if (frameType === 'reset') return desc.includes('完成') ? 53 : 51
    return 35
  }

  if (selectedAlgorithm.value === 'bstInsert') {
    if (frameType === 'visit') return 3
    if (frameType === 'highlight') {
      if (desc.includes('左子树')) return 3
      if (desc.includes('右子树')) return 9
      if (desc.includes('已存在')) return 15
      return 3
    }
    if (frameType === 'insert') {
      if (desc.includes('根节点')) return 0
      if (desc.includes('左子节点')) return 5
      return 11
    }
    if (frameType === 'reset') return 19
    return 0
  }

  if (selectedAlgorithm.value === 'bstDelete') {
    if (frameType === 'visit') return 7
    if (frameType === 'highlight') {
      if (desc.includes('左子树')) return 7
      if (desc.includes('右子树')) return 8
      if (desc.includes('中序后继')) return 13
      if (desc.includes('目标节点')) return 9
      return 7
    }
    if (frameType === 'delete') {
      if (desc.includes('情况1')) return 10
      if (desc.includes('情况2')) return 11
      if (desc.includes('情况3')) return 12
      if (desc.includes('替换')) return 14
      return 10
    }
    if (frameType === 'reset') return 18
    return 0
  }

  if (selectedAlgorithm.value === 'huffman') {
    if (frameType === 'create-node') return 1
    if (frameType === 'highlight') {
      if (desc.includes('按权值排序')) return 8
      if (desc.includes('选择权值最小')) return 9
      return 8
    }
    if (frameType === 'merge') return 13
    if (frameType === 'connect') return 14
    if (frameType === 'reset') return desc.includes('完成') ? 18 : 0
    return 0
  }

  return 0
})

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

function handleFrameChange(frame: TreeFrame | null) {
  currentNodeId.value = null

  if (!frame) {
    visitedNodes.value = new Set()
    selectedNodes.value = new Set()
    traversalResult.value = []
    return
  }

  if (selectedAlgorithm.value === 'huffman' && frame.data?.nodes) {
    updateHuffmanDisplay(frame.data)
  }

  if (selectedAlgorithm.value === 'avl' && frame.data?.root) {
    calculateNodePositions(frame.data.root)
    selectedNodes.value = new Set((frame.data.selected as string[]) || [])
  }

  switch (frame.type) {
    case 'visit':
      currentNodeId.value = frame.nodeId as string
      if (frame.nodeId) visitedNodes.value.add(frame.nodeId as string)
      if (frame.value && !traversalResult.value.includes(String(frame.value))) {
        traversalResult.value.push(String(frame.value))
      }
      break
    case 'highlight':
      if (frame.nodeId) currentNodeId.value = frame.nodeId as string
      if (frame.description.includes('[')) {
        const match = frame.description.match(/\[(.*)\]/)
        if (match && match[1]) traversalResult.value = match[1].split(', ')
      }
      if (frame.data?.selected) selectedNodes.value = new Set(frame.data.selected)
      break
    case 'merge':
      if (frame.nodeId) currentNodeId.value = frame.nodeId as string
      if (frame.data?.leftId && frame.data?.rightId) {
        selectedNodes.value = new Set([frame.data.leftId, frame.data.rightId])
      }
      break
    case 'connect':
      selectedNodes.value = new Set()
      break
    case 'reset':
      if (frame.data?.root) huffmanCodes.value = generateHuffmanCodes(frame.data.root)
      break
  }
}

function parseTreeInput(): TreeNode | null {
  const values = treeInput.value.split(',').map(s => s.trim())
  if (!values.length || !values[0] || values[0].toLowerCase() === 'null') return null

  const nodes: (TreeNode | null)[] = values.map((v, i) => {
    if (v.toLowerCase() === 'null' || !v) return null
    return { id: `node-${i}`, value: v, left: null, right: null }
  })

  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i]) continue
    const leftIdx = 2 * i + 1
    const rightIdx = 2 * i + 2
    if (leftIdx < nodes.length) nodes[i]!.left = nodes[leftIdx]
    if (rightIdx < nodes.length) nodes[i]!.right = nodes[rightIdx]
  }

  return nodes[0] ?? null
}

function calculateNodePositions(root: TreeNode | null) {
  displayNodes.value = []
  treeLines.value = []
  if (!root) return

  const nodeWidth = 50
  const levelHeight = 80

  function walk(node: TreeNode, x: number, y: number, spread: number) {
    displayNodes.value.push({ id: node.id, value: String(node.value), x: x - nodeWidth / 2, y })

    if (node.left) {
      const cx = x - spread
      const cy = y + levelHeight
      treeLines.value.push({ id: `line-${node.id}-${node.left.id}`, x1: x, y1: y + nodeWidth / 2, x2: cx, y2: cy, highlighted: false })
      walk(node.left, cx, cy, spread / 2)
    }

    if (node.right) {
      const cx = x + spread
      const cy = y + levelHeight
      treeLines.value.push({ id: `line-${node.id}-${node.right.id}`, x1: x, y1: y + nodeWidth / 2, x2: cx, y2: cy, highlighted: false })
      walk(node.right, cx, cy, spread / 2)
    }
  }

  walk(root, canvasWidth.value / 2, 40, Math.min(150, canvasWidth.value / 4))
}

interface HuffmanDisplayNodeRaw {
  id: string
  char?: string
  weight?: number
  left?: string | null
  right?: string | null
}

function updateHuffmanDisplayFromNodes(rawNodes: HuffmanDisplayNodeRaw[]) {
  if (!rawNodes.length) {
    displayNodes.value = []
    treeLines.value = []
    return
  }

  const nodeMap = new Map<string, HuffmanDisplayNodeRaw>()
  const hasParent = new Set<string>()

  rawNodes.forEach((node) => {
    nodeMap.set(node.id, node)
    if (node.left) hasParent.add(node.left)
    if (node.right) hasParent.add(node.right)
  })

  const roots = rawNodes
    .filter((node) => !hasParent.has(node.id))
    .sort((a, b) => (a.weight ?? 0) - (b.weight ?? 0) || a.id.localeCompare(b.id))

  if (!roots.length) {
    displayNodes.value = []
    treeLines.value = []
    return
  }

  const tempPos = new Map<string, { unitX: number, depth: number }>()
  let cursor = 0
  let maxDepth = 0

  function assignPosition(nodeId: string, depth: number): number {
    const node = nodeMap.get(nodeId)
    if (!node) return cursor

    maxDepth = Math.max(maxDepth, depth)
    const leftId = node.left ?? undefined
    const rightId = node.right ?? undefined

    if (!leftId && !rightId) {
      const leafUnit = cursor
      tempPos.set(nodeId, { unitX: leafUnit, depth })
      cursor += 1
      return leafUnit
    }

    let leftUnit: number | null = null
    let rightUnit: number | null = null

    if (leftId && nodeMap.has(leftId)) leftUnit = assignPosition(leftId, depth + 1)
    if (rightId && nodeMap.has(rightId)) rightUnit = assignPosition(rightId, depth + 1)

    const unitX = leftUnit !== null && rightUnit !== null
      ? (leftUnit + rightUnit) / 2
      : (leftUnit ?? rightUnit ?? cursor)

    tempPos.set(nodeId, { unitX, depth })
    return unitX
  }

  roots.forEach((root, index) => {
    if (index > 0) cursor += 1
    assignPosition(root.id, 0)
  })

  const unitCount = Math.max(cursor - 1, 1)
  const horizontalPadding = 50
  const verticalPadding = 30
  const usableWidth = Math.max(canvasWidth.value - horizontalPadding * 2, 200)
  const usableHeight = Math.max(canvasHeight.value - verticalPadding * 2, 120)
  const levelGap = Math.max(55, Math.min(90, usableHeight / Math.max(maxDepth + 1, 1)))
  const nodeRadius = 25

  const positionedNodes: DisplayNode[] = []
  rawNodes.forEach((node) => {
    const pos = tempPos.get(node.id)
    if (!pos) return

    const centerX = horizontalPadding + (pos.unitX / unitCount) * usableWidth
    const centerY = verticalPadding + pos.depth * levelGap
    positionedNodes.push({
      id: node.id,
      value: String(node.char || node.weight),
      weight: node.weight,
      x: centerX - nodeRadius,
      y: centerY
    })
  })

  displayNodes.value = positionedNodes

  const centerById = new Map<string, { x: number, y: number }>()
  positionedNodes.forEach((node) => {
    centerById.set(node.id, { x: node.x + nodeRadius, y: node.y + nodeRadius })
  })

  const lines: { id: string, x1: number, y1: number, x2: number, y2: number, highlighted: boolean }[] = []
  rawNodes.forEach((node) => {
    const parentCenter = centerById.get(node.id)
    if (!parentCenter) return

    const leftId = node.left ?? undefined
    const rightId = node.right ?? undefined

    if (leftId) {
      const leftCenter = centerById.get(leftId)
      if (leftCenter) {
        lines.push({
          id: `line-${node.id}-${leftId}`,
          x1: parentCenter.x,
          y1: parentCenter.y,
          x2: leftCenter.x,
          y2: leftCenter.y,
          highlighted: false
        })
      }
    }

    if (rightId) {
      const rightCenter = centerById.get(rightId)
      if (rightCenter) {
        lines.push({
          id: `line-${node.id}-${rightId}`,
          x1: parentCenter.x,
          y1: parentCenter.y,
          x2: rightCenter.x,
          y2: rightCenter.y,
          highlighted: false
        })
      }
    }
  })

  treeLines.value = lines
}

function updateHuffmanDisplay(data: any) {
  if (!data?.nodes) return
  updateHuffmanDisplayFromNodes(data.nodes as HuffmanDisplayNodeRaw[])
}

function parseHuffmanInput(): { char: string, weight: number }[] {
  const items = huffmanInput.value.split(',').map(s => s.trim())
  const result: { char: string, weight: number }[] = []
  huffmanWeights.value = new Map()

  for (const item of items) {
    const m = item.match(/(\w+):(\d+)/)
    if (!m) continue
    const char = m[1] ?? ''
    const weight = parseInt(m[2] ?? '0')
    result.push({ char, weight })
    huffmanWeights.value.set(char, weight)
  }

  return result
}

function rebuildBSTFromValues(values: number[]) {
  bstRoot.value = null
  bstValues.value = []

  for (const val of values) {
    if (!Number.isFinite(val) || bstValues.value.includes(val)) continue
    if (!bstRoot.value) bstRoot.value = { id: `node-${val}`, value: val }
    else insertIntoBST(bstRoot.value, val)
    bstValues.value.push(val)
  }

  bstValues.value.sort((a, b) => a - b)
  bstInitInput.value = bstValues.value.join(',')

  if (bstRoot.value) calculateBSTPositions()
  else {
    displayNodes.value = []
    treeLines.value = []
  }
}

function applyBSTInitInput() {
  const numbers = bstInitInput.value
    .split(/[\s,]+/)
    .map(s => Number.parseInt(s.trim(), 10))
    .filter(n => Number.isFinite(n))

  if (!numbers.length) {
    ElMessage.warning('请输入有效的数字序列')
    return
  }

  const uniqueValues = Array.from(new Set(numbers))
  if (uniqueValues.length !== numbers.length) {
    ElMessage.info('检测到重复值，已自动去重')
  }

  rebuildBSTFromValues(uniqueValues)
  userCustomFrames.value = null
  load([])
}

function runAlgorithm() {
  if (userCustomFrames.value) {
    load(userCustomFrames.value)
    return
  }

  visitedNodes.value = new Set()
  selectedNodes.value = new Set()
  traversalResult.value = []
  huffmanCodes.value = new Map()

  if (selectedAlgorithm.value === 'huffman') {
    const weights = parseHuffmanInput()
    updateHuffmanDisplayFromNodes(
      weights.map((w, i) => ({
        id: `node-${i}`,
        char: w.char,
        weight: w.weight,
        left: null,
        right: null
      }))
    )
    load(buildHuffmanTree(weights))
    return
  }

  if (selectedAlgorithm.value === 'avl') {
    const numbers = avlInput.value
      .split(/[\s,]+/)
      .map((s) => Number.parseInt(s.trim(), 10))
      .filter((n) => Number.isFinite(n))

    if (!numbers.length) {
      ElMessage.warning('请输入有效的 AVL 插入序列')
      load([])
      return
    }

    avlValues.value = Array.from(new Set(numbers))
    const frames = avlInsertSequence(avlValues.value)
    load(frames)
    return
  }

  if (selectedAlgorithm.value === 'bstInsert' || selectedAlgorithm.value === 'bstDelete') {
    if (bstRoot.value) calculateBSTPositions()
    else {
      displayNodes.value = []
      treeLines.value = []
    }
    return
  }

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

function applyAVLInput(autoPlay = true) {
  userCustomFrames.value = null
  selectedPreset.value = ''
  stop()
  runAlgorithm()
  if (totalFrames.value > 0) {
    goTo(0)
    if (autoPlay) {
      play()
    }
  }
}

function applyTraversalInput() {
  if (selectedAlgorithm.value === 'huffman' || selectedAlgorithm.value === 'avl' || selectedAlgorithm.value === 'bstInsert' || selectedAlgorithm.value === 'bstDelete') {
    return
  }

  userCustomFrames.value = null
  selectedPreset.value = ''
  stop()
  runAlgorithm()

  if (totalFrames.value > 0) {
    goTo(0)
  }
}

function insertIntoBST(node: TreeNode, value: number) {
  if (value < node.value) {
    if (!node.left) node.left = { id: `node-${value}`, value, left: null, right: null }
    else insertIntoBST(node.left, value)
  } else if (value > node.value) {
    if (!node.right) node.right = { id: `node-${value}`, value, left: null, right: null }
    else insertIntoBST(node.right, value)
  }
}

function deleteBSTNode(root: TreeNode | null, value: number): TreeNode | null {
  if (!root) return null

  if (value < root.value) {
    root.left = deleteBSTNode(root.left ?? null, value)
  } else if (value > root.value) {
    root.right = deleteBSTNode(root.right ?? null, value)
  } else {
    if (!root.left && !root.right) return null
    if (!root.right) return root.left ?? null
    if (!root.left) return root.right ?? null

    let minNode = root.right!
    while (minNode.left) minNode = minNode.left
    root.value = minNode.value
    root.id = `node-${minNode.value}`
    root.right = deleteBSTNode(root.right ?? null, minNode.value)
  }

  return root
}

function calculateBSTPositions() {
  displayNodes.value = []
  treeLines.value = []
  if (!bstRoot.value) return

  const nodeWidth = 50
  const levelHeight = 80

  function walk(node: TreeNode, x: number, y: number, spread: number) {
    displayNodes.value.push({ id: node.id, value: String(node.value), x: x - nodeWidth / 2, y })

    if (node.left) {
      const cx = x - spread
      const cy = y + levelHeight
      treeLines.value.push({ id: `line-${node.id}-${node.left.id}`, x1: x, y1: y + nodeWidth / 2, x2: cx, y2: cy, highlighted: false })
      walk(node.left, cx, cy, spread / 2)
    }

    if (node.right) {
      const cx = x + spread
      const cy = y + levelHeight
      treeLines.value.push({ id: `line-${node.id}-${node.right.id}`, x1: x, y1: y + nodeWidth / 2, x2: cx, y2: cy, highlighted: false })
      walk(node.right, cx, cy, spread / 2)
    }
  }

  walk(bstRoot.value, canvasWidth.value / 2, 40, Math.min(150, canvasWidth.value / 4))
}

function handleBSTOperation() {
  const value = bstOperationValue.value

  if (selectedAlgorithm.value === 'bstInsert') {
    if (bstValues.value.includes(value)) {
      ElMessage.warning(`节点 ${value} 已存在`)
      return
    }

    const frames = bstInsert(bstRoot.value, value)
    if (!bstRoot.value) bstRoot.value = { id: `node-${value}`, value }
    else insertIntoBST(bstRoot.value, value)

    bstValues.value.push(value)
    bstValues.value.sort((a, b) => a - b)
    bstInitInput.value = bstValues.value.join(',')
    calculateBSTPositions()
    load(frames)
    bstOperationValue.value = Math.floor(Math.random() * 90) + 10
    return
  }

  if (!bstValues.value.includes(value)) {
    ElMessage.warning(`节点 ${value} 不存在`)
    return
  }

  const frames = bstDelete(bstRoot.value, value)
  bstRoot.value = deleteBSTNode(bstRoot.value, value)
  const index = bstValues.value.indexOf(value)
  if (index > -1) bstValues.value.splice(index, 1)
  bstInitInput.value = bstValues.value.join(',')

  if (bstRoot.value) calculateBSTPositions()
  else {
    displayNodes.value = []
    treeLines.value = []
  }
  load(frames)
}

function loadPreset() {
  if (selectedPreset.value === '') return
  const preset = currentPresets.value[selectedPreset.value as number]
  if (!preset) return

  if (selectedAlgorithm.value === 'huffman') {
    huffmanInput.value = String(preset.data)
    const weights = parseHuffmanInput()
    updateHuffmanDisplayFromNodes(
      weights.map((w, i) => ({
        id: `node-${i}`,
        char: w.char,
        weight: w.weight,
        left: null,
        right: null
      }))
    )
    return
  }

  if (selectedAlgorithm.value === 'avl') {
    avlInput.value = (preset.data as number[]).join(',')
    avlValues.value = [...(preset.data as number[])]
    runAlgorithm()
    return
  }

  if (selectedAlgorithm.value === 'bstInsert' || selectedAlgorithm.value === 'bstDelete') {
    rebuildBSTFromValues(preset.data as number[])
    return
  }

  treeInput.value = String(preset.data)
  calculateNodePositions(parseTreeInput())
}

function toggleCodeFullscreen() {
  isCodeFullscreen.value = !isCodeFullscreen.value
}

function handleApplyCode(code: string) {
  executeUserCode(code)
}

function executeUserCode(code: string) {
  try {
    const wrappedCode = `
      (function() {
        ${code}
        const names = [
          'preorder', 'pre_order', 'Preorder',
          'inorder', 'in_order', 'Inorder',
          'postorder', 'post_order', 'Postorder',
          'levelOrder', 'level_order', 'LevelOrder',
          'avlInsert', 'avl_insert', 'AvlInsert',
          'bstInsert', 'bst_insert', 'BstInsert',
          'bstDelete', 'bst_delete', 'BstDelete',
          'buildHuffman', 'build_huffman', 'BuildHuffman'
        ]
        for (const name of names) {
          try {
            const fn = eval(name)
            if (typeof fn === 'function') return fn
          } catch (e) {}
        }
        throw new Error('未找到有效函数')
      })()
    `

    const fn = eval(wrappedCode)
    if (typeof fn !== 'function') {
      ElMessage.error('代码必须定义函数')
      return
    }

    let frames: TreeFrame[] = []
    if (selectedAlgorithm.value === 'huffman') {
      frames = fn(parseHuffmanInput())
    } else if (selectedAlgorithm.value === 'avl') {
      const numbers = avlInput.value
        .split(/[\s,]+/)
        .map((s: string) => Number.parseInt(s.trim(), 10))
        .filter((n: number) => Number.isFinite(n))
      frames = fn(numbers)
    } else if (selectedAlgorithm.value === 'bstInsert' || selectedAlgorithm.value === 'bstDelete') {
      frames = fn(bstRoot.value, bstOperationValue.value)
    } else {
      frames = fn(parseTreeInput())
    }

    if (!Array.isArray(frames) || frames.length === 0 || !frames[0]?.type) {
      ElMessage.error('请返回有效帧数组')
      return
    }

    userCustomFrames.value = frames
    stop()
    load(frames)
  } catch (e: any) {
    ElMessage.error(`代码执行错误: ${e?.message || String(e)}`)
  }
}

function handlePlay() {
  if (!userCustomFrames.value && selectedAlgorithm.value !== 'bstInsert' && selectedAlgorithm.value !== 'bstDelete') {
    runAlgorithm()
  } else if (currentIndex.value === -1 || totalFrames.value === 0) {
    runAlgorithm()
  }

  if (totalFrames.value === 0) {
    ElMessage.warning('当前没有可播放的动画，请先准备数据')
    return
  }
  play()
}

function resetDemo() {
  stop()
  userCustomFrames.value = null
  visitedNodes.value = new Set()
  selectedNodes.value = new Set()
  currentNodeId.value = null
  traversalResult.value = []
  huffmanCodes.value = new Map()

  load([])

  if (selectedAlgorithm.value === 'bstInsert' || selectedAlgorithm.value === 'bstDelete') {
    bstRoot.value = null
    bstValues.value = []
    bstInitInput.value = ''
    displayNodes.value = []
    treeLines.value = []
  } else if (selectedAlgorithm.value === 'avl') {
    avlValues.value = []
    displayNodes.value = []
    treeLines.value = []
  } else if (selectedAlgorithm.value !== 'huffman') {
    calculateNodePositions(parseTreeInput())
  }
}

function reset() {
  stop()
  visitedNodes.value = new Set()
  traversalResult.value = []
  currentNodeId.value = null
}

function prepareInitialFrames() {
  if (selectedAlgorithm.value === 'bstInsert' || selectedAlgorithm.value === 'bstDelete') return
  runAlgorithm()
}

watch(selectedAlgorithm, () => {
  userCustomFrames.value = null
  resetDemo()
  selectedPreset.value = ''
  if (currentPresets.value.length > 0) {
    selectedPreset.value = 0
    loadPreset()
  }
  prepareInitialFrames()
})

watch(treeInput, () => {
  if (selectedAlgorithm.value !== 'huffman' && selectedAlgorithm.value !== 'bstInsert' && selectedAlgorithm.value !== 'bstDelete') {
    selectedPreset.value = ''
    if (traversalInputTimer) clearTimeout(traversalInputTimer)
    traversalInputTimer = setTimeout(() => {
      applyTraversalInput()
    }, 250)
  }
})

watch(avlInput, () => {
  if (selectedAlgorithm.value !== 'avl') return
  selectedPreset.value = ''
  if (traversalInputTimer) clearTimeout(traversalInputTimer)
  traversalInputTimer = setTimeout(() => {
    applyAVLInput(false)
  }, 250)
})

onBeforeUnmount(() => {
  if (traversalInputTimer) clearTimeout(traversalInputTimer)
})

onMounted(() => {
  setOnFrameChange(handleFrameChange)
  if (currentPresets.value.length > 0) {
    selectedPreset.value = 0
    loadPreset()
  } else {
    if (selectedAlgorithm.value === 'avl') {
      runAlgorithm()
    } else {
      calculateNodePositions(parseTreeInput())
    }
  }

  if (displayNodes.value.length === 0 && selectedAlgorithm.value !== 'huffman' && selectedAlgorithm.value !== 'bstInsert' && selectedAlgorithm.value !== 'bstDelete') {
    calculateNodePositions(parseTreeInput())
  }

  prepareInitialFrames()
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


