<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <EuiTextarea appearance="border" placeholder="Border" />
    <EuiTextarea appearance="shadow" placeholder="Shadow" />
    <EuiTextarea appearance="border-shadow" placeholder="Border + Shadow" />
  </div>
</template>

<script setup lang="ts">
import { Textarea as EuiTextarea } from '@elivander/elix-ui'
</script>

