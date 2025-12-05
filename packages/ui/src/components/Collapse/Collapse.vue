<template>
  <div :class="collapseClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { collapseProps, type CollapseProps } from './Collapse'

defineOptions({
  name: 'EuiCollapse',
})

const props = defineProps(collapseProps)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[]]
}>()

const collapseClasses = computed(() => {
  return [
    'eui-collapse',
    {
      'eui-collapse--bordered': props.bordered,
      [`eui-collapse--appearance-${props.appearance}`]: props.appearance,
    },
  ]
})

const activeItems = computed(() => {
  if (props.modelValue === undefined) return []
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
})

const isItemActive = (name: string | number) => {
  return activeItems.value.includes(name)
}

const toggleItem = (name: string | number) => {
  if (props.accordion) {
    // Only one item can be open
    const newValue = isItemActive(name) ? undefined : name
    emit('update:modelValue', newValue as any)
  } else {
    // Multiple items can be open
    const current = activeItems.value
    const index = current.indexOf(name)
    let newValue: (string | number)[]
    
    if (index > -1) {
      newValue = current.filter(item => item !== name)
    } else {
      newValue = [...current, name]
    }
    
    emit('update:modelValue', newValue)
  }
}

provide('collapse', {
  activeItems,
  isItemActive,
  toggleItem,
  accordion: props.accordion,
  appearance: props.appearance,
  bordered: props.bordered,
})
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-collapse {
  width: 100%;

  &--bordered {
    border-radius: var(--eui-radius-md);
    overflow: hidden;
  }

  &--appearance-shadow {
    box-shadow: var(--eui-shadow-sm);
  }

  &--appearance-border-shadow {
    @include border-shadow(var(--eui-border-color), 1px);
    box-shadow: var(--eui-shadow-sm);
  }
}
</style>

