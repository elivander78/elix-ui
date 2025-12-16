<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <EuiButtonGroup variant="primary">
      <EuiButton>Primary</EuiButton>
      <EuiButton>Primary</EuiButton>
    </EuiButtonGroup>
    <EuiButtonGroup variant="secondary">
      <EuiButton>Secondary</EuiButton>
      <EuiButton>Secondary</EuiButton>
    </EuiButtonGroup>
    <EuiButtonGroup variant="outline">
      <EuiButton>Outline</EuiButton>
      <EuiButton>Outline</EuiButton>
    </EuiButtonGroup>
    <EuiButtonGroup variant="ghost">
      <EuiButton>Ghost</EuiButton>
      <EuiButton>Ghost</EuiButton>
    </EuiButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { ButtonGroup as EuiButtonGroup, Button as EuiButton } from '@elivander/elix-ui'
</script>

