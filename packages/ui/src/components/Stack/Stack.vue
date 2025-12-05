<template>
  <div :class="stackClasses" :style="stackStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'EuiStack',
})

const props = defineProps<{
  direction?: 'horizontal' | 'vertical'
  gap?: number | string
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
  wrap?: boolean
}>()

const stackClasses = computed(() => {
  return [
    'eui-stack',
    `eui-stack--${props.direction || 'vertical'}`,
    {
      'eui-stack--wrap': props.wrap,
      [`eui-stack--align-${props.align}`]: props.align,
      [`eui-stack--justify-${props.justify}`]: props.justify,
    },
  ]
})

const stackStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.gap !== undefined) {
    const gapValue = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
    style.gap = gapValue
  }
  
  return style
})
</script>

<style lang="scss" scoped>
.eui-stack {
  display: flex;

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
  }

  &--wrap {
    flex-wrap: wrap;
  }

  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-stretch {
    align-items: stretch;
  }

  &--justify-start {
    justify-content: flex-start;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-space-between {
    justify-content: space-between;
  }

  &--justify-space-around {
    justify-content: space-around;
  }

  &--justify-space-evenly {
    justify-content: space-evenly;
  }
}
</style>

