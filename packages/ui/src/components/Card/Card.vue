<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  bordered?: boolean
  hoverable?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outlined' | 'elevated'
}>()

const cardClasses = computed(() => {
  return [
    'eui-card',
    {
      'eui-card--bordered': props.bordered,
      'eui-card--hoverable': props.hoverable,
      [`eui-card--shadow-${props.shadow}`]: props.shadow && props.shadow !== 'none',
      [`eui-card--${props.size || 'md'}`]: props.size,
      [`eui-card--${props.variant || 'default'}`]: props.variant,
    },
  ]
})
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-card {
  background-color: var(--eui-bg-primary);
  border-radius: var(--eui-radius-lg);
  transition: all 0.2s ease-in-out;

  &--bordered {
    @include border-shadow(var(--eui-border-color), 1px);
  }

  &--hoverable {
    cursor: pointer;

    &:hover {
      box-shadow: var(--eui-shadow-lg);
      transform: translateY(-2px);
    }
  }

  &--shadow-sm {
    box-shadow: var(--eui-shadow-sm);
  }

  &--shadow-md {
    box-shadow: var(--eui-shadow-md);
  }

  &--shadow-lg {
    box-shadow: var(--eui-shadow-lg);
  }

  &--shadow-xl {
    box-shadow: var(--eui-shadow-xl);
  }

  &--shadow-2xl {
    box-shadow: var(--eui-shadow-2xl);
  }

  // Sizes
  &--sm {
    padding: var(--eui-spacing-md);
  }

  &--md {
    padding: var(--eui-spacing-lg);
  }

  &--lg {
    padding: var(--eui-spacing-xl);
  }

  // Variants
  &--outlined {
    border: 1px solid var(--eui-border-color);
    box-shadow: none;
  }

  &--elevated {
    box-shadow: var(--eui-shadow-lg);
    border: none;
  }
}
</style>

