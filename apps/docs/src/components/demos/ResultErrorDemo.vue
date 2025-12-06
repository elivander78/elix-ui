<template>
  <Result
    status="error"
    title="Error"
    description="Something went wrong. Please try again."
  >
    <template #extra>
      <Button>Retry</Button>
    </template>
  </Result>
</template>

<script setup lang="ts">
import { Result, Button } from '@elivander/elix-ui'
</script>

