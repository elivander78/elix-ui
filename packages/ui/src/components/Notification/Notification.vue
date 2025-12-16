<template>
  <Teleport to="body">
    <template v-for="(notificationsGroup, position) in groupedNotifications" :key="position">
      <TransitionGroup 
        :name="`eui-notification-${position}`" 
        tag="div" 
        :class="containerClasses(position)"
        move-class="eui-notification-move"
        appear
      >
        <div
          v-for="notification in getDisplayOrder(notificationsGroup, position)"
          :key="notification.id"
          :class="notificationClasses(notification)"
        >
            <div class="eui-notification__icon" v-if="notification.type">
              <component :is="getIcon(notification.type)" />
            </div>
            <div class="eui-notification__content">
              <div class="eui-notification__title">{{ notification.title }}</div>
              <div v-if="notification.message" class="eui-notification__message">
                {{ notification.message }}
              </div>
            </div>
            <button class="eui-notification__close" @click="remove(notification.id)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
        </div>
      </TransitionGroup>
    </template>
  </Teleport>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiNotification',

})

import { computed, h } from 'vue'

export interface NotificationOptions {
  id?: string
  title: string
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  closable?: boolean
  showIcon?: boolean
  appearance?: 'border' | 'shadow'
}

const props = defineProps<{
  notifications: (NotificationOptions & { id: string })[]
  defaultPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}>()

const emit = defineEmits<{
  remove: [id: string]
}>()

const groupedNotifications = computed(() => {
  const groups: Record<string, (NotificationOptions & { id: string })[]> = {}
  props.notifications.forEach((notification) => {
    const position = notification.position || props.defaultPosition || 'top-right'
    if (!groups[position]) {
      groups[position] = []
    }
    groups[position].push(notification)
  })
  return groups
})

const getDisplayOrder = (notifications: (NotificationOptions & { id: string })[], position: string) => {
  // Use normal order - flex-direction-reverse on container handles visual order
  // This prevents move animation when adding new items
  return notifications
}

const containerClasses = (position: string) => {
  return [
    'eui-notification-container',
    `eui-notification-container--${position}`,
  ]
}

const notificationClasses = (notification: NotificationOptions) => {
  const appearance = notification.appearance || 'shadow'
  return [
    'eui-notification',
    {
      [`eui-notification--${notification.type}`]: notification.type,
      [`eui-notification--${appearance}`]: appearance,
    },
  ]
}

const getIcon = (type: string) => {
  const icons: Record<string, any> = {
    success: () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
      h('path', {
        d: 'M16.667 5L7.5 14.167 3.333 10',
        stroke: 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }),
    ]),
    error: () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
      h('path', {
        d: 'M15 5L5 15M5 5l10 10',
        stroke: 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }),
    ]),
    warning: () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
      h('path', {
        d: 'M10 6v4M10 14h.01',
        stroke: 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
      }),
      h('circle', { cx: 10, cy: 10, r: 8, stroke: 'currentColor', 'stroke-width': 2 }),
    ]),
    info: () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
      h('circle', { cx: 10, cy: 10, r: 8, stroke: 'currentColor', 'stroke-width': 2 }),
      h('path', {
        d: 'M10 6v4M10 14h.01',
        stroke: 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
      }),
    ]),
  }
  return icons[type] || (() => null)
}

const remove = (id: string) => {
  emit('remove', id)
}
</script>

<style lang="scss" scoped>
.eui-notification-container {
  position: fixed;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: var(--eui-spacing-sm);
  pointer-events: none;
  
  // For top positions, reverse flex direction so new items appear at top
  &--top-right,
  &--top-center,
  &--top-left {
    top: var(--eui-spacing-lg);
    flex-direction: column-reverse;
  }
  
  &--bottom-right,
  &--bottom-center,
  &--bottom-left {
    bottom: var(--eui-spacing-lg);
    flex-direction: column;
  }
  
  &--top-right,
  &--bottom-right {
    right: var(--eui-spacing-lg);
    left: auto;
  }
  
  &--top-left,
  &--bottom-left {
    left: var(--eui-spacing-lg);
    right: auto;
  }
  
  &--top-center,
  &--bottom-center {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
}

.eui-notification {
  display: flex;
  align-items: flex-start;
  gap: var(--eui-spacing-md);
  min-width: 320px;
  max-width: 400px;
  padding: var(--eui-spacing-md);
  background-color: var(--eui-bg-primary);
  border-radius: var(--eui-radius-lg);
  pointer-events: auto;
  transform-origin: center;
  will-change: transform, opacity;
  
  &--border {
    border: 1px solid var(--eui-border-color);
  }
  
  &--shadow {
    box-shadow: var(--eui-shadow-lg);
  }

  &--success {
    border-left: 4px solid var(--eui-color-success);
    
    &.eui-notification--border {
      border-left: 4px solid var(--eui-color-success);
      border-top: 1px solid var(--eui-border-color);
      border-right: 1px solid var(--eui-border-color);
      border-bottom: 1px solid var(--eui-border-color);
    }
  }

  &--error {
    border-left: 4px solid var(--eui-color-error);
    
    &.eui-notification--border {
      border-left: 4px solid var(--eui-color-error);
      border-top: 1px solid var(--eui-border-color);
      border-right: 1px solid var(--eui-border-color);
      border-bottom: 1px solid var(--eui-border-color);
    }
  }

  &--warning {
    border-left: 4px solid var(--eui-color-warning);
    
    &.eui-notification--border {
      border-left: 4px solid var(--eui-color-warning);
      border-top: 1px solid var(--eui-border-color);
      border-right: 1px solid var(--eui-border-color);
      border-bottom: 1px solid var(--eui-border-color);
    }
  }

  &--info {
    border-left: 4px solid var(--eui-color-info);
    
    &.eui-notification--border {
      border-left: 4px solid var(--eui-color-info);
      border-top: 1px solid var(--eui-border-color);
      border-right: 1px solid var(--eui-border-color);
      border-bottom: 1px solid var(--eui-border-color);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--eui-text-secondary);
  }

  &--success &__icon {
    color: var(--eui-color-success);
  }

  &--error &__icon {
    color: var(--eui-color-error);
  }

  &--warning &__icon {
    color: var(--eui-color-warning);
  }

  &--info &__icon {
    color: var(--eui-color-info);
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-weight: var(--eui-font-weight-semibold);
    color: var(--eui-text-primary);
    margin-bottom: var(--eui-spacing-xs);
  }

  &__message {
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);
    line-height: var(--eui-line-height-normal);
  }

  &__close {
    display: flex;
    align-items: center;
    padding: var(--eui-spacing-xs);
    color: var(--eui-text-tertiary);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    flex-shrink: 0;

    &:hover {
      color: var(--eui-text-primary);
    }
  }
}

// Enter and leave active states - all transitions
.eui-notification-top-right-enter-active,
.eui-notification-top-right-appear-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-top-right-leave-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-bottom-right-enter-active,
.eui-notification-bottom-right-appear-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-bottom-right-leave-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-top-left-enter-active,
.eui-notification-top-left-appear-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-top-left-leave-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-bottom-left-enter-active,
.eui-notification-bottom-left-appear-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-bottom-left-leave-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-top-center-enter-active,
.eui-notification-top-center-appear-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-top-center-leave-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-bottom-center-enter-active,
.eui-notification-bottom-center-appear-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.eui-notification-bottom-center-leave-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

// Enter from states
.eui-notification-top-right-enter-from,
.eui-notification-top-right-appear-from,
.eui-notification-bottom-right-enter-from,
.eui-notification-bottom-right-appear-from {
  opacity: 0;
  transform: translateX(100%);
}

.eui-notification-top-left-enter-from,
.eui-notification-top-left-appear-from,
.eui-notification-bottom-left-enter-from,
.eui-notification-bottom-left-appear-from {
  opacity: 0;
  transform: translateX(-100%);
}

.eui-notification-top-center-enter-from,
.eui-notification-top-center-appear-from {
  opacity: 0;
  transform: translateY(-100%);
}

.eui-notification-bottom-center-enter-from,
.eui-notification-bottom-center-appear-from {
  opacity: 0;
  transform: translateY(100%);
}

// Enter to states (explicit for better animation)
.eui-notification-top-right-enter-to,
.eui-notification-top-right-appear-to,
.eui-notification-bottom-right-enter-to,
.eui-notification-bottom-right-appear-to {
  opacity: 1;
  transform: translateX(0);
}

.eui-notification-top-left-enter-to,
.eui-notification-top-left-appear-to,
.eui-notification-bottom-left-enter-to,
.eui-notification-bottom-left-appear-to {
  opacity: 1;
  transform: translateX(0);
}

.eui-notification-top-center-enter-to,
.eui-notification-top-center-appear-to,
.eui-notification-bottom-center-enter-to,
.eui-notification-bottom-center-appear-to {
  opacity: 1;
  transform: translateY(0);
}

// Leave to states
.eui-notification-top-right-leave-to,
.eui-notification-bottom-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.eui-notification-top-left-leave-to,
.eui-notification-bottom-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.eui-notification-top-center-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.eui-notification-bottom-center-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

// Move animations for smooth repositioning when items are removed
// Use slower, smoother transition for better UX
.eui-notification-move {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

// More specific move classes for each position
.eui-notification-top-right-move,
.eui-notification-bottom-right-move,
.eui-notification-top-left-move,
.eui-notification-bottom-left-move,
.eui-notification-top-center-move,
.eui-notification-bottom-center-move {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

</style>

