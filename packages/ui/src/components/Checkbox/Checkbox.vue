<template>
  <label :class="checkboxClasses">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
      class="eui-checkbox__input"
    />
    <span class="eui-checkbox__checkmark"></span>
    <span v-if="$slots.default" class="eui-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: boolean
  disabled?: boolean
  indeterminate?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const checkboxClasses = computed(() => {
  return [
    'eui-checkbox',
    {
      'eui-checkbox--disabled': props.disabled,
      'eui-checkbox--checked': props.modelValue,
      'eui-checkbox--indeterminate': props.indeterminate,
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
.eui-checkbox {
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

  &__checkmark {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 2px solid var(--eui-border-color);
    border-radius: var(--eui-radius-sm);
    background-color: var(--eui-bg-primary);
    transition: all 0.2s ease-in-out;
    flex-shrink: 0;

    &::after {
      content: '';
      position: absolute;
      display: none;
      left: 50%;
      top: 40%;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  &--checked {
    .eui-checkbox__checkmark {
      background-color: var(--eui-color-primary);
      border-color: var(--eui-color-primary);

      &::after {
        display: block;
      }
    }
  }

  &--indeterminate {
    .eui-checkbox__checkmark {
      background-color: var(--eui-color-primary);
      border-color: var(--eui-color-primary);

      &::after {
        display: block;
        width: 10px;
        height: 2px;
        border: none;
        background-color: white;
        transform: none;
      }
    }
  }

  &__label {
    font-size: var(--eui-font-size-base);
    color: var(--eui-text-primary);
    user-select: none;
  }
}
</style>

