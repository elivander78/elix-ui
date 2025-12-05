<template>
  <div class="docs-page">
    <h1>Spinner</h1>
    <p>The Spinner component is used to indicate a loading state.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Spinner />
  <Spinner size="sm" />
  <Spinner size="lg" />
</template>

<script setup>
import { Spinner } from '@elix/ui'
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

