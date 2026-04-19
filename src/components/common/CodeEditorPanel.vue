<template>
  <div class="code-editor-panel">
    <div class="panel-header">
      <h4>{{ algorithmCode.title }}</h4>
      <div class="header-actions">
        <LangSelector
          v-if="algorithmCode.fullCode && !usePseudoCode"
          v-model="currentLanguage"
        />
        <el-button
          v-if="enableFullscreen"
          size="small"
          type="primary"
          @click="emit('toggleFullscreen')"
          :title="isFullscreen ? '退出全屏' : '开启全屏'"
        >
          <el-icon>
            <Close v-if="isFullscreen" />
            <FullScreen v-else />
          </el-icon>
        </el-button>
        <el-button 
          v-if="algorithmCode.fullCode && currentLanguage === 'js'" 
          size="small" 
          @click="toggleCodeVersion"
          :type="showFullCode ? 'primary' : ''"
        >
          {{ showFullCode ? '简化版' : '完整版' }}
        </el-button>
        <el-button 
          v-if="showFullCode && isEditing && hasUnsavedChanges && currentLanguage === 'js'"
          size="small" 
          type="success"
          @click="applyCode"
        >
          <el-icon><Check /></el-icon>
          应用代码
        </el-button>
        <el-button size="small" @click="resetCode">
          <el-icon><RefreshLeft /></el-icon>
        </el-button>
      </div>
    </div>
    
    <div class="editor-container" @click="focusTextarea">
      <!-- 语法高亮显示层 (非编辑模式) -->
      <div v-if="!isEditing" class="code-highlight" v-html="highlightedCode"></div>
      
      <!-- 可编辑文本层 (编辑模式) - 只在完整版代码模式下可编辑 -->
      <textarea
        v-if="isEditing && showFullCode && !usePseudoCode && currentLanguage === 'js'"
        v-model="editorBuffer"
        class="code-textarea"
        spellcheck="false"
        @input="onCodeInput"
        @blur="handleBlur"
        ref="textareaRef"
      ></textarea>
    </div>

    <AiStatusBar
      v-if="algorithmCode.fullCode && showFullCode && !usePseudoCode"
      :status="panelStatus"
    />

    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      <el-alert type="error" :closable="false">
        <template #title>
          <div class="error-title">代码执行错误</div>
        </template>
        <pre class="error-detail">{{ error }}</pre>
      </el-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { RefreshLeft, Check, FullScreen, Close } from '@element-plus/icons-vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import cpp from 'highlight.js/lib/languages/cpp'
import java from 'highlight.js/lib/languages/java'
import python from 'highlight.js/lib/languages/python'
import csharp from 'highlight.js/lib/languages/csharp'
import 'highlight.js/styles/atom-one-dark.css'
import type { AlgorithmCode } from '../../core/algorithmCode'
import LangSelector from './LangSelector.vue'
import AiStatusBar from './AiStatusBar.vue'
import { invalidateLocalTranslationCache, translateAlgorithmLocal } from '../../core/langEngine/LocalTranslator'
import type { Language } from '../../core/langEngine/types'

// 注册语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('java', java)
hljs.registerLanguage('python', python)
hljs.registerLanguage('csharp', csharp)

const props = defineProps<{
  algorithmCode: AlgorithmCode
  inputArray: number[]
  highlightLine?: number
  isPlaying?: boolean
  usePseudoCode?: boolean  // 是否使用伪代码显示
  pseudoCode?: { title: string, code: string[] }
  enableFullscreen?: boolean
  isFullscreen?: boolean
  algorithmKey?: string
}>()

const emit = defineEmits<{
  codeChanged: [code: string]
  applyCode: [code: string]
  toggleFullscreen: []
}>()

const editableCode = ref(props.algorithmCode.code)
const editableFullCode = ref(props.algorithmCode.fullCode || props.algorithmCode.code)
const originalCode = ref(props.algorithmCode.code)
const originalFullCode = ref(props.algorithmCode.fullCode || props.algorithmCode.code)
const error = ref('')
const textareaRef = ref<HTMLTextAreaElement>()
const isEditing = ref(false)
const showFullCode = ref(Boolean(props.algorithmCode.fullCode))
const fullModePinnedByUser = ref(false)
const hasUnsavedChanges = ref(false)
const currentLanguage = ref<Language>('js')
const displayCode = ref('')
const editorBuffer = ref('')
const panelStatus = ref<'idle' | 'rendering' | 'cached' | 'display-only' | 'syncing' | 'synced' | 'invalid-change' | 'error'>('idle')
const lastDisplaySnapshot = ref('')

const SUCCESS_FEEDBACK_DURATION_MS = 1200
let syncedStatusHoldUntil = 0

function setSyncedStatusWithHold() {
  panelStatus.value = 'synced'
  syncedStatusHoldUntil = Date.now() + SUCCESS_FEEDBACK_DURATION_MS
}

function shouldKeepSyncedStatus(): boolean {
  return panelStatus.value === 'synced' && Date.now() < syncedStatusHoldUntil
}

const algorithmIdentity = computed(() => props.algorithmKey || props.algorithmCode.title)

const highlightLanguage = computed(() => {
  switch (currentLanguage.value) {
    case 'cpp':
      return 'cpp'
    case 'java':
      return 'java'
    case 'python':
      return 'python'
    case 'csharp':
      return 'csharp'
    default:
      return 'javascript'
  }
})

const codeForRender = computed(() => {
  if (showFullCode.value && props.algorithmCode.fullCode) {
    if (currentLanguage.value === 'js') return editableFullCode.value
    return displayCode.value
  }
  return editableCode.value
})

// 当前显示的代码
const currentCode = computed(() => {
  if (showFullCode.value && props.algorithmCode.fullCode) {
    return codeForRender.value
  }
  return editableCode.value
})

const effectiveLineSet = computed(() => {
  if (!showFullCode.value || currentLanguage.value === 'js') return new Set<number>()

  const lineSet = new Set<number>()
  const lines = codeForRender.value.split('\n')
  lines.forEach((_, index) => {
    lineSet.add(index)
  })

  return lineSet
})

function syncEditorBuffer() {
  if (!showFullCode.value || props.usePseudoCode) {
    editorBuffer.value = ''
    return
  }

  editorBuffer.value = currentLanguage.value === 'js' ? editableFullCode.value : displayCode.value
}

function switchLanguage(language: Language) {
  if (props.usePseudoCode) return

  // 非 JS 只提供完整版静态查看。
  if (language !== 'js' && props.algorithmCode.fullCode && !showFullCode.value) {
    showFullCode.value = true
  }

  if (!showFullCode.value && language === 'js') {
    syncEditorBuffer()
    return
  }

  if (language === 'js') {
    panelStatus.value = 'idle'
    displayCode.value = ''
    syncEditorBuffer()
    return
  }

  try {
    panelStatus.value = 'rendering'
    const translated = translateAlgorithmLocal(algorithmIdentity.value, editableFullCode.value, language, {
      preferSourceCode: true,
      disableExplicitTemplate: true
    })
    displayCode.value = translated.displayCode
    lastDisplaySnapshot.value = translated.displayCode
    if (!shouldKeepSyncedStatus()) {
      panelStatus.value = translated.fromCache ? 'cached' : 'display-only'
    }
    syncEditorBuffer()
  } catch {
    panelStatus.value = 'error'
    error.value = '本地语言展示生成失败，已回退到 JavaScript 模式。'
    currentLanguage.value = 'js'
  }
}

function retranslateCurrentLanguage() {
  invalidateLocalTranslationCache(algorithmIdentity.value)
  switchLanguage(currentLanguage.value)
}

// 语法高亮
const highlightedCode = computed(() => {
  try {
    // 如果使用伪代码，直接按行显示
    if (props.usePseudoCode && props.pseudoCode) {
      const lines = props.pseudoCode.code
      const styledLines = lines.map((line, index) => {
        const isHighlighted = index === props.highlightLine
        const lineClass = isHighlighted ? 'code-line highlighted-line' : 'code-line'
        return `<div class="${lineClass}"><span class="line-content">${line}</span></div>`
      })
      return styledLines.join('')
    }
    
    // 使用当前代码版本（简化版或完整版）
    const codeToHighlight = codeForRender.value
    
    // 真实代码使用语法高亮
    const highlighted = hljs.highlight(codeToHighlight, { language: highlightLanguage.value }).value
    const lines = highlighted.split('\n')
    
    const styledLines = lines.map((line, index) => {
      // 完整版代码不显示高亮（因为行号不匹配）
      // 简化版代码显示高亮（行号匹配）
      const isHighlighted = !showFullCode.value && props.highlightLine !== undefined && index === props.highlightLine
      const isEffective = showFullCode.value && currentLanguage.value !== 'js' && effectiveLineSet.value.has(index)
      const lineClass = [
        'code-line',
        isHighlighted ? 'highlighted-line' : '',
        isEffective ? 'effective-line' : ''
      ].filter(Boolean).join(' ')
      return `<div class="${lineClass}"><span class="line-content">${line}</span></div>`
    })
    return styledLines.join('')
  } catch (e) {
    return currentCode.value
  }
})

// 代码变化 - 标记有未保存的更改
function onCodeInput() {
  error.value = ''

  if (!showFullCode.value || props.usePseudoCode || currentLanguage.value !== 'js') {
    return
  }

  editableFullCode.value = editorBuffer.value
  hasUnsavedChanges.value = true
}

function getSyntaxErrorDetail(err: unknown): string {
  const fallback = err instanceof Error ? err.message : '未知语法错误'
  if (!(err instanceof Error)) return fallback

  const stack = err.stack || ''
  const lineColMatch = stack.match(/<anonymous>:(\d+):(\d+)/)
  if (!lineColMatch) return fallback

  const line = lineColMatch[1]
  const col = lineColMatch[2]
  return `${fallback}（第 ${line} 行，第 ${col} 列）`
}

function tryApplyJsCode(code: string): boolean {
  try {
    // 仅做语法检查，不执行代码。
    // eslint-disable-next-line no-new-func
    new Function(code)
  } catch (e) {
    if (typeof window !== 'undefined') {
      console.log('[CodeEditorPanel:syntax-failed]', {
        message: e instanceof Error ? e.message : String(e),
        codePreview: code.split('\n').slice(0, 12).join('\n')
      })
    }
    panelStatus.value = 'error'
    error.value = `JavaScript 语法错误：${getSyntaxErrorDetail(e)}`
    return false
  }

  if (typeof window !== 'undefined') {
    console.log('[CodeEditorPanel:syntax-ok]', {
      lineCount: code.split('\n').length
    })
  }

  emit('applyCode', code)
  hasUnsavedChanges.value = false
  setSyncedStatusWithHold()
  return true
}

// 应用代码 - 通知父组件执行代码
function applyCode() {
  if (!showFullCode.value || props.usePseudoCode || currentLanguage.value !== 'js') return

  editableFullCode.value = editorBuffer.value
  tryApplyJsCode(editableFullCode.value)
}

// 聚焦到 textarea
function focusTextarea() {
  // 伪代码模式或简化版模式下不允许编辑
  if (props.usePseudoCode || !showFullCode.value) {
    return
  }

  if (currentLanguage.value !== 'js') return

  isEditing.value = true
  
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.focus()
    }
  })
}

// 切换代码版本
function toggleCodeVersion() {
  showFullCode.value = !showFullCode.value
  isEditing.value = false
  hasUnsavedChanges.value = false
  fullModePinnedByUser.value = showFullCode.value

  if (showFullCode.value && currentLanguage.value !== 'js') {
    switchLanguage(currentLanguage.value)
  }

  syncEditorBuffer()
}

// 失去焦点
function handleBlur() {
  // 使用 setTimeout 确保点击事件完成后再切换
  setTimeout(() => {
    // 如果有未保存的更改，自动应用代码
    if (hasUnsavedChanges.value) {
      applyCode()
    }
    
    isEditing.value = false
  }, 100)
}

// 重置代码
function resetCode() {
  editableCode.value = originalCode.value
  editableFullCode.value = originalFullCode.value
  error.value = ''
  hasUnsavedChanges.value = false

  if (currentLanguage.value !== 'js') {
    invalidateLocalTranslationCache(algorithmIdentity.value)
    switchLanguage(currentLanguage.value)
  }

  syncEditorBuffer()
}

// 监听算法变化
watch(() => props.algorithmCode.code, (newCode) => {
  editableCode.value = newCode
  originalCode.value = newCode
  error.value = ''
})

watch(() => props.algorithmCode.fullCode, (newFullCode) => {
  if (newFullCode) {
    editableFullCode.value = newFullCode
    originalFullCode.value = newFullCode
    if (currentLanguage.value !== 'js') {
      invalidateLocalTranslationCache(algorithmIdentity.value)
      switchLanguage(currentLanguage.value)
    }
  }
})

watch(currentLanguage, (lang) => {
  switchLanguage(lang)
})

watch(() => props.isPlaying, (playing) => {
  // 播放时默认切换到简化版以便观察高亮；若用户手动锁定完整版则保持不变。
  if (currentLanguage.value !== 'js') return

  if (playing) {
    if (!props.algorithmCode.fullCode) return
    if (fullModePinnedByUser.value) return
    if (!showFullCode.value) return

    showFullCode.value = false
    isEditing.value = false
    hasUnsavedChanges.value = false
    syncEditorBuffer()
  }
})

// 监听 props 变化，确保代码正确显示
watch(() => props.algorithmCode, (newAlgo) => {
  if (newAlgo && newAlgo.code) {
    editableCode.value = newAlgo.code
    originalCode.value = newAlgo.code
    if (newAlgo.fullCode) {
      editableFullCode.value = newAlgo.fullCode
      originalFullCode.value = newAlgo.fullCode
    }

    currentLanguage.value = 'js'
    displayCode.value = ''
    lastDisplaySnapshot.value = ''
    panelStatus.value = 'idle'
    showFullCode.value = Boolean(newAlgo.fullCode)
    fullModePinnedByUser.value = false
    syncEditorBuffer()
  }
}, { immediate: true, deep: true })

onMounted(() => {
  // 确保初始化时有代码
  if (props.algorithmCode && props.algorithmCode.code) {
    editableCode.value = props.algorithmCode.code
    originalCode.value = props.algorithmCode.code
    if (props.algorithmCode.fullCode) {
      editableFullCode.value = props.algorithmCode.fullCode
      originalFullCode.value = props.algorithmCode.fullCode
    }
    showFullCode.value = Boolean(props.algorithmCode.fullCode)
    fullModePinnedByUser.value = false
  }
  
  // 默认显示高亮模式
  isEditing.value = false
  syncEditorBuffer()
})
</script>

<style>
/* 不使用 scoped，让样式能应用到 v-html 生成的内容 */
.code-editor-panel {
  background: #282c34;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.code-editor-panel .panel-header {
  background: #21252b;
  color: #abb2bf;
  padding: 12px 15px;
  border-bottom: 1px solid #181a1f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.code-editor-panel .panel-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.code-editor-panel .header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.code-editor-panel .effective-count {
  font-size: 12px;
  color: #9cdcfe;
  border: 1px solid #2a5f7a;
  border-radius: 12px;
  padding: 2px 10px;
}

.code-editor-panel .editor-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 0;
  cursor: text;
}

.code-editor-panel .code-highlight {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 15px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #abb2bf;
  background: #282c34;
  overflow-x: auto;
  overflow-y: auto;
  border: none;
  outline: none;
  box-sizing: border-box;
}

/* 横向滚动条在底部 */
.code-editor-panel .code-highlight::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

.code-editor-panel .code-highlight::-webkit-scrollbar-track {
  background: #21252b;
}

.code-editor-panel .code-highlight::-webkit-scrollbar-thumb {
  background: #4b5263;
  border-radius: 5px;
}

.code-editor-panel .code-highlight::-webkit-scrollbar-thumb:hover {
  background: #5c6370;
}

.code-editor-panel .code-line {
  display: block;
  padding: 2px 0;
  transition: all 0.3s ease;
  white-space: pre;
}

.code-editor-panel .code-line.highlighted-line {
  background: #fff3cd !important;
  border-left: 3px solid #ffc107 !important;
  padding-left: 12px !important;
  margin-left: -15px !important;
  padding-right: 15px !important;
  animation: pulse 0.5s ease;
}

.code-editor-panel .code-line.effective-line {
  border-left: 3px solid #66d9ef;
  padding-left: 12px;
  margin-left: -15px;
}

@keyframes pulse {
  0%, 100% {
    background: #fff3cd !important;
  }
  50% {
    background: #ffe69c !important;
  }
}

.code-editor-panel .line-content {
  display: inline;
  white-space: pre;
}

.code-editor-panel .highlighted-line .line-content {
  color: #000 !important;
  font-weight: 500 !important;
}

/* 覆盖 highlight.js 的样式 */
.code-editor-panel .highlighted-line * {
  color: #000 !important;
}

.code-editor-panel .code-textarea {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 15px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #abb2bf;
  background: #282c34;
  white-space: pre;
  word-wrap: normal;
  overflow: auto;
  border: none;
  outline: none;
  box-sizing: border-box;
  resize: none;
  caret-color: #61afef;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 隐藏滚动条 */
.code-editor-panel .code-textarea::-webkit-scrollbar {
  display: none;
}

.code-editor-panel .code-textarea::selection {
  background: rgba(97, 175, 239, 0.3);
}

.code-editor-panel .error-message {
  padding: 10px;
  background: #282c34;
  border-top: 1px solid #181a1f;
  flex-shrink: 0;
}

.code-editor-panel .effective-line-hint {
  padding: 8px 12px;
  border-top: 1px solid #181a1f;
  color: #9cdcfe;
  font-size: 12px;
  background: #21252b;
}

.code-editor-panel .error-title {
  font-weight: 600;
  margin-bottom: 5px;
}

.code-editor-panel .error-detail {
  margin: 0;
  font-size: 12px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
