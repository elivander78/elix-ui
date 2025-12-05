<template>
  <span :class="badgeClasses">
    <slot />
    <span v-if="value !== undefined && value !== null" class="eui-badge__value">{{ displayValue }}</span>
    <span v-if="dot" class="eui-badge__dot"></span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value?: string | number
  max?: number
  dot?: boolean
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info'
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
    },
  ]
})
</script>

<style lang="scss" scoped>
.eui-badge {
  position: relative;
  display: inline-block;

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
    transform: translate(50%, -50%);
  }

  &__dot {
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: var(--eui-color-primary);
    border-radius: 50%;
    transform: translate(50%, -50%);
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

