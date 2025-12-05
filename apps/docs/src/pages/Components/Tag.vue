<template>
  <div class="docs-page">
    <h1>Tag</h1>
    <p>The Tag component is used for labeling and categorizing.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Tag Set</h2>
    <Playground :code="setCode" />

    <h2>With Icons</h2>
    <Playground :code="iconsCode" />

    <h2>Closable Tags</h2>
    <Playground :code="closableCode" />

    <h2>Round Tags</h2>
    <Playground :code="roundCode" />

    <h2>Sizes</h2>
    <Playground :code="sizesCode" />

    <h2>API</h2>
    <ApiTable :props="tagProps" :slots="tagSlots" :events="tagEvents" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'

const tagProps = [
  { name: 'type', type: "'primary' | 'success' | 'warning' | 'error' | 'info' | 'default'", default: "'default'", description: 'Tag type' },
  { name: 'variant', type: "'solid' | 'outline' | 'ghost'", default: "'solid'", description: 'Tag variant' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tag size' },
  { name: 'closable', type: 'boolean', default: 'false', description: 'Whether tag can be closed' },
  { name: 'round', type: 'boolean', default: 'false', description: 'Whether tag has round shape' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether tag is disabled' },
]

const tagSlots = [
  { name: 'default', description: 'Tag content' },
  { name: 'icon', description: 'Icon before content' },
]

const tagEvents = [
  { name: 'close', payload: 'void', description: 'Emitted when close button is clicked' },
]

const basicCode = `<template>
  <Tag>Tag</Tag>
  <Tag type="primary">Primary</Tag>
  <Tag type="success">Success</Tag>
</template>

<script setup>
import { Tag } from '@elivander/elix-ui'
<\/script>`

const setCode = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <Tag>Default</Tag>
    <Tag type="primary">Primary</Tag>
    <Tag type="success">Success</Tag>
    <Tag type="warning">Warning</Tag>
    <Tag type="error">Error</Tag>
    <Tag type="info">Info</Tag>
  </div>
</template>

<script setup>
import { Tag } from '@elivander/elix-ui'
<\/script>`

const iconsCode = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <Tag>
      <template #icon>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L9 5L13 6L9 7L7 11L5 7L1 6L5 5L7 1Z" fill="currentColor"/>
        </svg>
      </template>
      Star
    </Tag>
    <Tag type="success">
      <template #icon>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </template>
      Verified
    </Tag>
  </div>
</template>

<script setup>
import { Tag } from '@elivander/elix-ui'
<\/script>`

const closableCode = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <Tag closable @close="handleClose">Closable</Tag>
    <Tag type="primary" closable @close="handleClose">Primary</Tag>
    <Tag type="success" closable @close="handleClose">Success</Tag>
  </div>
</template>

<script setup>
import { Tag } from '@elivander/elix-ui'

const handleClose = () => {
  console.log('Tag closed')
}
<\/script>`

const roundCode = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <Tag round>Round</Tag>
    <Tag type="primary" round>Primary</Tag>
    <Tag type="success" round>Success</Tag>
  </div>
</template>

<script setup>
import { Tag } from '@elivander/elix-ui'
<\/script>`

const sizesCode = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <Tag size="sm">Small</Tag>
    <Tag size="md">Medium</Tag>
    <Tag size="lg">Large</Tag>
  </div>
</template>

<script setup>
import { Tag } from '@elivander/elix-ui'
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

