<template>
  <span :class="badgeClasses">
    <slot />
    <span v-if="value !== undefined && value !== null" class="eui-badge__value">{{ displayValue }}</span>
    <span v-if="dot" class="eui-badge__dot"></span>
  </span>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiBadge',

})

import { computed } from 'vue'

const props = defineProps<{
  value?: string | number
  max?: number
  dot?: boolean
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}>()

const displayValue = computed(() => {
  if (props.max !== undefined && typeof props.value === 'number' && props.value > props.max) {
    return `${props.max}+`
  }
  return props.value
})

const badgeClasses = computed(() => {
  return [
    'eui-badge',
    {
      [`eui-badge--${props.type || 'primary'}`]: props.type || !props.dot,
      'eui-badge--dot': props.dot,
      [`eui-badge--${props.size || 'md'}`]: props.size,
    },
  ]
})
</script>

<style lang="scss" scoped>
.eui-badge {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  line-height: 1;

  &__value {
    position: absolute;
    top: -8px;
    right: -8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 6px;
    font-size: var(--eui-font-size-xs);
    font-weight: var(--eui-font-weight-semibold);
    line-height: 1;
    color: var(--eui-text-inverse);
    background-color: var(--eui-color-primary);
    border-radius: var(--eui-radius-full);
    box-sizing: border-box;
    white-space: nowrap;
    z-index: 1;
  }

  &__dot {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 8px;
    height: 8px;
    background-color: var(--eui-color-primary);
    border-radius: 50%;
    box-sizing: border-box;
    z-index: 1;
  }

  // Sizes
  &--sm {
    .eui-badge__value {
      top: -6px;
      right: -6px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-size: 10px;
    }

    .eui-badge__dot {
      top: -3px;
      right: -3px;
      width: 6px;
      height: 6px;
    }
  }

  &--md {
    .eui-badge__value {
      top: -8px;
      right: -8px;
      min-width: 18px;
      height: 18px;
      padding: 0 6px;
      font-size: var(--eui-font-size-xs);
    }

    .eui-badge__dot {
      top: -4px;
      right: -4px;
      width: 8px;
      height: 8px;
    }
  }

  &--lg {
    .eui-badge__value {
      top: -10px;
      right: -10px;
      min-width: 22px;
      height: 22px;
      padding: 0 8px;
      font-size: var(--eui-font-size-sm);
    }

    .eui-badge__dot {
      top: -5px;
      right: -5px;
      width: 10px;
      height: 10px;
    }
  }

  &--primary {
    .eui-badge__value,
    .eui-badge__dot {
      background-color: var(--eui-color-primary);
    }
  }

  &--success {
    .eui-badge__value,
    .eui-badge__dot {
      background-color: var(--eui-color-success);
    }
  }

  &--warning {
    .eui-badge__value,
    .eui-badge__dot {
      background-color: var(--eui-color-warning);
    }
  }

  &--error {
    .eui-badge__value,
    .eui-badge__dot {
      background-color: var(--eui-color-error);
    }
  }

  &--info {
    .eui-badge__value,
    .eui-badge__dot {
      background-color: var(--eui-color-info);
    }
  }
}
</style>

