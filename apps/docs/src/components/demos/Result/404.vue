<template>
  <EuiResult
    status="404"
    title="404"
    description="The page you are looking for does not exist."
  >
    <template #extra>
      <EuiButton>Back Home</EuiButton>
    </template>
  </EuiResult>
</template>

<script setup lang="ts">
import { Result as EuiResult, Button as EuiButton } from '@elivander/elix-ui'
</script>

