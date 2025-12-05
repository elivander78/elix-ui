<template>
  <div class="docs-page">
    <h1>Progress</h1>
    <p>The Progress component is used to show the progress of an operation.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>With Status</h2>
    <Playground :code="statusCode" />

    <h2>With Text</h2>
    <Playground :code="textCode" />

    <h2>Different Sizes</h2>
    <Playground :code="sizesCode" />

    <h2>Animated</h2>
    <Playground :code="animatedCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress :percentage="30" />
    <Progress :percentage="50" />
    <Progress :percentage="75" />
    <Progress :percentage="100" />
  </div>
</template>

<script setup>
import { Progress } from '@elix/ui'
<\/script>`

const statusCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress :percentage="50" status="active" />
    <Progress :percentage="75" status="success" />
    <Progress :percentage="30" status="error" />
  </div>
</template>

<script setup>
import { Progress } from '@elix/ui'
<\/script>`

const textCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress :percentage="50" :show-info="true" text="Uploading..." />
    <Progress :percentage="75" :show-info="true" text="Processing..." />
    <Progress :percentage="100" :show-info="true" text="Complete" />
  </div>
</template>

<script setup>
import { Progress } from '@elix/ui'
<\/script>`

const sizesCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress :percentage="50" :stroke-width="4" />
    <Progress :percentage="50" :stroke-width="8" />
    <Progress :percentage="50" :stroke-width="12" />
  </div>
</template>

<script setup>
import { Progress } from '@elix/ui'
<\/script>`

const animatedCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress :percentage="percentage" status="active" :show-info="true" />
    <div style="display: flex; gap: 10px;">
      <Button @click="percentage = Math.max(0, percentage - 10)">-10%</Button>
      <Button @click="percentage = Math.min(100, percentage + 10)">+10%</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Progress, Button } from '@elix/ui'

const percentage = ref(50)
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
