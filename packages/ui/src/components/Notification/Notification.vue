<template>
  <Teleport to="body">
    <TransitionGroup name="eui-notification" tag="div" class="eui-notification-container">
      <div
        v-for="notification in notifications"
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
  </Teleport>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'

export interface NotificationOptions {
  id?: string
  title: string
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const props = defineProps<{
  notifications: (NotificationOptions & { id: string })[]
}>()

const emit = defineEmits<{
  remove: [id: string]
}>()

const notificationClasses = (notification: NotificationOptions) => {
  return [
    'eui-notification',
    {
      [`eui-notification--${notification.type}`]: notification.type,
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
  top: var(--eui-spacing-lg);
  right: var(--eui-spacing-lg);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: var(--eui-spacing-sm);
  pointer-events: none;
}

.eui-notification {
  display: flex;
  align-items: flex-start;
  gap: var(--eui-spacing-md);
  min-width: 320px;
  max-width: 400px;
  padding: var(--eui-spacing-md);
  background-color: var(--eui-bg-primary);
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-lg);
  box-shadow: var(--eui-shadow-lg);
  pointer-events: auto;

  &--success {
    border-left: 4px solid var(--eui-color-success);
  }

  &--error {
    border-left: 4px solid var(--eui-color-error);
  }

  &--warning {
    border-left: 4px solid var(--eui-color-warning);
  }

  &--info {
    border-left: 4px solid var(--eui-color-info);
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

.eui-notification-enter-active,
.eui-notification-leave-active {
  transition: all 0.3s ease;
}

.eui-notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.eui-notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

