<template>
  <label :class="switchClasses">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
      class="eui-switch__input"
    />
    <span class="eui-switch__slider"></span>
    <span v-if="$slots.default" class="eui-switch__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiSwitch',

})

import { computed, useSlots } from 'vue'

const props = defineProps<{
  modelValue?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

const slots = useSlots()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const switchClasses = computed(() => {
  return [
    'eui-switch',
    `eui-switch--${props.size || 'md'}`,
    {
      'eui-switch--disabled': props.disabled,
      'eui-switch--checked': props.modelValue,
    },
  ]
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<style lang="scss" scoped>
.eui-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--eui-spacing-sm);
  cursor: pointer;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  &__slider {
    position: relative;
    display: inline-block;
    background-color: var(--eui-color-neutral-300);
    border-radius: var(--eui-radius-full);
    transition: all 0.3s ease-in-out;

    &::before {
      content: '';
      position: absolute;
      background-color: var(--eui-text-inverse);
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
      box-shadow: var(--eui-shadow-sm);
    }
  }

  &--sm {
    .eui-switch__slider {
      width: 32px;
      height: 18px;

      &::before {
        width: 14px;
        height: 14px;
        top: 2px;
        left: 2px;
      }
    }
  }

  &--md {
    .eui-switch__slider {
      width: 44px;
      height: 24px;

      &::before {
        width: 20px;
        height: 20px;
        top: 2px;
        left: 2px;
      }
    }
  }

  &--lg {
    .eui-switch__slider {
      width: 56px;
      height: 30px;

      &::before {
        width: 26px;
        height: 26px;
        top: 2px;
        left: 2px;
      }
    }
  }

  &--checked {
    .eui-switch__slider {
      background-color: var(--eui-color-primary);

      &::before {
        transform: translateX(100%);
      }
    }

    &.eui-switch--sm .eui-switch__slider::before {
      transform: translateX(14px);
    }

    &.eui-switch--md .eui-switch__slider::before {
      transform: translateX(20px);
    }

    &.eui-switch--lg .eui-switch__slider::before {
      transform: translateX(26px);
    }
  }

  &__label {
    font-size: var(--eui-font-size-base);
    color: var(--eui-text-primary);
    user-select: none;
  }
}
</style>

