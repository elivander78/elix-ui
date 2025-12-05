<template>
  <div class="docs-page">
    <h1>Tabs</h1>
    <p>The Tabs component is used to organize content into multiple panels.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Tabs v-model="activeTab">
    <TabPane name="tab1" label="Tab 1">Content 1</TabPane>
    <TabPane name="tab2" label="Tab 2">Content 2</TabPane>
  </Tabs>
</template>

<script setup>
import { ref } from 'vue'
import { Tabs, TabPane } from '@elix/ui'

const activeTab = ref('tab1')
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

