<template>
  <Result
    status="success"
    title="Success"
    description="Your operation has been completed successfully."
  >
    <template #extra>
      <Button>Go Home</Button>
    </template>
  </Result>
</template>

<script setup lang="ts">
import { Result, Button } from '@elivander/elix-ui'
</script>

