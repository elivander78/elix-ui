<template>
  <div 
    ref="wrapperRef" 
    class="eui-tooltip-wrapper" 
    @mouseenter="props.trigger !== 'click' ? showTooltip() : undefined"
    @mouseleave="props.trigger !== 'click' ? hideTooltip() : undefined"
    @click="props.trigger === 'click' ? showTooltip($event) : undefined"
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
import { ref, computed, nextTick, onMounted, onUnmounted, withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click'
}>(), {
  trigger: 'hover',
})

const isVisible = ref(false)
const tooltipRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()

const tooltipClasses = computed(() => {
  return [
    'eui-tooltip',
    `eui-tooltip--${props.placement || 'top'}`,
  ]
})

const tooltipStyle = computed(() => {
  return {}
})

const showTooltip = async (e?: Event) => {
  if (e && props.trigger === 'click') {
    e.stopPropagation()
  }
  if (!isVisible.value) {
    isVisible.value = true
    await nextTick()
    updatePosition()
  }
}

const hideTooltip = () => {
  isVisible.value = false
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
    if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
      hideTooltip()
    }
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
  color: var(--eui-text-inverse);
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: var(--eui-radius-md);
  white-space: nowrap;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
  }

  &--top::before {
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: rgba(0, 0, 0, 0.85);
  }

  &--bottom::before {
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: rgba(0, 0, 0, 0.85);
  }

  &--left::before {
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: rgba(0, 0, 0, 0.85);
  }

  &--right::before {
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: rgba(0, 0, 0, 0.85);
  }
}

.eui-tooltip-enter-active,
.eui-tooltip-leave-active {
  transition: opacity 0.2s ease;
}

.eui-tooltip-enter-from,
.eui-tooltip-leave-to {
  opacity: 0;
}
</style>

