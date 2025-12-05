<template>
  <div class="docs-page">
    <h1>Divider</h1>
    <p>The Divider component is used to separate content sections.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <p>Content above</p>
  <Divider />
  <p>Content below</p>
</template>

<script setup>
import { Divider } from '@elix/ui'
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

