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
  <EuiCard>
    <EuiCardHeader>Card Title</EuiCardHeader>
    <EuiCardBody>Card content goes here</EuiCardBody>
    <EuiCardFooter>Card footer</EuiCardFooter>
  </EuiCard>
</template>

<script setup>
import { Card as EuiCard, CardHeader as EuiCardHeader, CardBody as EuiCardBody, CardFooter as EuiCardFooter } from '@elivander/elix-ui'
<\/script>`

const gridCode = `<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
    <EuiCard bordered>
      <EuiCardHeader>Card 1</EuiCardHeader>
      <EuiCardBody>Content 1</EuiCardBody>
    </EuiCard>
    <EuiCard shadow="md">
      <EuiCardHeader>Card 2</EuiCardHeader>
      <EuiCardBody>Content 2</EuiCardBody>
    </EuiCard>
    <EuiCard bordered shadow="lg">
      <EuiCardHeader>Card 3</EuiCardHeader>
      <EuiCardBody>Content 3</EuiCardBody>
    </EuiCard>
  </div>
</template>

<script setup>
import { Card as EuiCard, CardHeader as EuiCardHeader, CardBody as EuiCardBody } from '@elivander/elix-ui'
<\/script>`

const shadowCode = `<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
    <EuiCard shadow="sm">
      <EuiCardHeader>Small Shadow</EuiCardHeader>
      <EuiCardBody>Content</EuiCardBody>
    </EuiCard>
    <EuiCard shadow="md">
      <EuiCardHeader>Medium Shadow</EuiCardHeader>
      <EuiCardBody>Content</EuiCardBody>
    </EuiCard>
    <EuiCard shadow="lg">
      <EuiCardHeader>Large Shadow</EuiCardHeader>
      <EuiCardBody>Content</EuiCardBody>
    </EuiCard>
  </div>
</template>

<script setup>
import { Card as EuiCard, CardHeader as EuiCardHeader, CardBody as EuiCardBody } from '@elivander/elix-ui'
<\/script>`

const noBorderCode = `<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
    <EuiCard>
      <EuiCardHeader>No Border</EuiCardHeader>
      <EuiCardBody>Content</EuiCardBody>
    </EuiCard>
    <EuiCard shadow="md">
      <EuiCardHeader>Shadow Only</EuiCardHeader>
      <EuiCardBody>Content</EuiCardBody>
    </EuiCard>
  </div>
</template>

<script setup>
import { Card as EuiCard, CardHeader as EuiCardHeader, CardBody as EuiCardBody } from '@elivander/elix-ui'
<\/script>`

const imageCode = `<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
    <EuiCard shadow="md">
      <img src="https://picsum.photos/400/200?random=1" style="width: 100%; height: 200px; object-fit: cover;" />
      <EuiCardHeader>Card with Image</EuiCardHeader>
      <EuiCardBody>This card has an image at the top</EuiCardBody>
    </EuiCard>
    <EuiCard bordered hoverable>
      <img src="https://picsum.photos/400/200?random=2" style="width: 100%; height: 200px; object-fit: cover;" />
      <EuiCardHeader>Hoverable Card</EuiCardHeader>
      <EuiCardBody>Hover over this card</EuiCardBody>
    </EuiCard>
  </div>
</template>

<script setup>
import { Card as EuiCard, CardHeader as EuiCardHeader, CardBody as EuiCardBody } from '@elivander/elix-ui'
<\/script>`

const hoverableCode = `<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
    <EuiCard hoverable>
      <EuiCardHeader>Hoverable Card</EuiCardHeader>
      <EuiCardBody>Hover over me</EuiCardBody>
    </EuiCard>
    <EuiCard hoverable shadow="md">
      <EuiCardHeader>Hoverable with Shadow</EuiCardHeader>
      <EuiCardBody>Hover over me</EuiCardBody>
    </EuiCard>
  </div>
</template>

<script setup>
import { Card as EuiCard, CardHeader as EuiCardHeader, CardBody as EuiCardBody } from '@elivander/elix-ui'
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

