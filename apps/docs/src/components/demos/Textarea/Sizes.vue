<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <EuiTextarea size="xs" placeholder="Extra Small" />
    <EuiTextarea size="sm" placeholder="Small" />
    <EuiTextarea size="md" placeholder="Medium" />
    <EuiTextarea size="lg" placeholder="Large" />
  </div>
</template>

<script setup lang="ts">
import { Textarea as EuiTextarea } from '@elivander/elix-ui'
</script>

