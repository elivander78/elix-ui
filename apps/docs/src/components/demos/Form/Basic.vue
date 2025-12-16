<template>
  <div class="form-demo">
    <EuiForm ref="formRef" :model="formData" :rules="rules" @submit="handleSubmit">
      <EuiFormItem label="Username" prop="username" required>
        <EuiInput v-model="formData.username" placeholder="Enter username" />
      </EuiFormItem>
      <EuiFormItem label="Email" prop="email" required>
        <EuiInput v-model="formData.email" type="email" placeholder="Enter email" />
      </EuiFormItem>
      <EuiFormItem>
        <EuiButton type="primary" native-type="submit">Submit</EuiButton>
      </EuiFormItem>
    </EuiForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form as EuiForm, FormItem as EuiFormItem, Input as EuiInput, Button as EuiButton } from '@elivander/elix-ui'
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

