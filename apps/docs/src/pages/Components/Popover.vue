<template>
  <div class="docs-page">
    <h1>Popover</h1>
    <p>The Popover component is used to display content in a popup.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Popover title="Popover Title" trigger="click">
    <template #trigger>
      <Button>Click me</Button>
    </template>
    <p>Popover content goes here</p>
  </Popover>
</template>

<script setup>
import { Popover, Button } from '@elix/ui'
<\/script>`
</script>

<style lang="scss" scoped>
.docs-page {
  h1 {
    margin-bottom: var(--eui-spacing-lg);
  }

  h2 {
    margin-top: var(--eui-spacing-2xl);
    margin-bottom: var(--eui-spacing-md);
  }
}
</style>

