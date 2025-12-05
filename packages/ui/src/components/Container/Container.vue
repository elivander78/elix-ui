<template>
  <div :class="containerClasses" :style="containerStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  fluid?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string
}>()

const containerClasses = computed(() => {
  return [
    'eui-container',
    {
      'eui-container--fluid': props.fluid,
      [`eui-container--${props.maxWidth}`]: props.maxWidth && !props.fluid,
    },
  ]
})

const containerStyle = computed(() => {
  if (props.maxWidth && typeof props.maxWidth === 'string' && !['sm', 'md', 'lg', 'xl', '2xl'].includes(props.maxWidth)) {
    return {
      maxWidth: props.maxWidth,
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
  padding-left: var(--eui-spacing-md);
  padding-right: var(--eui-spacing-md);

  &--fluid {
    max-width: 100%;
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

