<template>
  <header :class="headerClasses" :style="headerStyle">
    <div class="eui-header__content">
      <div class="eui-header__left">
        <slot name="logo" />
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

defineOptions({

  name: 'EuiHeader',

})

import { computed } from 'vue'

const props = defineProps<{
  height?: string | number
  fixed?: boolean
  sticky?: boolean
  bordered?: boolean
  zIndex?: number
}>()

const headerClasses = computed(() => {
  const isSticky = props.sticky !== false && !props.fixed // Default to sticky unless explicitly disabled or fixed
  return [
    'eui-header',
    {
      'eui-header--fixed': props.fixed,
      'eui-header--sticky': isSticky,
      'eui-header--bordered': props.bordered,
    },
  ]
})

const headerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  } else {
    style.height = '64px' // Default height
  }
  if (props.zIndex !== undefined) {
    style.zIndex = String(props.zIndex)
  }
  return style
})
</script>

<style lang="scss" scoped>
.eui-header {
  position: relative;
  background-color: var(--eui-bg-primary);
  transition: all 0.3s ease;
  min-height: 64px;
  width: 100%;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  &--sticky {
    position: sticky;
    top: 0;
    z-index: 100;
  }

  &--bordered {
    border-bottom: 1px solid var(--eui-border-color);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    min-height: inherit;
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

