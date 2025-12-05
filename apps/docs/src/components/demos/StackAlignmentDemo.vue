<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Stack align="start" gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Start</div>
    </Stack>
    <Stack align="center" gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Center</div>
    </Stack>
    <Stack align="end" gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">End</div>
    </Stack>
  </div>
</template>

<script setup lang="ts">
import { Stack } from '@elix/ui'
</script>

