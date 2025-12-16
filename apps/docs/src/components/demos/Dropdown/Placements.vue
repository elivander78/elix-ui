<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <EuiDropdown placement="bottom-start">
      <template #trigger><EuiButton>Bottom Start</EuiButton></template>
      <template #menu><div style="padding: 8px;">Menu</div></template>
    </EuiDropdown>
    <EuiDropdown placement="top-start">
      <template #trigger><EuiButton>Top Start</EuiButton></template>
      <template #menu><div style="padding: 8px;">Menu</div></template>
    </EuiDropdown>
  </div>
</template>

<script setup lang="ts">
import { Dropdown as EuiDropdown, Button as EuiButton } from '@elivander/elix-ui'
</script>

