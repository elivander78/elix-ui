<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <Button>Normal</Button>
    <Button disabled>Disabled</Button>
    <Button loading>Loading</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@elivander/elix-ui'
</script>

