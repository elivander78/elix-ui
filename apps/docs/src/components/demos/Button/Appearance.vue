<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <EuiButton appearance="border">Border</EuiButton>
    <EuiButton appearance="shadow">Shadow</EuiButton>
    <EuiButton appearance="border-shadow">Border + Shadow</EuiButton>
  </div>
</template>

<script setup lang="ts">
import { Button as EuiButton } from '@elivander/elix-ui'
</script>

