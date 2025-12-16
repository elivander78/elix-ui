<template>
  <div class="form-demo">
    <EuiForm ref="formRef" :model="formData" :rules="rules" @submit="handleSubmit">
      <EuiFormItem label="Text Input" prop="text">
        <EuiInput v-model="formData.text" placeholder="Enter text" />
      </EuiFormItem>
      <EuiFormItem label="Textarea" prop="textarea">
        <EuiTextarea v-model="formData.textarea" placeholder="Enter text" />
      </EuiFormItem>
      <EuiFormItem label="Select" prop="select">
        <EuiSelect v-model="formData.select" :options="selectOptions" placeholder="Select option" />
      </EuiFormItem>
      <EuiFormItem label="Checkbox" prop="checkbox">
        <EuiCheckbox v-model="formData.checkbox">I agree</EuiCheckbox>
      </EuiFormItem>
      <EuiFormItem label="Radio" prop="radio">
        <EuiRadio v-model="formData.radio" value="option1">Option 1</EuiRadio>
        <EuiRadio v-model="formData.radio" value="option2">Option 2</EuiRadio>
      </EuiFormItem>
      <EuiFormItem label="Switch" prop="switch">
        <EuiSwitch v-model="formData.switch" />
      </EuiFormItem>
      <EuiFormItem>
        <EuiButton type="primary" native-type="submit">Submit</EuiButton>
        <EuiButton type="outline" @click="handleReset">Reset</EuiButton>
      </EuiFormItem>
    </EuiForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form as EuiForm, FormItem as EuiFormItem, Input as EuiInput, Textarea as EuiTextarea, Select as EuiSelect, Checkbox as EuiCheckbox, Radio as EuiRadio, Switch as EuiSwitch, Button as EuiButton } from '@elivander/elix-ui'
import type { FormInstance } from '@elivander/elix-ui'

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

