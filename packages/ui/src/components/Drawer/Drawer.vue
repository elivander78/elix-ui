<template>
  <Teleport to="body">
    <Transition name="eui-drawer">
      <div v-if="modelValue" class="eui-drawer-overlay" @click="handleOverlayClick">
        <div :class="drawerClasses" :style="computedDrawerStyle" @click.stop>
          <div v-if="title || $slots.header" class="eui-drawer__header">
            <slot name="header">
              <h3 v-if="title" class="eui-drawer__title">{{ title }}</h3>
            </slot>
            <button v-if="closable" class="eui-drawer__close" @click="handleClose">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div class="eui-drawer__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="eui-drawer__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
  width?: string | number
  placement?: 'left' | 'right' | 'top' | 'bottom'
  closable?: boolean
  maskClosable?: boolean
  originPoint?: { x: number; y: number }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const drawerClasses = computed(() => {
  return [
    'eui-drawer',
    `eui-drawer--${props.placement || 'right'}`,
  ]
})

const drawerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) {
    if (props.placement === 'left' || props.placement === 'right') {
      style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    } else {
      style.height = typeof props.width === 'number' ? `${props.width}px` : props.width
    }
  }
  return style
})

const computedDrawerStyle = computed(() => {
  const style = { ...drawerStyle.value }
  
  // Set transform-origin if originPoint is provided
  // Calculate transform-origin relative to viewport center (where drawer will be)
  if (props.originPoint) {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    
    // Calculate offset from center to click point
    const offsetX = props.originPoint.x - centerX
    const offsetY = props.originPoint.y - centerY
    
    // Set as CSS custom properties for transform-origin
    style['--origin-offset-x'] = `${offsetX}px`
    style['--origin-offset-y'] = `${offsetY}px`
  }
  
  return style
})

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.eui-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.eui-drawer {
  position: fixed;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  background-color: var(--eui-bg-primary);
  box-shadow: var(--eui-shadow-2xl);
  --origin-offset-x: 0;
  --origin-offset-y: 0;
  
  transform-origin: calc(50% + var(--origin-offset-x, 0)) calc(50% + var(--origin-offset-y, 0));

  &--left {
    top: 0;
    left: 0;
    width: 400px;
    height: 100%;
    border-radius: 0 var(--eui-radius-lg) var(--eui-radius-lg) 0;
  }

  &--right {
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    border-radius: var(--eui-radius-lg) 0 0 var(--eui-radius-lg);
  }

  &--top {
    top: 0;
    left: 0;
    width: 100%;
    height: 400px;
    border-radius: 0 0 var(--eui-radius-lg) var(--eui-radius-lg);
  }

  &--bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 400px;
    border-radius: var(--eui-radius-lg) var(--eui-radius-lg) 0 0;
  }

  @media (max-width: 768px) {
    &--left,
    &--right {
      width: 100%;
      border-radius: 0;
    }

    &--top,
    &--bottom {
      height: 80vh;
    }
  }
}

.eui-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--eui-spacing-lg);
  border-bottom: 1px solid var(--eui-border-color);
}

.eui-drawer__title {
  margin: 0;
  font-size: var(--eui-font-size-xl);
  font-weight: var(--eui-font-weight-semibold);
  color: var(--eui-text-primary);
}

.eui-drawer__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: var(--eui-text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--eui-radius-md);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-secondary);
  }
}

.eui-drawer__body {
  flex: 1;
  padding: var(--eui-spacing-lg);
  overflow-y: auto;
  color: var(--eui-text-primary);
}

.eui-drawer__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--eui-spacing-sm);
  padding: var(--eui-spacing-lg);
  border-top: 1px solid var(--eui-border-color);
}

// Transitions
.eui-drawer-enter-active,
.eui-drawer-leave-active {
  transition: opacity 0.3s ease;
}

.eui-drawer-enter-active .eui-drawer,
.eui-drawer-leave-active .eui-drawer {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

.eui-drawer-enter-from,
.eui-drawer-leave-to {
  opacity: 0;
}

.eui-drawer-enter-from .eui-drawer--left,
.eui-drawer-leave-to .eui-drawer--left {
  transform: translateX(-100%) scale(0.9);
}

.eui-drawer-enter-from .eui-drawer--right,
.eui-drawer-leave-to .eui-drawer--right {
  transform: translateX(100%) scale(0.9);
}

.eui-drawer-enter-from .eui-drawer--top,
.eui-drawer-leave-to .eui-drawer--top {
  transform: translateY(-100%) scale(0.9);
}

.eui-drawer-enter-from .eui-drawer--bottom,
.eui-drawer-leave-to .eui-drawer--bottom {
  transform: translateY(100%) scale(0.9);
}
</style>

