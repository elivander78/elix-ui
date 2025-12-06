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
import { computed, inject } from 'vue'
import { buttonProps } from './Button'
import type { ButtonSize, ButtonType, ButtonAppearance } from './Button'

const props = defineProps(buttonProps)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

interface ButtonGroupContext {
  size?: ButtonSize
  variant?: ButtonType
  appearance?: ButtonAppearance
}

const buttonGroup = inject<ButtonGroupContext | undefined>('buttonGroup', undefined)

// Используем props напрямую, если переданы, иначе из buttonGroup, иначе дефолты
const computedSize = computed(() => {
  if (props.size !== undefined) return props.size
  if (buttonGroup?.size !== undefined) return buttonGroup.size
  return 'md'
})

const computedType = computed(() => {
  if (props.type !== undefined) return props.type
  if (buttonGroup?.variant !== undefined) return buttonGroup.variant
  return 'primary'
})

const computedAppearance = computed(() => {
  if (props.appearance !== undefined) return props.appearance
  if (buttonGroup?.appearance !== undefined) return buttonGroup.appearance
  return 'border'
})

const buttonClasses = computed(() => {
  return [
    'eui-button',
    `eui-button--${computedSize.value}`,
    `eui-button--${computedType.value}`,
    `eui-button--${props.shape}`,
    `eui-button--appearance-${computedAppearance.value}`,
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
@use '../../styles/mixins' as *;

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
  @include border-shadow(transparent, 1px);
  transition: all 0.2s ease-in-out;
  outline: none;

  &:focus-visible {
    outline: 2px solid var(--eui-border-color-focus);
    outline-offset: 2px;
    box-shadow: 0 0 0 3px var(--eui-focus-ring-primary);
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
    @include border-shadow(var(--eui-color-primary), 1px);

    &:hover:not(:disabled) {
      background-color: var(--eui-color-primary-600);
      @include border-shadow(var(--eui-color-primary-600), 1px);
    }

    &:active:not(:disabled) {
      background-color: var(--eui-color-primary-700);
      @include border-shadow(var(--eui-color-primary-700), 1px);
    }
  }

  &--secondary {
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-secondary);
    @include border-shadow(var(--eui-border-color), 1px);

    &:hover:not(:disabled) {
      background-color: var(--eui-bg-tertiary);
      @include border-shadow(var(--eui-border-color-hover), 1px);
    }

    &:active:not(:disabled) {
      background-color: var(--eui-bg-tertiary);
    }
  }

  &--tertiary {
    color: var(--eui-color-primary);
    background-color: transparent;
    @include border-shadow-none();

    &:hover:not(:disabled) {
      background-color: var(--eui-bg-hover-primary);
    }

    &:active:not(:disabled) {
      background-color: var(--eui-bg-active-primary);
    }
  }

  &--outline {
    color: var(--eui-color-primary);
    background-color: transparent;
    @include border-shadow(var(--eui-color-primary), 1px);

    &:hover:not(:disabled) {
      background-color: var(--eui-bg-hover-primary);
      @include border-shadow(var(--eui-color-primary-600), 1px);
    }

    &:active:not(:disabled) {
      background-color: var(--eui-bg-active-primary);
      @include border-shadow(var(--eui-color-primary-700), 1px);
    }
  }

  &--ghost {
    color: var(--eui-text-primary);
    background-color: transparent;
    @include border-shadow-none();

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
    @include border-shadow-none();
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

  // Appearance
  &--appearance-shadow {
    border-color: transparent !important;
    
    &.eui-button--primary {
      box-shadow: 0 0 0 1px var(--eui-color-primary) !important;
      &:hover:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-color-primary-600) !important;
      }
      &:active:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-color-primary-700) !important;
      }
    }
    &.eui-button--secondary {
      box-shadow: 0 0 0 1px var(--eui-border-color) !important;
      &:hover:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-border-color-hover) !important;
      }
    }
    &.eui-button--outline {
      box-shadow: 0 0 0 1px var(--eui-color-primary) !important;
      &:hover:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-color-primary-600) !important;
      }
      &:active:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-color-primary-700) !important;
      }
    }
  }

  &--appearance-border-shadow {
    &.eui-button--primary {
      box-shadow: 0 0 0 1px var(--eui-color-primary) !important;
      &:hover:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-color-primary-600) !important;
      }
      &:active:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-color-primary-700) !important;
      }
    }
    &.eui-button--secondary {
      box-shadow: 0 0 0 1px var(--eui-border-color) !important;
      &:hover:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-border-color-hover) !important;
      }
    }
    &.eui-button--outline {
      box-shadow: 0 0 0 1px var(--eui-color-primary) !important;
      &:hover:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-color-primary-600) !important;
      }
      &:active:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-color-primary-700) !important;
      }
    }
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

