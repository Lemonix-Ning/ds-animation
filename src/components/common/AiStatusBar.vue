<template>
  <div class="ai-status-bar" :class="`s-${status}`">
    <span class="dot"></span>
    <span class="text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: 'idle' | 'rendering' | 'cached' | 'display-only' | 'syncing' | 'synced' | 'invalid-change' | 'error'
}>()

const text = computed(() => {
  switch (props.status) {
    case 'idle':
      return 'js可修改：变量赋值、条件循环、函数调用（建议小步修改）'
    case 'rendering':
      return '正在为你切换到该语言代码...'
    case 'cached':
      return 'js可修改：变量赋值、条件循环、函数调用（建议小步修改）'
    case 'display-only':
      return 'js可修改：变量赋值、条件循环、函数调用（建议小步修改）'
    case 'syncing':
      return '正在应用你的修改并刷新动画...'
    case 'synced':
      return '修改成功：可继续修改变量赋值、条件循环、函数调用（建议小步修改）'
    case 'invalid-change':
      return '未检测到有效代码变化，请确认你确实修改了代码内容'
    case 'error':
      return '这次修改没有成功，已恢复到 JavaScript 代码'
    default:
      return '可切换语言查看实现，并联动动画学习'
  }
})
</script>

<style scoped>
.ai-status-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 12px;
  border-top: 1px solid #181a1f;
  background: #21252b;
  color: #abb2bf;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #909399;
}

.s-rendering .dot {
  background: #e6a23c;
}

.s-cached .dot,
.s-display-only .dot,
.s-idle .dot {
  background: #67c23a;
}

.s-syncing .dot {
  background: #409eff;
}

.s-synced .dot {
  background: #67c23a;
}

.s-invalid-change .dot {
  background: #e6a23c;
}

.s-error .dot {
  background: #f56c6c;
}
</style>
