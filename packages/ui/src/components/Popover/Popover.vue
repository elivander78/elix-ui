<template>
  <div class="eui-popover-wrapper" ref="wrapperRef">
    <div 
      :tabindex="props.trigger === 'focus' && !props.disabled ? 0 : undefined"
      @click.stop="!props.disabled && props.trigger === 'click' && togglePopover()" 
      @mouseenter="!props.disabled && props.trigger === 'hover' ? showPopover() : undefined" 
      @mouseleave="!props.disabled && props.trigger === 'hover' ? hidePopover() : undefined"
      @focus="!props.disabled && props.trigger === 'focus' ? showPopover() : undefined"
      @blur="!props.disabled && props.trigger === 'focus' ? hidePopover() : undefined"
      :style="props.trigger === 'focus' ? { display: 'inline-block', outline: 'none' } : undefined"
    >
      <slot name="trigger" />
    </div>
    <Teleport to="body">
      <Transition name="eui-popover">
        <div v-if="isVisible" ref="popoverRef" :class="popoverClasses" :style="popoverStyle" @mouseenter="props.trigger === 'hover' ? showPopover() : undefined" @mouseleave="props.trigger === 'hover' ? hidePopover() : undefined">
          <div v-if="title" class="eui-popover__title">{{ title }}</div>
          <div class="eui-popover__content">
            <slot />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiPopover',

})

import { ref, computed, nextTick, onMounted, onUnmounted, withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  trigger?: 'click' | 'hover' | 'focus'
  showArrow?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled'
}>(), {
  trigger: 'click',
  showArrow: true,
  disabled: false,
  size: 'md',
  variant: 'default',
})

const isVisible = ref(false)
const popoverRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()

const popoverClasses = computed(() => {
  return [
    'eui-popover',
    `eui-popover--${props.placement || 'bottom'}`,
    `eui-popover--${props.size}`,
    `eui-popover--${props.variant}`,
    {
      'eui-popover--no-arrow': !props.showArrow,
    },
  ]
})

const popoverStyle = computed(() => {
  return {}
})

const togglePopover = async () => {
  if (props.disabled) return
  if (props.trigger === 'click') {
    isVisible.value = !isVisible.value
    if (isVisible.value) {
      await nextTick()
      updatePosition()
    }
  }
}

const showPopover = async () => {
  if (props.disabled) return
  if (props.trigger === 'hover' || props.trigger === 'focus') {
    if (!isVisible.value) {
      isVisible.value = true
      await nextTick()
      updatePosition()
    }
  }
}

const hidePopover = () => {
  if (props.trigger === 'hover' || props.trigger === 'focus') {
    isVisible.value = false
  }
}

const updatePosition = () => {
  if (!popoverRef.value || !wrapperRef.value) return

  const wrapperRect = wrapperRef.value.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()
  const placement = props.placement || 'bottom'

  let top = 0
  let left = 0

  switch (placement) {
    case 'top':
      top = wrapperRect.top - popoverRect.height - 8
      left = wrapperRect.left + (wrapperRect.width - popoverRect.width) / 2
      break
    case 'bottom':
      top = wrapperRect.bottom + 8
      left = wrapperRect.left + (wrapperRect.width - popoverRect.width) / 2
      break
    case 'left':
      top = wrapperRect.top + (wrapperRect.height - popoverRect.height) / 2
      left = wrapperRect.left - popoverRect.width - 8
      break
    case 'right':
      top = wrapperRect.top + (wrapperRect.height - popoverRect.height) / 2
      left = wrapperRect.right + 8
      break
  }

  popoverRef.value.style.top = `${top}px`
  popoverRef.value.style.left = `${left}px`
}

const handleClickOutside = (event: MouseEvent) => {
  if (props.trigger === 'click' && isVisible.value) {
    // Use setTimeout to ensure the toggle happens first
    setTimeout(() => {
      if (
        popoverRef.value &&
        wrapperRef.value &&
        !popoverRef.value.contains(event.target as Node) &&
        !wrapperRef.value.contains(event.target as Node)
      ) {
        isVisible.value = false
      }
    }, 0)
  }
}

onMounted(() => {
  if (props.trigger === 'click') {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.eui-popover-wrapper {
  display: inline-block;
  position: relative;
}

.eui-popover {
  position: fixed;
  z-index: 1500;
  min-width: 200px;
  background-color: var(--eui-bg-primary);
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-lg);
  box-shadow: var(--eui-shadow-lg);

  &__title {
    padding: var(--eui-spacing-sm) var(--eui-spacing-md);
    font-weight: var(--eui-font-weight-semibold);
    color: var(--eui-text-primary);
    border-bottom: 1px solid var(--eui-border-color);
  }

  &__content {
    padding: var(--eui-spacing-md);
    color: var(--eui-text-primary);
  }

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    display: none;
  }

  &--top::before {
    display: block;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: var(--eui-bg-primary);
  }

  &--bottom::before {
    display: block;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: var(--eui-bg-primary);
  }

  &--left::before {
    display: block;
    right: -16px;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: var(--eui-bg-primary);
  }

  &--right::before {
    display: block;
    left: -16px;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: var(--eui-bg-primary);
  }

  &--no-arrow::before {
    display: none;
  }
}

.eui-popover-enter-active,
.eui-popover-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.eui-popover-enter-active .eui-popover,
.eui-popover-leave-active .eui-popover {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.eui-popover-enter-from,
.eui-popover-leave-to {
  opacity: 0;
}

.eui-popover-enter-from .eui-popover,
.eui-popover-leave-to .eui-popover {
  opacity: 0;
  transform: scale(0.95);
}

.eui-popover--top .eui-popover-enter-from .eui-popover,
.eui-popover--top .eui-popover-leave-to .eui-popover {
  transform: scale(0.95) translateY(4px);
}

.eui-popover--bottom .eui-popover-enter-from .eui-popover,
.eui-popover--bottom .eui-popover-leave-to .eui-popover {
  transform: scale(0.95) translateY(-4px);
}

.eui-popover--left .eui-popover-enter-from .eui-popover,
.eui-popover--left .eui-popover-leave-to .eui-popover {
  transform: scale(0.95) translateX(4px);
}

.eui-popover--right .eui-popover-enter-from .eui-popover,
.eui-popover--right .eui-popover-leave-to .eui-popover {
  transform: scale(0.95) translateX(-4px);
}
</style>

