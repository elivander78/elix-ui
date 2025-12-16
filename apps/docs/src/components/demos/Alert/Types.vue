<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiAlert type="success" title="Success" />
    <EuiAlert type="info" title="Info" />
    <EuiAlert type="warning" title="Warning" />
    <EuiAlert type="error" title="Error" />
  </div>
</template>

<script setup lang="ts">
import { Alert as EuiAlert } from '@elivander/elix-ui'
</script>

