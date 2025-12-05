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
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  round?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const tagClasses = computed(() => {
  return [
    'eui-tag',
    `eui-tag--${props.type || 'default'}`,
    `eui-tag--${props.size || 'md'}`,
    {
      'eui-tag--round': props.round,
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

  &--default {
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-secondary);
    border: 1px solid var(--eui-border-color);
  }

  &--primary {
    color: var(--eui-text-inverse);
    background-color: var(--eui-color-primary);
  }

  &--success {
    color: var(--eui-text-inverse);
    background-color: var(--eui-color-success);
  }

  &--warning {
    color: var(--eui-text-inverse);
    background-color: var(--eui-color-warning);
  }

  &--error {
    color: var(--eui-text-inverse);
    background-color: var(--eui-color-error);
  }

  &--info {
    color: var(--eui-text-inverse);
    background-color: var(--eui-color-info);
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

