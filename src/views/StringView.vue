<template>
  <div class="string-view">
    <!-- 头部 -->
    <div class="content-header">
      <h2>第4章 串与KMP算法</h2>
      <div class="header-actions">
        <el-select v-model="selectedAlgorithm" style="width: 150px">
          <el-option label="KMP算法" value="kmp" />
          <el-option label="朴素匹配" value="bruteForce" />
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
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="content-body">
      <div class="main-layout">
        <div class="left-panel">
          <!-- 输入区 -->
          <div class="input-card">
            <el-form :inline="true">
              <el-form-item label="主串 T">
                <el-input v-model="textInput" placeholder="如: ABABABABCA" style="width: 300px" />
              </el-form-item>
              <el-form-item label="模式串 P">
                <el-input v-model="patternInput" placeholder="如: ABABABCA" style="width: 200px" />
              </el-form-item>
            </el-form>
          </div>
          
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

          <!-- 动画演示区 -->
          <div class="animation-container">
            <!-- 主串显示 -->
            <div class="string-row">
              <span class="row-label">主串 T:</span>
              <div class="char-boxes">
                <div 
                  v-for="(char, index) in textChars" 
                  :key="`t-${index}`"
                  class="char-box"
                  :class="getTextCharClass(index)"
                >
                  <span class="char-index">{{ index }}</span>
                  <span class="char-value">{{ char }}</span>
                </div>
              </div>
            </div>

            <!-- 模式串显示（带偏移） -->
            <div class="string-row pattern-row">
              <span class="row-label">模式串 P:</span>
              <div class="char-boxes" :style="{ marginLeft: `${patternOffset * 52}px` }">
                <div 
                  v-for="(char, index) in patternChars" 
                  :key="`p-${index}`"
                  class="char-box pattern"
                  :class="getPatternCharClass(index)"
                >
                  <span class="char-index">{{ index }}</span>
                  <span class="char-value">{{ char }}</span>
                </div>
              </div>
            </div>

            <!-- Next数组显示 -->
            <div class="next-array" v-if="nextArray.length > 0">
              <h4>Next 数组:</h4>
              <div class="next-boxes">
                <div 
                  v-for="(val, index) in nextArray" 
                  :key="`n-${index}`"
                  class="next-box"
                  :class="{ highlighted: currentPatternIndex === index }"
                >
                  <span class="next-index">{{ index }}</span>
                  <span class="next-value">{{ val }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 匹配结果 -->
          <div class="result-panel" v-if="matchResult !== null">
            <el-alert 
              :title="matchResult >= 0 ? `匹配成功！位置: ${matchResult}` : '未找到匹配'"
              :type="matchResult >= 0 ? 'success' : 'warning'"
              show-icon
              :closable="false"
            />
          </div>

          <!-- 步骤信息 -->
          <div class="info-panel" v-if="currentFrame">
            <h4>当前步骤</h4>
            <div class="step-info">
              <p><strong>操作:</strong> {{ getFrameTypeName(currentFrame.type) }}</p>
              <p><strong>描述:</strong> {{ currentFrame.description }}</p>
              <p v-if="currentFrame.textIndex >= 0">
                <strong>主串位置:</strong> {{ currentFrame.textIndex }}
              </p>
              <p v-if="currentFrame.patternIndex >= 0">
                <strong>模式串位置:</strong> {{ currentFrame.patternIndex }}
              </p>
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
            @apply-code="handleApplyCode"
            @toggle-fullscreen="toggleCodeFullscreen"
          />
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
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { kmpSearch, bruteForceSearch, stringAlgorithms } from '../core/algorithms/kmp'
import { stringPresets } from '../core/presets'
import { stringAlgorithmCode } from '../core/algorithmCode'
import type { AlgorithmCode } from '../core/algorithmCode'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { KMPFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'
import CodeEditorPanel from '../components/common/CodeEditorPanel.vue'

// 状态
const selectedAlgorithm = ref('kmp')
const selectedPreset = ref<number | ''>('')
const isCodeFullscreen = ref(false)
const userCustomFrames = ref<KMPFrame[] | null>(null)
const textInput = ref('ABABABABCA')
const patternInput = ref('ABABCA')
const textChars = ref<string[]>([])
const patternChars = ref<string[]>([])
const nextArray = ref<number[]>([])
const patternOffset = ref(0)
const currentTextIndex = ref(-1)
const currentPatternIndex = ref(-1)
const matchResult = ref<number | null>(null)
const matchStatus = ref<'matching' | 'matched' | 'mismatched' | null>(null)
let stringInputTimer: ReturnType<typeof setTimeout> | null = null

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
} = useAnimationPlayer<KMPFrame>()

// 计算属性
const algorithmInfo = computed(() => {
  return selectedAlgorithm.value === 'kmp' 
    ? stringAlgorithms.kmp 
    : stringAlgorithms.bruteForce
})

const currentPresets = computed(() => (stringPresets as Record<string, any[]>)[selectedAlgorithm.value] || [])
const fallbackAlgorithmCode: AlgorithmCode = {
  title: '字符串匹配',
  language: 'javascript',
  code: '// 暂无代码'
}
const currentAlgorithmCode = computed<AlgorithmCode>(() => {
  return (stringAlgorithmCode as Record<string, AlgorithmCode>)[selectedAlgorithm.value]
    ?? stringAlgorithmCode.kmp
    ?? fallbackAlgorithmCode
})
const currentHighlightLine = computed(() => {
  if (!currentFrame.value) return undefined
  if (currentFrame.value.highlightLine !== undefined) return currentFrame.value.highlightLine

  const frame = currentFrame.value
  const desc = frame.description || ''

  if (selectedAlgorithm.value === 'kmp') {
    if (frame.type === 'next-calc') {
      if (desc.includes('主串')) return 0
      if (desc.includes('开始 KMP 匹配')) return 7
      return 28
    }

    if (frame.type === 'compare') {
      return frame.textIndex === -1 ? 29 : 8
    }

    if (frame.type === 'match') {
      return frame.textIndex === -1 ? 30 : 9
    }

    if (frame.type === 'mismatch') {
      if (frame.textIndex === -1) return 33
      return frame.patternIndex === 0 ? 16 : 14
    }

    if (frame.type === 'shift') return 15

    if (frame.type === 'complete') {
      if (desc.includes('模式串为空')) return 1
      if (desc.includes('找到匹配')) return 12
      return 21
    }

    return 0
  }

  if (selectedAlgorithm.value === 'bruteForce') {
    if (frame.type === 'next-calc') return 0
    if (frame.type === 'shift') return 3
    if (frame.type === 'compare') return 6
    if (frame.type === 'match') return 7
    if (frame.type === 'mismatch') return 6
    if (frame.type === 'complete') {
      if (desc.includes('模式串为空')) return 1
      if (desc.includes('找到匹配')) return 11
      return 15
    }
    return 0
  }

  return 0
})

// 获取主串字符样式
function getTextCharClass(index: number) {
  if (index === currentTextIndex.value) {
    if (matchStatus.value === 'matched') return 'matched'
    if (matchStatus.value === 'mismatched') return 'mismatched'
    return 'comparing'
  }
  // 已匹配的范围
  if (matchResult.value !== null && matchResult.value >= 0) {
    if (index >= matchResult.value && index < matchResult.value + patternChars.value.length) {
      return 'found'
    }
  }
  return ''
}

// 获取模式串字符样式
function getPatternCharClass(index: number) {
  if (index === currentPatternIndex.value) {
    if (matchStatus.value === 'matched') return 'matched'
    if (matchStatus.value === 'mismatched') return 'mismatched'
    return 'comparing'
  }
  return ''
}

// 获取帧类型名称
function getFrameTypeName(type: string) {
  const names: Record<string, string> = {
    compare: '比较',
    match: '匹配',
    mismatch: '失配',
    shift: '移动',
    'next-calc': '计算Next',
    complete: '完成'
  }
  return names[type] || type
}

// 处理帧变化
function handleFrameChange(frame: KMPFrame | null, index: number) {
  currentTextIndex.value = -1
  currentPatternIndex.value = -1
  matchStatus.value = null
  
  if (!frame) {
    patternOffset.value = 0
    nextArray.value = []
    matchResult.value = null
    return
  }
  
  // 更新 next 数组
  if (frame.nextArray) {
    nextArray.value = [...frame.nextArray]
  }
  
  // 更新当前位置
  currentTextIndex.value = frame.textIndex
  currentPatternIndex.value = frame.patternIndex
  
  // 计算模式串偏移
  if (frame.textIndex >= 0 && frame.patternIndex >= 0) {
    patternOffset.value = frame.textIndex - frame.patternIndex
  }
  
  // 更新匹配状态
  switch (frame.type) {
    case 'match':
      matchStatus.value = 'matched'
      break
    case 'mismatch':
      matchStatus.value = 'mismatched'
      break
    case 'complete':
      if (frame.textIndex >= 0) {
        matchResult.value = frame.textIndex
      } else {
        matchResult.value = -1
      }
      break
  }
}

// 加载预设案例
function loadPreset() {
  if (selectedPreset.value === '') return
  
  const preset = currentPresets.value[selectedPreset.value as number]
  if (preset && preset.data) {
    textInput.value = preset.data.text
    patternInput.value = preset.data.pattern
    userCustomFrames.value = null
    runMatch()
  }
}

// 运行匹配
function runMatch() {
  textChars.value = textInput.value.split('')
  patternChars.value = patternInput.value.split('')
  matchResult.value = null
  patternOffset.value = 0
  nextArray.value = []

  const frames = userCustomFrames.value
    ?? (selectedAlgorithm.value === 'kmp'
      ? kmpSearch(textInput.value, patternInput.value)
      : bruteForceSearch(textInput.value, patternInput.value))
  
  load(frames)
}

function autoRunMatch() {
  if (stringInputTimer) clearTimeout(stringInputTimer)
  stringInputTimer = setTimeout(() => {
    userCustomFrames.value = null
    selectedPreset.value = ''
    stop()
    runMatch()
  }, 250)
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
          'kmpSearch', 'kmp_search', 'KmpSearch', 'KMP', 'kmp',
          'bruteForceSearch', 'brute_force_search', 'BruteForceSearch',
          'bruteForce', 'brute_force', 'BruteForce',
          'search'
        ]
        for (const name of names) {
          try {
            const fn = eval(name)
            if (typeof fn === 'function') return fn
          } catch (e) {}
        }
        throw new Error('未找到有效字符串匹配函数')
      })()
    `

    const fn = eval(wrappedCode)
    if (typeof fn !== 'function') {
      ElMessage.error('代码必须定义可执行函数')
      return
    }

    const result = fn(textInput.value, patternInput.value)
    if (!Array.isArray(result) || result.length === 0 || !result[0]?.type) {
      ElMessage.error('请返回有效帧数组')
      return
    }

    userCustomFrames.value = result
    stop()
    runMatch()
    if (totalFrames.value > 0) goTo(0)
  } catch (e: any) {
    ElMessage.error(`代码执行错误: ${e?.message || String(e)}`)
  }
}

function handlePlay() {
  if (!userCustomFrames.value) {
    runMatch()
  } else if (currentIndex.value === -1 || totalFrames.value === 0) {
    runMatch()
  }

  if (totalFrames.value === 0) {
    ElMessage.warning('当前没有可播放的动画，请先输入主串和模式串')
    return
  }

  play()
}

// 重置
function reset() {
  stop()
  patternOffset.value = 0
  currentTextIndex.value = -1
  currentPatternIndex.value = -1
  matchStatus.value = null
  matchResult.value = null
  if (userCustomFrames.value) {
    load(userCustomFrames.value)
  } else {
    runMatch()
  }
}

watch(selectedAlgorithm, () => {
  userCustomFrames.value = null
  selectedPreset.value = ''
  if (currentPresets.value.length > 0) {
    selectedPreset.value = 0
    loadPreset()
  } else {
    runMatch()
  }
})

watch(textInput, () => {
  autoRunMatch()
})

watch(patternInput, () => {
  autoRunMatch()
})

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
  textChars.value = textInput.value.split('')
  patternChars.value = patternInput.value.split('')
  
  // 加载第一个预设案例
  if (currentPresets.value.length > 0) {
    selectedPreset.value = 0
    loadPreset()
  } else {
    runMatch()
  }
})

onBeforeUnmount(() => {
  if (stringInputTimer) clearTimeout(stringInputTimer)
})
</script>

<style scoped>
.string-view {
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

.input-card, .info-card {
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
}

.string-row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.pattern-row {
  transition: margin-left 0.3s ease;
}

.row-label {
  width: 80px;
  font-weight: bold;
  color: #606266;
  flex-shrink: 0;
}

.char-boxes {
  display: flex;
  gap: 2px;
  transition: margin-left 0.3s ease;
}

.char-box {
  width: 50px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.char-box.pattern {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.char-box .char-index {
  font-size: 10px;
  opacity: 0.7;
}

.char-box .char-value {
  font-size: 20px;
  font-weight: bold;
}

.char-box.comparing {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.char-box.matched {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  transform: scale(1.1);
}

.char-box.mismatched {
  background: linear-gradient(135deg, #f56c6c 0%, #f78989 100%);
  transform: scale(1.1);
}

.char-box.found {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

/* Next数组样式 */
.next-array {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #dcdfe6;
}

.next-array h4 {
  margin-bottom: 15px;
  color: #606266;
}

.next-boxes {
  display: flex;
  gap: 2px;
  margin-left: 80px;
}

.next-box {
  width: 50px;
  height: 50px;
  background: #f5f7fa;
  border: 2px solid #dcdfe6;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.next-box.highlighted {
  background: #ecf5ff;
  border-color: #409eff;
}

.next-box .next-index {
  font-size: 10px;
  color: #909399;
}

.next-box .next-value {
  font-size: 18px;
  font-weight: bold;
  color: #409eff;
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

.step-info p {
  margin: 5px 0;
}
</style>
