<template>
  <div class="docs-page">
    <h1>Checkbox</h1>
    <p>The Checkbox component is used for selecting one or more options.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Checkbox v-model="checked">I agree</Checkbox>
</template>

<script setup>
import { ref } from 'vue'
import { Checkbox } from '@elix/ui'

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

