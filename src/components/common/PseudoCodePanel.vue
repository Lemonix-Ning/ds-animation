<template>
  <div class="pseudocode-panel">
    <div class="panel-header">
      <h4>{{ pseudoCode.title }}</h4>
    </div>
    <div class="code-container">
      <div 
        v-for="(line, index) in pseudoCode.code" 
        :key="index"
        class="code-line"
        :class="{ 'highlighted': index === highlightLine }"
      >
        <span class="line-number">{{ index + 1 }}</span>
        <span class="line-content">{{ line }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PseudoCode } from '../../core/pseudocode'

defineProps<{
  pseudoCode: PseudoCode
  highlightLine?: number
}>()
</script>

<style scoped>
.pseudocode-panel {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 12px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.code-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
  background: #f8f9fa;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.code-line {
  display: flex;
  padding: 4px 15px;
  transition: all 0.3s ease;
  white-space: pre;
}

.code-line.highlighted {
  background: #fff3cd;
  border-left: 3px solid #ffc107;
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  0%, 100% {
    background: #fff3cd;
  }
  50% {
    background: #ffe69c;
  }
}

.line-number {
  display: inline-block;
  min-width: 30px;
  color: #909399;
  text-align: right;
  margin-right: 15px;
  user-select: none;
}

.line-content {
  color: #303133;
  flex: 1;
}

.code-line.highlighted .line-content {
  color: #000;
  font-weight: 500;
}
</style>
