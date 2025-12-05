<template>
  <div class="docs-page">
    <h1>Skeleton</h1>
    <p>The Skeleton component is used to show a loading placeholder.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>With Avatar</h2>
    <Playground :code="avatarCode" />

    <h2>Different Rows</h2>
    <Playground :code="rowsCode" />

    <h2>Animated</h2>
    <Playground :code="animatedCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Skeleton :loading="loading" :rows="3">
    <div>Content loaded</div>
  </Skeleton>
</template>

<script setup>
import { ref } from 'vue'
import { Skeleton, Button } from '@elix/ui'

const loading = ref(true)
<\/script>`

const avatarCode = `<template>
  <div>
    <Skeleton :loading="loading" :avatar="true" :rows="3">
      <div>Content with avatar loaded</div>
    </Skeleton>
    <Button @click="loading = !loading" style="margin-top: 20px;">Toggle Loading</Button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Skeleton, Button } from '@elix/ui'

const loading = ref(true)
<\/script>`

const rowsCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Skeleton :loading="true" :rows="1" />
    <Skeleton :loading="true" :rows="3" />
    <Skeleton :loading="true" :rows="5" />
  </div>
</template>

<script setup>
import { Skeleton } from '@elix/ui'
<\/script>`

const animatedCode = `<template>
  <div>
    <Skeleton :loading="loading" :avatar="true" :rows="3" :animated="true">
      <div>Animated skeleton content</div>
    </Skeleton>
    <Button @click="loading = !loading" style="margin-top: 20px;">Toggle Loading</Button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Skeleton, Button } from '@elix/ui'

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
