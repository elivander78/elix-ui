<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Alert type="info" variant="soft" title="Soft variant" />
    <Alert type="info" variant="solid" title="Solid variant" />
    <Alert type="info" variant="outlined" title="Outlined variant" />
  </div>
</template>

<script setup lang="ts">
import { Alert } from '@elivander/elix-ui'
</script>

