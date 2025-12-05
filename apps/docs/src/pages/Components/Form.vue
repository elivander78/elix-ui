<template>
  <div class="docs-page">
    <h1>Form</h1>
    <p>The Form component is used to collect and validate user input.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>All Input Types</h2>
    <Playground :code="allInputsCode" />

    <h2>Validation Examples</h2>
    <Playground :code="validationCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Form :model="formData" :rules="rules" @submit="handleSubmit">
    <FormItem label="Username" prop="username" required>
      <Input v-model="formData.username" />
    </FormItem>
    <FormItem label="Email" prop="email" required>
      <Input v-model="formData.email" type="email" />
    </FormItem>
    <FormItem>
      <Button type="primary" native-type="submit">Submit</Button>
    </FormItem>
  </Form>
</template>

<script setup>
import { ref } from 'vue'
import { Form, FormItem, Input, Button } from '@elix/ui'

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
  <Form :model="formData" :rules="rules" @submit="handleSubmit">
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
</template>

<script setup>
import { ref } from 'vue'
import { Form, FormItem, Input, Textarea, Select, Checkbox, Radio, Switch } from '@elix/ui'

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

const validationCode = `<template>
  <Form :model="formData" :rules="rules" @submit="handleSubmit">
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
</template>

<script setup>
import { ref } from 'vue'
import { Form, FormItem, Input, Button } from '@elix/ui'

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
