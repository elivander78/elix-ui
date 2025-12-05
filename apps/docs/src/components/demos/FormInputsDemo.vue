<template>
  <div class="form-demo">
    <Form ref="formRef" :model="formData" :rules="rules" @submit="handleSubmit">
      <FormItem label="Text Input" prop="text">
        <Input v-model="formData.text" placeholder="Enter text" />
      </FormItem>
      <FormItem label="Textarea" prop="textarea">
        <Textarea v-model="formData.textarea" placeholder="Enter text" />
      </FormItem>
      <FormItem label="Select" prop="select">
        <Select v-model="formData.select" :options="selectOptions" placeholder="Select option" />
      </FormItem>
      <FormItem label="Checkbox" prop="checkbox">
        <Checkbox v-model="formData.checkbox">I agree</Checkbox>
      </FormItem>
      <FormItem label="Radio" prop="radio">
        <Radio v-model="formData.radio" value="option1">Option 1</Radio>
        <Radio v-model="formData.radio" value="option2">Option 2</Radio>
      </FormItem>
      <FormItem label="Switch" prop="switch">
        <Switch v-model="formData.switch" />
      </FormItem>
      <FormItem>
        <Button type="primary" native-type="submit">Submit</Button>
        <Button type="outline" @click="handleReset">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form, FormItem, Input, Textarea, Select, Checkbox, Radio, Switch, Button } from '@elix/ui'
import type { FormInstance } from '@elix/ui'

const formRef = ref<FormInstance | null>(null)

const formData = reactive({
  text: '',
  textarea: '',
  select: undefined,
  checkbox: false,
  radio: 'option1',
  switch: false,
})

const selectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

const rules = {}

const handleSubmit = async (values: Record<string, any>) => {
  console.log('Form submitted:', values)
  alert('Form submitted successfully!')
}

const handleReset = () => {
  formRef.value?.reset()
  formData.text = ''
  formData.textarea = ''
  formData.select = undefined
  formData.checkbox = false
  formData.radio = 'option1'
  formData.switch = false
}
</script>

<style lang="scss" scoped>
.form-demo {
  width: 100%;
  max-width: 500px;
}
</style>

