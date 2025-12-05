<template>
  <Dropdown>
    <template #trigger>
      <Button>Click me</Button>
    </template>
    <template #menu>
      <div style="padding: 8px;">Menu content</div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { Dropdown, Button } from '@elivander/elix-ui'
</script>

