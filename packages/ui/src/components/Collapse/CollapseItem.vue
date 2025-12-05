<template>
  <div :class="itemClasses">
    <div
      :class="headerClasses"
      :tabindex="disabled ? -1 : 0"
      role="button"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <div class="eui-collapse-item__header-content">
        <slot name="header">
          <span class="eui-collapse-item__title">{{ title }}</span>
        </slot>
      </div>
      <div class="eui-collapse-item__arrow">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <div 
      v-if="hasContent"
      ref="contentRef" 
      :class="['eui-collapse-item__content', { 'eui-collapse-item__content--active': isActive }]"
    >
      <div class="eui-collapse-item__content-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch, nextTick, useSlots } from 'vue'
import { collapseItemProps, type CollapseItemProps } from './Collapse'

defineOptions({
  name: 'EuiCollapseItem',
})

const props = defineProps(collapseItemProps)
const slots = useSlots()
const contentRef = ref<HTMLElement>()

interface CollapseContext {
  activeItems: { value: (string | number)[] }
  isItemActive: (name: string | number) => boolean
  toggleItem: (name: string | number) => void
  accordion: boolean
  appearance: string
  bordered: boolean
}

const collapse = inject<CollapseContext>('collapse')

if (!collapse) {
  throw new Error('CollapseItem must be used inside Collapse')
}

const isActive = computed(() => collapse.isItemActive(props.name))

const itemClasses = computed(() => {
  return [
    'eui-collapse-item',
    {
      'eui-collapse-item--active': isActive.value,
      'eui-collapse-item--disabled': props.disabled,
      'eui-collapse-item--bordered': collapse.bordered,
      [`eui-collapse-item--appearance-${collapse.appearance}`]: collapse.appearance,
    },
  ]
})

const headerClasses = computed(() => {
  return [
    'eui-collapse-item__header',
    {
      'eui-collapse-item__header--active': isActive.value,
      'eui-collapse-item__header--disabled': props.disabled,
    },
  ]
})

const handleClick = () => {
  if (!props.disabled) {
    collapse.toggleItem(props.name)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return
  
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    collapse.toggleItem(props.name)
  }
}

const hasContent = computed(() => {
  if (!slots.default) return false
  const children = slots.default()
  if (!children || children.length === 0) return false
  
  return children.some((vnode: any) => {
    if (!vnode) return false
    if (typeof vnode === 'string') return vnode.trim().length > 0
    if (vnode.type === 'text' || vnode.type === Text) {
      return vnode.children && String(vnode.children).trim().length > 0
    }
    // For component nodes, assume they have content
    if (vnode.type && typeof vnode.type !== 'string') return true
    // For element nodes
    if (vnode.type && typeof vnode.type === 'string') return true
    return false
  })
})

watch(isActive, async (newVal) => {
  if (!hasContent.value) {
    if (contentRef.value) {
      contentRef.value.style.maxHeight = '0px'
      contentRef.value.style.opacity = '0'
    }
    return
  }
  
  if (newVal && contentRef.value) {
    await nextTick()
    const inner = contentRef.value.querySelector('.eui-collapse-item__content-inner')
    if (inner) {
      const height = inner.scrollHeight
      contentRef.value.style.maxHeight = `${height}px`
      contentRef.value.style.opacity = '1'
    }
  } else if (contentRef.value) {
    // Get current height before closing
    const inner = contentRef.value.querySelector('.eui-collapse-item__content-inner')
    if (inner) {
      const height = inner.scrollHeight
      contentRef.value.style.maxHeight = `${height}px`
      // Force reflow
      void contentRef.value.offsetHeight
    }
    contentRef.value.style.maxHeight = '0px'
    contentRef.value.style.opacity = '0'
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-collapse-item {
  &--bordered {
    &:not(:last-child) {
      border-bottom: 1px solid var(--eui-border-color);
    }
  }

  &--appearance-shadow {
    &:not(:last-child) {
      border-bottom: 1px solid var(--eui-border-color);
    }
  }

  &--appearance-border-shadow {
    &:not(:last-child) {
      @include border-shadow-side(bottom, var(--eui-border-color), 1px);
    }
  }
}

.eui-collapse-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--eui-spacing-md) var(--eui-spacing-lg);
  font-size: var(--eui-font-size-base);
  font-weight: var(--eui-font-weight-medium);
  color: var(--eui-text-primary);
  background-color: var(--eui-bg-primary);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover:not(&--disabled) {
    background-color: var(--eui-bg-secondary);
  }

  &:focus-visible {
    outline: 2px solid var(--eui-border-color-focus);
    outline-offset: -2px;
  }

  &--active {
    .eui-collapse-item__arrow {
      transform: rotate(90deg);
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.eui-collapse-item__header-content {
  flex: 1;
  min-width: 0;
}

.eui-collapse-item__title {
  display: block;
}

.eui-collapse-item__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-left: var(--eui-spacing-sm);
  color: var(--eui-text-secondary);
  transition: transform 0.3s ease-in-out;

  svg {
    width: 16px;
    height: 16px;
  }
}

.eui-collapse-item__content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease-in-out;
  opacity: 0;
  
  &--active {
    opacity: 1;
  }
}

.eui-collapse-item__content-inner {
  padding: 0 var(--eui-spacing-lg) var(--eui-spacing-md) var(--eui-spacing-lg);
  color: var(--eui-text-secondary);
  line-height: var(--eui-line-height-relaxed);
}

// Transitions handled via inline styles and watch
</style>

