<template>
  <div class="graph-view">
    <div class="content-header">
      <div class="header-title">
        <h2>第6章 图</h2>
        <span class="subtitle">算法可视化演示</span>
      </div>
      <div class="header-actions">
        <el-select v-model="selectedAlgorithm" style="width: 150px">
          <el-option label="Dijkstra最短路径" value="dijkstra" />
          <el-option label="Prim最小生成树" value="prim" />
          <el-option label="Kruskal最小生成树" value="kruskal" />
          <el-option label="深度优先搜索" value="dfs" />
          <el-option label="广度优先搜索" value="bfs" />
        </el-select>
        <el-select v-model="selectedPreset" placeholder="选择预设图" style="width: 160px" @change="loadPresetGraph">
          <el-option 
            v-for="(preset, index) in currentGraphPresets" 
            :key="index" 
            :label="preset.name" 
            :value="index" 
          />
        </el-select>
      </div>
    </div>

    <div class="content-body">
      <div class="main-layout">
        <div class="left-panel">
          <div class="glass-card">
            <div class="info-header">
              <h3>{{ algorithmInfo.name }}</h3>
              <span class="name-en">{{ algorithmInfo.nameEn }}</span>
            </div>
            <p class="description">{{ algorithmInfo.description }}</p>
            <div class="complexity-tags">
              <el-tag>时间复杂度: {{ algorithmInfo.timeComplexity }}</el-tag>
               <el-tag type="success">空间复杂度: {{ algorithmInfo.spaceComplexity }}</el-tag>
            </div>
          </div>

          <div class="glass-card animation-container">
            <h4 class="card-title">图结构可视化</h4>
            <div class="graph-canvas" ref="graphCanvasRef">
              <svg class="graph-edges" :width="canvasWidth" :height="canvasHeight">
                <g v-for="edge in displayEdges" :key="edge.id">
                  <line
                    :x1="edge.x1" :y1="edge.y1"
                    :x2="edge.x2" :y2="edge.y2"
                    :class="{
                      selected: selectedEdges.has(edge.id),
                      visiting: visitingEdge === edge.id
                    }"
                    stroke="#dcdfe6"
                    stroke-width="2"
                  />
                  <rect
                    :x="((edge.x1 + edge.x2) / 2) - 10"
                    :y="((edge.y1 + edge.y2) / 2) - 18"
                    width="20"
                    height="16"
                    rx="4"
                    class="edge-weight-bg"
                  />
                  <text
                    :x="(edge.x1 + edge.x2) / 2"
                    :y="(edge.y1 + edge.y2) / 2 - 6"
                    class="edge-weight"
                    :class="{ selected: selectedEdges.has(edge.id), visiting: visitingEdge === edge.id }"
                  >
                    {{ edge.weight }}
                  </text>
                </g>
              </svg>

              <div
                v-for="node in displayNodes"
                :key="node.id"
                class="graph-node"
                :class="{
                  visited: visitedNodes.has(node.id),
                  current: currentNodeId === node.id,
                  start: node.id === startNodeId
                }"
                :style="{ left: `${node.x + 25}px`, top: `${node.y + 25}px` }"
              >
                <span class="start-indicator" v-if="node.id === startNodeId">Start</span>
                <span class="node-label">{{ node.label }}</span>
                <span class="node-dist" v-if="distances.has(node.id)">
                  {{ distances.get(node.id) === Infinity ? '∞' : distances.get(node.id) }}
                </span>
              </div>
            </div>
          </div>

          <div class="data-panels-grid">
            <div class="glass-card data-card" v-if="distances.size > 0">
              <h4 class="card-title">{{ selectedAlgorithm === 'dijkstra' ? '距离状态' : '节点状态' }}</h4>
              <el-table :data="distanceTableData" size="small">
                <el-table-column prop="node" label="节点" width="60" />
                <el-table-column prop="distance" label="距离" />
                <el-table-column prop="status" label="状态" width="84">
                  <template #default="{ row }">
                    <el-tag :type="row.visited ? 'success' : 'info'" size="small">
                      {{ row.visited ? '已访问' : '未访问' }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="glass-card data-card" v-if="selectedEdges.size > 0">
              <h4 class="card-title">已选边集合</h4>
              <div class="selected-edges">
                <el-tag
                  v-for="edgeId in selectedEdges"
                  :key="edgeId"
                  type="success"
                >
                  {{ getEdgeLabel(edgeId) }}
                </el-tag>
              </div>
              <p class="total-weight" v-if="totalWeight > 0">总权值: <strong>{{ totalWeight }}</strong></p>
            </div>

            <div class="glass-card data-card" v-if="traversalOrder.length > 0">
              <h4 class="card-title">遍历序列</h4>
              <div class="traversal-order">
                <template v-for="(nodeId, index) in traversalOrder" :key="index">
                  <span class="order-item">{{ getNodeLabel(nodeId) }}</span>
                  <span class="order-arrow" v-if="index < traversalOrder.length - 1">→</span>
                </template>
              </div>
            </div>
          </div>

          <div class="glass-card info-panel">
            <h4 class="card-title">当前执行步骤</h4>
            <div class="step-info" v-if="currentFrame">
              <div class="info-row">
                <span class="label">操作动作:</span>
                <el-tag :type="getStepTagType(currentFrame.type)">{{ getFrameTypeName(currentFrame.type) }}</el-tag>
              </div>
              <div class="info-row">
                <span class="label">执行描述:</span>
                <span class="value">{{ currentFrame.description }}</span>
              </div>
            </div>
            <div class="step-info" v-else>
              <div class="info-row">
                <span class="label">操作动作:</span>
                <el-tag type="info">等待开始</el-tag>
              </div>
              <div class="info-row">
                <span class="label">执行描述:</span>
                <span class="value">点击“开始演示”生成动画帧</span>
              </div>
            </div>
          </div>
        </div>

        <div class="right-panel" :class="{ fullscreen: isCodeFullscreen }">
          <div class="glass-card start-node-card">
            <h4 class="card-title">算法起点配置</h4>
            <el-select v-model="startNodeId" placeholder="选择起点" style="width: 100%">
              <el-option
                v-for="node in displayNodes"
                :key="node.id"
                :label="node.label"
                :value="node.id"
              />
            </el-select>
          </div>

          <div class="code-editor-wrapper">
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
import { ElMessage } from 'element-plus'
import { graphAlgorithmCode } from '../core/algorithmCode'
import type { AlgorithmCode } from '../core/algorithmCode'
import { 
  dijkstra, 
  prim, 
  kruskal, 
  dfs, 
  bfs,
  graphAlgorithms,
  type Graph,
  type GraphNode,
  type GraphEdge
} from '../core/algorithms/graph'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { GraphFrame } from '../core/types'
import { graphPresets } from '../core/presets'
import ControlBar from '../components/common/ControlBar.vue'
import CodeEditorPanel from '../components/common/CodeEditorPanel.vue'

// 预设图数据
const graphPresetData: Record<string, { nodes: GraphNode[], edges: GraphEdge[], start: string }> = {
  standard: {
    start: 'A',
    nodes: [
      { id: 'A', label: 'A' }, { id: 'B', label: 'B' }, { id: 'C', label: 'C' },
      { id: 'D', label: 'D' }, { id: 'E', label: 'E' }, { id: 'F', label: 'F' }
    ],
    edges: [
      { id: 'AB', from: 'A', to: 'B', weight: 7 }, { id: 'AC', from: 'A', to: 'C', weight: 9 },
      { id: 'AF', from: 'A', to: 'F', weight: 14 }, { id: 'BC', from: 'B', to: 'C', weight: 10 },
      { id: 'BD', from: 'B', to: 'D', weight: 15 }, { id: 'CD', from: 'C', to: 'D', weight: 11 },
      { id: 'CF', from: 'C', to: 'F', weight: 2 }, { id: 'DE', from: 'D', to: 'E', weight: 6 },
      { id: 'EF', from: 'E', to: 'F', weight: 9 }
    ]
  },
  simple: {
    start: 'A',
    nodes: [
      { id: 'A', label: 'A' }, { id: 'B', label: 'B' },
      { id: 'C', label: 'C' }, { id: 'D', label: 'D' }
    ],
    edges: [
      { id: 'AB', from: 'A', to: 'B', weight: 4 }, { id: 'AC', from: 'A', to: 'C', weight: 2 },
      { id: 'BC', from: 'B', to: 'C', weight: 1 }, { id: 'BD', from: 'B', to: 'D', weight: 5 },
      { id: 'CD', from: 'C', to: 'D', weight: 8 }
    ]
  },
  complex: {
    start: 'A',
    nodes: [
      { id: 'A', label: 'A' }, { id: 'B', label: 'B' }, { id: 'C', label: 'C' },
      { id: 'D', label: 'D' }, { id: 'E', label: 'E' }, { id: 'F', label: 'F' },
      { id: 'G', label: 'G' }, { id: 'H', label: 'H' }
    ],
    edges: [
      { id: 'AB', from: 'A', to: 'B', weight: 4 }, { id: 'AH', from: 'A', to: 'H', weight: 8 },
      { id: 'BC', from: 'B', to: 'C', weight: 8 }, { id: 'BH', from: 'B', to: 'H', weight: 11 },
      { id: 'CD', from: 'C', to: 'D', weight: 7 }, { id: 'CF', from: 'C', to: 'F', weight: 4 },
      { id: 'CI', from: 'C', to: 'G', weight: 2 }, { id: 'DE', from: 'D', to: 'E', weight: 9 },
      { id: 'DF', from: 'D', to: 'F', weight: 14 }, { id: 'EF', from: 'E', to: 'F', weight: 10 },
      { id: 'FG', from: 'F', to: 'G', weight: 2 }, { id: 'GH', from: 'G', to: 'H', weight: 1 }
    ]
  },
  sparse: {
    start: 'A',
    nodes: [
      { id: 'A', label: 'A' }, { id: 'B', label: 'B' }, { id: 'C', label: 'C' },
      { id: 'D', label: 'D' }, { id: 'E', label: 'E' }, { id: 'F', label: 'F' },
      { id: 'G', label: 'G' }
    ],
    edges: [
      { id: 'AB', from: 'A', to: 'B', weight: 3 },
      { id: 'AC', from: 'A', to: 'C', weight: 7 },
      { id: 'BD', from: 'B', to: 'D', weight: 4 },
      { id: 'CE', from: 'C', to: 'E', weight: 2 },
      { id: 'DF', from: 'D', to: 'F', weight: 6 },
      { id: 'EG', from: 'E', to: 'G', weight: 5 }
    ]
  },
  branching: {
    start: 'A',
    nodes: [
      { id: 'A', label: 'A' }, { id: 'B', label: 'B' }, { id: 'C', label: 'C' },
      { id: 'D', label: 'D' }, { id: 'E', label: 'E' }, { id: 'F', label: 'F' },
      { id: 'G', label: 'G' }, { id: 'H', label: 'H' }
    ],
    edges: [
      { id: 'AB', from: 'A', to: 'B', weight: 1 },
      { id: 'AC', from: 'A', to: 'C', weight: 1 },
      { id: 'AD', from: 'A', to: 'D', weight: 1 },
      { id: 'BE', from: 'B', to: 'E', weight: 2 },
      { id: 'BF', from: 'B', to: 'F', weight: 3 },
      { id: 'CG', from: 'C', to: 'G', weight: 2 },
      { id: 'DH', from: 'D', to: 'H', weight: 4 }
    ]
  }
}

// 状态
const selectedAlgorithm = ref('dijkstra')
const isCodeFullscreen = ref(false)
const selectedPreset = ref(0)
const userCustomCode = ref<string | null>(null)
const graphCanvasRef = ref<HTMLElement | null>(null)
const canvasWidth = ref(600)
const canvasHeight = ref(400)
const startNodeId = ref('A')

// 图数据
const graph = ref<Graph>({
  nodes: [],
  edges: [],
  directed: false
})

// 显示数据
interface DisplayNode extends GraphNode {
  x: number
  y: number
}

interface DisplayEdge extends GraphEdge {
  x1: number
  y1: number
  x2: number
  y2: number
}

const displayNodes = ref<DisplayNode[]>([])
const displayEdges = ref<DisplayEdge[]>([])

// 状态
const visitedNodes = ref<Set<string>>(new Set())
const selectedEdges = ref<Set<string>>(new Set())
const currentNodeId = ref<string | null>(null)
const visitingEdge = ref<string | null>(null)
const distances = ref<Map<string, number>>(new Map())
const totalWeight = ref(0)
const traversalOrder = ref<string[]>([])

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
} = useAnimationPlayer<GraphFrame>()

// 计算属性
const algorithmInfo = computed(() => {
  const algos: Record<string, any> = graphAlgorithms
  return algos[selectedAlgorithm.value] || graphAlgorithms.dijkstra
})

const fallbackAlgorithmCode: AlgorithmCode = {
  title: '图算法',
  language: 'javascript',
  code: '// 暂无代码'
}

const currentAlgorithmCode = computed<AlgorithmCode>(() => {
  const codeMap = graphAlgorithmCode as Record<string, AlgorithmCode>
  return codeMap[selectedAlgorithm.value] ?? codeMap.dijkstra ?? fallbackAlgorithmCode
})

const currentGraphPresets = computed(() => {
  const presets = graphPresets as Record<string, Array<{ name: string, description: string, data: string }>>
  return presets[selectedAlgorithm.value] || presets.dijkstra || []
})

const currentHighlightLine = computed(() => {
  if (!currentFrame.value) return undefined
  if (currentFrame.value.highlightLine !== undefined) return currentFrame.value.highlightLine

  const frame = currentFrame.value
  const desc = frame.description || ''

  if (selectedAlgorithm.value === 'dijkstra') {
    if (frame.type === 'visit-node') return 13
    if (frame.type === 'visit-edge') return 24
    if (frame.type === 'update-distance') return 31
    if (frame.type === 'highlight') return 31
    if (frame.type === 'reset') return desc.includes('完成') ? 37 : 5
    return 5
  }

  if (selectedAlgorithm.value === 'prim') {
    if (frame.type === 'visit-node') return 2
    if (frame.type === 'visit-edge') return 14
    if (frame.type === 'select-edge') return 21
    if (frame.type === 'highlight') return 22
    if (frame.type === 'reset') return desc.includes('完成') ? 25 : 1
    return 1
  }

  if (selectedAlgorithm.value === 'kruskal') {
    if (frame.type === 'visit-edge') return 21
    if (frame.type === 'select-edge') return 22
    if (frame.type === 'highlight') {
      if (desc.includes('排序')) return 18
      if (desc.includes('形成环') || desc.includes('跳过')) return 13
      return 24
    }
    if (frame.type === 'reset') return desc.includes('完成') ? 28 : 18
    return 18
  }

  if (selectedAlgorithm.value === 'dfs') {
    if (frame.type === 'visit-node') return 6
    if (frame.type === 'visit-edge') return 13
    if (frame.type === 'highlight') return 13
    if (frame.type === 'reset') return desc.includes('完成') ? 19 : 1
    return 1
  }

  if (selectedAlgorithm.value === 'bfs') {
    if (frame.type === 'visit-node') return 7
    if (frame.type === 'visit-edge') return 16
    if (frame.type === 'highlight') return 16
    if (frame.type === 'reset') return desc.includes('完成') ? 22 : 6
    return 6
  }

  return 0
})

const distanceTableData = computed(() => {
  return displayNodes.value.map(node => ({
    node: node.label,
    distance: distances.value.has(node.id) 
      ? (distances.value.get(node.id) === Infinity ? '∞' : distances.value.get(node.id))
      : '-',
    visited: visitedNodes.value.has(node.id)
  }))
})

// 获取帧类型名称
function getFrameTypeName(type: string) {
  const names: Record<string, string> = {
    'visit-node': '访问节点',
    'visit-edge': '检查边',
    'select-edge': '选择边',
    'update-distance': '更新距离',
    highlight: '高亮',
    reset: '重置'
  }
  return names[type] || type
}

function getStepTagType(type: string): 'success' | 'warning' | 'danger' | 'info' | 'primary' {
  const typeMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
    'visit-node': 'primary',
    'visit-edge': 'warning',
    'update-distance': 'success',
    'select-edge': 'success',
    highlight: 'info',
    reset: 'info'
  }
  return typeMap[type] || 'info'
}

// 获取节点标签
function getNodeLabel(nodeId: string) {
  const node = displayNodes.value.find(n => n.id === nodeId)
  return node?.label || nodeId
}

// 获取边标签
function getEdgeLabel(edgeId: string) {
  const edge = displayEdges.value.find(e => e.id === edgeId)
  if (edge) {
    const fromLabel = getNodeLabel(edge.from)
    const toLabel = getNodeLabel(edge.to)
    return `${fromLabel}-${toLabel}(${edge.weight})`
  }
  return edgeId
}

// 处理帧变化
function handleFrameChange(frame: GraphFrame | null, index: number) {
  currentNodeId.value = null
  visitingEdge.value = null
  
  if (!frame) {
    visitedNodes.value = new Set()
    selectedEdges.value = new Set()
    distances.value = new Map()
    totalWeight.value = 0
    traversalOrder.value = []
    return
  }
  
  switch (frame.type) {
    case 'visit-node':
      currentNodeId.value = frame.nodeId as string
      visitedNodes.value.add(frame.nodeId as string)
      if (frame.distance !== undefined) {
        distances.value.set(frame.nodeId as string, frame.distance)
      }
      // 更新遍历序列
      if (!traversalOrder.value.includes(frame.nodeId as string)) {
        traversalOrder.value.push(frame.nodeId as string)
      }
      break
    case 'visit-edge':
      visitingEdge.value = findEdgeId(frame.fromNode as string, frame.toNode as string)
      break
    case 'select-edge':
      if (frame.edgeId) {
        selectedEdges.value.add(frame.edgeId)
      } else {
        const edgeId = findEdgeId(frame.fromNode as string, frame.toNode as string)
        if (edgeId) selectedEdges.value.add(edgeId)
      }
      break
    case 'update-distance':
      if (frame.nodeId && frame.distance !== undefined) {
        distances.value.set(frame.nodeId as string, frame.distance)
      }
      break
    case 'highlight':
      if (frame.data?.mstEdges) {
        selectedEdges.value = new Set(frame.data.mstEdges)
      }
      if (frame.data?.totalWeight !== undefined) {
        totalWeight.value = frame.data.totalWeight
      }
      break
    case 'reset':
      if (frame.data?.distances) {
        distances.value = new Map(Object.entries(frame.data.distances))
      }
      if (frame.data?.mstEdges) {
        selectedEdges.value = new Set(frame.data.mstEdges)
      }
      if (frame.data?.totalWeight !== undefined) {
        totalWeight.value = frame.data.totalWeight
      }
      break
  }
}

// 查找边ID
function findEdgeId(from: string, to: string): string | null {
  const edge = displayEdges.value.find(e => 
    (e.from === from && e.to === to) || (e.from === to && e.to === from)
  )
  return edge?.id || null
}

// 加载预设图
function loadPresetGraph() {
  const selected = currentGraphPresets.value[selectedPreset.value]
  const key = selected?.data || 'standard'
  const preset = graphPresetData[key]
  if (!preset) return
  
  graph.value = { nodes: preset.nodes, edges: preset.edges, directed: false }
  
  const centerX = canvasWidth.value / 2
  const centerY = canvasHeight.value / 2
  const radius = Math.min(canvasWidth.value, canvasHeight.value) * 0.35
  
  displayNodes.value = preset.nodes.map((node, i) => {
    const angle = (2 * Math.PI * i) / preset.nodes.length - Math.PI / 2
    return {
      ...node,
      x: centerX + radius * Math.cos(angle) - 25,
      y: centerY + radius * Math.sin(angle) - 25
    }
  })
  
  displayEdges.value = preset.edges.map(edge => {
    const fromNode = displayNodes.value.find(n => n.id === edge.from)!
    const toNode = displayNodes.value.find(n => n.id === edge.to)!
    return {
      ...edge,
      x1: fromNode.x + 25, y1: fromNode.y + 25,
      x2: toNode.x + 25, y2: toNode.y + 25
    }
  })
  
  startNodeId.value = preset.start
  runAlgorithm()
}

// 重置状态
function resetState() {
  visitedNodes.value = new Set()
  selectedEdges.value = new Set()
  currentNodeId.value = null
  visitingEdge.value = null
  distances.value = new Map()
  totalWeight.value = 0
  traversalOrder.value = []
  
  // 清空帧序列，禁用播放按钮
  load([])
}

// 运行算法
function runAlgorithm() {
  resetState()

  if (userCustomCode.value) {
    const customFrames = executeUserCode(userCustomCode.value, true)
    if (customFrames) {
      load(customFrames)
      return
    }
  }
  
  let frames: GraphFrame[] = []
  
  switch (selectedAlgorithm.value) {
    case 'dijkstra':
      frames = dijkstra(graph.value, startNodeId.value)
      break
    case 'prim':
      frames = prim(graph.value, startNodeId.value)
      break
    case 'kruskal':
      frames = kruskal(graph.value)
      break
    case 'dfs':
      frames = dfs(graph.value, startNodeId.value)
      break
    case 'bfs':
      frames = bfs(graph.value, startNodeId.value)
      break
  }
  
  load(frames)
}

function handleApplyCode(code: string) {
  userCustomCode.value = code
  const customFrames = executeUserCode(code)
  if (!customFrames) return
  resetState()
  load(customFrames)
}

function executeUserCode(code: string, silent = false): GraphFrame[] | null {
  try {
    const wrappedCode = `
      (function() {
        ${code}

        const functionNames = [
          ['dijkstra', 'dijkstra'], ['dijkstra_shortest_path', 'dijkstra'], ['Dijkstra', 'dijkstra'],
          ['prim', 'prim'], ['prim_mst', 'prim'], ['Prim', 'prim'],
          ['kruskal', 'kruskal'], ['kruskal_mst', 'kruskal'], ['Kruskal', 'kruskal'],
          ['dfs', 'dfs'], ['depth_first_search', 'dfs'], ['DepthFirstSearch', 'dfs'],
          ['bfs', 'bfs'], ['breadth_first_search', 'bfs'], ['BreadthFirstSearch', 'bfs']
        ]
        for (const [name, canonical] of functionNames) {
          try {
            const fn = eval(name)
            if (typeof fn === 'function') {
              return { name: canonical, fn }
            }
          } catch (e) {
            // ignore undefined function
          }
        }
        throw new Error('未找到有效的图算法函数')
      })()
    `

    const resultObj = eval(wrappedCode) as { name: string, fn: Function }
    if (!resultObj || typeof resultObj.fn !== 'function') {
      if (!silent) ElMessage.error('代码必须定义一个可执行函数')
      return null
    }

    const graphInput: Graph = {
      nodes: graph.value.nodes.map(node => ({ ...node })),
      edges: graph.value.edges.map(edge => ({ ...edge })),
      directed: graph.value.directed
    }

    const result = resultObj.name === 'kruskal'
      ? resultObj.fn(graphInput)
      : resultObj.fn(graphInput, startNodeId.value)

    if (!Array.isArray(result)) {
      if (!silent) ElMessage.error('函数必须返回动画帧数组')
      return null
    }

    if (result.length === 0) {
      if (!silent) ElMessage.error('返回的帧数组为空')
      return null
    }

    if (!result[0] || typeof result[0].type !== 'string') {
      if (!silent) ElMessage.error('帧数组格式不正确，缺少 type 字段')
      return null
    }

    return result as GraphFrame[]
  } catch (error) {
    if (!silent) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      ElMessage.error(`代码执行失败: ${errorMessage}`)
    }
    return null
  }
}

function toggleCodeFullscreen() {
  isCodeFullscreen.value = !isCodeFullscreen.value
}

// 重置
function reset() {
  stop()
  runAlgorithm()
}

// 监听算法变化
watch(selectedAlgorithm, () => {
  userCustomCode.value = null
  selectedPreset.value = 0
  loadPresetGraph()
})

watch(startNodeId, () => {
  if (graph.value.nodes.length === 0) return
  runAlgorithm()
})

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
  loadPresetGraph()
})
</script>

<style scoped>
.graph-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-header {
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  z-index: 10;
}

.header-title h2 {
  font-size: 20px;
  font-weight: 600;
}

.subtitle {
  display: block;
  margin-top: 4px;
  color: #909399;
  font-size: 13px;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.content-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
}

.main-layout {
  display: flex;
  gap: 24px;
  align-items: stretch;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100%;
}

.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
  padding-bottom: 80px;
}

.right-panel {
  width: 480px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.right-panel.fullscreen {
  position: fixed;
  left: calc(var(--sidebar-width, 220px) + 24px);
  right: 24px;
  top: 80px;
  bottom: 84px;
  width: auto;
  z-index: 200;
  height: auto;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
}

.glass-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.02);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.glass-card:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
}

.card-title {
  margin: 0 0 16px;
  color: #303133;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.card-title::before {
  content: '';
  width: 4px;
  height: 14px;
  border-radius: 2px;
  background: var(--primary-color);
  margin-right: 8px;
}

.info-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
}

.info-header h3 {
  font-size: 22px;
  font-weight: 700;
  color: #1f2f3d;
}

.name-en {
  font-size: 14px;
  color: #a8abb2;
  font-style: italic;
}

.description {
  color: #606266;
  margin-bottom: 20px;
  line-height: 1.6;
  min-height: 44px;
}

.complexity-tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.animation-container {
  padding: 20px;
}

.graph-canvas {
  position: relative;
  width: 100%;
  height: 400px;
  background: #fafbfc;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.graph-edges {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.graph-edges line {
  stroke: #e4e7ed;
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke 0.4s ease, stroke-width 0.4s ease;
}

.graph-edges line.selected {
  stroke: var(--success-color);
  stroke-width: 5;
}

.graph-edges line.visiting {
  stroke: var(--danger-color);
  stroke-width: 4;
  stroke-dasharray: 8 4;
  animation: dashMove 1s linear infinite;
}

@keyframes dashMove {
  to {
    stroke-dashoffset: -24;
  }
}

.edge-weight-bg {
  fill: #fafbfc;
  opacity: 0.8;
}

.edge-weight {
  font-size: 13px;
  font-weight: 500;
  fill: #909399;
  text-anchor: middle;
  transition: all 0.3s;
}

.edge-weight.visiting {
  fill: var(--danger-color);
  font-size: 15px;
  font-weight: 600;
}

.edge-weight.selected {
  fill: var(--success-color);
  font-size: 16px;
  font-weight: bold;
}

.graph-node {
  position: absolute;
  width: 48px;
  height: 48px;
  background: #ffffff;
  border: 2px solid #a1c4fd;
  color: #303133;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 10;
  cursor: pointer;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
}

.graph-node .node-label {
  font-size: 15px;
  font-weight: 600;
}

.graph-node .node-dist {
  font-size: 11px;
  opacity: 0.8;
  margin-top: -2px;
  color: var(--primary-color);
  font-weight: 700;
}

.graph-node.visited {
  background: #f0f9eb;
  border-color: var(--success-color);
  color: var(--success-color);
}

.graph-node.current {
  background: #fef0f0;
  border-color: var(--danger-color);
  color: var(--danger-color);
  transform: translate(-50%, -50%) scale(1.15);
  box-shadow: 0 6px 16px rgba(245, 108, 108, 0.3);
}

.graph-node.start {
  border: 3px solid var(--warning-color);
  box-shadow: 0 0 0 4px rgba(230, 162, 60, 0.2);
}

.start-indicator {
  position: absolute;
  top: -20px;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  color: #fff;
  background: var(--warning-color);
}

.start-node-card {
  padding: 16px;
}

.code-editor-wrapper {
  flex: 1;
  min-height: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.data-panels-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.data-card {
  padding: 15px;
}

.selected-edges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.total-weight {
  font-size: 14px;
  color: #606266;
}

.total-weight strong {
  color: #67c23a;
  font-size: 18px;
}

.traversal-order {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 10px;
  border-radius: 8px;
  background: #fafbfc;
}

.order-item {
  width: 34px;
  height: 34px;
  background: #ecf5ff;
  border: 1px solid #b3d8ff;
  color: #409eff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.2);
}

.order-arrow {
  color: #a8abb2;
  font-size: 14px;
}

.info-panel {
  padding: 20px;
}

.step-info {
  font-size: 14px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-height: 22px;
  margin-bottom: 12px;
}

.info-row .label {
  color: #909399;
  min-width: 65px;
}

.info-row .value {
  color: #1f2f3d;
  line-height: 1.5;
}

@media (max-width: 1200px) {
  .main-layout {
    flex-direction: column;
  }

  .right-panel,
  .right-panel.fullscreen {
    position: static;
    width: 100%;
    height: auto;
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    box-shadow: none;
  }
}
</style>
