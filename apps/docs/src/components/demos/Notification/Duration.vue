<template>
  <div class="notification-demo">
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <EuiButton @click="showShort">Short Duration (2s)</EuiButton>
      <EuiButton @click="showLong">Long Duration (5s)</EuiButton>
      <EuiButton @click="showPersistent">Persistent (0s)</EuiButton>
      <EuiButton @click="showDefault">Default Duration</EuiButton>
    </div>
    <EuiNotification :notifications="notifications" @remove="removeNotification" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button as EuiButton, Notification as EuiNotification } from '@elivander/elix-ui'
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

const showShort = () => addNotification({
  title: 'Success',
  message: 'This will close in 2 seconds',
  type: 'success',
  duration: 2000,
})
const showLong = () => addNotification({
  title: 'Error',
  message: 'This will close in 5 seconds',
  type: 'error',
  duration: 5000,
})
const showPersistent = () => addNotification({
  title: 'Warning',
  message: 'This will stay until closed',
  type: 'warning',
  duration: 0,
})
const showDefault = () => addNotification({
  title: 'Info',
  message: 'Default duration (4.5s)',
  type: 'info',
})
</script>

<style lang="scss" scoped>
.notification-demo {
  width: 100%;
}
</style>

