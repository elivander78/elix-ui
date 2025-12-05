<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <Select :options="options" appearance="border" placeholder="Border" />
    <Select :options="options" appearance="shadow" placeholder="Shadow" />
    <Select :options="options" appearance="border-shadow" placeholder="Border + Shadow" />
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

