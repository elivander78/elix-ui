<template>
  <div style="display: flex; gap: 8px;">
    <Dropdown trigger="click">
      <template #trigger>
        <Button>Click</Button>
      </template>
      <template #menu>
        <div style="padding: 8px;">Click trigger</div>
      </template>
    </Dropdown>
    <Dropdown trigger="hover">
      <template #trigger>
        <Button>Hover</Button>
      </template>
      <template #menu>
        <div style="padding: 8px;">Hover trigger</div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { Dropdown, Button } from '@elix/ui'
</script>

