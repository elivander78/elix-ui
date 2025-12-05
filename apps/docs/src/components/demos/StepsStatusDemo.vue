<template>
  <Steps :current="2" status="error">
    <Step title="Step 1" />
    <Step title="Step 2" />
    <Step title="Step 3" />
    <Step title="Step 4" />
  </Steps>
</template>

<script setup lang="ts">
import { Steps, Step } from '@elix/ui'
</script>

