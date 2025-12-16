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
import ButtonBasicDemo from '../../components/demos/Button/Basic.vue'
import ButtonSizesDemo from '../../components/demos/Button/Sizes.vue'
import ButtonTypesDemo from '../../components/demos/Button/Types.vue'
import ButtonStatesDemo from '../../components/demos/Button/States.vue'
import ButtonShapesDemo from '../../components/demos/Button/Shapes.vue'
import ButtonAppearanceDemo from '../../components/demos/Button/Appearance.vue'
import ButtonIconsDemo from '../../components/demos/Button/Icons.vue'
import ButtonBlockDemo from '../../components/demos/Button/Block.vue'

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
  <EuiButton>Click me</EuiButton>
</template>

<script setup>
import { Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const sizesCode = `<template>
  <EuiButton size="xs">Extra Small</EuiButton>
  <EuiButton size="sm">Small</EuiButton>
  <EuiButton size="md">Medium</EuiButton>
  <EuiButton size="lg">Large</EuiButton>
</template>`

const typesCode = `<template>
  <EuiButton type="primary">Primary</EuiButton>
  <EuiButton type="secondary">Secondary</EuiButton>
  <EuiButton type="outline">Outline</EuiButton>
  <EuiButton type="ghost">Ghost</EuiButton>
  <EuiButton type="text">Text</EuiButton>
</template>`

const statesCode = `<template>
  <EuiButton>Normal</EuiButton>
  <EuiButton disabled>Disabled</EuiButton>
  <EuiButton loading>Loading</EuiButton>
</template>`

const shapesCode = `<template>
  <EuiButton shape="rounded">Rounded</EuiButton>
  <EuiButton shape="pill">Pill</EuiButton>
  <EuiButton shape="square">Square</EuiButton>
</template>`

const appearanceCode = `<template>
  <EuiButton appearance="border">Border</EuiButton>
  <EuiButton appearance="shadow">Shadow</EuiButton>
  <EuiButton appearance="border-shadow">Border + Shadow</EuiButton>
</template>`

const iconsCode = `<template>
  <EuiButton>
    <template #icon>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </template>
    With Icon Left
  </EuiButton>
  <EuiButton>
    With Icon Right
    <template #suffix>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </template>
  </EuiButton>
</template>`

const blockCode = `<template>
  <EuiButton block>Block Button</EuiButton>
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

