<template>
  <Steps :current="stepsCurrent3" direction="vertical">
    <Step title="Step 1" description="Description 1" />
    <Step title="Step 2" description="Description 2" />
    <Step title="Step 3" description="Description 3" />
  </Steps>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Steps, Step } from '@elivander/elix-ui'

const stepsCurrent3 = ref(1)
</script>

