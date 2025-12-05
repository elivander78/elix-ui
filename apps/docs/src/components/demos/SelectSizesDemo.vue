<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <Select size="xs" :options="options" placeholder="Extra Small" />
    <Select size="sm" :options="options" placeholder="Small" />
    <Select size="md" :options="options" placeholder="Medium" />
    <Select size="lg" :options="options" placeholder="Large" />
  </div>
</template>

<script setup lang="ts">
import { Select } from '@elix/ui'

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
</script>

