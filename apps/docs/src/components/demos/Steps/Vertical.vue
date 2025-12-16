<template>
  <EuiSteps :current="stepsCurrent3" direction="vertical">
    <EuiStep title="Step 1" description="Description 1" />
    <EuiStep title="Step 2" description="Description 2" />
    <EuiStep title="Step 3" description="Description 3" />
  </EuiSteps>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Steps as EuiSteps, Step as EuiStep } from '@elivander/elix-ui'

const stepsCurrent3 = ref(1)
</script>

