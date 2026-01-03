<template>
  <div class="graph-view">
    <!-- 头部 -->
    <div class="content-header">
      <h2>第6章 图</h2>
      <div class="header-actions">
        <el-select v-model="selectedAlgorithm" style="width: 150px">
          <el-option label="Dijkstra最短路径" value="dijkstra" />
          <el-option label="Prim最小生成树" value="prim" />
          <el-option label="Kruskal最小生成树" value="kruskal" />
          <el-option label="深度优先搜索" value="dfs" />
          <el-option label="广度优先搜索" value="bfs" />
        </el-select>
        <el-button type="primary" @click="runAlgorithm">
          <el-icon><VideoPlay /></el-icon>
          开始演示
        </el-button>
        <el-button @click="loadPreset">
          <el-icon><Document /></el-icon>
          加载示例
        </el-button>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="content-body">
      <el-row :gutter="20">
        <!-- 左侧：图可视化 -->
        <el-col :span="16">
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
          
          <!-- 图画布 -->
          <div class="animation-container">
            <div class="graph-canvas" ref="graphCanvasRef">
              <!-- SVG 边 -->
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
                  <!-- 权重标签 -->
                  <text 
                    :x="(edge.x1 + edge.x2) / 2" 
                    :y="(edge.y1 + edge.y2) / 2 - 8"
                    class="edge-weight"
                    :class="{ selected: selectedEdges.has(edge.id) }"
                  >
                    {{ edge.weight }}
                  </text>
                </g>
              </svg>
              
              <!-- 图节点 -->
              <div 
                v-for="node in displayNodes" 
                :key="node.id"
                class="graph-node"
                :class="{ 
                  visited: visitedNodes.has(node.id),
                  current: currentNodeId === node.id,
                  start: node.id === startNodeId
                }"
                :style="{ left: `${node.x}px`, top: `${node.y}px` }"
              >
                <span class="node-label">{{ node.label }}</span>
                <span class="node-dist" v-if="distances.has(node.id)">
                  {{ distances.get(node.id) === Infinity ? '∞' : distances.get(node.id) }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- 步骤信息 -->
          <div class="info-panel" v-if="currentFrame">
            <h4>当前步骤</h4>
            <div class="step-info">
              <p><strong>操作:</strong> {{ getFrameTypeName(currentFrame.type) }}</p>
              <p><strong>描述:</strong> {{ currentFrame.description }}</p>
            </div>
          </div>
        </el-col>
        
        <!-- 右侧：信息面板 -->
        <el-col :span="8">
          <div class="side-panel">
            <!-- 起点选择 -->
            <div class="panel-section">
              <h4>起点选择</h4>
              <el-select v-model="startNodeId" placeholder="选择起点" style="width: 100%">
                <el-option 
                  v-for="node in displayNodes" 
                  :key="node.id" 
                  :label="node.label" 
                  :value="node.id" 
                />
              </el-select>
            </div>
            
            <!-- 距离/权值表 -->
            <div class="panel-section" v-if="distances.size > 0">
              <h4>{{ selectedAlgorithm === 'dijkstra' ? '最短距离' : '节点状态' }}</h4>
              <el-table :data="distanceTableData" size="small">
                <el-table-column prop="node" label="节点" width="60" />
                <el-table-column prop="distance" label="距离" />
                <el-table-column prop="status" label="状态" width="80">
                  <template #default="{ row }">
                    <el-tag :type="row.visited ? 'success' : 'info'" size="small">
                      {{ row.visited ? '已访问' : '未访问' }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            
            <!-- 已选边 -->
            <div class="panel-section" v-if="selectedEdges.size > 0">
              <h4>已选边</h4>
              <div class="selected-edges">
                <el-tag 
                  v-for="edgeId in selectedEdges" 
                  :key="edgeId"
                  type="success"
                  style="margin: 2px"
                >
                  {{ getEdgeLabel(edgeId) }}
                </el-tag>
              </div>
              <p class="total-weight" v-if="totalWeight > 0">
                总权值: <strong>{{ totalWeight }}</strong>
              </p>
            </div>
            
            <!-- 遍历序列 -->
            <div class="panel-section" v-if="traversalOrder.length > 0">
              <h4>遍历序列</h4>
              <div class="traversal-order">
                <span 
                  v-for="(nodeId, index) in traversalOrder" 
                  :key="index"
                  class="order-item"
                >
                  {{ getNodeLabel(nodeId) }}
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
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
import { VideoPlay, Document } from '@element-plus/icons-vue'
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
import ControlBar from '../components/common/ControlBar.vue'

// 状态
const selectedAlgorithm = ref('dijkstra')
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
function loadPreset() {
  const nodes: GraphNode[] = [
    { id: 'A', label: 'A' },
    { id: 'B', label: 'B' },
    { id: 'C', label: 'C' },
    { id: 'D', label: 'D' },
    { id: 'E', label: 'E' },
    { id: 'F', label: 'F' }
  ]
  
  const edges: GraphEdge[] = [
    { id: 'AB', from: 'A', to: 'B', weight: 7 },
    { id: 'AC', from: 'A', to: 'C', weight: 9 },
    { id: 'AF', from: 'A', to: 'F', weight: 14 },
    { id: 'BC', from: 'B', to: 'C', weight: 10 },
    { id: 'BD', from: 'B', to: 'D', weight: 15 },
    { id: 'CD', from: 'C', to: 'D', weight: 11 },
    { id: 'CF', from: 'C', to: 'F', weight: 2 },
    { id: 'DE', from: 'D', to: 'E', weight: 6 },
    { id: 'EF', from: 'E', to: 'F', weight: 9 }
  ]
  
  graph.value = { nodes, edges, directed: false }
  
  // 计算节点位置（圆形布局）
  const centerX = canvasWidth.value / 2
  const centerY = canvasHeight.value / 2
  const radius = 150
  
  displayNodes.value = nodes.map((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2
    return {
      ...node,
      x: centerX + radius * Math.cos(angle) - 25,
      y: centerY + radius * Math.sin(angle) - 25
    }
  })
  
  // 计算边位置
  displayEdges.value = edges.map(edge => {
    const fromNode = displayNodes.value.find(n => n.id === edge.from)!
    const toNode = displayNodes.value.find(n => n.id === edge.to)!
    return {
      ...edge,
      x1: fromNode.x + 25,
      y1: fromNode.y + 25,
      x2: toNode.x + 25,
      y2: toNode.y + 25
    }
  })
  
  startNodeId.value = 'A'
  resetState()
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

// 重置
function reset() {
  stop()
  resetState()
}

// 监听算法变化
watch(selectedAlgorithm, () => {
  resetState()
})

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
  loadPreset()
})
</script>

<style scoped>
.graph-view {
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

.info-card {
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
}

.graph-canvas {
  position: relative;
  width: 100%;
  height: 400px;
  background: #fafafa;
  border-radius: 8px;
}

.graph-edges {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.graph-edges line {
  transition: stroke 0.3s ease, stroke-width 0.3s ease;
}

.graph-edges line.selected {
  stroke: #67c23a;
  stroke-width: 4;
}

.graph-edges line.visiting {
  stroke: #f56c6c;
  stroke-width: 3;
}

.edge-weight {
  font-size: 12px;
  fill: #909399;
  text-anchor: middle;
}

.edge-weight.selected {
  fill: #67c23a;
  font-weight: bold;
}

.graph-node {
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
  cursor: pointer;
}

.graph-node .node-label {
  font-size: 16px;
  font-weight: bold;
}

.graph-node .node-dist {
  font-size: 10px;
  opacity: 0.8;
}

.graph-node.visited {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.graph-node.current {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  transform: scale(1.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.graph-node.start {
  border: 3px solid #e6a23c;
}

/* 侧边面板 */
.side-panel {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.panel-section {
  margin-bottom: 20px;
}

.panel-section h4 {
  margin-bottom: 10px;
  color: #606266;
  font-size: 14px;
}

.selected-edges {
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
  gap: 8px;
}

.order-item {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
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
