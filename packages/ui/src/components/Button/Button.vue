<template>
  <button
    :class="buttonClasses"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="eui-button__loading">
      <svg
        class="eui-button__spinner"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="eui-button__spinner-circle"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-dasharray="31.416"
          stroke-dashoffset="31.416"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="2s"
            values="0 31.416;15.708 15.708;0 31.416;0 31.416"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            values="0;-15.708;-31.416;-31.416"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </span>
    <span v-if="$slots.icon && !loading" class="eui-button__icon">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" class="eui-button__content">
      <slot />
    </span>
    <span v-if="$slots.suffix" class="eui-button__suffix">
      <slot name="suffix" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { buttonProps, type ButtonProps } from './Button'

const props = defineProps(buttonProps)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  return [
    'eui-button',
    `eui-button--${props.size}`,
    `eui-button--${props.type}`,
    `eui-button--${props.shape}`,
    {
      'eui-button--disabled': props.disabled,
      'eui-button--loading': props.loading,
      'eui-button--block': props.block,
    },
  ]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.eui-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--eui-spacing-xs);
  font-family: var(--eui-font-family-sans);
  font-weight: var(--eui-font-weight-medium);
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:focus-visible {
    outline: 2px solid var(--eui-border-color-focus);
    outline-offset: 2px;
  }

  // Sizes
  &--xs {
    padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
    font-size: var(--eui-font-size-xs);
    min-height: 24px;
  }

  &--sm {
    padding: var(--eui-spacing-xs) var(--eui-spacing-md);
    font-size: var(--eui-font-size-sm);
    min-height: 28px;
  }

  &--md {
    padding: var(--eui-spacing-sm) var(--eui-spacing-md);
    font-size: var(--eui-font-size-base);
    min-height: 36px;
  }

  &--lg {
    padding: var(--eui-spacing-md) var(--eui-spacing-lg);
    font-size: var(--eui-font-size-lg);
    min-height: 44px;
  }

  // Shapes
  &--rounded {
    border-radius: var(--eui-radius-md);
  }

  &--pill {
    border-radius: var(--eui-radius-full);
  }

  &--square {
    border-radius: var(--eui-radius-none);
  }

  // Types
  &--primary {
    color: var(--eui-text-inverse);
    background-color: var(--eui-color-primary);
    border-color: var(--eui-color-primary);

    &:hover:not(:disabled) {
      background-color: var(--eui-color-primary-600);
      border-color: var(--eui-color-primary-600);
    }

    &:active:not(:disabled) {
      background-color: var(--eui-color-primary-700);
      border-color: var(--eui-color-primary-700);
    }
  }

  &--secondary {
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-secondary);
    border-color: var(--eui-border-color);

    &:hover:not(:disabled) {
      background-color: var(--eui-bg-tertiary);
      border-color: var(--eui-border-color-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--eui-color-neutral-200);
    }
  }

  &--tertiary {
    color: var(--eui-color-primary);
    background-color: transparent;
    border-color: transparent;

    &:hover:not(:disabled) {
      background-color: var(--eui-color-primary-50);
    }

    &:active:not(:disabled) {
      background-color: var(--eui-color-primary-100);
    }
  }

  &--outline {
    color: var(--eui-color-primary);
    background-color: transparent;
    border-color: var(--eui-color-primary);

    &:hover:not(:disabled) {
      background-color: var(--eui-color-primary-50);
      border-color: var(--eui-color-primary-600);
    }

    &:active:not(:disabled) {
      background-color: var(--eui-color-primary-100);
      border-color: var(--eui-color-primary-700);
    }
  }

  &--ghost {
    color: var(--eui-text-primary);
    background-color: transparent;
    border-color: transparent;

    &:hover:not(:disabled) {
      background-color: var(--eui-bg-secondary);
    }

    &:active:not(:disabled) {
      background-color: var(--eui-bg-tertiary);
    }
  }

  &--text {
    color: var(--eui-color-primary);
    background-color: transparent;
    border-color: transparent;
    padding-left: 0;
    padding-right: 0;

    &:hover:not(:disabled) {
      color: var(--eui-color-primary-600);
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: var(--eui-color-primary-700);
    }
  }

  // States
  &--disabled,
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--loading {
    cursor: wait;
    pointer-events: none;
  }

  &--block {
    width: 100%;
  }

  // Content
  &__icon,
  &__suffix {
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }

  &__loading {
    display: inline-flex;
    align-items: center;
    margin-right: var(--eui-spacing-xs);
  }

  &__spinner {
    width: 1em;
    height: 1em;
    animation: eui-spin 1s linear infinite;
  }

  &__spinner-circle {
    opacity: 0.25;
  }
}

@keyframes eui-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

