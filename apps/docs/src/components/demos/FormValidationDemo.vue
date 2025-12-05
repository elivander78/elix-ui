<template>
  <div class="form-demo">
    <Form ref="formRef" :model="formData" :rules="rules" @submit="handleSubmit">
      <FormItem label="Required Field" prop="required" required>
        <Input v-model="formData.required" placeholder="This field is required" />
      </FormItem>
      <FormItem label="Email" prop="email" required>
        <Input v-model="formData.email" type="email" placeholder="Enter email" />
      </FormItem>
      <FormItem label="Min Length" prop="minLength" required>
        <Input v-model="formData.minLength" placeholder="Min 5 characters" />
      </FormItem>
      <FormItem label="Max Length" prop="maxLength" required>
        <Input v-model="formData.maxLength" placeholder="Max 10 characters" />
      </FormItem>
      <FormItem label="Custom Validator" prop="custom" required>
        <Input v-model="formData.custom" placeholder="Must contain 'test'" />
      </FormItem>
      <FormItem>
        <Button type="primary" native-type="submit">Submit</Button>
        <Button type="outline" @click="handleReset">Reset</Button>
      </FormItem>
    </Form>
    <Notification :notifications="notifications" @remove="removeNotification" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form, FormItem, Input, Button, Notification } from '@elix/ui'
import type { FormInstance, NotificationOptions } from '@elix/ui'

const formRef = ref<FormInstance | null>(null)

const formData = reactive({
  required: '',
  email: '',
  minLength: '',
  maxLength: '',
  custom: '',
})

const rules = {
  required: [
    { required: true, message: 'This field is required' },
  ],
  email: [
    { required: true, message: 'Email is required' },
    { 
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Invalid email format'
    },
  ],
  minLength: [
    { required: true, message: 'This field is required' },
    {
      validator: (value: string) => value.length >= 5,
      message: 'Must be at least 5 characters'
    },
  ],
  maxLength: [
    { required: true, message: 'This field is required' },
    {
      validator: (value: string) => value.length <= 10,
      message: 'Must be at most 10 characters'
    },
  ],
  custom: [
    { required: true, message: 'This field is required' },
    {
      validator: (value: string) => value.includes('test'),
      message: 'Must contain the word "test"'
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
    message: 'Form validated and submitted successfully!',
    type: 'success',
  })
}

const handleReset = () => {
  formRef.value?.reset()
  formData.required = ''
  formData.email = ''
  formData.minLength = ''
  formData.maxLength = ''
  formData.custom = ''
}
</script>

<style lang="scss" scoped>
.form-demo {
  width: 100%;
  max-width: 500px;
}
</style>

