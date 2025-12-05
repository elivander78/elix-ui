<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Alert type="success" title="Success" />
    <Alert type="info" title="Info" />
    <Alert type="warning" title="Warning" />
    <Alert type="error" title="Error" />
  </div>
</template>

<script setup lang="ts">
import { Alert } from '@elivander/elix-ui'
</script>

