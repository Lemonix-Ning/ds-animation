<template>
  <div class="linear-view">
    <!-- 头部 -->
    <div class="content-header">
      <h2>第2章 线性表</h2>
      <div class="header-actions">
        <el-select v-model="selectedOperation" placeholder="选择操作" style="width: 180px">
          <el-option-group label="顺序表操作">
            <el-option label="顺序表插入" value="insert" />
            <el-option label="顺序表删除" value="delete" />
            <el-option label="顺序表查找" value="search" />
          </el-option-group>
          <el-option-group label="链表操作">
            <el-option label="链表插入" value="linkedInsert" />
            <el-option label="链表删除" value="linkedDelete" />
            <el-option label="链表逆置" value="reverse" />
          </el-option-group>
        </el-select>
        <el-button type="primary" @click="resetDemo">
          <el-icon><Refresh /></el-icon>
          重置
        </el-button>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="content-body">
      <!-- 操作信息 -->
      <div class="info-card">
        <h3>{{ operationInfo.name }}</h3>
        <p>{{ operationInfo.description }}</p>
        <div class="complexity">
          <el-tag>时间: {{ operationInfo.timeComplexity }}</el-tag>
          <el-tag type="success">空间: {{ operationInfo.spaceComplexity }}</el-tag>
        </div>
      </div>
      
      <!-- 参数输入 -->
      <div class="params-card">
        <el-form :inline="true">
          <el-form-item label="数组" v-if="!isLinkedListOperation">
            <el-input v-model="arrayInput" placeholder="如: 1,2,3,4,5" style="width: 200px" />
          </el-form-item>
          <el-form-item v-if="selectedOperation === 'insert'" label="位置">
            <el-input-number v-model="insertIndex" :min="0" :max="array.length" />
          </el-form-item>
          <el-form-item v-if="selectedOperation === 'insert'" label="值">
            <el-input-number v-model="insertValue" />
          </el-form-item>
          <el-form-item v-if="selectedOperation === 'delete'" label="位置">
            <el-input-number v-model="deleteIndex" :min="0" :max="Math.max(0, array.length - 1)" />
          </el-form-item>
          <el-form-item v-if="selectedOperation === 'search'" label="目标值">
            <el-input-number v-model="searchTarget" />
          </el-form-item>
          <el-form-item v-if="selectedOperation === 'linkedInsert'" label="位置">
            <el-input-number v-model="linkedInsertIndex" :min="0" :max="linkedListNodes.length" />
          </el-form-item>
          <el-form-item v-if="selectedOperation === 'linkedInsert'" label="值">
            <el-input-number v-model="linkedInsertValue" />
          </el-form-item>
          <el-form-item v-if="selectedOperation === 'linkedDelete'" label="位置">
            <el-input-number v-model="linkedDeleteIndex" :min="0" :max="Math.max(0, linkedListNodes.length - 1)" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="runOperation">执行</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 动画演示区 -->
      <div class="animation-container">
        <h4 v-if="!isLinkedListOperation">顺序表视图</h4>
        <div class="array-visual" v-if="!isLinkedListOperation">
          <TransitionGroup name="list" tag="div" class="array-cards">
            <div 
              v-for="(item, index) in displayArray" 
              :key="`${index}-${item}`"
              class="array-card"
              :class="getCardClass(index)"
            >
              <span class="index">{{ index }}</span>
              <span class="value">{{ item }}</span>
            </div>
          </TransitionGroup>
        </div>
        
        <!-- 链表视图 -->
        <div v-if="isLinkedListOperation" class="linked-list-visual">
          <h4>链表视图</h4>
          <div class="linked-list">
            <div 
              v-for="(node, index) in linkedListNodes" 
              :key="node.id"
              class="list-node"
              :class="{ active: highlightedNode === node.id }"
            >
              <div class="node-content">
                <span class="node-value">{{ node.value }}</span>
              </div>
              <div class="node-pointer" v-if="index < linkedListNodes.length - 1">
                <svg width="40" height="20">
                  <line x1="0" y1="10" x2="30" y2="10" stroke="#409eff" stroke-width="2" />
                  <polygon points="30,5 40,10 30,15" fill="#409eff" />
                </svg>
              </div>
              <div class="node-null" v-else>
                <span>NULL</span>
              </div>
            </div>
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
      @reset="stop"
      @step-forward="stepForward"
      @step-backward="stepBackward"
      @go-to="goTo"
      @speed-change="setSpeed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { 
  sequentialInsert, 
  sequentialDelete, 
  sequentialSearch, 
  linkedListReverse,
  linkedListInsert,
  linkedListDelete,
  linearAlgorithms, 
  type LinkedListNode 
} from '../core/algorithms/linear'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { LinearFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'

// 状态
const selectedOperation = ref('insert')
const arrayInput = ref('10, 20, 30, 40, 50')
const array = ref<number[]>([10, 20, 30, 40, 50])
const displayArray = ref<number[]>([...array.value])
const insertIndex = ref(2)
const insertValue = ref(25)
const deleteIndex = ref(2)
const searchTarget = ref(30)

// 链表参数
const linkedInsertIndex = ref(1)
const linkedInsertValue = ref(15)
const linkedDeleteIndex = ref(1)

// 链表状态
const linkedListNodes = ref<LinkedListNode[]>([])
const highlightedNode = ref<string | null>(null)

// 高亮状态
const highlightedIndex = ref<number | null>(null)
const movingIndex = ref<number | null>(null)
const foundIndex = ref<number | null>(null)

// 播放器
const {
  currentIndex,
  totalFrames,
  isPlaying,
  isFinished,
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
} = useAnimationPlayer<LinearFrame>()

// 计算属性
const operationInfo = computed(() => {
  const ops: Record<string, any> = {
    insert: linearAlgorithms.insert,
    delete: linearAlgorithms.delete,
    search: linearAlgorithms.search,
    reverse: linearAlgorithms.reverse,
    linkedInsert: linearAlgorithms.linkedInsert,
    linkedDelete: linearAlgorithms.linkedDelete
  }
  return ops[selectedOperation.value]
})

// 是否是链表操作
const isLinkedListOperation = computed(() => {
  return ['reverse', 'linkedInsert', 'linkedDelete'].includes(selectedOperation.value)
})

// 获取卡片样式
function getCardClass(index: number) {
  if (foundIndex.value === index) return 'found'
  if (movingIndex.value === index) return 'moving'
  if (highlightedIndex.value === index) return 'highlighted'
  return ''
}

// 获取帧类型名称
function getFrameTypeName(type: string) {
  const names: Record<string, string> = {
    insert: '插入',
    delete: '删除',
    search: '查找',
    highlight: '高亮',
    move: '移动',
    reset: '重置'
  }
  return names[type] || type
}

// 处理帧变化
function handleFrameChange(frame: LinearFrame | null, index: number) {
  highlightedIndex.value = null
  movingIndex.value = null
  foundIndex.value = null
  highlightedNode.value = null
  
  if (!frame) {
    displayArray.value = [...array.value]
    linkedListNodes.value = linkedListNodes.value.length > 0 ? [...linkedListNodes.value] : []
    return
  }
  
  // 处理数组数据
  if (frame.data?.array) {
    displayArray.value = [...frame.data.array]
  }
  
  // 处理链表数据
  if (frame.data?.nodes) {
    linkedListNodes.value = frame.data.nodes.map((n: LinkedListNode) => ({ ...n }))
  }
  
  switch (frame.type) {
    case 'highlight':
    case 'search':
      highlightedIndex.value = frame.index
      if (frame.data?.comparing !== undefined) {
        highlightedIndex.value = frame.data.comparing
      }
      if (frame.data?.found !== undefined) {
        foundIndex.value = frame.data.found
      }
      break
    case 'move':
      movingIndex.value = frame.index
      break
    case 'insert':
      foundIndex.value = frame.index
      break
    case 'delete':
      highlightedIndex.value = frame.index
      break
  }
  
  // 链表高亮
  if (frame.data?.current) {
    highlightedNode.value = frame.data.current
  }
  if (frame.data?.modified) {
    highlightedNode.value = frame.data.modified
  }
  if (frame.data?.deleting) {
    highlightedNode.value = frame.data.deleting
  }
  if (frame.data?.newNode) {
    highlightedNode.value = frame.data.newNode
  }
}

// 解析数组输入
function parseArrayInput() {
  const numbers = arrayInput.value
    .split(/[,\s]+/)
    .map(s => parseInt(s.trim()))
    .filter(n => !isNaN(n))
  array.value = numbers
  displayArray.value = [...numbers]
}

// 执行操作
function runOperation() {
  let frames: LinearFrame[] = []
  
  if (isLinkedListOperation.value) {
    // 链表操作
    if (linkedListNodes.value.length === 0) {
      // 初始化链表
      parseArrayInput()
      linkedListNodes.value = array.value.map((v, i) => ({
        id: `node-${i}`,
        value: v,
        next: i < array.value.length - 1 ? `node-${i + 1}` : null
      }))
    }
    
    switch (selectedOperation.value) {
      case 'reverse':
        frames = linkedListReverse(linkedListNodes.value)
        break
      case 'linkedInsert':
        frames = linkedListInsert(linkedListNodes.value, linkedInsertIndex.value, linkedInsertValue.value)
        break
      case 'linkedDelete':
        frames = linkedListDelete(linkedListNodes.value, linkedDeleteIndex.value)
        break
    }
  } else {
    // 顺序表操作
    parseArrayInput()
    
    switch (selectedOperation.value) {
      case 'insert':
        frames = sequentialInsert(array.value, insertIndex.value, insertValue.value)
        break
      case 'delete':
        frames = sequentialDelete(array.value, deleteIndex.value)
        break
      case 'search':
        frames = sequentialSearch(array.value, searchTarget.value)
        break
    }
  }
  
  load(frames)
}

// 初始化链表显示
function initializeLinkedList() {
  parseArrayInput()
  linkedListNodes.value = array.value.map((v, i) => ({
    id: `node-${i}`,
    value: v,
    next: i < array.value.length - 1 ? `node-${i + 1}` : null
  }))
}

// 重置演示
function resetDemo() {
  stop()
  if (isLinkedListOperation.value) {
    initializeLinkedList()
  } else {
    parseArrayInput()
    displayArray.value = [...array.value]
  }
  highlightedIndex.value = null
  movingIndex.value = null
  foundIndex.value = null
  highlightedNode.value = null
}

// 监听操作变化
watch(selectedOperation, () => {
  resetDemo()
})

// 监听动画完成状态，同步结果到输入框
watch(isFinished, (finished) => {
  if (finished && (selectedOperation.value === 'insert' || selectedOperation.value === 'delete')) {
    // 从最后一帧获取最终数组状态
    if (currentFrame.value && currentFrame.value.data?.array) {
      array.value = [...currentFrame.value.data.array]
      arrayInput.value = array.value.join(', ')
    }
  }
})

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
  parseArrayInput()
})
</script>

<style scoped>
.linear-view {
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

.info-card, .params-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  margin-bottom: 10px;
  color: #303133;
}

.info-card p {
  color: #606266;
  margin-bottom: 15px;
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

.animation-container h4 {
  margin-bottom: 15px;
  color: #606266;
}

.array-visual {
  padding: 20px 0;
}

.array-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.array-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.array-card .index {
  font-size: 10px;
  opacity: 0.7;
}

.array-card .value {
  font-size: 20px;
  font-weight: bold;
}

.array-card.highlighted {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  transform: scale(1.1);
}

.array-card.moving {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  transform: translateY(-10px);
}

.array-card.found {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  transform: scale(1.15);
}

/* 链表样式 */
.linked-list-visual {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #dcdfe6;
}

.linked-list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  padding: 20px;
}

.list-node {
  display: flex;
  align-items: center;
}

.node-content {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.3s ease;
}

.list-node.active .node-content {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  transform: scale(1.1);
}

.node-pointer {
  margin: 0 5px;
}

.node-null {
  margin-left: 10px;
  color: #909399;
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

/* TransitionGroup 动画 */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
