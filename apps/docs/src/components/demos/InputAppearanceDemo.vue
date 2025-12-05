<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <Input appearance="border" placeholder="Border" />
    <Input appearance="shadow" placeholder="Shadow" />
    <Input appearance="border-shadow" placeholder="Border + Shadow" />
  </div>
</template>

<script setup lang="ts">
import { Input } from '@elix/ui'
</script>

