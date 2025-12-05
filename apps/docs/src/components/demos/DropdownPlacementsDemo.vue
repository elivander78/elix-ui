<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Dropdown placement="bottom-start">
      <template #trigger><Button>Bottom Start</Button></template>
      <template #menu><div style="padding: 8px;">Menu</div></template>
    </Dropdown>
    <Dropdown placement="top-start">
      <template #trigger><Button>Top Start</Button></template>
      <template #menu><div style="padding: 8px;">Menu</div></template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { Dropdown, Button } from '@elix/ui'
</script>

