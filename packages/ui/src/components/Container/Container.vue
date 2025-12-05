<template>
  <div :class="containerClasses" :style="containerStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  fluid?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number
  padded?: boolean
}>()

const containerClasses = computed(() => {
  return [
    'eui-container',
    {
      'eui-container--fluid': props.fluid,
      'eui-container--padded': props.padded,
      [`eui-container--${props.maxWidth}`]: props.maxWidth && typeof props.maxWidth === 'string' && !props.fluid,
    },
  ]
})

const containerStyle = computed(() => {
  if (props.maxWidth && typeof props.maxWidth === 'number') {
    return {
      maxWidth: `${props.maxWidth}px`,
    }
  }
  return {}
})
</script>

<style lang="scss" scoped>
.eui-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  &--fluid {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  &--padded {
    padding-left: var(--eui-spacing-md);
    padding-right: var(--eui-spacing-md);
  }

  &:not(&--fluid):not(&--padded) {
    padding-left: var(--eui-spacing-md);
    padding-right: var(--eui-spacing-md);
  }

  &--sm {
    max-width: 640px;
  }

  &--md {
    max-width: 768px;
  }

  &--lg {
    max-width: 1024px;
  }

  &--xl {
    max-width: 1280px;
  }

  &--2xl {
    max-width: 1536px;
  }

  @media (max-width: 640px) {
    padding-left: var(--eui-spacing-sm);
    padding-right: var(--eui-spacing-sm);
  }
}
</style>

