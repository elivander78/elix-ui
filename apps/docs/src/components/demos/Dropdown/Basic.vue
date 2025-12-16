<template>
  <EuiDropdown>
    <template #trigger>
      <EuiButton>Click me</EuiButton>
    </template>
    <template #menu>
      <div style="padding: 8px;">Menu content</div>
    </template>
  </EuiDropdown>
</template>

<script setup lang="ts">
import { Dropdown as EuiDropdown, Button as EuiButton } from '@elivander/elix-ui'
</script>

