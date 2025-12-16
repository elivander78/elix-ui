<template>
  <div :class="itemClasses">
    <div
      :class="headerClasses"
      :tabindex="disabled ? -1 : 0"
      role="button"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <div class="eui-accordion-item__header-content">
        <slot name="header">
          <div class="eui-accordion-item__title-wrapper">
            <span v-if="title" class="eui-accordion-item__title">{{ title }}</span>
            <span v-if="description" class="eui-accordion-item__description">{{ description }}</span>
          </div>
        </slot>
      </div>
      <div class="eui-accordion-item__arrow">
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
      :class="['eui-accordion-item__content', { 'eui-accordion-item__content--active': isActive }]"
    >
      <div class="eui-accordion-item__content-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch, nextTick, useSlots } from 'vue'
import { accordionItemProps, type AccordionItemProps } from './Accordion'

defineOptions({
  name: 'EuiAccordionItem',
})

const props = defineProps(accordionItemProps)
const slots = useSlots()
const contentRef = ref<HTMLElement>()

interface AccordionContext {
  activeItem: { value: string | number | undefined }
  isItemActive: (name: string | number) => boolean
  toggleItem: (name: string | number) => void
  style: string
}

const accordion = inject<AccordionContext>('accordion')

if (!accordion) {
  throw new Error('AccordionItem must be used inside Accordion')
}

const isActive = computed(() => accordion.isItemActive(props.name))

const itemClasses = computed(() => {
  return [
    'eui-accordion-item',
    {
      'eui-accordion-item--active': isActive.value,
      'eui-accordion-item--disabled': props.disabled,
      [`eui-accordion-item--style-${accordion.style}`]: accordion.style,
    },
  ]
})

const headerClasses = computed(() => {
  return [
    'eui-accordion-item__header',
    {
      'eui-accordion-item__header--active': isActive.value,
      'eui-accordion-item__header--disabled': props.disabled,
    },
  ]
})

const handleClick = () => {
  if (!props.disabled) {
    accordion.toggleItem(props.name)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return
  
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    accordion.toggleItem(props.name)
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
    if (vnode.type && typeof vnode.type !== 'string') return true
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
    const inner = contentRef.value.querySelector('.eui-accordion-item__content-inner')
    if (inner) {
      const height = inner.scrollHeight
      contentRef.value.style.maxHeight = `${height}px`
      contentRef.value.style.opacity = '1'
    }
  } else if (contentRef.value) {
    const inner = contentRef.value.querySelector('.eui-accordion-item__content-inner')
    if (inner) {
      const height = inner.scrollHeight
      contentRef.value.style.maxHeight = `${height}px`
      void contentRef.value.offsetHeight
    }
    contentRef.value.style.maxHeight = '0px'
    contentRef.value.style.opacity = '0'
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-accordion-item {
  &--style-default {
    &:not(:last-child) {
      border-bottom: 1px solid var(--eui-border-color);
    }
  }

  &--style-shadow {
    box-shadow: var(--eui-shadow-md);
    border-radius: var(--eui-radius-md);
    background-color: var(--eui-bg-primary);
    border: 1px solid transparent;
    
    &:not(:last-child) {
      margin-bottom: var(--eui-spacing-md);
    }
  }

  &--style-bordered {
    border: 1px solid var(--eui-border-color);
    border-radius: var(--eui-radius-md);
    background-color: var(--eui-bg-primary);
    
    &:not(:last-child) {
      margin-bottom: var(--eui-spacing-md);
    }
  }

  &--style-splitted {
    border-radius: var(--eui-radius-md);
    overflow: hidden;
    border: 1px solid var(--eui-border-color);
    box-shadow: var(--eui-shadow-sm);
    background-color: var(--eui-bg-primary);
  }
}

.eui-accordion-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--eui-spacing-md) var(--eui-spacing-lg);
  font-size: var(--eui-font-size-base);
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
    .eui-accordion-item__arrow {
      transform: rotate(90deg);
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.eui-accordion-item__header-content {
  flex: 1;
  min-width: 0;
}

.eui-accordion-item__title-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--eui-spacing-xs);
}

.eui-accordion-item__title {
  display: block;
  font-weight: var(--eui-font-weight-medium);
  color: var(--eui-text-primary);
}

.eui-accordion-item__description {
  display: block;
  font-size: var(--eui-font-size-sm);
  color: var(--eui-text-secondary);
  font-weight: var(--eui-font-weight-normal);
}

.eui-accordion-item__arrow {
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

.eui-accordion-item__content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease-in-out;
  opacity: 0;
  
  &--active {
    opacity: 1;
  }
}

.eui-accordion-item__content-inner {
  padding: 0 var(--eui-spacing-lg) var(--eui-spacing-md) var(--eui-spacing-lg);
  color: var(--eui-text-secondary);
  line-height: var(--eui-line-height-relaxed);
}
</style>

