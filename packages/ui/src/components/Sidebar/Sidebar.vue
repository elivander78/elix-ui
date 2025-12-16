<template>
  <aside :class="sidebarClasses" :style="sidebarStyle">
    <div class="eui-sidebar__content">
      <slot />
    </div>
  </aside>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiSidebar',

})

import { computed } from 'vue'

const props = defineProps<{
  width?: string | number
  collapsed?: boolean
  collapsedWidth?: string | number
  fixed?: boolean
  sticky?: boolean
  bordered?: boolean
  top?: string | number
  zIndex?: number
}>()

const sidebarClasses = computed(() => {
  return [
    'eui-sidebar',
    {
      'eui-sidebar--collapsed': props.collapsed,
      'eui-sidebar--fixed': props.fixed,
      'eui-sidebar--sticky': props.sticky && !props.fixed,
      'eui-sidebar--bordered': props.bordered,
    },
  ]
})

const sidebarStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.collapsed) {
    style.width = typeof props.collapsedWidth === 'number' ? `${props.collapsedWidth}px` : (props.collapsedWidth || '64px')
  } else {
    style.width = typeof props.width === 'number' ? `${props.width}px` : (props.width || '280px')
  }
  if (props.top !== undefined) {
    style.top = typeof props.top === 'number' ? `${props.top}px` : props.top
  }
  if (props.zIndex !== undefined) {
    style.zIndex = String(props.zIndex)
  }
  if (props.fixed && props.top !== undefined) {
    const topValue = typeof props.top === 'number' ? props.top : parseInt(props.top) || 0
    style.height = `calc(100vh - ${topValue}px)`
  }
  return style
})
</script>

<style lang="scss" scoped>
.eui-sidebar {
  position: relative;
  background-color: var(--eui-bg-secondary);
  transition: width 0.3s ease, height 0.3s ease;
  height: 100%;

  &--fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    height: 100vh;
  }

  &--sticky {
    position: sticky;
    top: 0;
    align-self: flex-start;
    max-height: 100vh;
    overflow-y: auto;
  }

  &--bordered {
    border-right: 1px solid var(--eui-border-color);
  }

  &__content {
    height: 100%;
    padding: var(--eui-spacing-lg);
    overflow-y: auto;
    overflow-x: hidden;
  }

  &--collapsed {
    .eui-sidebar__content {
      padding: var(--eui-spacing-md);
    }
  }
}
</style>

