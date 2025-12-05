<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <Textarea placeholder="Normal" />
    <Textarea placeholder="Error" state="error" />
    <Textarea placeholder="Success" state="success" />
    <Textarea placeholder="Disabled" disabled />
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@elivander/elix-ui'
</script>

