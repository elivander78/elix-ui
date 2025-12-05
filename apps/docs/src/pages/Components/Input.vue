<template>
  <div class="docs-page">
    <h1>Input</h1>
    <p>The Input component is used for text input.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Sizes</h2>
    <Playground :code="sizesCode" />

    <h2>States</h2>
    <Playground :code="statesCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Input v-model="value" placeholder="Enter text" />
</template>

<script setup>
import { ref } from 'vue'
import { Input } from '@elix/ui'

const value = ref('')
<\/script>`

const sizesCode = `<template>
  <Input size="xs" placeholder="Extra Small" />
  <Input size="sm" placeholder="Small" />
  <Input size="md" placeholder="Medium" />
  <Input size="lg" placeholder="Large" />
</template>`

const statesCode = `<template>
  <Input placeholder="Normal" />
  <Input placeholder="Error" state="error" />
  <Input placeholder="Success" state="success" />
  <Input placeholder="Disabled" disabled />
</template>`
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

