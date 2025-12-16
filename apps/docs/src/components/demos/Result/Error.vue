<template>
  <EuiResult
    status="error"
    title="Error"
    description="Something went wrong. Please try again."
  >
    <template #extra>
      <EuiButton>Retry</EuiButton>
    </template>
  </EuiResult>
</template>

<script setup lang="ts">
import { Result as EuiResult, Button as EuiButton } from '@elivander/elix-ui'
</script>

