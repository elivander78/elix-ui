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
  <EuiBadge :value="5">
    <EuiButton>Notifications</EuiButton>
  </EuiBadge>
</template>

<script setup>
import { Badge as EuiBadge, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const numbersCode = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <EuiBadge :value="5">
      <EuiButton>5</EuiButton>
    </EuiBadge>
    <EuiBadge :value="12">
      <EuiButton>12</EuiButton>
    </EuiBadge>
    <EuiBadge :value="99">
      <EuiButton>99</EuiButton>
    </EuiBadge>
  </div>
</template>

<script setup>
import { Badge as EuiBadge, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const dotCode = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <EuiBadge dot>
      <EuiButton>Dot Badge</EuiButton>
    </EuiBadge>
    <EuiBadge dot type="success">
      <EuiButton>Success Dot</EuiButton>
    </EuiBadge>
    <EuiBadge dot type="error">
      <EuiButton>Error Dot</EuiButton>
    </EuiBadge>
  </div>
</template>

<script setup>
import { Badge as EuiBadge, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const statusesCode = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <EuiBadge :value="5" type="success">
      <EuiButton>Success</EuiButton>
    </EuiBadge>
    <EuiBadge :value="3" type="error">
      <EuiButton>Error</EuiButton>
    </EuiBadge>
    <EuiBadge :value="2" type="warning">
      <EuiButton>Warning</EuiButton>
    </EuiBadge>
    <EuiBadge :value="10" type="info">
      <EuiButton>Info</EuiButton>
    </EuiBadge>
  </div>
</template>

<script setup>
import { Badge as EuiBadge, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const maxCode = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <EuiBadge :value="5" :max="3">
      <EuiButton>Max 3</EuiButton>
    </EuiBadge>
    <EuiBadge :value="100" :max="99">
      <EuiButton>Max 99</EuiButton>
    </EuiBadge>
  </div>
</template>

<script setup>
import { Badge as EuiBadge, Button as EuiButton } from '@elivander/elix-ui'
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
