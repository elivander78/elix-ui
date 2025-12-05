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
        stroke-width="4"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size?: number | 'sm' | 'md' | 'lg'
}>()

const spinnerClasses = computed(() => {
  return [
    'eui-spinner',
    {
      [`eui-spinner--${props.size}`]: typeof props.size === 'string',
    },
  ]
})

const spinnerStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
    }
  }
  return {}
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

