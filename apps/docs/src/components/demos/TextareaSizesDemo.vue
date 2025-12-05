<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <Textarea size="xs" placeholder="Extra Small" />
    <Textarea size="sm" placeholder="Small" />
    <Textarea size="md" placeholder="Medium" />
    <Textarea size="lg" placeholder="Large" />
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@elivander/elix-ui'
</script>

