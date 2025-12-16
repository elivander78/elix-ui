<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <EuiStack align="start" gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Start</div>
    </EuiStack>
    <EuiStack align="center" gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Center</div>
    </EuiStack>
    <EuiStack align="end" gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">End</div>
    </EuiStack>
  </div>
</template>

<script setup lang="ts">
import { Stack as EuiStack } from '@elivander/elix-ui'
</script>

