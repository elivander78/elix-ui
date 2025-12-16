<template>
  <div class="docs-page">
    <h1>Breadcrumbs</h1>
    <p>The Breadcrumbs component shows the current page's location in a hierarchy.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>With Length Limit</h2>
    <Playground :code="maxItemsCode" />

    <h2>Custom Separator</h2>
    <Playground :code="separatorCode" />

    <h2>API</h2>
    <ApiTable :props="breadcrumbsProps" :slots="breadcrumbsSlots" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'

const breadcrumbsProps = [
  { name: 'items', type: 'BreadcrumbItem[]', description: 'Array of breadcrumb items' },
]

const breadcrumbsSlots = [
  { name: 'separator', description: 'Custom separator between items' },
]

const basicCode = `<template>
  <EuiBreadcrumbs :items="items" />
</template>

<script setup>
import { Breadcrumbs as EuiBreadcrumbs } from '@elivander/elix-ui'

const items = [
  { label: 'Home', to: '/' },
  { label: 'Components', to: '/components' },
  { label: 'Breadcrumbs' },
]
<\/script>`

const maxItemsCode = `<template>
  <div>
    <EuiBreadcrumbs :items="shortItems" />
    <EuiBreadcrumbs :items="longItems" style="margin-top: 20px;" />
  </div>
</template>

<script setup>
import { Breadcrumbs as EuiBreadcrumbs } from '@elivander/elix-ui'

const shortItems = [
  { label: 'Home', to: '/' },
  { label: 'Components', to: '/components' },
  { label: 'Breadcrumbs' },
]

const longItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Electronics', to: '/products/electronics' },
  { label: 'Computers', to: '/products/electronics/computers' },
  { label: 'Laptops', to: '/products/electronics/computers/laptops' },
  { label: 'Gaming Laptops' },
]
<\/script>`

const separatorCode = `<template>
  <EuiBreadcrumbs :items="items">
    <template #separator>
      <span style="margin: 0 8px;">/</span>
    </template>
  </EuiBreadcrumbs>
</template>

<script setup>
import { Breadcrumbs as EuiBreadcrumbs } from '@elivander/elix-ui'

const items = [
  { label: 'Home', to: '/' },
  { label: 'Components', to: '/components' },
  { label: 'Breadcrumbs' },
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

