<template>
  <div class="form-demo">
    <EuiForm ref="formRef" :model="formData" :rules="rules" @submit="handleSubmit">
      <EuiFormItem label="Email" prop="email" required>
        <EuiInput v-model="formData.email" type="email" placeholder="Enter your email" />
      </EuiFormItem>
      <EuiFormItem label="Password" prop="password" required>
        <EuiInput v-model="formData.password" type="password" placeholder="Enter your password" />
      </EuiFormItem>
      <EuiFormItem>
        <EuiButton type="primary" native-type="submit">Submit</EuiButton>
      </EuiFormItem>
    </EuiForm>
    <EuiNotification :notifications="notifications" @remove="removeNotification" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form as EuiForm, FormItem as EuiFormItem, Input as EuiInput, Button as EuiButton, Notification as EuiNotification } from '@elivander/elix-ui'
import type { FormInstance, NotificationOptions } from '@elivander/elix-ui'

const formRef = ref<FormInstance | null>(null)

const formData = reactive({
  email: '',
  password: '',
})

const rules = {
  email: [
    { required: true, message: 'Email is required' },
    { 
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Invalid email format'
    },
  ],
  password: [
    { required: true, message: 'Password is required' },
    {
      validator: (value: string) => value.length >= 6,
      message: 'Password must be at least 6 characters'
    },
  ],
}

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

const handleSubmit = async (values: Record<string, any>) => {
  console.log('Form submitted:', values)
  addNotification({
    title: 'Success',
    message: 'Form submitted successfully!',
    type: 'success',
  })
}
</script>

<style lang="scss" scoped>
.form-demo {
  width: 100%;
  max-width: 500px;
}
</style>

