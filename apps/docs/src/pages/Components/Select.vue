<template>
  <div class="docs-page">
    <h1>Select</h1>
    <p>The Select component is used for selecting from a list of options.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Select
    v-model="selected"
    :options="options"
    placeholder="Select an option"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Select } from '@elix/ui'

const selected = ref()
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
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

