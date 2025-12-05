<template>
  <div class="form-demo">
    <Form ref="formRef" :model="formData" :rules="rules" @submit="handleSubmit">
      <FormItem label="Username" prop="username" required>
        <Input v-model="formData.username" placeholder="Enter username" />
      </FormItem>
      <FormItem label="Email" prop="email" required>
        <Input v-model="formData.email" type="email" placeholder="Enter email" />
      </FormItem>
      <FormItem>
        <Button type="primary" native-type="submit">Submit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form, FormItem, Input, Button } from '@elivander/elix-ui'
import type { FormInstance } from '@elivander/elix-ui'

const formRef = ref<FormInstance | null>(null)

const formData = reactive({
  username: '',
  email: '',
})

const rules = {
  username: [
    { required: true, message: 'Username is required' },
  ],
  email: [
    { required: true, message: 'Email is required' },
  ],
}

const handleSubmit = async (values: Record<string, any>) => {
  console.log('Form submitted:', values)
  alert('Form submitted successfully!')
}
</script>

<style lang="scss" scoped>
.form-demo {
  width: 100%;
  max-width: 500px;
}
</style>

