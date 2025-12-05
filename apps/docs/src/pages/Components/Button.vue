<template>
  <div class="docs-page">
    <h1>Button</h1>
    <p>The Button component is used to trigger actions.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="ButtonBasicDemo" :code="basicCode" />

    <h2>Sizes</h2>
    <Playground :demo-component="ButtonSizesDemo" :code="sizesCode" />

    <h2>Types</h2>
    <Playground :demo-component="ButtonTypesDemo" :code="typesCode" />

    <h2>States</h2>
    <Playground :demo-component="ButtonStatesDemo" :code="statesCode" />

    <h2>Shapes</h2>
    <Playground :demo-component="ButtonShapesDemo" :code="shapesCode" />

    <h2>Appearance</h2>
    <Playground :demo-component="ButtonAppearanceDemo" :code="appearanceCode" />

    <h2>With Icons</h2>
    <Playground :demo-component="ButtonIconsDemo" :code="iconsCode" />

    <h2>Block</h2>
    <Playground :demo-component="ButtonBlockDemo" :code="blockCode" />

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
import ButtonBasicDemo from '../../components/demos/ButtonBasicDemo.vue'
import ButtonSizesDemo from '../../components/demos/ButtonSizesDemo.vue'
import ButtonTypesDemo from '../../components/demos/ButtonTypesDemo.vue'
import ButtonStatesDemo from '../../components/demos/ButtonStatesDemo.vue'
import ButtonShapesDemo from '../../components/demos/ButtonShapesDemo.vue'
import ButtonAppearanceDemo from '../../components/demos/ButtonAppearanceDemo.vue'
import ButtonIconsDemo from '../../components/demos/ButtonIconsDemo.vue'
import ButtonBlockDemo from '../../components/demos/ButtonBlockDemo.vue'

const buttonProps = [
  { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'text'", default: "'primary'", description: 'Button variant (use type prop)' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size' },
  { name: 'type', type: "'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'text'", default: "'primary'", description: 'Button type' },
  { name: 'shape', type: "'rounded' | 'pill' | 'square'", default: "'rounded'", description: 'Button shape' },
  { name: 'appearance', type: "'border' | 'shadow' | 'border-shadow'", default: "'border'", description: 'Border appearance style' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Whether button is in loading state' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether button is disabled' },
  { name: 'block', type: 'boolean', default: 'false', description: 'Whether button takes full width' },
  { name: 'nativeType', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Native button type' },
]

const buttonSlots = [
  { name: 'default', description: 'Button content' },
  { name: 'icon', description: 'Icon before content (iconLeft)' },
  { name: 'suffix', description: 'Content after main content (iconRight)' },
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

const shapesCode = `<template>
  <Button shape="rounded">Rounded</Button>
  <Button shape="pill">Pill</Button>
  <Button shape="square">Square</Button>
</template>`

const appearanceCode = `<template>
  <Button appearance="border">Border</Button>
  <Button appearance="shadow">Shadow</Button>
  <Button appearance="border-shadow">Border + Shadow</Button>
</template>`

const iconsCode = `<template>
  <Button>
    <template #icon>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </template>
    With Icon Left
  </Button>
  <Button>
    With Icon Right
    <template #suffix>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </template>
  </Button>
</template>`

const blockCode = `<template>
  <Button block>Block Button</Button>
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

