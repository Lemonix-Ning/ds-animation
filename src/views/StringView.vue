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
        <el-button type="primary" @click="runMatch">
          <el-icon><Search /></el-icon>
          开始匹配
        </el-button>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="content-body">
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
import { ref, computed, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { kmpSearch, bruteForceSearch, stringAlgorithms } from '../core/algorithms/kmp'
import { useAnimationPlayer } from '../core/player/AnimationPlayer'
import type { KMPFrame } from '../core/types'
import ControlBar from '../components/common/ControlBar.vue'

// 状态
const selectedAlgorithm = ref('kmp')
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

// 运行匹配
function runMatch() {
  textChars.value = textInput.value.split('')
  patternChars.value = patternInput.value.split('')
  matchResult.value = null
  patternOffset.value = 0
  nextArray.value = []
  
  const frames = selectedAlgorithm.value === 'kmp'
    ? kmpSearch(textInput.value, patternInput.value)
    : bruteForceSearch(textInput.value, patternInput.value)
  
  load(frames)
}

// 重置
function reset() {
  stop()
  patternOffset.value = 0
  currentTextIndex.value = -1
  currentPatternIndex.value = -1
  matchStatus.value = null
  matchResult.value = null
}

// 初始化
onMounted(() => {
  setOnFrameChange(handleFrameChange)
  textChars.value = textInput.value.split('')
  patternChars.value = patternInput.value.split('')
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
