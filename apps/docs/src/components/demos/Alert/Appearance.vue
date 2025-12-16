<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiAlert type="info" appearance="border" variant="outlined" title="Border" />
    <EuiAlert type="info" appearance="shadow" variant="outlined" title="Shadow" />
    <EuiAlert type="info" appearance="border-shadow" variant="outlined" title="Border + Shadow" />
  </div>
</template>

<script setup lang="ts">
import { Alert as EuiAlert } from '@elivander/elix-ui'
</script>

