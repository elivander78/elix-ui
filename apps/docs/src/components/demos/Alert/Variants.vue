<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiAlert type="info" variant="soft" title="Soft variant" />
    <EuiAlert type="info" variant="solid" title="Solid variant" />
    <EuiAlert type="info" variant="outlined" title="Outlined variant" />
  </div>
</template>

<script setup lang="ts">
import { Alert as EuiAlert } from '@elivander/elix-ui'
</script>

