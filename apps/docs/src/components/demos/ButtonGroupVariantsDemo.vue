<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ButtonGroup variant="primary">
      <Button>Primary</Button>
      <Button>Primary</Button>
    </ButtonGroup>
    <ButtonGroup variant="secondary">
      <Button>Secondary</Button>
      <Button>Secondary</Button>
    </ButtonGroup>
    <ButtonGroup variant="outline">
      <Button>Outline</Button>
      <Button>Outline</Button>
    </ButtonGroup>
    <ButtonGroup variant="ghost">
      <Button>Ghost</Button>
      <Button>Ghost</Button>
    </ButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { ButtonGroup, Button } from '@elivander/elix-ui'
</script>

