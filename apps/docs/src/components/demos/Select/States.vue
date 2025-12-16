<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <EuiSelect :options="options" placeholder="Normal" />
    <EuiSelect :options="options" placeholder="Error" state="error" />
    <EuiSelect :options="options" placeholder="Success" state="success" />
    <EuiSelect :options="options" placeholder="Disabled" disabled />
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

