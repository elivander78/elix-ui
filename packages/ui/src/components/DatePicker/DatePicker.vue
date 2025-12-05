<template>
  <BaseDatePicker
    :model-value="modelValue"
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    :format="format"
    :clearable="clearable"
    :size="size"
    :status="status"
    :appearance="appearance"
    @update:model-value="handleUpdate"
  />
</template>

<script setup lang="ts">
import BaseDatePicker from './BaseDatePicker.vue'
import type { BaseDatePickerProps } from './BaseDatePicker'

defineOptions({
  name: 'EuiDatePicker',
})

const props = defineProps<{
  modelValue?: Date | null
} & Omit<BaseDatePickerProps, 'modelValue'>>()

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
}>()

const handleUpdate = (value: Date | string | null) => {
  if (value === null) {
    emit('update:modelValue', null)
  } else if (value instanceof Date) {
    emit('update:modelValue', value)
  } else {
    emit('update:modelValue', new Date(value))
  }
}
</script>

