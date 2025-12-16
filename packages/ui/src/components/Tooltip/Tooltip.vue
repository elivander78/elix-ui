<template>
  <div 
    ref="wrapperRef" 
    class="eui-tooltip-wrapper"
    :tabindex="props.trigger === 'focus' && !props.disabled ? 0 : undefined"
    @mouseenter="!props.disabled && props.trigger === 'hover' ? showTooltip() : undefined"
    @mouseleave="!props.disabled && props.trigger === 'hover' ? hideTooltip() : undefined"
    @click.stop="!props.disabled && props.trigger === 'click' ? showTooltip($event) : undefined"
    @focus="!props.disabled && props.trigger === 'focus' ? showTooltip() : undefined"
    @blur="!props.disabled && props.trigger === 'focus' ? hideTooltip() : undefined"
    :style="props.trigger === 'focus' ? { display: 'inline-block', outline: 'none' } : undefined"
  >
    <slot />
    <Teleport to="body">
      <Transition name="eui-tooltip">
        <div v-if="isVisible" ref="tooltipRef" :class="tooltipClasses" :style="tooltipStyle">
          {{ content }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiTooltip',

})

import { ref, computed, nextTick, onMounted, onUnmounted, withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  trigger?: 'hover' | 'click' | 'focus'
  disabled?: boolean
  theme?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  trigger: 'hover',
  disabled: false,
  theme: 'dark',
  size: 'md',
})

const isVisible = ref(false)
const tooltipRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()

const tooltipClasses = computed(() => {
  return [
    'eui-tooltip',
    `eui-tooltip--${props.placement || 'top'}`,
    `eui-tooltip--${props.theme}`,
    `eui-tooltip--${props.size}`,
  ]
})

const tooltipStyle = computed(() => {
  return {}
})

const showTooltip = async (e?: Event) => {
  if (props.disabled) return
  if (e && props.trigger === 'click') {
    e.stopPropagation()
  }
  if (props.trigger === 'click') {
    // Toggle for click
    isVisible.value = !isVisible.value
    if (isVisible.value) {
      await nextTick()
      updatePosition()
    }
  } else {
    // Show for hover/focus
    if (!isVisible.value) {
      isVisible.value = true
      await nextTick()
      updatePosition()
    }
  }
}

const hideTooltip = () => {
  if (props.trigger !== 'click') {
    isVisible.value = false
  }
}

const updatePosition = () => {
  if (!tooltipRef.value || !wrapperRef.value) return

  const wrapperRect = wrapperRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()
  const placement = props.placement || 'top'

  let top = 0
  let left = 0

  switch (placement) {
    case 'top':
      top = wrapperRect.top - tooltipRect.height - 8
      left = wrapperRect.left + (wrapperRect.width - tooltipRect.width) / 2
      break
    case 'bottom':
      top = wrapperRect.bottom + 8
      left = wrapperRect.left + (wrapperRect.width - tooltipRect.width) / 2
      break
    case 'left':
      top = wrapperRect.top + (wrapperRect.height - tooltipRect.height) / 2
      left = wrapperRect.left - tooltipRect.width - 8
      break
    case 'right':
      top = wrapperRect.top + (wrapperRect.height - tooltipRect.height) / 2
      left = wrapperRect.right + 8
      break
  }

  tooltipRef.value.style.top = `${top}px`
  tooltipRef.value.style.left = `${left}px`
}

const handleClickOutside = (event: MouseEvent) => {
  if (props.trigger === 'click' && isVisible.value) {
    // Use setTimeout to ensure the toggle happens first
    setTimeout(() => {
      if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
        hideTooltip()
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
.eui-tooltip-wrapper {
  display: inline-block;
  position: relative;
}

.eui-tooltip {
  position: fixed;
  z-index: 1500;
  padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
  font-size: var(--eui-font-size-sm);
  border-radius: var(--eui-radius-md);
  white-space: nowrap;
  pointer-events: none;

  // Themes
  &--dark {
    color: var(--eui-text-inverse);
    background-color: var(--eui-tooltip-dark-bg);
  }

  &--light {
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-primary);
    border: 1px solid var(--eui-border-color);
    box-shadow: var(--eui-shadow-lg);
  }

  // Sizes
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

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
  }

  &--dark &--top::before {
    border-top-color: var(--eui-tooltip-dark-bg);
  }

  &--dark &--bottom::before {
    border-bottom-color: var(--eui-tooltip-dark-bg);
  }

  &--dark &--left::before {
    border-left-color: var(--eui-tooltip-dark-bg);
  }

  &--dark &--right::before {
    border-right-color: var(--eui-tooltip-dark-bg);
  }

  &--light &--top::before {
    border-top-color: var(--eui-bg-primary);
  }

  &--light &--bottom::before {
    border-bottom-color: var(--eui-bg-primary);
  }

  &--light &--left::before {
    border-left-color: var(--eui-bg-primary);
  }

  &--light &--right::before {
    border-right-color: var(--eui-bg-primary);
  }
}

.eui-tooltip-enter-active,
.eui-tooltip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.eui-tooltip-enter-active .eui-tooltip,
.eui-tooltip-leave-active .eui-tooltip {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.eui-tooltip-enter-from,
.eui-tooltip-leave-to {
  opacity: 0;
}

.eui-tooltip-enter-from .eui-tooltip,
.eui-tooltip-leave-to .eui-tooltip {
  opacity: 0;
  transform: scale(0.9);
}

.eui-tooltip--top .eui-tooltip-enter-from .eui-tooltip,
.eui-tooltip--top .eui-tooltip-leave-to .eui-tooltip {
  transform: scale(0.9) translateY(4px);
}

.eui-tooltip--bottom .eui-tooltip-enter-from .eui-tooltip,
.eui-tooltip--bottom .eui-tooltip-leave-to .eui-tooltip {
  transform: scale(0.9) translateY(-4px);
}

.eui-tooltip--left .eui-tooltip-enter-from .eui-tooltip,
.eui-tooltip--left .eui-tooltip-leave-to .eui-tooltip {
  transform: scale(0.9) translateX(4px);
}

.eui-tooltip--right .eui-tooltip-enter-from .eui-tooltip,
.eui-tooltip--right .eui-tooltip-leave-to .eui-tooltip {
  transform: scale(0.9) translateX(-4px);
}
</style>

