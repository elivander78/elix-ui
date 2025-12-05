<template>
  <div class="eui-popover-wrapper" ref="wrapperRef">
    <div @click.stop="togglePopover" @mouseenter="props.trigger === 'hover' ? showPopover() : undefined" @mouseleave="props.trigger === 'hover' ? hidePopover() : undefined">
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
import { ref, computed, nextTick, onMounted, onUnmounted, withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'click' | 'hover'
}>(), {
  trigger: 'click',
})

const isVisible = ref(false)
const popoverRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()

const popoverClasses = computed(() => {
  return [
    'eui-popover',
    `eui-popover--${props.placement || 'bottom'}`,
  ]
})

const popoverStyle = computed(() => {
  return {}
})

const togglePopover = async () => {
  if (props.trigger === 'click') {
    isVisible.value = !isVisible.value
    if (isVisible.value) {
      await nextTick()
      updatePosition()
    }
  }
}

const showPopover = async () => {
  if (props.trigger === 'hover') {
    isVisible.value = true
    await nextTick()
    updatePosition()
  }
}

const hidePopover = () => {
  if (props.trigger === 'hover') {
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
  if (
    popoverRef.value &&
    wrapperRef.value &&
    !popoverRef.value.contains(event.target as Node) &&
    !wrapperRef.value.contains(event.target as Node)
  ) {
    isVisible.value = false
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
  }

  &--top::before {
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: var(--eui-bg-primary);
  }

  &--bottom::before {
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: var(--eui-bg-primary);
  }

  &--left::before {
    right: -16px;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: var(--eui-bg-primary);
  }

  &--right::before {
    left: -16px;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: var(--eui-bg-primary);
  }
}

.eui-popover-enter-active,
.eui-popover-leave-active {
  transition: opacity 0.2s ease;
}

.eui-popover-enter-from,
.eui-popover-leave-to {
  opacity: 0;
}
</style>

