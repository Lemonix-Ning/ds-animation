<template>
  <div class="sorting-view">
    <!-- 头部 -->
    <div class="content-header">
      <h2>第8章 内部排序</h2>
      <div class="header-actions">
        <el-select v-model="selectedAlgorithm" placeholder="选择算法" style="width: 150px">
          <el-option 
            v-for="(algo, key) in sortingAlgorithms" 
            :key="key" 
            :label="algo.info.name" 
            :value="key" 
          />
        </el-select>
        <el-button type="primary" @click="generateRandom">
          <el-icon><Refresh /></el-icon>
          随机生成
        </el-button>
        <el-button @click="showInputDialog = true">
          <el-icon><Edit /></el-icon>
          自定义输入
        </el-button>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="content-body">
      <!-- 算法信息卡片 -->
      <div class="info-card" v-if="currentAlgorithm">
        <div class="info-header">
          <h3>{{ currentAlgorithm.info.name }}</h3>
          <span class="name-en">{{ currentAlgorithm.info.nameEn }}</span>
        </div>
        <p class="description">{{ currentAlgorithm.info.description }}</p>
        <div class="complexity">
          <el-tag>时间: {{ currentAlgorithm.info.timeComplexity }}</el-tag>
          <el-tag type="success">空间: {{ currentAlgorithm.info.spaceComplexity }}</el-tag>
          <el-tag :type="currentAlgorithm.info.stable ? 'success' : 'warning'">
            {{ currentAlgorithm.info.stable ? '稳定' : '不稳定' }}
          </el-tag>
        </div>
      </div>
      
      <!-- 动画演示区 -->
      <div class="animation-container">
        <div class="bar-container">
          <div 
            v-for="(value, index) in displayArray" 
            :key="index"
            class="bar"
            :class="getBarClass(index)"
            :style="{ height: `${(value / maxValue) * 250}px` }"
            :data-value="value"
          >
          </div>
        </div>
      </div>
      
      <!-- 数组卡片视图 -->
      <div class="array-view">
        <TransitionGroup name="list" tag="div" class="array-cards">
          <div 
            v-for="(value, index) in displayArray" 
            :key="`${index}-${value}`"
            class="array-card"
            :class="getBarClass(index)"
          >
            <span class="index">{{ index }}</span>
            <span class="value">{{ value }}</span>
          </div>
        </TransitionGroup>
      </div>
      
      <!-- 步骤信息 -->
      <div class="info-panel" v-if="currentFrame">
        <h4>当前步骤</h4>
        <div class="step-info">
          <p><strong>操作类型:</strong> {{ getFrameTypeName(currentFrame.type) }}</p>
          <p><strong>描述:</strong> {{ currentFrame.description }}</p>
          <p v-if="currentFrame.indices.length > 0">
            <strong>涉及位置:</strong> {{ currentFrame.indices.join(', ') }}
          </p>
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
    
    <!-- 自定义输入对话框 -->
    <el-dialog v-model="showInputDialog" title="自定义输入数组" width="400px">
      <el-input
        v-model="customInput"
        type="textarea"
        :rows="3"
        placeholder="输入数字，用逗号或空格分隔，如: 5, 3, 8, 1, 9"
      />
      <template #footer>
        <el-button @click="showInputDialog = false">取消</el-button>
        <el-button type="primary" @click="applyCustomInput">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
// @ts-ignore - unused variable for future use
import { Refresh, Edit } from '@element-plus/icons-vue'
import { sortingAlgorithms } from '../core/algorithms/sorting'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { SortFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'

// 状态
const selectedAlgorithm = ref('bubble')
const originalArray = ref<number[]>([])
const displayArray = ref<number[]>([])
const showInputDialog = ref(false)
const customInput = ref('')

// 高亮状态
const comparingIndices = ref<number[]>([])
const swappingIndices = ref<number[]>([])
const sortedIndices = ref<Set<number>>(new Set())
const pivotIndex = ref<number | null>(null)

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
} = useAnimationPlayer<SortFrame>()

// 计算属性
const currentAlgorithm = computed(() => sortingAlgorithms[selectedAlgorithm.value] ?? sortingAlgorithms['bubble'])
const maxValue = computed(() => Math.max(...displayArray.value, 1))

// 获取柱状图样式类
function getBarClass(index: number) {
  if (sortedIndices.value.has(index)) return 'sorted'
  if (pivotIndex.value === index) return 'pivot'
  if (swappingIndices.value.includes(index)) return 'swapping'
  if (comparingIndices.value.includes(index)) return 'comparing'
  return ''
}

// 获取帧类型名称
function getFrameTypeName(type: string) {
  const names: Record<string, string> = {
    compare: '比较',
    swap: '交换',
    set: '赋值',
    sorted: '已排序',
    pivot: '选择基准',
    partition: '分区',
    merge: '合并',
    highlight: '高亮',
    reset: '重置'
  }
  return names[type] || type
}

// 处理帧变化
function handleFrameChange(frame: SortFrame | null, index: number) {
  // 重置高亮状态
  comparingIndices.value = []
  swappingIndices.value = []
  pivotIndex.value = null
  
  if (!frame) {
    displayArray.value = [...originalArray.value]
    sortedIndices.value = new Set()
    return
  }
  
  // 更新显示数组
  if (frame.values) {
    displayArray.value = [...frame.values]
  }
  
  // 根据帧类型更新高亮
  switch (frame.type) {
    case 'compare':
      comparingIndices.value = frame.indices
      break
    case 'swap':
      swappingIndices.value = frame.indices
      break
    case 'pivot':
      pivotIndex.value = frame.indices[0] ?? null
      break
    case 'sorted':
      frame.indices.forEach(i => sortedIndices.value.add(i))
      break
    case 'reset':
      sortedIndices.value = new Set()
      break
  }
}

// 生成随机数组
function generateRandom() {
  const length = Math.floor(Math.random() * 6) + 8 // 8-13个元素
  const arr = Array.from({ length }, () => Math.floor(Math.random() * 50) + 1)
  setArray(arr)
}

// 设置数组并运行算法
function setArray(arr: number[]) {
  originalArray.value = [...arr]
  displayArray.value = [...arr]
  sortedIndices.value = new Set()
  comparingIndices.value = []
  swappingIndices.value = []
  pivotIndex.value = null
  
  // 运行算法生成帧序列
  if (currentAlgorithm.value) {
    const frames = currentAlgorithm.value.fn(arr)
    load(frames)
  }
}

// 重置
function reset() {
  stop()
  displayArray.value = [...originalArray.value]
  sortedIndices.value = new Set()
  comparingIndices.value = []
  swappingIndices.value = []
  pivotIndex.value = null
}

// 应用自定义输入
function applyCustomInput() {
  const numbers = customInput.value
    .split(/[,\s]+/)
    .map(s => parseInt(s.trim()))
    .filter(n => !isNaN(n))
  
  if (numbers.length > 0) {
    setArray(numbers)
    showInputDialog.value = false
    customInput.value = ''
  }
}

// 监听算法变化
watch(selectedAlgorithm, () => {
  if (originalArray.value.length > 0) {
    setArray([...originalArray.value])
  }
})

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
  generateRandom()
})
</script>

<style scoped>
.sorting-view {
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

.content-header h2 {
  font-size: 18px;
  color: #303133;
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

.info-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 10px;
}

.info-header h3 {
  font-size: 18px;
  color: #303133;
}

.name-en {
  font-size: 14px;
  color: #909399;
}

.description {
  color: #606266;
  margin-bottom: 15px;
  line-height: 1.6;
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

.bar-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 300px;
  gap: 4px;
  padding: 20px 20px 40px;
}

.bar {
  width: 30px;
  min-width: 20px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
  position: relative;
}

.bar::after {
  content: attr(data-value);
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #606266;
}

.bar.comparing {
  background: linear-gradient(180deg, #f093fb 0%, #f5576c 100%);
  transform: scaleY(1.05);
}

.bar.swapping {
  background: linear-gradient(180deg, #4facfe 0%, #00f2fe 100%);
}

.bar.sorted {
  background: linear-gradient(180deg, #43e97b 0%, #38f9d7 100%);
}

.bar.pivot {
  background: linear-gradient(180deg, #fa709a 0%, #fee140 100%);
}

.array-view {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
  width: 50px;
  height: 60px;
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
  font-size: 18px;
  font-weight: bold;
}

.array-card.comparing {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  transform: scale(1.1);
}

.array-card.swapping {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.array-card.sorted {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.array-card.pivot {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
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

.step-info p {
  margin: 5px 0;
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
