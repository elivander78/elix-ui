<template>
  <component :is="asTag" :class="progressClasses">
    <div v-if="showInfo" class="eui-progress__info">
      <span class="eui-progress__text">{{ displayText }}</span>
      <span v-if="percentage !== undefined" class="eui-progress__percentage">{{ percentage }}%</span>
    </div>
    <div class="eui-progress__bar">
      <div
        class="eui-progress__fill"
        :style="fillStyle"
      />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  percentage?: number
  status?: 'success' | 'error' | 'active'
  showInfo?: boolean
  strokeWidth?: number
  text?: string
  as?: string
}>()

const asTag = computed(() => props.as || 'div')

const progressClasses = computed(() => {
  return [
    'eui-progress',
    {
      [`eui-progress--${props.status}`]: props.status,
    },
  ]
})

const fillStyle = computed(() => {
  const percentage = Math.min(100, Math.max(0, props.percentage || 0))
  return {
    width: `${percentage}%`,
    height: props.strokeWidth ? `${props.strokeWidth}px` : undefined,
  }
})

const displayText = computed(() => {
  return props.text || ''
})
</script>

<style lang="scss" scoped>
.eui-progress {
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--eui-spacing-xs);
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-primary);
  }

  &__percentage {
    font-weight: var(--eui-font-weight-medium);
  }

  &__bar {
    position: relative;
    width: 100%;
    height: 8px;
    background-color: var(--eui-bg-secondary);
    border-radius: var(--eui-radius-full);
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background-color: var(--eui-color-primary);
    border-radius: var(--eui-radius-full);
    transition: width 0.3s ease-in-out;
  }

  &--success &__fill {
    background-color: var(--eui-color-success);
  }

  &--error &__fill {
    background-color: var(--eui-color-error);
  }

  &--active &__fill {
    background: linear-gradient(
      90deg,
      var(--eui-color-primary) 0%,
      var(--eui-color-primary-300) 50%,
      var(--eui-color-primary) 100%
    );
    background-size: 200% 100%;
    animation: eui-progress-active 2s linear infinite;
  }
}

@keyframes eui-progress-active {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>

