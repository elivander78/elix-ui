<template>
  <div :class="wrapperClasses">
    <textarea
      ref="textareaRef"
      :class="textareaClasses"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InputSize, InputState } from '../Input/Input'

const props = defineProps<{
  modelValue?: string
  size?: InputSize
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  state?: InputState
  rows?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const textareaRef = ref<HTMLTextAreaElement>()

const wrapperClasses = computed(() => {
  return [
    'eui-textarea-wrapper',
    `eui-textarea-wrapper--${props.size || 'md'}`,
    {
      'eui-textarea-wrapper--disabled': props.disabled,
      'eui-textarea-wrapper--error': props.state === 'error',
      'eui-textarea-wrapper--success': props.state === 'success',
      'eui-textarea-wrapper--warning': props.state === 'warning',
    },
  ]
})

const textareaClasses = computed(() => {
  return ['eui-textarea']
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
})
</script>

<style lang="scss" scoped>
.eui-textarea-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: var(--eui-font-family-sans);

  &--xs {
    .eui-textarea {
      padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
      font-size: var(--eui-font-size-xs);
      min-height: 60px;
    }
  }

  &--sm {
    .eui-textarea {
      padding: var(--eui-spacing-xs) var(--eui-spacing-md);
      font-size: var(--eui-font-size-sm);
      min-height: 80px;
    }
  }

  &--md {
    .eui-textarea {
      padding: var(--eui-spacing-sm) var(--eui-spacing-md);
      font-size: var(--eui-font-size-base);
      min-height: 100px;
    }
  }

  &--lg {
    .eui-textarea {
      padding: var(--eui-spacing-md) var(--eui-spacing-lg);
      font-size: var(--eui-font-size-lg);
      min-height: 120px;
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;

    .eui-textarea {
      cursor: not-allowed;
    }
  }

  &--error {
    .eui-textarea {
      border-color: var(--eui-color-error);
    }

    &:focus-within .eui-textarea {
      border-color: var(--eui-color-error);
      box-shadow: 0 0 0 2px var(--eui-color-error-100);
    }
  }

  &--success {
    .eui-textarea {
      border-color: var(--eui-color-success);
    }

    &:focus-within .eui-textarea {
      border-color: var(--eui-color-success);
      box-shadow: 0 0 0 2px var(--eui-color-success-100);
    }
  }

  &--warning {
    .eui-textarea {
      border-color: var(--eui-color-warning);
    }

    &:focus-within .eui-textarea {
      border-color: var(--eui-color-warning);
      box-shadow: 0 0 0 2px var(--eui-color-warning-100);
    }
  }
}

.eui-textarea {
  width: 100%;
  padding: var(--eui-spacing-sm) var(--eui-spacing-md);
  font-family: inherit;
  font-size: var(--eui-font-size-base);
  line-height: var(--eui-line-height-normal);
  color: var(--eui-text-primary);
  background-color: var(--eui-bg-primary);
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-md);
  outline: none;
  resize: vertical;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: var(--eui-text-tertiary);
  }

  &:hover:not(:disabled):not(:read-only) {
    border-color: var(--eui-border-color-hover);
  }

  &:focus {
    border-color: var(--eui-border-color-focus);
    box-shadow: 0 0 0 2px var(--eui-color-primary-100);
  }

  &:disabled {
    background-color: var(--eui-bg-disabled);
    cursor: not-allowed;
  }

  &:read-only {
    background-color: var(--eui-bg-secondary);
    cursor: default;
  }
}
</style>

