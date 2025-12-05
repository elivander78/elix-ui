<template>
  <div class="notification-demo">
    <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
      <Button @click="showNotification('success')">Success</Button>
      <Button @click="showNotification('error')">Error</Button>
      <Button @click="showNotification('warning')">Warning</Button>
      <Button @click="showNotification('info')">Info</Button>
    </div>
    <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; align-items: center;">
      <label style="font-size: 14px;">Position:</label>
      <Select v-model="position" :options="positionOptions" style="width: 150px;" />
      <label style="font-size: 14px;">Duration (ms):</label>
      <Input v-model.number="duration" type="number" placeholder="0 = no auto-close" style="width: 150px;" />
      <label style="font-size: 14px;">Appearance:</label>
      <Select v-model="appearance" :options="appearanceOptions" style="width: 150px;" />
    </div>
    <Notification :notifications="notifications" @remove="removeNotification" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Notification, Select, Input } from '@elivander/elix-ui'
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

const position = ref('top-right')
const duration = ref(4500)
const appearance = ref('shadow')

const positionOptions = [
  { label: 'Top Right', value: 'top-right' },
  { label: 'Top Left', value: 'top-left' },
  { label: 'Bottom Right', value: 'bottom-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
]

const appearanceOptions = [
  { label: 'Border', value: 'border' },
  { label: 'Shadow', value: 'shadow' },
]

const showNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
  addNotification({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    message: 'Notification message',
    type: type,
    duration: duration.value || 0,
    position: position.value as any,
    appearance: appearance.value as any,
  })
}
</script>

<style lang="scss" scoped>
.notification-demo {
  width: 100%;
}
</style>

