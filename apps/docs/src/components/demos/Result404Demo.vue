<template>
  <Result
    status="404"
    title="404"
    description="The page you are looking for does not exist."
  >
    <template #extra>
      <Button>Back Home</Button>
    </template>
  </Result>
</template>

<script setup lang="ts">
import { Result, Button } from '@elivander/elix-ui'
</script>

