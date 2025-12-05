<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Alert type="info" appearance="border" variant="outlined" title="Border" />
    <Alert type="info" appearance="shadow" variant="outlined" title="Shadow" />
    <Alert type="info" appearance="border-shadow" variant="outlined" title="Border + Shadow" />
  </div>
</template>

<script setup lang="ts">
import { Alert } from '@elivander/elix-ui'
</script>

