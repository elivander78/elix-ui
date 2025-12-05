<template>
  <div>
    <Steps :current="stepsCurrent1">
      <Step title="Step 1" />
      <Step title="Step 2" />
      <Step title="Step 3" />
      <Step title="Step 4" />
    </Steps>
    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <Button @click="stepsCurrent1 = Math.max(0, stepsCurrent1 - 1)">Previous</Button>
      <Button @click="stepsCurrent1 = Math.min(3, stepsCurrent1 + 1)">Next</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Steps, Step, Button } from '@elix/ui'

const stepsCurrent1 = ref(1)
</script>

