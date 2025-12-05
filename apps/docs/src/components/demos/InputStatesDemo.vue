<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <Input placeholder="Normal" />
    <Input placeholder="Error" state="error" />
    <Input placeholder="Success" state="success" />
    <Input placeholder="Disabled" disabled />
  </div>
</template>

<script setup lang="ts">
import { Input } from '@elix/ui'
</script>

