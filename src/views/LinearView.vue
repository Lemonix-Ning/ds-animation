<template>
  <div class="linear-view">
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
        <el-select v-model="selectedPreset" placeholder="选择预设案例" style="width: 150px" @change="loadPreset">
          <el-option label="自定义" value="" />
          <el-option 
            v-for="(preset, index) in currentPresets" 
            :key="index" 
            :label="preset.name" 
            :value="index" 
          />
        </el-select>
        <el-button type="primary" @click="resetDemo">
          <el-icon><Refresh /></el-icon>
          重置
        </el-button>
      </div>
    </div>
    
    <div class="content-body">
      <div class="main-layout">
        <div class="left-panel">
          <div class="info-card">
            <h3>{{ operationInfo.name }}</h3>
            <p>{{ operationInfo.description }}</p>
            <div class="complexity">
              <el-tag>时间: {{ operationInfo.timeComplexity }}</el-tag>
              <el-tag type="success">空间: {{ operationInfo.spaceComplexity }}</el-tag>
            </div>
          </div>

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

          <div class="info-panel" v-if="currentFrame">
            <h4>当前步骤</h4>
            <div class="step-info">
              <p><strong>操作:</strong> {{ getFrameTypeName(currentFrame.type) }}</p>
              <p><strong>描述:</strong> {{ currentFrame.description }}</p>
            </div>
          </div>
        </div>

        <div class="right-panel" :class="{ fullscreen: isCodeFullscreen }">
          <div class="params-card" v-show="!isCodeFullscreen">
            <el-form :inline="true">
              <el-form-item label="初始序列">
                <el-input v-model="arrayInput" placeholder="如: 1,2,3,4,5" style="width: 220px" />
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
                <el-button type="primary" @click="runOperation(true)">执行</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="code-panel">
            <CodeEditorPanel
              :algorithm-code="currentAlgorithmCode"
              :algorithm-key="selectedOperation"
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
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
import { linearPresets } from '../core/presets'
import { linearAlgorithmCode } from '../core/algorithmCode'
import type { AlgorithmCode } from '../core/algorithmCode'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { LinearFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'
import CodeEditorPanel from '../components/common/CodeEditorPanel.vue'

// 状态
const selectedOperation = ref('insert')
const selectedPreset = ref<number | ''>('')
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
const isCodeFullscreen = ref(false)
const customHandlers = ref<Partial<Record<string, Function>>>({})
let paramsTimer: ReturnType<typeof setTimeout> | null = null

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

// 当前预设案例
const currentPresets = computed(() => {
  return isLinkedListOperation.value ? linearPresets.linked : linearPresets.sequential
})

const fallbackAlgorithmCode: AlgorithmCode = {
  title: '线性表',
  language: 'javascript',
  code: '// 暂无代码'
}

const currentAlgorithmCode = computed<AlgorithmCode>(() => {
  return (linearAlgorithmCode as Record<string, AlgorithmCode>)[selectedOperation.value]
    ?? linearAlgorithmCode.insert
    ?? fallbackAlgorithmCode
})

const currentHighlightLine = computed(() => {
  if (!currentFrame.value) return undefined
  if ((currentFrame.value as any).highlightLine !== undefined) return (currentFrame.value as any).highlightLine

  const frame = currentFrame.value as any
  const desc = (frame.description || '') as string

  if (selectedOperation.value === 'insert') {
    if (frame.type === 'highlight') return frame.data?.error ? 1 : 2
    if (frame.type === 'move') return 3
    if (frame.type === 'insert') return 5
    if (frame.type === 'reset') return desc.includes('完成') ? 6 : 0
    return 0
  }

  if (selectedOperation.value === 'delete') {
    if (frame.type === 'highlight') return frame.data?.error ? 1 : 2
    if (frame.type === 'delete') return 5
    if (frame.type === 'move') return 3
    if (frame.type === 'reset') return desc.includes('完成') ? 6 : 0
    return 0
  }

  if (selectedOperation.value === 'search') {
    if (frame.type === 'search') return 1
    if (frame.type === 'highlight') return 2
    if (frame.type === 'reset') return desc.includes('未找到') ? 4 : 0
    return 0
  }

  if (selectedOperation.value === 'reverse') {
    if (frame.type === 'move') return 5
    if (frame.type === 'highlight') {
      if (desc.includes('三指针')) return 1
      if (desc.includes('保存curr')) return 4
      if (desc.includes('移动指针')) return 6
      return 3
    }
    if (frame.type === 'reset') return desc.includes('完成') ? 9 : 0
    return 0
  }

  if (selectedOperation.value === 'linkedInsert') {
    if (frame.type === 'highlight') {
      if (desc.includes('位置') && desc.includes('不合法')) return 6
      if (desc.includes('遍历') || desc.includes('前驱')) return 3
      return 3
    }
    if (frame.type === 'insert' || frame.type === 'move') return 7
    if (frame.type === 'reset') return desc.includes('完成') ? 8 : 0
    return 0
  }

  if (selectedOperation.value === 'linkedDelete') {
    if (frame.type === 'highlight') {
      if (desc.includes('位置') && desc.includes('不合法')) return 6
      if (desc.includes('遍历') || desc.includes('前驱')) return 3
      return 3
    }
    if (frame.type === 'delete') return 7
    if (frame.type === 'reset') return desc.includes('完成') ? 8 : 0
    return 0
  }

  return 0
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

// 加载预设案例
function loadPreset() {
  if (selectedPreset.value === '') return
  
  const preset = currentPresets.value[selectedPreset.value as number]
  if (preset) {
    arrayInput.value = preset.data.join(', ')
    parseArrayInput()
    if (isLinkedListOperation.value) {
      initializeLinkedList()
    }
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
function runOperation(autoPlay = false) {
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
        frames = runLinearOperation('reverse', [linkedListNodes.value], linkedListReverse)
        break
      case 'linkedInsert':
        frames = runLinearOperation('linkedInsert', [linkedListNodes.value, linkedInsertIndex.value, linkedInsertValue.value], linkedListInsert)
        break
      case 'linkedDelete':
        frames = runLinearOperation('linkedDelete', [linkedListNodes.value, linkedDeleteIndex.value], linkedListDelete)
        break
    }
  } else {
    // 顺序表操作
    parseArrayInput()
    
    switch (selectedOperation.value) {
      case 'insert':
        frames = runLinearOperation('insert', [array.value, insertIndex.value, insertValue.value], sequentialInsert)
        break
      case 'delete':
        frames = runLinearOperation('delete', [array.value, deleteIndex.value], sequentialDelete)
        break
      case 'search':
        frames = runLinearOperation('search', [array.value, searchTarget.value], sequentialSearch)
        break
    }
  }

  if (frames.length > 0) {
    load(frames)
    if (autoPlay) {
      play()
    }
  }
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
  selectedPreset.value = ''
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
  load([])
}

function reset() {
  stop()
  highlightedIndex.value = null
  movingIndex.value = null
  foundIndex.value = null
  highlightedNode.value = null
  runOperation()
}

function toggleCodeFullscreen() {
  isCodeFullscreen.value = !isCodeFullscreen.value
}

function runLinearOperation(key: string, args: any[], fallback: Function): LinearFrame[] {
  const customFn = customHandlers.value[key]
  const fnToRun = typeof customFn === 'function' ? customFn : fallback
  const result = fnToRun(...args)

  if (!Array.isArray(result) || result.length === 0 || !result[0]?.type) {
    ElMessage.error('请返回有效帧数组')
    return []
  }

  return result
}

function handleApplyCode(code: string) {
  try {
    const wrappedCode = `
      (function() {
        ${code}
        const names = [
          'sequentialInsert', 'sequential_insert', 'SequentialInsert',
          'sequentialDelete', 'sequential_delete', 'SequentialDelete',
          'sequentialSearch', 'sequential_search', 'SequentialSearch',
          'linkedListReverse', 'linked_list_reverse', 'LinkedListReverse',
          'linkedListInsert', 'linked_list_insert', 'LinkedListInsert',
          'linkedListDelete', 'linked_list_delete', 'LinkedListDelete',
          'insert', 'remove', 'delete', 'search', 'reverse'
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
    if (found.sequentialInsert || found.insert) mapped.insert = found.sequentialInsert || found.insert
    if (found.sequentialDelete || found.remove) mapped.delete = found.sequentialDelete || found.remove
    if (found.sequentialSearch || found.search) mapped.search = found.sequentialSearch || found.search
    if (found.linkedListReverse || found.reverse) mapped.reverse = found.linkedListReverse || found.reverse
    if (found.linkedListInsert) mapped.linkedInsert = found.linkedListInsert
    if (found.linkedListDelete) mapped.linkedDelete = found.linkedListDelete

    const keys = Object.keys(mapped)
    if (keys.length === 0) {
      ElMessage.error('未找到有效函数')
      return
    }

    customHandlers.value = { ...customHandlers.value, ...mapped }
    runOperation()
  } catch (e: any) {
    ElMessage.error(`代码执行错误: ${e?.message || String(e)}`)
  }
}

function handlePlay() {
  if (currentIndex.value === -1 || totalFrames.value === 0) {
    runOperation()
  }

  if (totalFrames.value === 0) {
    ElMessage.warning('当前没有可播放的动画，请先输入参数')
    return
  }

  play()
}

function scheduleAutoRun() {
  if (paramsTimer) clearTimeout(paramsTimer)
  paramsTimer = setTimeout(() => {
    if (isPlaying.value) return
    selectedPreset.value = ''
    runOperation()
  }, 280)
}

// 监听操作变化
watch(selectedOperation, () => {
  resetDemo()
  customHandlers.value = {}
  selectedPreset.value = ''
  
  // 加载第一个预设案例
  if (currentPresets.value.length > 0) {
    selectedPreset.value = 0
    loadPreset()
    runOperation()
  }
})

watch(arrayInput, () => {
  scheduleAutoRun()
})

watch(insertIndex, () => {
  if (selectedOperation.value === 'insert') scheduleAutoRun()
})
watch(insertValue, () => {
  if (selectedOperation.value === 'insert') scheduleAutoRun()
})
watch(deleteIndex, () => {
  if (selectedOperation.value === 'delete') scheduleAutoRun()
})
watch(searchTarget, () => {
  if (selectedOperation.value === 'search') scheduleAutoRun()
})
watch(linkedInsertIndex, () => {
  if (selectedOperation.value === 'linkedInsert') scheduleAutoRun()
})
watch(linkedInsertValue, () => {
  if (selectedOperation.value === 'linkedInsert') scheduleAutoRun()
})
watch(linkedDeleteIndex, () => {
  if (selectedOperation.value === 'linkedDelete') scheduleAutoRun()
})

// 监听动画完成状态，同步结果到输入框
watch(isFinished, (finished) => {
  if (!finished || !currentFrame.value) return

  if (currentFrame.value.data?.array) {
    array.value = [...currentFrame.value.data.array]
    arrayInput.value = array.value.join(', ')
    displayArray.value = [...array.value]
  }

  if (currentFrame.value.data?.nodes) {
    linkedListNodes.value = currentFrame.value.data.nodes.map((n: LinkedListNode) => ({ ...n }))
    arrayInput.value = linkedListNodes.value.map(n => n.value).join(', ')
  }
})

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
  parseArrayInput()
  if (currentPresets.value.length > 0) {
    selectedPreset.value = 0
    loadPreset()
  }
  runOperation()
})

onBeforeUnmount(() => {
  if (paramsTimer) clearTimeout(paramsTimer)
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
  display: flex;
  flex-direction: column;
  gap: 12px;
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

.code-panel {
  flex: 1;
  min-height: 0;
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
