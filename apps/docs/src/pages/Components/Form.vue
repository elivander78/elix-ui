<template>
  <div class="docs-page">
    <h1>Form</h1>
    <p>The Form component is used to collect and validate user input.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="FormBasicDemo" :code="basicCode" />

    <h2>All Input Types</h2>
    <Playground :demo-component="FormInputsDemo" :code="allInputsCode" />

    <h2>Email + Password Form</h2>
    <Playground :demo-component="FormEmailPasswordDemo" :code="emailPasswordCode" />

    <h2>Validation Examples</h2>
    <Playground :demo-component="FormValidationDemo" :code="validationCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import FormBasicDemo from '../../components/demos/Form/Basic.vue'
import FormInputsDemo from '../../components/demos/Form/Inputs.vue'
import FormEmailPasswordDemo from '../../components/demos/Form/EmailPassword.vue'
import FormValidationDemo from '../../components/demos/Form/Validation.vue'

const basicCode = `<template>
  <EuiForm :model="formData" :rules="rules" @submit="handleSubmit">
    <EuiFormItem label="Username" prop="username" required>
      <EuiInput v-model="formData.username" />
    </EuiFormItem>
    <EuiFormItem label="Email" prop="email" required>
      <EuiInput v-model="formData.email" type="email" />
    </EuiFormItem>
    <EuiFormItem>
      <EuiButton type="primary" native-type="submit">Submit</EuiButton>
    </EuiFormItem>
  </EuiForm>
</template>

<script setup>
import { ref } from 'vue'
import { Form as EuiForm, FormItem as EuiFormItem, Input as EuiInput, Button as EuiButton } from '@elivander/elix-ui'

const formData = ref({
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

const handleSubmit = (values) => {
  console.log('Form submitted:', values)
}
<\/script>`

const allInputsCode = `<template>
  <EuiForm :model="formData" :rules="rules" @submit="handleSubmit">
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
</template>

<script setup>
import { ref } from 'vue'
import { Form as EuiForm, FormItem as EuiFormItem, Input as EuiInput, Textarea as EuiTextarea, Select as EuiSelect, Checkbox as EuiCheckbox, Radio as EuiRadio, Switch as EuiSwitch } from '@elivander/elix-ui'

const formData = ref({
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

const handleSubmit = (values) => {
  console.log('Form submitted:', values)
  alert('Form submitted successfully!')
}

const handleReset = () => {
  formData.value = {
    text: '',
    textarea: '',
    select: undefined,
    checkbox: false,
    radio: 'option1',
    switch: false,
  }
}
<\/script>`

const emailPasswordCode = `<template>
  <EuiForm :model="formData" :rules="rules" @submit="handleSubmit">
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
  <EuiNotification :notifications="notifications" @remove="remove" />
</template>

<script setup>
import { ref } from 'vue'
import { Form as EuiForm, FormItem as EuiFormItem, Input as EuiInput, Button as EuiButton, Notification as EuiNotification, useNotification } from '@elivander/elix-ui'

const formData = ref({
  email: '',
  password: '',
})

const rules = {
  email: [
    { required: true, message: 'Email is required' },
    { 
      validator: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
      message: 'Invalid email format'
    },
  ],
  password: [
    { required: true, message: 'Password is required' },
    {
      validator: (value) => value.length >= 6,
      message: 'Password must be at least 6 characters'
    },
  ],
}

const { notifications, success, remove } = useNotification()

const handleSubmit = (values) => {
  console.log('Form submitted:', values)
  success('Success', 'Form submitted successfully!')
}
<\/script>`

const validationCode = `<template>
  <EuiForm :model="formData" :rules="rules" @submit="handleSubmit">
    <EuiFormItem label="Required Field" prop="required" required>
      <EuiInput v-model="formData.required" placeholder="This field is required" />
    </EuiFormItem>
    <EuiFormItem label="Email" prop="email" required>
      <EuiInput v-model="formData.email" type="email" placeholder="Enter email" />
    </EuiFormItem>
    <EuiFormItem label="Min Length" prop="minLength" required>
      <EuiInput v-model="formData.minLength" placeholder="Min 5 characters" />
    </EuiFormItem>
    <EuiFormItem label="Max Length" prop="maxLength" required>
      <EuiInput v-model="formData.maxLength" placeholder="Max 10 characters" />
    </EuiFormItem>
    <EuiFormItem label="Custom Validator" prop="custom" required>
      <EuiInput v-model="formData.custom" placeholder="Must contain 'test'" />
    </EuiFormItem>
    <EuiFormItem>
      <EuiButton type="primary" native-type="submit">Submit</EuiButton>
      <EuiButton type="outline" @click="handleReset">Reset</EuiButton>
    </EuiFormItem>
  </EuiForm>
</template>

<script setup>
import { ref } from 'vue'
import { Form as EuiForm, FormItem as EuiFormItem, Input as EuiInput, Button as EuiButton } from '@elivander/elix-ui'

const formData = ref({
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
      validator: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
      message: 'Invalid email format'
    },
  ],
  minLength: [
    { required: true, message: 'This field is required' },
    {
      validator: (value) => value.length >= 5,
      message: 'Must be at least 5 characters'
    },
  ],
  maxLength: [
    { required: true, message: 'This field is required' },
    {
      validator: (value) => value.length <= 10,
      message: 'Must be at most 10 characters'
    },
  ],
  custom: [
    { required: true, message: 'This field is required' },
    {
      validator: (value) => value.includes('test'),
      message: 'Must contain the word "test"'
    },
  ],
}

const handleSubmit = (values) => {
  console.log('Form submitted:', values)
}
<\/script>`
</script>

<style lang="scss" scoped>
.docs-page {
  h1 {
    margin-bottom: var(--eui-spacing-lg);
  }

  h2 {
    margin-top: var(--eui-spacing-2xl);
    margin-bottom: var(--eui-spacing-md);
  }
}
</style>
