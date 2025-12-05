<template>
  <div class="docs-page">
    <h1>Switch</h1>
    <p>The Switch component is used to toggle between two states.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Switch v-model="checked" />
</template>

<script setup>
import { ref } from 'vue'
import { Switch } from '@elix/ui'

const checked = ref(false)
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

