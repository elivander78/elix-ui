<template>
  <header :class="headerClasses" :style="headerStyle">
    <div class="eui-header__content">
      <div class="eui-header__left">
        <slot name="left" />
      </div>
      <div class="eui-header__center">
        <slot name="center" />
      </div>
      <div class="eui-header__right">
        <slot name="right" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  height?: string | number
  fixed?: boolean
  bordered?: boolean
}>()

const headerClasses = computed(() => {
  return [
    'eui-header',
    {
      'eui-header--fixed': props.fixed,
      'eui-header--bordered': props.bordered,
    },
  ]
})

const headerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})
</script>

<style lang="scss" scoped>
.eui-header {
  background-color: var(--eui-bg-primary);
  transition: all 0.3s ease;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  &--bordered {
    border-bottom: 1px solid var(--eui-border-color);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 var(--eui-spacing-lg);
  }

  &__left,
  &__center,
  &__right {
    display: flex;
    align-items: center;
    gap: var(--eui-spacing-md);
  }

  &__center {
    flex: 1;
    justify-content: center;
  }
}
</style>

