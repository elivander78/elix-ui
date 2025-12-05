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
.eui-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  font-family: var(--eui-font-family-sans);

  &--xs {
    .eui-input {
      padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
      font-size: var(--eui-font-size-xs);
      min-height: 24px;
    }
  }

  &--sm {
    .eui-input {
      padding: var(--eui-spacing-xs) var(--eui-spacing-md);
      font-size: var(--eui-font-size-sm);
      min-height: 28px;
    }
  }

  &--md {
    .eui-input {
      padding: var(--eui-spacing-sm) var(--eui-spacing-md);
      font-size: var(--eui-font-size-base);
      min-height: 36px;
    }
  }

  &--lg {
    .eui-input {
      padding: var(--eui-spacing-md) var(--eui-spacing-lg);
      font-size: var(--eui-font-size-lg);
      min-height: 44px;
    }
  }

  &--with-prefix {
    .eui-input {
      padding-left: var(--eui-spacing-sm);
    }
  }

  &--with-suffix {
    .eui-input {
      padding-right: var(--eui-spacing-sm);
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;

    .eui-input {
      cursor: not-allowed;
    }
  }

  &--readonly {
    .eui-input {
      cursor: default;
    }
  }

  &--error {
    .eui-input {
      border-color: var(--eui-color-error);
    }

    &:focus-within .eui-input {
      border-color: var(--eui-color-error);
      box-shadow: 0 0 0 2px var(--eui-color-error-100);
    }
  }

  &--success {
    .eui-input {
      border-color: var(--eui-color-success);
    }

    &:focus-within .eui-input {
      border-color: var(--eui-color-success);
      box-shadow: 0 0 0 2px var(--eui-color-success-100);
    }
  }

  &--warning {
    .eui-input {
      border-color: var(--eui-color-warning);
    }

    &:focus-within .eui-input {
      border-color: var(--eui-color-warning);
      box-shadow: 0 0 0 2px var(--eui-color-warning-100);
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
  background-color: var(--eui-bg-primary);
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-md);
  outline: none;
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

.eui-input__prefix,
.eui-input__suffix {
  display: inline-flex;
  align-items: center;
  color: var(--eui-text-secondary);
  pointer-events: none;
}

.eui-input__prefix {
  padding-left: var(--eui-spacing-sm);
}

.eui-input__suffix {
  padding-right: var(--eui-spacing-sm);
}

.eui-input__clear {
  display: inline-flex;
  align-items: center;
  padding: var(--eui-spacing-xs);
  margin-right: var(--eui-spacing-xs);
  color: var(--eui-text-tertiary);
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--eui-text-primary);
  }

  svg {
    width: 14px;
    height: 14px;
  }
}
</style>

