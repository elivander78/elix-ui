<template>
  <div class="docs-page">
    <h1>Divider</h1>
    <p>The Divider component is used to separate content sections.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Horizontal Variants</h2>
    <Playground :code="horizontalCode" />

    <h2>Vertical Divider</h2>
    <Playground :code="verticalCode" />

    <h2>With Text</h2>
    <Playground :code="textCode" />

    <h2>API</h2>
    <ApiTable :props="dividerProps" :slots="dividerSlots" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'

const dividerProps = [
  { name: 'vertical', type: 'boolean', default: 'false', description: 'Whether divider is vertical' },
  { name: 'dashed', type: 'boolean', default: 'false', description: 'Whether divider is dashed' },
]

const dividerSlots = [
  { name: 'default', description: 'Text content for horizontal divider' },
]

const basicCode = `<template>
  <p>Content above</p>
  <Divider />
  <p>Content below</p>
</template>

<script setup>
import { Divider } from '@elivander/elix-ui'
<\/script>`

const horizontalCode = `<template>
  <div>
    <p>Solid divider</p>
    <Divider />
    <p>Dashed divider</p>
    <Divider dashed />
    <p>More content</p>
  </div>
</template>

<script setup>
import { Divider } from '@elivander/elix-ui'
<\/script>`

const verticalCode = `<template>
  <div style="display: flex; align-items: center;">
    <span>Left</span>
    <Divider vertical />
    <span>Middle</span>
    <Divider vertical dashed />
    <span>Right</span>
  </div>
</template>

<script setup>
import { Divider } from '@elivander/elix-ui'
<\/script>`

const textCode = `<template>
  <div>
    <p>Content above</p>
    <Divider>OR</Divider>
    <p>Content below</p>
    <Divider dashed>Dashed with text</Divider>
    <p>More content</p>
  </div>
</template>

<script setup>
import { Divider } from '@elivander/elix-ui'
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

