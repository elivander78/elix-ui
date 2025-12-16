<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <EuiTextarea placeholder="Normal" />
    <EuiTextarea placeholder="Error" state="error" />
    <EuiTextarea placeholder="Success" state="success" />
    <EuiTextarea placeholder="Disabled" disabled />
  </div>
</template>

<script setup lang="ts">
import { Textarea as EuiTextarea } from '@elivander/elix-ui'
</script>

