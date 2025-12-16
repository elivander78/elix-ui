<template>
  <EuiContainer :fluid="true">
    <div style="background: var(--eui-bg-secondary); padding: 20px; border-radius: 8px;">
      Fluid container - takes full width with padding
    </div>
  </EuiContainer>
</template>

<script setup lang="ts">
import { Container as EuiContainer } from '@elivander/elix-ui'
</script>

