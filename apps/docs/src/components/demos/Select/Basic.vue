<template>
  <EuiSelect
    v-model="selected"
    :options="options"
    placeholder="Select an option"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select as EuiSelect } from '@elivander/elix-ui'

const selected = ref()
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
</script>
