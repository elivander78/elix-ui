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
}>()

const cardClasses = computed(() => {
  return [
    'eui-card',
    {
      'eui-card--bordered': props.bordered,
      'eui-card--hoverable': props.hoverable,
      [`eui-card--shadow-${props.shadow}`]: props.shadow && props.shadow !== 'none',
    },
  ]
})
</script>

<style lang="scss" scoped>
.eui-card {
  background-color: var(--eui-bg-primary);
  border-radius: var(--eui-radius-lg);
  transition: all 0.2s ease-in-out;

  &--bordered {
    border: 1px solid var(--eui-border-color);
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
}
</style>

