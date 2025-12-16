<template>
  <div class="docs-page">
    <h1>Spinner</h1>
    <p>The Spinner component is used to indicate a loading state.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="SpinnerBasicDemo" :code="basicCode" />

    <h2>With Overlay</h2>
    <Playground :demo-component="SpinnerOverlayDemo" :code="overlayCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import SpinnerBasicDemo from '../../components/demos/Spinner/Basic.vue'
import SpinnerOverlayDemo from '../../components/demos/Spinner/Overlay.vue'

const basicCode = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <EuiSpinner />
    <EuiSpinner size="sm" />
    <EuiSpinner size="lg" />
    <EuiSpinner :size="48" :thickness="6" label="Loading..." />
  </div>
</template>

<script setup>
import { Spinner as EuiSpinner } from '@elivander/elix-ui'
<\/script>`

const overlayCode = `<template>
  <div style="position: relative; height: 300px; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); padding: 20px;">
    <EuiCard>
      <EuiCardBody>
        <h3>Card Content</h3>
        <p>This is some content in a card. Scroll to see the overlay spinner when loading.</p>
      </EuiCardBody>
    </EuiCard>
    <EuiSpinner v-if="loading" overlay label="Loading..." />
    <EuiButton @click="loading = !loading" style="margin-top: 16px;">Toggle Loading</EuiButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Spinner as EuiSpinner, Card as EuiCard, CardBody as EuiCardBody, Button as EuiButton } from '@elivander/elix-ui'

const loading = ref(true)
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

