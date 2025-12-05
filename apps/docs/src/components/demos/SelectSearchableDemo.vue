<template>
  <Select
    v-model="selected"
    :options="options"
    placeholder="Type to search..."
    filterable
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '@elix/ui'

const selected = ref()
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
]
</script>

