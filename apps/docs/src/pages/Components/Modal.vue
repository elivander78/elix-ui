<template>
  <div class="docs-page">
    <h1>Modal</h1>
    <p>The Modal component is used to display content in a dialog.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Button @click="showModal = true">Open Modal</Button>
  <Modal v-model="showModal" title="Modal Title">
    <p>Modal content goes here</p>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Modal } from '@elix/ui'

const showModal = ref(false)
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

