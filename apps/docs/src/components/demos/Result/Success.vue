<template>
  <EuiResult
    status="success"
    title="Success"
    description="Your operation has been completed successfully."
  >
    <template #extra>
      <EuiButton>Go Home</EuiButton>
    </template>
  </EuiResult>
</template>

<script setup lang="ts">
import { Result as EuiResult, Button as EuiButton } from '@elivander/elix-ui'
</script>

