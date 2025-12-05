<template>
  <div class="docs-page">
    <h1>Tag</h1>
    <p>The Tag component is used for labeling and categorizing.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Tag>Tag</Tag>
  <Tag type="primary">Primary</Tag>
  <Tag type="success">Success</Tag>
</template>

<script setup>
import { Tag } from '@elix/ui'
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

