<template>
  <div class="docs-page">
    <h1>Badge</h1>
    <p>The Badge component is used to display a count or status indicator.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Different Types</h2>
    <Playground :code="typesCode" />

    <h2>With Max Value</h2>
    <Playground :code="maxCode" />

    <h2>Dot Badge</h2>
    <Playground :code="dotCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Badge :value="5">
    <Button>Notifications</Button>
  </Badge>
</template>

<script setup>
import { Badge, Button } from '@elix/ui'
<\/script>`

const typesCode = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <Badge :value="5" type="primary">
      <Button>Primary</Button>
    </Badge>
    <Badge :value="3" type="success">
      <Button>Success</Button>
    </Badge>
    <Badge :value="2" type="warning">
      <Button>Warning</Button>
    </Badge>
    <Badge :value="1" type="error">
      <Button>Error</Button>
    </Badge>
    <Badge :value="10" type="info">
      <Button>Info</Button>
    </Badge>
  </div>
</template>

<script setup>
import { Badge, Button } from '@elix/ui'
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
import { Badge, Button } from '@elix/ui'
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
import { Badge, Button } from '@elix/ui'
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
