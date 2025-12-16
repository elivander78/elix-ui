<template>
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <EuiContainer max-width="sm">
      <div style="background: var(--eui-bg-secondary); padding: 20px; border-radius: 8px;">Small (640px)</div>
    </EuiContainer>
    <EuiContainer max-width="md">
      <div style="background: var(--eui-bg-secondary); padding: 20px; border-radius: 8px;">Medium (768px)</div>
    </EuiContainer>
    <EuiContainer max-width="lg">
      <div style="background: var(--eui-bg-secondary); padding: 20px; border-radius: 8px;">Large (1024px)</div>
    </EuiContainer>
  </div>
</template>

<script setup lang="ts">
import { Container as EuiContainer } from '@elivander/elix-ui'
</script>

