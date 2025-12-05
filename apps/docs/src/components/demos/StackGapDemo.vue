<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Stack gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 8px</div>
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 8px</div>
    </Stack>
    <Stack gap="24px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 24px</div>
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 24px</div>
    </Stack>
  </div>
</template>

<script setup lang="ts">
import { Stack } from '@elix/ui'
</script>

