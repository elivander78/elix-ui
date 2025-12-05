<template>
  <Teleport to="body">
    <Transition name="eui-modal">
      <div v-if="modelValue" class="eui-modal-overlay" @click="handleOverlayClick">
        <div :class="modalClasses" :style="computedModalStyle" @click.stop>
          <div v-if="title || $slots.header" class="eui-modal__header">
            <slot name="header">
              <h3 v-if="title" class="eui-modal__title">{{ title }}</h3>
            </slot>
            <button v-if="closable" class="eui-modal__close" @click="handleClose">
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
          <div class="eui-modal__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="eui-modal__footer">
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
  closable?: boolean
  maskClosable?: boolean
  centered?: boolean
  originPoint?: { x: number; y: number }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const modalClasses = computed(() => {
  return [
    'eui-modal',
    {
      'eui-modal--centered': props.centered,
    },
  ]
})

const modalStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  return style
})

const computedModalStyle = computed(() => {
  const style = { ...modalStyle.value }
  
  // Set transform-origin if originPoint is provided
  // Calculate transform-origin relative to viewport center (where modal will be)
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

// Prevent body scroll when modal is open
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
.eui-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: var(--eui-spacing-lg);
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.eui-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  max-height: 90vh;
  background-color: var(--eui-bg-primary);
  border-radius: var(--eui-radius-lg);
  box-shadow: var(--eui-shadow-2xl);
  overflow: hidden;

  &--centered {
    margin: auto;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    margin: 0;
    border-radius: 0;
  }
}

.eui-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--eui-spacing-lg);
  border-bottom: 1px solid var(--eui-border-color);
}

.eui-modal__title {
  margin: 0;
  font-size: var(--eui-font-size-xl);
  font-weight: var(--eui-font-weight-semibold);
  color: var(--eui-text-primary);
}

.eui-modal__close {
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

.eui-modal__body {
  flex: 1;
  padding: var(--eui-spacing-lg);
  overflow-y: auto;
  color: var(--eui-text-primary);
}

.eui-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--eui-spacing-sm);
  padding: var(--eui-spacing-lg);
  border-top: 1px solid var(--eui-border-color);
}

// Transitions
.eui-modal-enter-active,
.eui-modal-leave-active {
  transition: opacity 0.3s ease;
}

.eui-modal-enter-active .eui-modal,
.eui-modal-leave-active .eui-modal {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

.eui-modal-enter-from,
.eui-modal-leave-to {
  opacity: 0;
}

.eui-modal-enter-from .eui-modal,
.eui-modal-leave-to .eui-modal {
  transform: scale(0.8);
  opacity: 0;
}

// Если есть originPoint, используем его для transform-origin
.eui-modal {
  --origin-offset-x: 0;
  --origin-offset-y: 0;
  
  transform-origin: calc(50% + var(--origin-offset-x, 0)) calc(50% + var(--origin-offset-y, 0));
}
</style>

