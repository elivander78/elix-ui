<template>
  <div :class="rowClasses" :style="rowStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  gutter?: number | [number, number]
  align?: 'top' | 'middle' | 'bottom' | 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
}>()

const rowClasses = computed(() => {
  return [
    'eui-row',
    {
      [`eui-row--align-${props.align}`]: props.align,
      [`eui-row--justify-${props.justify}`]: props.justify,
    },
  ]
})

const rowStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.gutter) {
    if (Array.isArray(props.gutter)) {
      const [horizontal, vertical] = props.gutter
      style.marginLeft = `-${horizontal / 2}px`
      style.marginRight = `-${horizontal / 2}px`
      style.marginTop = `-${vertical / 2}px`
      style.marginBottom = `-${vertical / 2}px`
    } else {
      const gutter = props.gutter
      style.marginLeft = `-${gutter / 2}px`
      style.marginRight = `-${gutter / 2}px`
    }
  }
  
  return style
})
</script>

<style lang="scss" scoped>
.eui-row {
  display: flex;
  flex-wrap: wrap;

  &--align-top,
  &--align-start {
    align-items: flex-start;
  }

  &--align-middle,
  &--align-center {
    align-items: center;
  }

  &--align-bottom,
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

