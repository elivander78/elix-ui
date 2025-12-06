<template>
  <div :class="buttonGroupClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { buttonGroupProps, type ButtonGroupProps } from './ButtonGroup'

defineOptions({
  name: 'EuiButtonGroup',
})

const props = defineProps(buttonGroupProps)

const buttonGroupClasses = computed(() => {
  return [
    'eui-button-group',
    {
      'eui-button-group--segmented': props.segmented,
      [`eui-button-group--appearance-${props.appearance}`]: props.appearance,
    },
  ]
})

interface ButtonGroupContext {
  size: ButtonGroupProps['size']
  variant: ButtonGroupProps['variant']
  appearance: ButtonGroupProps['appearance']
}

provide('buttonGroup', {
  size: props.size,
  variant: props.variant,
  appearance: props.appearance,
})
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-button-group {
  display: inline-flex;
  align-items: center;
  gap: var(--eui-spacing-xs);

  &--segmented {
    gap: 0;

    :deep(.eui-button) {
      border-radius: 0;
      margin-left: -1px;

      &:first-child {
        border-top-left-radius: var(--eui-radius-md);
        border-bottom-left-radius: var(--eui-radius-md);
        margin-left: 0;
      }

      &:last-child {
        border-top-right-radius: var(--eui-radius-md);
        border-bottom-right-radius: var(--eui-radius-md);
      }

      &:hover:not(:disabled) {
        z-index: 1;
        position: relative;
      }

      &:focus-visible {
        z-index: 2;
        position: relative;
      }
    }
  }

  &--appearance-border {
    // Контейнер с границей
    @include border-shadow(var(--eui-border-color), 1px);
    border-radius: var(--eui-radius-md);
    padding: 2px;
    background-color: var(--eui-bg-secondary);
  }

  &--appearance-shadow {
    // Контейнер с тенью
    box-shadow: var(--eui-shadow-sm);
    border-radius: var(--eui-radius-md);
    padding: 2px;
    background-color: var(--eui-bg-secondary);
    border: 1px solid transparent;
  }

  &--appearance-border-shadow {
    // Контейнер с границей и тенью
    @include border-shadow(var(--eui-border-color), 1px);
    box-shadow: var(--eui-shadow-sm);
    border-radius: var(--eui-radius-md);
    padding: 2px;
    background-color: var(--eui-bg-secondary);
  }
}
</style>

