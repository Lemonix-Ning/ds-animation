<template>
  <div class="stack-queue-view">
    <!-- 头部 -->
    <div class="content-header">
      <h2>第3章 栈与队列</h2>
      <div class="header-actions">
        <el-radio-group v-model="dataStructure" @change="resetDemo">
          <el-radio-button value="stack">栈</el-radio-button>
          <el-radio-button value="queue">队列</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="content-body">
      <el-row :gutter="20">
        <!-- 左侧：可视化 -->
        <el-col :span="14">
          <div class="animation-container">
            <!-- 栈可视化 -->
            <div v-if="dataStructure === 'stack'" class="stack-visual">
              <div class="stack-container">
                <div class="stack-label top">栈顶 (Top)</div>
                <TransitionGroup name="stack" tag="div" class="stack-items">
                  <div 
                    v-for="(item, index) in displayStack" 
                    :key="`${index}-${item}`"
                    class="stack-item"
                    :class="{ 
                      'top-item': index === displayStack.length - 1,
                      'highlighted': highlightedIndex === index
                    }"
                  >
                    <span class="item-value">{{ item }}</span>
                    <span class="item-index">{{ index }}</span>
                  </div>
                </TransitionGroup>
                <div class="stack-bottom">
                  <div class="stack-base"></div>
                  <span>栈底</span>
                </div>
              </div>
            </div>
            
            <!-- 队列可视化 -->
            <div v-if="dataStructure === 'queue'" class="queue-visual">
              <div class="queue-container">
                <div class="queue-label front">队首 (Front)</div>
                <TransitionGroup name="queue" tag="div" class="queue-items">
                  <div 
                    v-for="(item, index) in displayQueue" 
                    :key="`${index}-${item}`"
                    class="queue-item"
                    :class="{ 
                      'front-item': index === 0,
                      'rear-item': index === displayQueue.length - 1,
                      'highlighted': highlightedIndex === index
                    }"
                  >
                    <span class="item-value">{{ item }}</span>
                    <span class="item-index">{{ index }}</span>
                  </div>
                </TransitionGroup>
                <div class="queue-label rear">队尾 (Rear)</div>
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
        
        <!-- 右侧：操作面板 -->
        <el-col :span="10">
          <div class="operation-panel">
            <h3>{{ dataStructure === 'stack' ? '栈操作' : '队列操作' }}</h3>
            
            <div class="operation-group">
              <el-input-number v-model="inputValue" :min="0" :max="99" style="width: 120px" />
              
              <div class="operation-buttons">
                <el-button 
                  type="primary" 
                  @click="dataStructure === 'stack' ? handlePush() : handleEnqueue()"
                  :disabled="isPlaying"
                >
                  <el-icon><Top /></el-icon>
                  {{ dataStructure === 'stack' ? '入栈 Push' : '入队 Enqueue' }}
                </el-button>
                
                <el-button 
                  type="danger" 
                  @click="dataStructure === 'stack' ? handlePop() : handleDequeue()"
                  :disabled="isPlaying || (dataStructure === 'stack' ? displayStack.length === 0 : displayQueue.length === 0)"
                >
                  <el-icon><Bottom /></el-icon>
                  {{ dataStructure === 'stack' ? '出栈 Pop' : '出队 Dequeue' }}
                </el-button>
                
                <el-button 
                  @click="handlePeek"
                  :disabled="isPlaying || (dataStructure === 'stack' ? displayStack.length === 0 : displayQueue.length === 0)"
                >
                  <el-icon><View /></el-icon>
                  {{ dataStructure === 'stack' ? '查看栈顶' : '查看队首' }}
                </el-button>
              </div>
            </div>
            
            <el-divider />
            
            <div class="info-section">
              <h4>数据结构特点</h4>
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
            
            <el-divider />
            
            <div class="status-section">
              <h4>当前状态</h4>
              <p>元素个数: {{ dataStructure === 'stack' ? displayStack.length : displayQueue.length }}</p>
              <p v-if="dataStructure === 'stack'">
                栈顶元素: {{ displayStack.length > 0 ? displayStack[displayStack.length - 1] : '空' }}
              </p>
              <p v-else>
                队首元素: {{ displayQueue.length > 0 ? displayQueue[0] : '空' }}
              </p>
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
      @reset="stop"
      @step-forward="stepForward"
      @step-backward="stepBackward"
      @go-to="goTo"
      @speed-change="setSpeed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Top, Bottom, View } from '@element-plus/icons-vue'
import { stackPush, stackPop, stackPeek, queueEnqueue, queueDequeue, queuePeek } from '../core/algorithms/stackQueue'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { StackFrame, QueueFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'

// 状态
const dataStructure = ref<'stack' | 'queue'>('stack')
const inputValue = ref(10)
const stack = ref<number[]>([])
const queue = ref<number[]>([])
const displayStack = ref<number[]>([])
const displayQueue = ref<number[]>([])
const highlightedIndex = ref<number | null>(null)

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
  const frames = stackPush(stack.value, inputValue.value)
  stack.value.push(inputValue.value)
  load(frames)
  inputValue.value = Math.floor(Math.random() * 90) + 10
}

function handlePop() {
  const frames = stackPop(stack.value)
  if (stack.value.length > 0) {
    stack.value.pop()
  }
  load(frames)
}

function handlePeek() {
  if (dataStructure.value === 'stack') {
    const frames = stackPeek(stack.value)
    load(frames)
  } else {
    const frames = queuePeek(queue.value)
    load(frames)
  }
}

// 队列操作
function handleEnqueue() {
  const frames = queueEnqueue(queue.value, inputValue.value)
  queue.value.push(inputValue.value)
  load(frames)
  inputValue.value = Math.floor(Math.random() * 90) + 10
}

function handleDequeue() {
  const frames = queueDequeue(queue.value)
  if (queue.value.length > 0) {
    queue.value.shift()
  }
  load(frames)
}

// 根据数据结构类型选择操作
function handlePushOrEnqueue() {
  if (dataStructure.value === 'stack') {
    handlePush()
  } else {
    handleEnqueue()
  }
}

function handlePopOrDequeue() {
  if (dataStructure.value === 'stack') {
    handlePop()
  } else {
    handleDequeue()
  }
}

// 重置演示
function resetDemo() {
  stop()
  stack.value = []
  queue.value = []
  displayStack.value = []
  displayQueue.value = []
  highlightedIndex.value = null
}

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
})

// 根据数据结构选择正确的操作
const handlePushAction = () => {
  if (dataStructure.value === 'stack') {
    handlePush()
  } else {
    handleEnqueue()
  }
}

const handlePopAction = () => {
  if (dataStructure.value === 'stack') {
    handlePop()
  } else {
    handleDequeue()
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
  padding: 15px 25px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content-body {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.animation-container {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

/* 栈样式 */
.stack-visual {
  display: flex;
  justify-content: center;
}

.stack-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
}

.stack-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 10px;
}

.stack-items {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  min-height: 200px;
  border-left: 3px solid #409eff;
  border-right: 3px solid #409eff;
  padding: 10px;
}

.stack-item {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 4px;
  margin: 3px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  transition: all 0.3s ease;
}

.stack-item.top-item {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stack-item.highlighted {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.stack-item .item-value {
  font-size: 18px;
  font-weight: bold;
}

.stack-item .item-index {
  font-size: 12px;
  opacity: 0.7;
}

.stack-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.stack-base {
  width: 130px;
  height: 10px;
  background: #409eff;
  border-radius: 0 0 5px 5px;
}

.stack-bottom span {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

/* 队列样式 */
.queue-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.queue-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.queue-label {
  font-size: 14px;
  color: #909399;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.queue-items {
  display: flex;
  align-items: center;
  min-width: 300px;
  min-height: 80px;
  border-top: 3px solid #67c23a;
  border-bottom: 3px solid #67c23a;
  padding: 10px;
  gap: 10px;
}

.queue-item {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.queue-item.front-item {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.queue-item.rear-item {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.queue-item.highlighted {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.queue-item .item-value {
  font-size: 18px;
  font-weight: bold;
}

.queue-item .item-index {
  font-size: 10px;
  opacity: 0.7;
}

/* 操作面板 */
.operation-panel {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.operation-panel h3 {
  margin-bottom: 20px;
  color: #303133;
}

.operation-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.operation-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-section h4,
.status-section h4 {
  margin-bottom: 10px;
  color: #606266;
}

.feature-list {
  font-size: 14px;
  line-height: 1.8;
  color: #606266;
}

.feature-list ul {
  margin: 10px 0 10px 20px;
}

.feature-list .application {
  margin-top: 10px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 13px;
}

.status-section p {
  font-size: 14px;
  color: #606266;
  margin: 5px 0;
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
</style>
