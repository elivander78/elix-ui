<template>
  <div class="docs-page">
    <h1>Button</h1>
    <p>The Button component is used to trigger actions.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Sizes</h2>
    <Playground :code="sizesCode" />

    <h2>Types</h2>
    <Playground :code="typesCode" />

    <h2>States</h2>
    <Playground :code="statesCode" />

    <h2>API</h2>
    <ApiTable
      :props="buttonProps"
      :slots="buttonSlots"
      :events="buttonEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'

const buttonProps = [
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size' },
  { name: 'type', type: "'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'text'", default: "'primary'", description: 'Button type' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether button is disabled' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Whether button is in loading state' },
  { name: 'shape', type: "'rounded' | 'pill' | 'square'", default: "'rounded'", description: 'Button shape' },
  { name: 'nativeType', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Native button type' },
  { name: 'block', type: 'boolean', default: 'false', description: 'Whether button takes full width' },
]

const buttonSlots = [
  { name: 'default', description: 'Button content' },
  { name: 'icon', description: 'Icon before content' },
  { name: 'suffix', description: 'Content after main content' },
]

const buttonEvents = [
  { name: 'click', payload: 'MouseEvent', description: 'Emitted when button is clicked' },
]

const basicCode = `<template>
  <Button>Click me</Button>
</template>

<script setup>
import { Button } from '@elix/ui'
<\/script>`

const sizesCode = `<template>
  <Button size="xs">Extra Small</Button>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</template>`

const typesCode = `<template>
  <Button type="primary">Primary</Button>
  <Button type="secondary">Secondary</Button>
  <Button type="outline">Outline</Button>
  <Button type="ghost">Ghost</Button>
  <Button type="text">Text</Button>
</template>`

const statesCode = `<template>
  <Button>Normal</Button>
  <Button disabled>Disabled</Button>
  <Button loading>Loading</Button>
</template>`
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

