<template>
  <div class="control-bar">
    <!-- 鎺у埗鎸夐挳 -->
    <div class="control-buttons">
      <el-button-group>
        <el-tooltip content="重置" placement="top">
          <el-button :icon="RefreshLeft" @click="emit('reset')" />
        </el-tooltip>
        <el-tooltip content="后退一步" placement="top">
          <el-button :icon="ArrowLeft" @click="emit('stepBackward')" :disabled="currentIndex < 0" />
        </el-tooltip>
        <el-tooltip :content="isPlaying ? '暂停' : '播放'" placement="top">
          <el-button 
            :icon="isPlaying ? VideoPause : VideoPlay" 
            type="primary"
            @click="isPlaying ? emit('pause') : emit('play')"
            :disabled="totalFrames === 0 && !allowPlayWhenEmpty"
          />
        </el-tooltip>
        <el-tooltip content="前进一步" placement="top">
          <el-button :icon="ArrowRight" @click="emit('stepForward')" :disabled="currentIndex >= totalFrames - 1" />
        </el-tooltip>
      </el-button-group>
    </div>
    
    <!-- 进度条 -->
    <div class="progress-bar">
      <span class="progress-label">{{ progressLabel }}</span>
      <el-slider 
        v-model="progressValue" 
        :max="Math.max(totalFrames - 1, 0)"
        :min="-1"
        :show-tooltip="false"
        @change="onProgressChange"
        :disabled="totalFrames === 0"
      />
    </div>
    
    <!-- 速度控制 -->
    <div class="speed-control">
      <el-icon><Timer /></el-icon>
      <span>速度:</span>
      <el-select v-model="speedValue" style="width: 100px" @change="onSpeedChange">
        <el-option label="0.25x" :value="2000" />
        <el-option label="0.5x" :value="1000" />
        <el-option label="1x" :value="500" />
        <el-option label="2x" :value="250" />
        <el-option label="4x" :value="125" />
      </el-select>
    </div>
    
    <!-- 当前步骤描述 -->
    <div class="step-description" v-if="currentFrame">
      <el-tag type="info">{{ currentFrame.description }}</el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { 
  VideoPlay, 
  VideoPause, 
  RefreshLeft, 
  ArrowLeft, 
  ArrowRight,
  Timer
} from '@element-plus/icons-vue'
import type { AnimationFrame } from '../../core/types'

const props = defineProps<{
  currentIndex: number
  totalFrames: number
  isPlaying: boolean
  currentFrame: AnimationFrame | null
  speed: number
  allowPlayWhenEmpty?: boolean
}>()

const allowPlayWhenEmpty = computed(() => props.allowPlayWhenEmpty === true)

const emit = defineEmits<{
  play: []
  pause: []
  reset: []
  stepForward: []
  stepBackward: []
  goTo: [index: number]
  speedChange: [speed: number]
}>()

const progressValue = ref(props.currentIndex)
const speedValue = ref(props.speed)
const progressLabel = computed(() => {
  if (props.totalFrames === 0) return '-- / --'
  return `${Math.max(props.currentIndex + 1, 0)} / ${props.totalFrames}`
})

watch(() => props.currentIndex, (val) => {
  progressValue.value = val
})

watch(() => props.speed, (val) => {
  speedValue.value = val
})

const onProgressChange = (val: number) => {
  emit('goTo', val)
}

const onSpeedChange = (val: number) => {
  emit('speedChange', val)
}
</script>

<style scoped>
.control-bar {
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  padding: 15px 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.control-buttons {
  flex-shrink: 0;
}

.progress-bar {
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.progress-label {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
  min-width: 60px;
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.speed-control span {
  font-size: 14px;
  color: #606266;
}

.step-description {
  flex-shrink: 0;
}
</style>
