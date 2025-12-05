<template>
  <div class="docs-page">
    <h1>Badge</h1>
    <p>The Badge component is used to display a count or status indicator.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Numbers</h2>
    <Playground :code="numbersCode" />

    <h2>Dot Badge</h2>
    <Playground :code="dotCode" />

    <h2>Different Statuses</h2>
    <Playground :code="statusesCode" />

    <h2>With Max Value</h2>
    <Playground :code="maxCode" />

    <h2>API</h2>
    <ApiTable :props="badgeProps" :slots="badgeSlots" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'

const badgeProps = [
  { name: 'value', type: 'string | number', description: 'Badge value to display' },
  { name: 'max', type: 'number', description: 'Maximum value to display (shows max+ if exceeded)' },
  { name: 'dot', type: 'boolean', default: 'false', description: 'Whether to show as a dot instead of number' },
  { name: 'type', type: "'primary' | 'success' | 'warning' | 'error' | 'info'", default: "'primary'", description: 'Badge status/type' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Badge size' },
]

const badgeSlots = [
  { name: 'default', description: 'Content to attach badge to' },
]

const basicCode = `<template>
  <Badge :value="5">
    <Button>Notifications</Button>
  </Badge>
</template>

<script setup>
import { Badge, Button } from '@elivander/elix-ui'
<\/script>`

const numbersCode = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <Badge :value="5">
      <Button>5</Button>
    </Badge>
    <Badge :value="12">
      <Button>12</Button>
    </Badge>
    <Badge :value="99">
      <Button>99</Button>
    </Badge>
  </div>
</template>

<script setup>
import { Badge, Button } from '@elivander/elix-ui'
<\/script>`

const dotCode = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <Badge dot>
      <Button>Dot Badge</Button>
    </Badge>
    <Badge dot type="success">
      <Button>Success Dot</Button>
    </Badge>
    <Badge dot type="error">
      <Button>Error Dot</Button>
    </Badge>
  </div>
</template>

<script setup>
import { Badge, Button } from '@elivander/elix-ui'
<\/script>`

const statusesCode = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <Badge :value="5" type="success">
      <Button>Success</Button>
    </Badge>
    <Badge :value="3" type="error">
      <Button>Error</Button>
    </Badge>
    <Badge :value="2" type="warning">
      <Button>Warning</Button>
    </Badge>
    <Badge :value="10" type="info">
      <Button>Info</Button>
    </Badge>
  </div>
</template>

<script setup>
import { Badge, Button } from '@elivander/elix-ui'
<\/script>`

const maxCode = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <Badge :value="5" :max="3">
      <Button>Max 3</Button>
    </Badge>
    <Badge :value="100" :max="99">
      <Button>Max 99</Button>
    </Badge>
  </div>
</template>

<script setup>
import { Badge, Button } from '@elivander/elix-ui'
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
