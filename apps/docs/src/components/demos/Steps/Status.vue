<template>
  <EuiSteps :current="2" status="error">
    <EuiStep title="Step 1" />
    <EuiStep title="Step 2" />
    <EuiStep title="Step 3" />
    <EuiStep title="Step 4" />
  </EuiSteps>
</template>

<script setup lang="ts">
import { Steps as EuiSteps, Step as EuiStep } from '@elivander/elix-ui'
</script>

