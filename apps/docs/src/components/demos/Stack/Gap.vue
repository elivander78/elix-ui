<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <EuiStack gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 8px</div>
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 8px</div>
    </EuiStack>
    <EuiStack gap="24px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 24px</div>
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 24px</div>
    </EuiStack>
  </div>
</template>

<script setup lang="ts">
import { Stack as EuiStack } from '@elivander/elix-ui'
</script>

