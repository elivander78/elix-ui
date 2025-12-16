<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <EuiButton type="primary">Primary</EuiButton>
    <EuiButton type="secondary">Secondary</EuiButton>
    <EuiButton type="outline">Outline</EuiButton>
    <EuiButton type="ghost">Ghost</EuiButton>
    <EuiButton type="text">Text</EuiButton>
  </div>
</template>

<script setup lang="ts">
import { Button as EuiButton } from '@elivander/elix-ui'
</script>

