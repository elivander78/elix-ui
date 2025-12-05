<template>
  <div class="docs-page">
    <h1>Drawer</h1>
    <p>The Drawer component is used to display content in a side panel.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Button @click="showDrawer = true">Open Drawer</Button>
  <Drawer v-model="showDrawer" title="Drawer Title" placement="right">
    <p>Drawer content goes here</p>
  </Drawer>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Drawer } from '@elix/ui'

const showDrawer = ref(false)
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

