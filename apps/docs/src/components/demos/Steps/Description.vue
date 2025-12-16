<template>
  <EuiSteps :current="stepsCurrent2">
    <EuiStep title="Finished" description="This is a description" />
    <EuiStep title="In Progress" description="This is a description" />
    <EuiStep title="Waiting" description="This is a description" />
  </EuiSteps>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Steps as EuiSteps, Step as EuiStep } from '@elivander/elix-ui'

const stepsCurrent2 = ref(1)
</script>

