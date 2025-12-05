<template>
  <div class="docs-page">
    <h1>Breadcrumbs</h1>
    <p>The Breadcrumbs component shows the current page's location in a hierarchy.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Breadcrumbs :items="items" />
</template>

<script setup>
import { Breadcrumbs } from '@elix/ui'

const items = [
  { label: 'Home', to: '/' },
  { label: 'Components', to: '/components' },
  { label: 'Breadcrumbs' },
]
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

