<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <EuiInput placeholder="Normal" />
    <EuiInput placeholder="Error" state="error" />
    <EuiInput placeholder="Success" state="success" />
    <EuiInput placeholder="Disabled" disabled />
  </div>
</template>

<script setup lang="ts">
import { Input as EuiInput } from '@elivander/elix-ui'
</script>

