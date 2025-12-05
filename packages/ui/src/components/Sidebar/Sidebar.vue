<template>
  <aside :class="sidebarClasses" :style="sidebarStyle">
    <div class="eui-sidebar__content">
      <slot />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  width?: string | number
  collapsed?: boolean
  collapsedWidth?: string | number
  fixed?: boolean
  bordered?: boolean
}>()

const sidebarClasses = computed(() => {
  return [
    'eui-sidebar',
    {
      'eui-sidebar--collapsed': props.collapsed,
      'eui-sidebar--fixed': props.fixed,
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
  return style
})
</script>

<style lang="scss" scoped>
.eui-sidebar {
  background-color: var(--eui-bg-secondary);
  transition: width 0.3s ease;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
  }

  &--bordered {
    border-right: 1px solid var(--eui-border-color);
  }

  &__content {
    height: 100%;
    padding: var(--eui-spacing-lg);
    overflow-y: auto;
  }

  &--collapsed {
    .eui-sidebar__content {
      padding: var(--eui-spacing-md);
    }
  }
}
</style>

