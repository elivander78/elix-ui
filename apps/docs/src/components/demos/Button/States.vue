<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <EuiButton>Normal</EuiButton>
    <EuiButton disabled>Disabled</EuiButton>
    <EuiButton loading>Loading</EuiButton>
  </div>
</template>

<script setup lang="ts">
import { Button as EuiButton } from '@elivander/elix-ui'
</script>

