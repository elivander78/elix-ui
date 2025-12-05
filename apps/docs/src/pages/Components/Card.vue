<template>
  <div class="docs-page">
    <h1>Card</h1>
    <p>The Card component is used to display content in a container.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Grid of Cards</h2>
    <Playground :code="gridCode" />

    <h2>With Shadow</h2>
    <Playground :code="shadowCode" />

    <h2>Without Border</h2>
    <Playground :code="noBorderCode" />

    <h2>With Image</h2>
    <Playground :code="imageCode" />

    <h2>Hoverable</h2>
    <Playground :code="hoverableCode" />

    <h2>API</h2>
    <ApiTable :props="cardProps" :slots="cardSlots" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'

const cardProps = [
  { name: 'title', type: 'string', description: 'Card title (use CardHeader slot)' },
  { name: 'subTitle', type: 'string', description: 'Card subtitle (use CardHeader slot)' },
  { name: 'hoverable', type: 'boolean', default: 'false', description: 'Whether card has hover effect' },
  { name: 'bordered', type: 'boolean', default: 'false', description: 'Whether card has border' },
  { name: 'shadow', type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: "'none'", description: 'Card shadow size' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Card size' },
  { name: 'variant', type: "'default' | 'outlined' | 'elevated'", default: "'default'", description: 'Card variant' },
]

const cardSlots = [
  { name: 'default', description: 'Card content' },
]

const basicCode = `<template>
  <Card>
    <CardHeader>Card Title</CardHeader>
    <CardBody>Card content goes here</CardBody>
    <CardFooter>Card footer</CardFooter>
  </Card>
</template>

<script setup>
import { Card, CardHeader, CardBody, CardFooter } from '@elivander/elix-ui'
<\/script>`

const gridCode = `<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
    <Card bordered>
      <CardHeader>Card 1</CardHeader>
      <CardBody>Content 1</CardBody>
    </Card>
    <Card shadow="md">
      <CardHeader>Card 2</CardHeader>
      <CardBody>Content 2</CardBody>
    </Card>
    <Card bordered shadow="lg">
      <CardHeader>Card 3</CardHeader>
      <CardBody>Content 3</CardBody>
    </Card>
  </div>
</template>

<script setup>
import { Card, CardHeader, CardBody } from '@elivander/elix-ui'
<\/script>`

const shadowCode = `<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
    <Card shadow="sm">
      <CardHeader>Small Shadow</CardHeader>
      <CardBody>Content</CardBody>
    </Card>
    <Card shadow="md">
      <CardHeader>Medium Shadow</CardHeader>
      <CardBody>Content</CardBody>
    </Card>
    <Card shadow="lg">
      <CardHeader>Large Shadow</CardHeader>
      <CardBody>Content</CardBody>
    </Card>
  </div>
</template>

<script setup>
import { Card, CardHeader, CardBody } from '@elivander/elix-ui'
<\/script>`

const noBorderCode = `<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
    <Card>
      <CardHeader>No Border</CardHeader>
      <CardBody>Content</CardBody>
    </Card>
    <Card shadow="md">
      <CardHeader>Shadow Only</CardHeader>
      <CardBody>Content</CardBody>
    </Card>
  </div>
</template>

<script setup>
import { Card, CardHeader, CardBody } from '@elivander/elix-ui'
<\/script>`

const imageCode = `<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
    <Card shadow="md">
      <img src="https://picsum.photos/400/200?random=1" style="width: 100%; height: 200px; object-fit: cover;" />
      <CardHeader>Card with Image</CardHeader>
      <CardBody>This card has an image at the top</CardBody>
    </Card>
    <Card bordered hoverable>
      <img src="https://picsum.photos/400/200?random=2" style="width: 100%; height: 200px; object-fit: cover;" />
      <CardHeader>Hoverable Card</CardHeader>
      <CardBody>Hover over this card</CardBody>
    </Card>
  </div>
</template>

<script setup>
import { Card, CardHeader, CardBody } from '@elivander/elix-ui'
<\/script>`

const hoverableCode = `<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
    <Card hoverable>
      <CardHeader>Hoverable Card</CardHeader>
      <CardBody>Hover over me</CardBody>
    </Card>
    <Card hoverable shadow="md">
      <CardHeader>Hoverable with Shadow</CardHeader>
      <CardBody>Hover over me</CardBody>
    </Card>
  </div>
</template>

<script setup>
import { Card, CardHeader, CardBody } from '@elivander/elix-ui'
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

