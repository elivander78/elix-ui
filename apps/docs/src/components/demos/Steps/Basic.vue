<template>
  <div>
    <EuiSteps :current="stepsCurrent1">
      <EuiStep title="Step 1" />
      <EuiStep title="Step 2" />
      <EuiStep title="Step 3" />
      <EuiStep title="Step 4" />
    </EuiSteps>
    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <EuiButton @click="stepsCurrent1 = Math.max(0, stepsCurrent1 - 1)">Previous</EuiButton>
      <EuiButton @click="stepsCurrent1 = Math.min(3, stepsCurrent1 + 1)">Next</EuiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Steps as EuiSteps, Step as EuiStep, Button as EuiButton } from '@elivander/elix-ui'

const stepsCurrent1 = ref(1)
</script>

