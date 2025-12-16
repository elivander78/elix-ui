<template>
  <div :class="spinnerClasses" :style="spinnerStyle">
    <svg class="eui-spinner__circle" viewBox="0 0 50 50">
      <circle
        class="eui-spinner__path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        :stroke-width="circleStrokeWidth"
      />
    </svg>
    <div v-if="label" class="eui-spinner__label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiSpinner',

})

import { computed } from 'vue'

const props = defineProps<{
  size?: number | 'sm' | 'md' | 'lg'
  thickness?: number
  label?: string
  overlay?: boolean
}>()

const spinnerClasses = computed(() => {
  return [
    'eui-spinner',
    {
      [`eui-spinner--${props.size}`]: typeof props.size === 'string',
      'eui-spinner--overlay': props.overlay,
    },
  ]
})

const spinnerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (typeof props.size === 'number') {
    style.width = `${props.size}px`
    style.height = `${props.size}px`
  }
  return style
})

const circleStrokeWidth = computed(() => {
  if (props.thickness !== undefined) {
    return props.thickness
  }
  // Default thickness based on size
  if (typeof props.size === 'string') {
    if (props.size === 'sm') return 2
    if (props.size === 'lg') return 5
    return 4
  }
  return 4
})
</script>

<style lang="scss" scoped>
.eui-spinner {
  display: inline-block;
  color: var(--eui-color-primary);

  &--sm {
    width: 16px;
    height: 16px;
  }

  &--md {
    width: 24px;
    height: 24px;
  }

  &--lg {
    width: 32px;
    height: 32px;
  }

  &__circle {
    width: 100%;
    height: 100%;
    animation: eui-spinner-rotate 1s linear infinite;
  }

  &__path {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: eui-spinner-dash 1.5s ease-in-out infinite;
  }

  &__label {
    margin-top: var(--eui-spacing-sm);
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);
    text-align: center;
  }

  &--overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--eui-spinner-overlay);
    backdrop-filter: blur(2px);
    z-index: 1000;
  }
}

@keyframes eui-spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes eui-spinner-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>

