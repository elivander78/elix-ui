<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <EuiInput appearance="border" placeholder="Border" />
    <EuiInput appearance="shadow" placeholder="Shadow" />
    <EuiInput appearance="border-shadow" placeholder="Border + Shadow" />
  </div>
</template>

<script setup lang="ts">
import { Input as EuiInput } from '@elivander/elix-ui'
</script>

