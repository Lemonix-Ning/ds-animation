<template>
  <el-select
    :model-value="modelValue"
    size="small"
    style="width: 120px"
    @change="onChange"
  >
    <el-option
      v-for="item in languageOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import type { Language } from '../../core/langEngine/types'

const props = defineProps<{
  modelValue: Language
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Language]
}>()

const languageOptions: Array<{ value: Language; label: string }> = [
  { value: 'js', label: 'JavaScript' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'csharp', label: 'C#' }
]

function onChange(value: Language) {
  emit('update:modelValue', value)
}
</script>
