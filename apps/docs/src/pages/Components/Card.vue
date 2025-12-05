<template>
  <div class="docs-page">
    <h1>Card</h1>
    <p>The Card component is used to display content in a container.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Card>
    <CardHeader>Card Title</CardHeader>
    <CardBody>Card content goes here</CardBody>
    <CardFooter>Card footer</CardFooter>
  </Card>
</template>

<script setup>
import { Card, CardHeader, CardBody, CardFooter } from '@elix/ui'
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

