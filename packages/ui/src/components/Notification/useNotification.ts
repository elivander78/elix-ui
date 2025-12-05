import { ref } from 'vue'
import type { NotificationOptions } from './Notification'

const notifications = ref<(NotificationOptions & { id: string })[]>([])

let idCounter = 0

export function useNotification() {
  const add = (options: NotificationOptions) => {
    const id = options.id || `notification-${++idCounter}`
    const notification = {
      ...options,
      id,
    }
    notifications.value.push(notification)

    if (options.duration !== 0) {
      const duration = options.duration || 4500
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  const remove = (id: string) => {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const success = (title: string, message?: string, duration?: number, options?: Partial<NotificationOptions>) => {
    return add({ title, message, type: 'success', duration, ...options })
  }

  const error = (title: string, message?: string, duration?: number, options?: Partial<NotificationOptions>) => {
    return add({ title, message, type: 'error', duration, ...options })
  }

  const warning = (title: string, message?: string, duration?: number, options?: Partial<NotificationOptions>) => {
    return add({ title, message, type: 'warning', duration, ...options })
  }

  const info = (title: string, message?: string, duration?: number, options?: Partial<NotificationOptions>) => {
    return add({ title, message, type: 'info', duration, ...options })
  }

  return {
    notifications,
    add,
    remove,
    success,
    error,
    warning,
    info,
  }
}

