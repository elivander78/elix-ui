<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <Textarea appearance="border" placeholder="Border" />
    <Textarea appearance="shadow" placeholder="Shadow" />
    <Textarea appearance="border-shadow" placeholder="Border + Shadow" />
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@elivander/elix-ui'
</script>

