<template>
  <Steps :current="stepsCurrent2">
    <Step title="Finished" description="This is a description" />
    <Step title="In Progress" description="This is a description" />
    <Step title="Waiting" description="This is a description" />
  </Steps>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Steps, Step } from '@elix/ui'

const stepsCurrent2 = ref(1)
</script>

