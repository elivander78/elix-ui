<template>
  <div style="display: flex; gap: 8px;">
    <EuiDropdown trigger="click">
      <template #trigger>
        <EuiButton>Click</EuiButton>
      </template>
      <template #menu>
        <div style="padding: 8px;">Click trigger</div>
      </template>
    </EuiDropdown>
    <EuiDropdown trigger="hover">
      <template #trigger>
        <EuiButton>Hover</EuiButton>
      </template>
      <template #menu>
        <div style="padding: 8px;">Hover trigger</div>
      </template>
    </EuiDropdown>
  </div>
</template>

<script setup lang="ts">
import { Dropdown as EuiDropdown, Button as EuiButton } from '@elivander/elix-ui'
</script>

