<template>
  <Select
    v-model="selected"
    :options="options"
    placeholder="Select an option"
    clearable
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '@elivander/elix-ui'

const selected = ref('1')
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
</script>

