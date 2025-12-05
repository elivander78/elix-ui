<template>
  <div class="notification-demo">
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <Button @click="showSuccess">Success</Button>
      <Button @click="showError">Error</Button>
      <Button @click="showWarning">Warning</Button>
      <Button @click="showInfo">Info</Button>
    </div>
    <Notification :notifications="notifications" @remove="removeNotification" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Notification } from '@elivander/elix-ui'
import type { NotificationOptions } from '@elivander/elix-ui'

const notifications = ref<(NotificationOptions & { id: string })[]>([])
let idCounter = 0
const timers = new Map<string, NodeJS.Timeout>()

const addNotification = (options: NotificationOptions) => {
  const id = `notification-${++idCounter}`
  const notification = {
    ...options,
    id,
  }
  notifications.value.push(notification)

  // Only set timer if duration is not explicitly 0
  if (options.duration !== 0) {
    const duration = options.duration ?? 4500
    const timer = setTimeout(() => {
      removeNotification(id)
      timers.delete(id)
    }, duration)
    timers.set(id, timer)
  }

  return id
}

const removeNotification = (id: string) => {
  // Clear timer if exists
  const timer = timers.get(id)
  if (timer) {
    clearTimeout(timer)
    timers.delete(id)
  }

  const index = notifications.value.findIndex((n) => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

const showSuccess = () => addNotification({
  title: 'Success',
  message: 'Operation completed successfully',
  type: 'success',
})
const showError = () => addNotification({
  title: 'Error',
  message: 'Something went wrong',
  type: 'error',
})
const showWarning = () => addNotification({
  title: 'Warning',
  message: 'Please check your input',
  type: 'warning',
})
const showInfo = () => addNotification({
  title: 'Info',
  message: 'This is an informational message',
  type: 'info',
})
</script>

<style lang="scss" scoped>
.notification-demo {
  width: 100%;
}
</style>

