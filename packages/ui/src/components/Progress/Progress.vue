<template>
  <component :is="asTag" :class="progressClasses">
    <div v-if="showInfo || showLabel" class="eui-progress__info">
      <span class="eui-progress__text">{{ displayText }}</span>
      <span
        v-if="percentage !== undefined || percent !== undefined"
        class="eui-progress__percentage"
        >{{ displayPercentage }}%</span
      >
    </div>
    <div :class="barClasses">
      <div class="eui-progress__fill" :style="fillStyle" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  percentage?: number
  percent?: number
  status?: 'success' | 'error' | 'normal' | 'warning' | 'active'
  showInfo?: boolean
  showLabel?: boolean
  strokeWidth?: number
  text?: string
  as?: string
  size?: 'sm' | 'md' | 'lg'
  type?: 'line' | 'circle'
  variant?: 'line' | 'circle'
  color?: string
  striped?: boolean
  animated?: boolean
  appearance?: 'border' | 'shadow'
}>()

const asTag = computed(() => props.as || 'div')

const progressClasses = computed(() => {
  const type = props.type || props.variant || 'line'
  const appearance = props.appearance || 'shadow'
  return [
    'eui-progress',
    {
      [`eui-progress--${props.status}`]: props.status,
      [`eui-progress--${props.size || 'md'}`]: props.size,
      [`eui-progress--${type}`]: type,
      [`eui-progress--${appearance}`]: appearance,
    },
  ]
})

const barClasses = computed(() => {
  return [
    'eui-progress__bar',
    {
      'eui-progress__bar--striped': props.striped,
    },
  ]
})

const displayPercentage = computed(() => {
  return Math.min(
    100,
    Math.max(0, props.percent !== undefined ? props.percent : props.percentage || 0)
  )
})

const fillStyle = computed(() => {
  const percentage = displayPercentage.value
  const height = props.strokeWidth || (props.size === 'sm' ? 4 : props.size === 'lg' ? 12 : 8)
  return {
    width: `${percentage}%`,
    height: `${height}px`,
    backgroundColor: props.color || undefined,
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

    &--striped {
      .eui-progress__fill {
        background-image: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 0.5rem,
          var(--eui-progress-stripe) 0.5rem,
          var(--eui-progress-stripe) 1rem
        );
        background-size: 1rem 1rem;
      }
    }
  }

  &--border &__bar {
    border: 1px solid var(--eui-border-color);
  }

  &--shadow &__bar {
    box-shadow: var(--eui-shadow-sm);
  }

  &__fill {
    position: relative;
    height: 100%;
    background-color: var(--eui-color-primary);
    border-radius: var(--eui-radius-full);
    transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
    overflow: hidden;

    .eui-progress--animated & {
      animation: eui-progress-striped 1s linear infinite;
    }
  }

  // Sizes
  &--sm &__bar {
    height: 4px;
  }

  &--md &__bar {
    height: 8px;
  }

  &--lg &__bar {
    height: 12px;
  }

  &--success &__fill {
    background-color: var(--eui-color-success);
  }

  &--error &__fill {
    background-color: var(--eui-color-error);
  }

  &--active &__fill,
  &--normal &__fill {
    background: linear-gradient(
      90deg,
      var(--eui-color-primary) 0%,
      var(--eui-color-primary-300) 50%,
      var(--eui-color-primary) 100%
    );
    background-size: 200% 100%;
    animation: eui-progress-active 2s linear infinite;
  }

  &--warning &__fill {
    background-color: var(--eui-color-warning);
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

@keyframes eui-progress-striped {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 1rem 0;
  }
}
</style>
