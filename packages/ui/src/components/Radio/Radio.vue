<template>
  <label :class="radioClasses">
    <input
      type="radio"
      :checked="modelValue === value"
      :disabled="disabled"
      :value="value"
      @change="handleChange"
      class="eui-radio__input"
    />
    <span class="eui-radio__circle"></span>
    <span v-if="$slots.default" class="eui-radio__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiRadio',

})

import { computed, useSlots } from 'vue'

const props = defineProps<{
  modelValue?: string | number
  value: string | number
  disabled?: boolean
}>()

const slots = useSlots()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const radioClasses = computed(() => {
  return [
    'eui-radio',
    {
      'eui-radio--disabled': props.disabled,
      'eui-radio--checked': props.modelValue === props.value,
    },
  ]
})

const handleChange = () => {
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style lang="scss" scoped>
.eui-radio {
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

  &__circle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 2px solid var(--eui-border-color);
    border-radius: 50%;
    background-color: var(--eui-bg-primary);
    transition: all 0.2s ease-in-out;

    &::after {
      content: '';
      position: absolute;
      display: none;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--eui-text-inverse);
    }
  }

  &--checked {
    .eui-radio__circle {
      background-color: var(--eui-color-primary);
      border-color: var(--eui-color-primary);

      &::after {
        display: block;
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

