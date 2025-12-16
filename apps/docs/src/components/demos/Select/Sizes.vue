<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <EuiSelect size="xs" :options="options" placeholder="Extra Small" />
    <EuiSelect size="sm" :options="options" placeholder="Small" />
    <EuiSelect size="md" :options="options" placeholder="Medium" />
    <EuiSelect size="lg" :options="options" placeholder="Large" />
  </div>
</template>

<script setup lang="ts">
import { Select as EuiSelect } from '@elivander/elix-ui'

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
</script>

