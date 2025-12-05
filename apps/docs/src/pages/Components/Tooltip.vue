<template>
  <div class="docs-page">
    <h1>Tooltip</h1>
    <p>The Tooltip component is used to display additional information on hover.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Tooltip content="This is a tooltip">
    <Button>Hover me</Button>
  </Tooltip>
</template>

<script setup>
import { Tooltip, Button } from '@elix/ui'
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

