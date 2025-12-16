<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <EuiButtonGroup size="xs">
      <EuiButton>XS</EuiButton>
      <EuiButton>XS</EuiButton>
    </EuiButtonGroup>
    <EuiButtonGroup size="sm">
      <EuiButton>SM</EuiButton>
      <EuiButton>SM</EuiButton>
    </EuiButtonGroup>
    <EuiButtonGroup size="md">
      <EuiButton>MD</EuiButton>
      <EuiButton>MD</EuiButton>
    </EuiButtonGroup>
    <EuiButtonGroup size="lg">
      <EuiButton>LG</EuiButton>
      <EuiButton>LG</EuiButton>
    </EuiButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { ButtonGroup as EuiButtonGroup, Button as EuiButton } from '@elivander/elix-ui'
</script>

