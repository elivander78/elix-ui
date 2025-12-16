<template>
  <div :class="wrapperClasses">
    <span v-if="$slots.prefix" class="eui-input__prefix">
      <slot name="prefix" />
    </span>
    <input
      ref="inputRef"
      :class="inputClasses"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span v-if="clearable && modelValue && !disabled" class="eui-input__clear" @click="handleClear">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L4 12M4 4l8 8"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="$slots.suffix && !(clearable && modelValue)" class="eui-input__suffix">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiInput',

})

import { computed, ref, useSlots } from 'vue'
import { inputProps, type InputProps } from './Input'

const props = defineProps(inputProps)
const slots = useSlots()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const inputRef = ref<HTMLInputElement>()

const wrapperClasses = computed(() => {
  return [
    'eui-input-wrapper',
    `eui-input-wrapper--${props.size}`,
    `eui-input-wrapper--appearance-${props.appearance}`,
    {
      'eui-input-wrapper--disabled': props.disabled,
      'eui-input-wrapper--readonly': props.readonly,
      'eui-input-wrapper--error': props.state === 'error',
      'eui-input-wrapper--success': props.state === 'success',
      'eui-input-wrapper--warning': props.state === 'warning',
      'eui-input-wrapper--with-prefix': !!slots.prefix,
      'eui-input-wrapper--with-suffix': !!slots.suffix || (props.clearable && props.modelValue),
    },
  ]
})

const inputClasses = computed(() => {
  return ['eui-input']
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
})
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  font-family: var(--eui-font-family-sans);
  background-color: var(--eui-bg-primary);
  @include border-shadow(var(--eui-border-color), 1px);
  border-radius: var(--eui-radius-md);
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &:hover:not(.eui-input-wrapper--disabled):not(.eui-input-wrapper--readonly) {
    @include border-shadow(var(--eui-border-color-hover), 1px);
  }

  &:focus-within:not(.eui-input-wrapper--disabled):not(.eui-input-wrapper--readonly) {
    @include border-shadow(var(--eui-border-color-focus), 1px);
    box-shadow: 0 0 0 2px var(--eui-focus-ring-primary);

    .eui-input__prefix,
    .eui-input__suffix {
      color: var(--eui-text-primary);
    }
  }

  &--xs {
    .eui-input {
      padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
      font-size: var(--eui-font-size-xs);
      min-height: 24px;
    }

    .eui-input__prefix {
      padding-left: var(--eui-spacing-sm);
    }

    .eui-input__suffix {
      padding-right: var(--eui-spacing-sm);
    }

    .eui-input__clear {
      margin-right: var(--eui-spacing-sm);
    }
  }

  &--sm {
    .eui-input {
      padding: var(--eui-spacing-xs) var(--eui-spacing-md);
      font-size: var(--eui-font-size-sm);
      min-height: 28px;
    }

    .eui-input__prefix {
      padding-left: var(--eui-spacing-md);
      padding-right: var(--eui-spacing-sm);
    }

    .eui-input__suffix {
      padding-left: var(--eui-spacing-sm);
      padding-right: var(--eui-spacing-md);
    }

    .eui-input__clear {
      margin-right: var(--eui-spacing-md);
    }
  }

  &--md {
    .eui-input {
      padding: var(--eui-spacing-sm) var(--eui-spacing-md);
      font-size: var(--eui-font-size-base);
      min-height: 36px;
    }

    .eui-input__prefix {
      padding-left: var(--eui-spacing-md);
      padding-right: var(--eui-spacing-sm);
    }

    .eui-input__suffix {
      padding-left: var(--eui-spacing-sm);
      padding-right: var(--eui-spacing-md);
    }

    .eui-input__clear {
      margin-right: var(--eui-spacing-md);
    }
  }

  &--lg {
    .eui-input {
      padding: var(--eui-spacing-md) var(--eui-spacing-lg);
      font-size: var(--eui-font-size-lg);
      min-height: 44px;
    }

    .eui-input__prefix {
      padding-left: var(--eui-spacing-lg);
      padding-right: var(--eui-spacing-sm);
    }

    .eui-input__suffix {
      padding-left: var(--eui-spacing-sm);
      padding-right: var(--eui-spacing-lg);
    }

    .eui-input__clear {
      margin-right: var(--eui-spacing-lg);
    }
  }

  &--with-prefix {
    .eui-input {
      padding-left: 0;
    }
  }

  &--with-suffix {
    .eui-input {
      padding-right: 0;
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--eui-bg-disabled);

    .eui-input {
      cursor: not-allowed;
      background-color: transparent;
    }
  }

  &--readonly {
    background-color: var(--eui-bg-secondary);

    .eui-input {
      cursor: default;
      background-color: transparent;
    }
  }

  &--error {
    @include border-shadow(var(--eui-color-error), 1px);

    &:focus-within {
      @include border-shadow(var(--eui-color-error), 1px);
      box-shadow: 0 0 0 2px var(--eui-focus-ring-error);
    }
  }

  &--success {
    @include border-shadow(var(--eui-color-success), 1px);

    &:focus-within {
      @include border-shadow(var(--eui-color-success), 1px);
      box-shadow: 0 0 0 2px var(--eui-focus-ring-success);
    }
  }

  &--warning {
    @include border-shadow(var(--eui-color-warning), 1px);

    &:focus-within {
      @include border-shadow(var(--eui-color-warning), 1px);
      box-shadow: 0 0 0 2px var(--eui-focus-ring-warning);
    }
  }

  // Appearance
  &--appearance-shadow {
    border-color: transparent !important;
    box-shadow: 0 0 0 1px var(--eui-border-color) !important;
    
    &:hover:not(.eui-input-wrapper--disabled):not(.eui-input-wrapper--readonly) {
      box-shadow: 0 0 0 1px var(--eui-border-color-hover) !important;
    }
    
    &:focus-within:not(.eui-input-wrapper--disabled):not(.eui-input-wrapper--readonly) {
      box-shadow: 0 0 0 1px var(--eui-border-color-focus), 0 0 0 2px var(--eui-focus-ring-primary) !important;
    }
    
    &.eui-input-wrapper--error {
      box-shadow: 0 0 0 1px var(--eui-color-error) !important;
      &:focus-within {
        box-shadow: 0 0 0 1px var(--eui-color-error), 0 0 0 2px var(--eui-focus-ring-error) !important;
      }
    }
    
    &.eui-input-wrapper--success {
      box-shadow: 0 0 0 1px var(--eui-color-success) !important;
      &:focus-within {
        box-shadow: 0 0 0 1px var(--eui-color-success), 0 0 0 2px var(--eui-focus-ring-success) !important;
      }
    }
  }

  &--appearance-border-shadow {
    box-shadow: 0 0 0 1px var(--eui-border-color) !important;
    
    &:hover:not(.eui-input-wrapper--disabled):not(.eui-input-wrapper--readonly) {
      box-shadow: 0 0 0 1px var(--eui-border-color-hover) !important;
    }
    
    &:focus-within:not(.eui-input-wrapper--disabled):not(.eui-input-wrapper--readonly) {
      box-shadow: 0 0 0 1px var(--eui-border-color-focus), 0 0 0 2px var(--eui-focus-ring-primary) !important;
    }
    
    &.eui-input-wrapper--error {
      box-shadow: 0 0 0 1px var(--eui-color-error) !important;
      &:focus-within {
        box-shadow: 0 0 0 1px var(--eui-color-error), 0 0 0 2px var(--eui-focus-ring-error) !important;
      }
    }
    
    &.eui-input-wrapper--success {
      box-shadow: 0 0 0 1px var(--eui-color-success) !important;
      &:focus-within {
        box-shadow: 0 0 0 1px var(--eui-color-success), 0 0 0 2px var(--eui-focus-ring-success) !important;
      }
    }
  }
}

.eui-input {
  flex: 1;
  width: 100%;
  padding: var(--eui-spacing-sm) var(--eui-spacing-md);
  font-family: inherit;
  font-size: var(--eui-font-size-base);
  line-height: var(--eui-line-height-normal);
  color: var(--eui-text-primary);
  background-color: transparent;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &::placeholder {
    color: var(--eui-text-tertiary);
  }
}

.eui-input__prefix,
.eui-input__suffix {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--eui-text-secondary);
  pointer-events: none;
  z-index: 1;
  transition: color 0.2s ease-in-out;
  
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    display: block;
  }
}

.eui-input__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: var(--eui-spacing-xs);
  color: var(--eui-text-tertiary);
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  z-index: 1;
  border-radius: var(--eui-radius-sm);

  &:hover {
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-secondary);
  }

  &:active {
    background-color: var(--eui-bg-tertiary);
  }

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
}
</style>

