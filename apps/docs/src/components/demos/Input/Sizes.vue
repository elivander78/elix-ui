<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <EuiInput size="xs" placeholder="Extra Small" />
    <EuiInput size="sm" placeholder="Small" />
    <EuiInput size="md" placeholder="Medium" />
    <EuiInput size="lg" placeholder="Large" />
  </div>
</template>

<script setup lang="ts">
import { Input as EuiInput } from '@elivander/elix-ui'
</script>

