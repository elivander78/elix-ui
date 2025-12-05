<template>
  <span :class="tagClasses">
    <span v-if="$slots.icon" class="eui-tag__icon">
      <slot name="icon" />
    </span>
    <slot />
    <button
      v-if="closable"
      class="eui-tag__close"
      @click="handleClose"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default'
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  round?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const tagClasses = computed(() => {
  return [
    'eui-tag',
    `eui-tag--${props.type || 'default'}`,
    `eui-tag--${props.variant || 'solid'}`,
    `eui-tag--${props.size || 'md'}`,
    {
      'eui-tag--round': props.round,
      'eui-tag--disabled': props.disabled,
    },
  ]
})

const handleClose = (event: MouseEvent) => {
  event.stopPropagation()
  emit('close')
}
</script>

<style lang="scss" scoped>
.eui-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--eui-spacing-xs);
  font-weight: var(--eui-font-weight-medium);
  line-height: 1;
  border-radius: var(--eui-radius-md);

  &--sm {
    padding: 2px var(--eui-spacing-xs);
    font-size: var(--eui-font-size-xs);
  }

  &--md {
    padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
    font-size: var(--eui-font-size-sm);
  }

  &--lg {
    padding: var(--eui-spacing-sm) var(--eui-spacing-md);
    font-size: var(--eui-font-size-base);
  }

  &--round {
    border-radius: var(--eui-radius-full);
  }

  // Variants
  &--solid {
    &.eui-tag--default {
      color: var(--eui-text-primary);
      background-color: var(--eui-bg-secondary);
      border: 1px solid var(--eui-border-color);
    }

    &.eui-tag--primary {
      color: var(--eui-text-inverse);
      background-color: var(--eui-color-primary);
    }

    &.eui-tag--success {
      color: var(--eui-text-inverse);
      background-color: var(--eui-color-success);
    }

    &.eui-tag--warning {
      color: var(--eui-text-inverse);
      background-color: var(--eui-color-warning);
    }

    &.eui-tag--error {
      color: var(--eui-text-inverse);
      background-color: var(--eui-color-error);
    }

    &.eui-tag--info {
      color: var(--eui-text-inverse);
      background-color: var(--eui-color-info);
    }
  }

  &--outline {
    background-color: transparent;

    &.eui-tag--default {
      color: var(--eui-text-primary);
      border: 1px solid var(--eui-border-color);
    }

    &.eui-tag--primary {
      color: var(--eui-color-primary);
      border: 1px solid var(--eui-color-primary);
    }

    &.eui-tag--success {
      color: var(--eui-color-success);
      border: 1px solid var(--eui-color-success);
    }

    &.eui-tag--warning {
      color: var(--eui-color-warning);
      border: 1px solid var(--eui-color-warning);
    }

    &.eui-tag--error {
      color: var(--eui-color-error);
      border: 1px solid var(--eui-color-error);
    }

    &.eui-tag--info {
      color: var(--eui-color-info);
      border: 1px solid var(--eui-color-info);
    }
  }

  &--ghost {
    background-color: transparent;
    border: 1px solid transparent;

    &.eui-tag--default {
      color: var(--eui-text-primary);
      background-color: var(--eui-bg-secondary);
    }

    &.eui-tag--primary {
      color: var(--eui-color-primary);
      background-color: var(--eui-color-primary-50);
    }

    &.eui-tag--success {
      color: var(--eui-color-success);
      background-color: var(--eui-color-success-50);
    }

    &.eui-tag--warning {
      color: var(--eui-color-warning);
      background-color: var(--eui-color-warning-50);
    }

    &.eui-tag--error {
      color: var(--eui-color-error);
      background-color: var(--eui-color-error-50);
    }

    &.eui-tag--info {
      color: var(--eui-color-info);
      background-color: var(--eui-color-info-50);
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
  }

  &__close {
    display: inline-flex;
    align-items: center;
    padding: 0;
    margin-left: var(--eui-spacing-xs);
    color: currentColor;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
}
</style>

