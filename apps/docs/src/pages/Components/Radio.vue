<template>
  <div class="docs-page">
    <h1>Radio</h1>
    <p>The Radio component is used for selecting a single option from a group.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Radio v-model="value" value="option1">Option 1</Radio>
  <Radio v-model="value" value="option2">Option 2</Radio>
</template>

<script setup>
import { ref } from 'vue'
import { Radio } from '@elix/ui'

const value = ref('option1')
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

