<template>
  <div class="stack-queue-view">
    <div class="content-header">
      <div class="header-title">
        <h2>第3章 栈与队列</h2>
        <span class="subtitle">数据结构可视化交互演示</span>
      </div>
      <div class="header-actions">
        <el-radio-group v-model="dataStructure" @change="resetDemo">
          <el-radio-button value="stack">栈</el-radio-button>
          <el-radio-button value="queue">队列</el-radio-button>
        </el-radio-group>
        <el-button @click="resetDemo">清空结构</el-button>
      </div>
    </div>
    
    <div class="content-body">
      <div class="main-layout">
        <div class="left-panel">
          <div class="glass-card animation-container">
            <div v-if="dataStructure === 'stack'" class="stack-visual">
              <div class="stack-label">栈顶 (Top) ↓</div>
              <div class="stack-shell">
                <TransitionGroup name="stack" tag="div" class="stack-items">
                  <div 
                    v-for="(item, index) in displayStack" 
                    :key="`${index}-${item}`"
                    class="data-item stack-item"
                    :class="{ 
                      'top-item': index === displayStack.length - 1,
                      'highlighted': highlightedIndex === index
                    }"
                  >
                    <span class="item-val">{{ item }}</span>
                    <span class="item-idx">{{ index }}</span>
                  </div>
                </TransitionGroup>
              </div>
            </div>
            
            <div v-if="dataStructure === 'queue'" class="queue-visual">
              <div class="queue-track-wrapper">
                <div class="queue-label">队首 (Front) ⬅</div>
                <div class="queue-container">
                  <TransitionGroup name="queue" tag="div" class="queue-items">
                    <div 
                      v-for="(item, index) in displayQueue" 
                      :key="`${index}-${item}`"
                      class="data-item queue-item"
                      :class="{ 
                        'front-item': index === 0,
                        'rear-item': index === displayQueue.length - 1,
                        'highlighted': highlightedIndex === index
                      }"
                    >
                      <span class="item-val">{{ item }}</span>
                      <span class="item-idx">{{ index }}</span>
                    </div>
                  </TransitionGroup>
                </div>
                <div class="queue-label">队尾 (Rear) ⬅</div>
              </div>
            </div>
          </div>

          <div class="info-panels-grid">
            <div class="glass-card">
              <h4 class="card-title">当前状态指标</h4>
              <ul class="status-list">
                <li>
                  <span>元素总数 (Size)</span>
                  <span class="status-val">{{ dataStructure === 'stack' ? displayStack.length : displayQueue.length }}</span>
                </li>
                <li>
                  <span>{{ dataStructure === 'stack' ? '栈顶元素 (Top)' : '队首元素 (Front)' }}</span>
                  <span class="status-val">{{ dataStructure === 'stack' ? (displayStack.length > 0 ? displayStack[displayStack.length - 1] : '空') : (displayQueue.length > 0 ? displayQueue[0] : '空') }}</span>
                </li>
                <li>
                  <span>结构状态</span>
                  <el-tag size="small" :type="statusTagType">{{ currentStatus }}</el-tag>
                </li>
              </ul>
            </div>

            <div class="glass-card">
              <h4 class="card-title">数据结构特点</h4>
              <div v-if="dataStructure === 'stack'" class="feature-list">
                <p><strong>后进先出 (LIFO)</strong></p>
                <p>最后入栈的元素最先出栈</p>
                <ul>
                  <li>Push: 将元素压入栈顶 O(1)</li>
                  <li>Pop: 弹出栈顶元素 O(1)</li>
                  <li>Peek: 查看栈顶元素 O(1)</li>
                </ul>
                <p class="application">应用：函数调用栈、表达式求值、括号匹配</p>
              </div>
              <div v-else class="feature-list">
                <p><strong>先进先出 (FIFO)</strong></p>
                <p>最先入队的元素最先出队</p>
                <ul>
                  <li>Enqueue: 将元素加入队尾 O(1)</li>
                  <li>Dequeue: 移除队首元素 O(1)</li>
                  <li>Peek: 查看队首元素 O(1)</li>
                </ul>
                <p class="application">应用：任务调度、BFS遍历、缓冲区</p>
              </div>
            </div>
          </div>

          <div class="glass-card info-panel" v-if="currentFrame">
            <h4 class="card-title">当前执行步骤</h4>
            <div class="step-info">
              <p><strong>操作:</strong> {{ getFrameTypeName(currentFrame.type) }}</p>
              <p><strong>描述:</strong> {{ currentFrame.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="right-panel" :class="{ fullscreen: isCodeFullscreen }">
          <div class="glass-card operation-panel" v-show="!isCodeFullscreen">
            <h4 class="card-title">{{ dataStructure === 'stack' ? '栈操作面板' : '队列操作面板' }}</h4>
            
            <div class="operation-group">
              <div class="ops-input-group">
                <span>元素值:</span>
                <el-input-number v-model="inputValue" :min="0" :max="999" style="width: 150px" />
              </div>
              
              <div class="operation-buttons">
                <el-button 
                  type="primary" 
                  @click="dataStructure === 'stack' ? handlePush() : handleEnqueue()"
                  :disabled="isPlaying"
                >
                  <el-icon><Top /></el-icon>
                  {{ dataStructure === 'stack' ? '入栈 (Push)' : '入队 (Enqueue)' }}
                </el-button>
                
                <el-button 
                  type="danger" 
                  @click="dataStructure === 'stack' ? handlePop() : handleDequeue()"
                  :disabled="isPlaying || (dataStructure === 'stack' ? displayStack.length === 0 : displayQueue.length === 0)"
                >
                  <el-icon><Bottom /></el-icon>
                  {{ dataStructure === 'stack' ? '出栈 (Pop)' : '出队 (Dequeue)' }}
                </el-button>
                
                <el-button 
                  class="btn-peek"
                  @click="handlePeek"
                  :disabled="isPlaying || (dataStructure === 'stack' ? displayStack.length === 0 : displayQueue.length === 0)"
                >
                  <el-icon><View /></el-icon>
                  {{ dataStructure === 'stack' ? '查看栈顶 (Peek)' : '查看队首 (Peek)' }}
                </el-button>
              </div>
            </div>
          </div>

          <div class="code-panel code-editor-wrapper">
            <CodeEditorPanel
              :algorithm-code="currentAlgorithmCode"
              :algorithm-key="currentAlgorithmKey"
              :input-array="[]"
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
import { ref, computed, onMounted, watch } from 'vue'
import { Top, Bottom, View } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { stackPush, stackPop, stackPeek, queueEnqueue, queueDequeue, queuePeek } from '../core/algorithms/stackQueue'
import { stackQueueAlgorithmCode } from '../core/algorithmCode'
import type { AlgorithmCode } from '../core/algorithmCode'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { StackFrame, QueueFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'
import CodeEditorPanel from '../components/common/CodeEditorPanel.vue'

// 状态
const dataStructure = ref<'stack' | 'queue'>('stack')
const inputValue = ref(10)
const stack = ref<number[]>([])
const queue = ref<number[]>([])
const displayStack = ref<number[]>([])
const displayQueue = ref<number[]>([])
const highlightedIndex = ref<number | null>(null)
const isCodeFullscreen = ref(false)
const currentOperation = ref<'push' | 'pop' | 'peek' | 'enqueue' | 'dequeue'>('push')
const customHandlers = ref<Partial<Record<string, Function>>>({})

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
} = useAnimationPlayer<StackFrame | QueueFrame>()

const fallbackAlgorithmCode: AlgorithmCode = {
  title: '栈与队列',
  language: 'javascript',
  code: '// 暂无代码'
}

const currentAlgorithmKey = computed(() => {
  if (dataStructure.value === 'stack') {
    if (currentOperation.value === 'pop') return 'stackPop'
    if (currentOperation.value === 'peek') return 'stackPeek'
    return 'stackPush'
  }

  if (currentOperation.value === 'dequeue') return 'queueDequeue'
  if (currentOperation.value === 'peek') return 'queuePeek'
  return 'queueEnqueue'
})

const currentAlgorithmCode = computed<AlgorithmCode>(() => {
  return (stackQueueAlgorithmCode as Record<string, AlgorithmCode>)[currentAlgorithmKey.value]
    ?? fallbackAlgorithmCode
})

const currentHighlightLine = computed(() => {
  if (!currentFrame.value) return undefined
  if ((currentFrame.value as any).highlightLine !== undefined) return (currentFrame.value as any).highlightLine

  const frame = currentFrame.value as any
  const desc = (frame.description || '') as string

  if (currentAlgorithmKey.value === 'stackPush') {
    if (frame.type === 'highlight') return 1
    if (frame.type === 'push') return 2
    if (frame.type === 'reset') return 0
    return 1
  }

  if (currentAlgorithmKey.value === 'stackPop') {
    if (frame.type === 'highlight') return 1
    if (frame.type === 'peek') return 2
    if (frame.type === 'pop') return 3
    if (frame.type === 'reset') return 0
    return desc.includes('为空') ? 1 : 2
  }

  if (currentAlgorithmKey.value === 'stackPeek') {
    if (frame.type === 'highlight') return 1
    if (frame.type === 'peek') return 2
    if (frame.type === 'reset') return 0
    return desc.includes('为空') ? 1 : 2
  }

  if (currentAlgorithmKey.value === 'queueEnqueue') {
    if (frame.type === 'highlight') return 1
    if (frame.type === 'enqueue') return 2
    if (frame.type === 'reset') return 0
    return 1
  }

  if (currentAlgorithmKey.value === 'queueDequeue') {
    if (frame.type === 'highlight') return 1
    if (frame.type === 'peek') return 2
    if (frame.type === 'dequeue') return 3
    if (frame.type === 'reset') return 0
    return desc.includes('为空') ? 1 : 2
  }

  if (currentAlgorithmKey.value === 'queuePeek') {
    if (frame.type === 'highlight') return 1
    if (frame.type === 'peek') return 2
    if (frame.type === 'reset') return 0
    return desc.includes('为空') ? 1 : 2
  }

  return 0
})

const currentStatus = computed(() => {
  if (!currentFrame.value) return '就绪'
  if (currentFrame.value.type === 'reset') return '就绪'
  if (currentFrame.value.type === 'highlight') return '提示'
  return '执行中'
})

const statusTagType = computed(() => {
  if (!currentFrame.value || currentFrame.value.type === 'reset') return 'success'
  if (currentFrame.value.type === 'highlight') return 'warning'
  return 'primary'
})

// 获取帧类型名称
function getFrameTypeName(type: string) {
  const names: Record<string, string> = {
    push: '入栈',
    pop: '出栈',
    peek: '查看',
    enqueue: '入队',
    dequeue: '出队',
    highlight: '高亮',
    reset: '重置'
  }
  return names[type] || type
}

// 处理帧变化
function handleFrameChange(frame: StackFrame | QueueFrame | null, index: number) {
  highlightedIndex.value = null
  
  if (!frame) {
    displayStack.value = [...stack.value]
    displayQueue.value = [...queue.value]
    return
  }
  
  if (frame.data?.stack) {
    displayStack.value = [...frame.data.stack]
  }
  if (frame.data?.queue) {
    displayQueue.value = [...frame.data.queue]
  }
  
  // 高亮处理
  if (frame.data?.topIndex !== undefined) {
    highlightedIndex.value = frame.data.topIndex
  }
  if (frame.data?.frontIndex !== undefined) {
    highlightedIndex.value = frame.data.frontIndex
  }
}

// 栈操作
function handlePush() {
  currentOperation.value = 'push'
  const frames = runStackQueueOperation('stackPush', [stack.value, inputValue.value], stackPush)
  stack.value.push(inputValue.value)
  load(frames)
  inputValue.value = Math.floor(Math.random() * 90) + 10
}

function handlePop() {
  currentOperation.value = 'pop'
  const frames = runStackQueueOperation('stackPop', [stack.value], stackPop)
  if (stack.value.length > 0) {
    stack.value.pop()
  }
  load(frames)
}

function handlePeek() {
  if (dataStructure.value === 'stack') {
    currentOperation.value = 'peek'
    const frames = runStackQueueOperation('stackPeek', [stack.value], stackPeek)
    load(frames)
  } else {
    currentOperation.value = 'peek'
    const frames = runStackQueueOperation('queuePeek', [queue.value], queuePeek)
    load(frames)
  }
}

// 队列操作
function handleEnqueue() {
  currentOperation.value = 'enqueue'
  const frames = runStackQueueOperation('queueEnqueue', [queue.value, inputValue.value], queueEnqueue)
  queue.value.push(inputValue.value)
  load(frames)
  inputValue.value = Math.floor(Math.random() * 90) + 10
}

function handleDequeue() {
  currentOperation.value = 'dequeue'
  const frames = runStackQueueOperation('queueDequeue', [queue.value], queueDequeue)
  if (queue.value.length > 0) {
    queue.value.shift()
  }
  load(frames)
}

// 重置演示
function resetDemo() {
  stop()
  stack.value = []
  queue.value = []
  displayStack.value = []
  displayQueue.value = []
  highlightedIndex.value = null
  currentOperation.value = dataStructure.value === 'stack' ? 'push' : 'enqueue'
}

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
})

watch(dataStructure, () => {
  currentOperation.value = dataStructure.value === 'stack' ? 'push' : 'enqueue'
})

function runStackQueueOperation(key: string, args: any[], fallback: Function) {
  const customFn = customHandlers.value[key]
  const fnToRun = typeof customFn === 'function' ? customFn : fallback
  const result = fnToRun(...args)

  if (!Array.isArray(result) || result.length === 0 || !result[0]?.type) {
    ElMessage.error('请返回有效帧数组')
    return []
  }

  return result
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
          'stackPush', 'stack_push', 'StackPush',
          'stackPop', 'stack_pop', 'StackPop',
          'stackPeek', 'stack_peek', 'StackPeek',
          'queueEnqueue', 'queue_enqueue', 'QueueEnqueue',
          'queueDequeue', 'queue_dequeue', 'QueueDequeue',
          'queuePeek', 'queue_peek', 'QueuePeek',
          'push', 'pop', 'peek', 'enqueue', 'dequeue'
        ]
        const found = {}
        for (const name of names) {
          try {
            const fn = eval(name)
            if (typeof fn === 'function') found[name] = fn
          } catch (e) {}
        }
        return found
      })()
    `

    const found = eval(wrappedCode)
    const mapped: Record<string, Function> = {}

    if (found.stackPush || found.push) mapped.stackPush = found.stackPush || found.push
    if (found.stackPop || found.pop) mapped.stackPop = found.stackPop || found.pop
    if (found.stackPeek || found.peek) mapped.stackPeek = found.stackPeek || found.peek
    if (found.queueEnqueue || found.enqueue) mapped.queueEnqueue = found.queueEnqueue || found.enqueue
    if (found.queueDequeue || found.dequeue) mapped.queueDequeue = found.queueDequeue || found.dequeue
    if (found.queuePeek || found.peek) mapped.queuePeek = found.queuePeek || found.peek

    const keys = Object.keys(mapped)
    if (keys.length === 0) {
      ElMessage.error('未找到有效的栈/队列函数')
      return
    }

    customHandlers.value = { ...customHandlers.value, ...mapped }
  } catch (e: any) {
    ElMessage.error(`代码执行错误: ${e?.message || String(e)}`)
  }
}

</script>

<style scoped>
.stack-queue-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-header {
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
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
  align-items: center;
  gap: 12px;
}

.content-body {
  flex: 1;
  padding: 20px 24px;
  overflow: auto;
}

.main-layout {
  display: flex;
  gap: 24px;
  min-height: 100%;
  align-items: stretch;
}

.left-panel {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 80px;
}

.right-panel {
  width: 420px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: calc(100vh - 180px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: left 0.3s ease, right 0.3s ease, width 0.3s ease;
}

.right-panel.fullscreen {
  position: fixed;
  left: calc(var(--sidebar-width, 220px) + 24px);
  right: 24px;
  top: 80px;
  bottom: 84px;
  width: auto;
  height: auto;
  z-index: 90;
}

.code-panel {
  flex: 1;
  min-height: 0;
}

.glass-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.02);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
}

.card-title::before {
  content: '';
  width: 4px;
  height: 14px;
  background: var(--primary-color);
  border-radius: 2px;
  margin-right: 8px;
}

.animation-container {
  padding: 0;
  min-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
}

.stack-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 380px;
  width: 100%;
}

.stack-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 16px;
  font-weight: 600;
}

.stack-shell {
  position: relative;
  width: 180px;
  height: 300px;
  border-left: 6px solid #dcdfe6;
  border-right: 6px solid #dcdfe6;
  border-bottom: 6px solid #dcdfe6;
  border-radius: 0 0 12px 12px;
  background: rgba(255, 255, 255, 0.5);
}

.stack-shell::after {
  content: '栈底 (Bottom)';
  position: absolute;
  left: 50%;
  bottom: -30px;
  transform: translateX(-50%);
  font-size: 13px;
  color: #a8abb2;
}

.stack-items {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  padding: 10px;
  gap: 8px;
}

.data-item {
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.35s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.stack-item {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stack-item.top-item {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.item-val {
  font-size: 18px;
  font-weight: bold;
}

.item-idx {
  font-size: 12px;
  opacity: 0.8;
}

.queue-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 380px;
  width: 100%;
}

.queue-track-wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
}

.queue-container {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 420px;
  min-height: 120px;
  border-top: 4px dashed #dcdfe6;
  border-bottom: 4px dashed #dcdfe6;
  padding: 0 16px;
  background: linear-gradient(90deg, rgba(250, 251, 252, 0) 0%, rgba(240, 242, 245, 0.5) 50%, rgba(250, 251, 252, 0) 100%);
}

.queue-items {
  display: flex;
  align-items: center;
  min-height: 80px;
  gap: 10px;
}

.queue-label {
  font-size: 14px;
  font-weight: 600;
  color: #909399;
}

.queue-item {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.queue-item.front-item {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.queue-item.rear-item {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.data-item.highlighted {
  transform: scale(1.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.operation-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.operation-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ops-input-group {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  padding: 12px;
  border-radius: 8px;
}

.operation-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.btn-peek {
  grid-column: 1 / -1;
}

.feature-list {
  font-size: 13px;
  line-height: 1.6;
  color: #606266;
}

.feature-list ul {
  margin: 8px 0 8px 20px;
}

.feature-list .application {
  margin-top: 10px;
  padding: 10px;
  background: #f0f9eb;
  border: 1px solid #e1f3d8;
  border-radius: 6px;
  font-size: 13px;
  color: #67c23a;
}

.info-panels-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.status-list {
  list-style: none;
  margin-top: 8px;
}

.status-list li {
  padding: 10px 0;
  border-bottom: 1px dashed #ebeef5;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.status-list li:last-child {
  border-bottom: none;
}

.status-val {
  font-weight: 600;
  color: var(--primary-color);
}

.info-panel {
  background: #f8f9fa;
}

/* TransitionGroup 动画 */
.stack-move,
.stack-enter-active,
.stack-leave-active,
.queue-move,
.queue-enter-active,
.queue-leave-active {
  transition: all 0.3s ease;
}

.stack-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.stack-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.queue-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.queue-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 1300px) {
  .main-layout {
    flex-direction: column;
  }

  .right-panel {
    position: static;
    width: 100%;
    height: auto;
  }

  .info-panels-grid {
    grid-template-columns: 1fr;
  }
}
</style>
