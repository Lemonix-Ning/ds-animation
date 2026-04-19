<template>
  <div class="sorting-view">
    <!-- 澶撮儴 -->
    <div class="content-header">
      <h2>第2章 内部排序</h2>
      <div class="header-actions">
        <el-select v-model="selectedAlgorithm" placeholder="选择算法" style="width: 150px">
          <el-option 
            v-for="(algo, key) in sortingAlgorithms" 
            :key="key" 
            :label="algo.info.name" 
            :value="key" 
          />
        </el-select>
        <el-select v-model="selectedPreset" placeholder="选择预设案例" style="width: 150px" @change="loadPreset">
          <el-option label="自定义" value="" />
          <el-option 
            v-for="(preset, index) in currentPresets" 
            :key="index" 
            :label="preset.name" 
            :value="index" 
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
    
    <!-- 涓诲唴瀹瑰尯 -->
    <div class="content-body">
      <div class="main-layout">
        <!-- 宸︿晶锛氬姩鐢诲拰淇℃伅 -->
        <div class="left-panel">
          <!-- 绠楁硶淇℃伅鍗＄墖 -->
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
            <div class="runtime-summary">
              <div class="runtime-item">
                <span class="runtime-label">比较</span>
                <span class="runtime-value">{{ runtimeStats.comparisons }}</span>
              </div>
              <div class="runtime-item">
                <span class="runtime-label">交换/移动</span>
                <span class="runtime-value">{{ runtimeStats.swaps }}</span>
              </div>
              <div class="runtime-item">
                <span class="runtime-label">数组访问</span>
                <span class="runtime-value">{{ runtimeStats.arrayAccesses }}</span>
              </div>
            </div>
          </div>
          
          <!-- 鍔ㄧ敾婕旂ず鍖?-->
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
          
          <!-- 鏁扮粍鍗＄墖瑙嗗浘 -->
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
          
          <!-- 姝ラ淇℃伅 -->
          <div class="info-panel" v-if="currentFrame">
            <div class="step-side">
              <h4>当前步骤</h4>
              <div class="step-info">
                <p><strong>动作类型:</strong> {{ getFrameTypeName(currentFrame.type) }}</p>
                <p><strong>执行详情:</strong> {{ currentFrame.description }}</p>
                <p v-if="currentFrame.indices.length > 0">
                  <strong>操作指针:</strong> {{ currentFrame.indices.join(', ') }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 鍙充晶锛氫唬鐮佺紪杈戝櫒闈㈡澘 -->
        <div class="right-panel" :class="{ fullscreen: isCodeFullscreen }">
          <CodeEditorPanel 
            :algorithm-code="currentAlgorithmCode"
            :algorithm-key="selectedAlgorithm"
            :input-array="originalArray"
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
    
    <!-- 鎺у埗鏉?-->
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
    
    <!-- 鑷畾涔夎緭鍏ュ璇濇 -->
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
import { Refresh, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { sortingAlgorithms } from '../core/algorithms/sorting'
import { sortingPresets } from '../core/presets'
import { sortingAlgorithmCode } from '../core/algorithmCode'
import type { AlgorithmCode } from '../core/algorithmCode'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { SortFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'
import CodeEditorPanel from '../components/common/CodeEditorPanel.vue'

const selectedAlgorithm = ref('bubble')
const isCodeFullscreen = ref(false)
const selectedPreset = ref<number | ''>('')
const originalArray = ref<number[]>([])
const displayArray = ref<number[]>([])
const showInputDialog = ref(false)
const customInput = ref('')

const comparingIndices = ref<number[]>([])
const swappingIndices = ref<number[]>([])
const sortedIndices = ref<Set<number>>(new Set())
const pivotIndex = ref<number | null>(null)
const userCustomFrames = ref<SortFrame[] | null>(null)

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

const currentAlgorithm = computed(() => sortingAlgorithms[selectedAlgorithm.value] ?? sortingAlgorithms.bubble)
const maxValue = computed(() => Math.max(...displayArray.value, 1))
const currentPresets = computed(() => sortingPresets[selectedAlgorithm.value] || [])
const fallbackAlgorithmCode: AlgorithmCode = {
  title: '排序算法',
  language: 'javascript',
  code: '// 暂无代码'
}
const currentAlgorithmCode = computed<AlgorithmCode>(() => {
  return (sortingAlgorithmCode as Record<string, AlgorithmCode>)[selectedAlgorithm.value]
    ?? sortingAlgorithmCode.bubble
    ?? fallbackAlgorithmCode
})
const currentHighlightLine = computed(() => {
  if (!currentFrame.value) return undefined
  if (currentFrame.value.highlightLine !== undefined) return currentFrame.value.highlightLine

  const frame = currentFrame.value

  if (selectedAlgorithm.value === 'bubble') {
    if (frame.type === 'compare') return 5
    if (frame.type === 'swap') return 8
    if (frame.type === 'sorted') return 12
    return 0
  }

  if (selectedAlgorithm.value === 'selection') {
    if (frame.type === 'highlight') return 4
    if (frame.type === 'compare') return 7
    if (frame.type === 'swap') return 13
    if (frame.type === 'sorted') return 15
    return 0
  }

  if (selectedAlgorithm.value === 'insertion') {
    if (frame.type === 'highlight') return 5
    if (frame.type === 'compare') return 8
    if (frame.type === 'set') return 9
    if (frame.type === 'sorted') return 14
    return 0
  }

  if (selectedAlgorithm.value === 'quick') {
    if (frame.type === 'partition') return 1
    if (frame.type === 'pivot') return 9
    if (frame.type === 'compare') return 14
    if (frame.type === 'swap') return 16
    if (frame.type === 'sorted') return 5
    return 0
  }

  if (selectedAlgorithm.value === 'heap') {
    if (frame.type === 'highlight') return 3
    if (frame.type === 'compare') return 19
    if (frame.type === 'swap') return 23
    if (frame.type === 'sorted') return 9
    return 0
  }

  if (selectedAlgorithm.value === 'shell') {
    if (frame.type === 'highlight') return 2
    if (frame.type === 'compare') return 7
    if (frame.type === 'set') return 8
    if (frame.type === 'sorted') return 13
    return 0
  }

  if (selectedAlgorithm.value === 'merge') {
    if (frame.type === 'partition') return 1
    if (frame.type === 'compare') return 11
    if (frame.type === 'merge') return 12
    if (frame.type === 'sorted') return 18
    return 0
  }

  return 0
})
const runtimeStats = computed(() => {
  return currentFrame.value?.stats ?? {
    comparisons: 0,
    swaps: 0,
    arrayAccesses: 0
  }
})

function getBarClass(index: number) {
  if (sortedIndices.value.has(index)) return 'sorted'
  if (pivotIndex.value === index) return 'pivot'
  if (swappingIndices.value.includes(index)) return 'swapping'
  if (comparingIndices.value.includes(index)) return 'comparing'
  return ''
}

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

function handleFrameChange(frame: SortFrame | null) {
  comparingIndices.value = []
  swappingIndices.value = []
  pivotIndex.value = null

  if (!frame) {
    displayArray.value = [...originalArray.value]
    sortedIndices.value = new Set()
    return
  }

  if (frame.values) {
    displayArray.value = [...frame.values]
  }

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

function loadPreset() {
  if (selectedPreset.value === '') return
  const preset = currentPresets.value[selectedPreset.value as number]
  if (preset) setArray(preset.data)
}

function generateRandom() {
  const length = Math.floor(Math.random() * 6) + 8
  const arr = Array.from({ length }, () => Math.floor(Math.random() * 50) + 1)
  setArray(arr)
  selectedPreset.value = ''
}

function setArray(arr: number[]) {
  originalArray.value = [...arr]
  displayArray.value = [...arr]
  sortedIndices.value = new Set()
  comparingIndices.value = []
  swappingIndices.value = []
  pivotIndex.value = null

  if (userCustomFrames.value) {
    load(userCustomFrames.value)
  } else if (currentAlgorithm.value) {
    const frames = currentAlgorithm.value.fn(arr)
    load(frames)
  }
}

function reset() {
  stop()

  if (userCustomFrames.value) {
    load(userCustomFrames.value)
  } else if (currentAlgorithm.value) {
    const frames = currentAlgorithm.value.fn(originalArray.value)
    load(frames)
  }

  displayArray.value = [...originalArray.value]
  sortedIndices.value = new Set()
  comparingIndices.value = []
  swappingIndices.value = []
  pivotIndex.value = null
}

function applyCustomInput() {
  const numbers = customInput.value
    .split(/[,\s]+/)
    .map(s => parseInt(s.trim(), 10))
    .filter(n => !isNaN(n))

  if (numbers.length > 0) {
    setArray(numbers)
    showInputDialog.value = false
    customInput.value = ''
    selectedPreset.value = ''
  }
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
        const functionNames = [
          'bubbleSort', 'bubble_sort', 'BubbleSort',
          'selectionSort', 'selection_sort', 'SelectionSort',
          'insertionSort', 'insertion_sort', 'InsertionSort',
          'quickSort', 'quick_sort', 'QuickSort',
          'heapSort', 'heap_sort', 'HeapSort',
          'shellSort', 'shell_sort', 'ShellSort',
          'mergeSort', 'merge_sort', 'MergeSort',
          'sort'
        ]
        for (const name of functionNames) {
          try {
            const fn = eval(name)
            if (typeof fn === 'function') return fn
          } catch (e) {}
        }
        throw new Error('未找到有效的排序函数')
      })()
    `

    const sortFunction = eval(wrappedCode)

    if (typeof sortFunction !== 'function') {
      ElMessage.error('代码必须定义一个排序函数')
      return
    }

    const result = sortFunction([...originalArray.value])

    if (!Array.isArray(result)) {
      ElMessage.error('排序函数必须返回帧数组')
      return
    }

    if (result.length === 0) {
      ElMessage.error('返回的帧数组为空')
      return
    }

    if (!result[0] || !result[0].type) {
      ElMessage.error('返回的帧数组格式不正确')
      return
    }

    stop()
    userCustomFrames.value = result
    load(result)

    displayArray.value = [...originalArray.value]
    sortedIndices.value = new Set()
    comparingIndices.value = []
    swappingIndices.value = []
    pivotIndex.value = null

    if (totalFrames.value > 0) goTo(0)

  } catch (e: any) {
    const errorMsg = e?.message || String(e)
    ElMessage.error({
      message: `代码执行错误: ${errorMsg}`,
      duration: 5000,
      showClose: true
    })
  }
}

watch(selectedAlgorithm, () => {
  selectedPreset.value = ''
  userCustomFrames.value = null
  if (originalArray.value.length > 0) setArray([...originalArray.value])
})

onMounted(() => {
  setOnFrameChange(handleFrameChange)
  if (currentPresets.value.length > 0) {
    selectedPreset.value = 0
    loadPreset()
  } else {
    generateRandom()
  }
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

.runtime-summary {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.runtime-item {
  background: #f5f7fa;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
}

.runtime-label {
  display: block;
  font-size: 12px;
  color: #909399;
}

.runtime-value {
  display: block;
  margin-top: 4px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
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

.step-side h4 {
  margin-bottom: 10px;
  color: var(--primary-color);
}

.step-info {
  font-size: 14px;
  line-height: 1.7;
}

.step-info p {
  margin: 5px 0;
}

@media (max-width: 1100px) {
  .runtime-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* TransitionGroup 鍔ㄧ敾 */
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

