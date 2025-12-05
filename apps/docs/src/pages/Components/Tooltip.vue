<template>
  <div class="docs-page">
    <h1>Tooltip</h1>
    <p>The Tooltip component is used to display additional information when hovering, clicking, or focusing on an element.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Triggers</h2>
    <p>Tooltip can be triggered by hover (default), click, or focus events.</p>
    <Playground :code="triggerCode" />

    <h2>Placements</h2>
    <p>Tooltip can be positioned in different directions relative to the element.</p>
    <Playground :code="placementCode" />

    <h2>Examples</h2>
    <p>Tooltips work with buttons, icons, text, and other elements.</p>
    <Playground :code="examplesCode" />

    <h2>Props</h2>
    <ApiTable :props="props" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicCode = `<template>
  <Tooltip content="This is a tooltip">
    <Button>Hover me</Button>
  </Tooltip>
</template>

<script setup>
import { Tooltip, Button } from '@elix/ui'
<\/script>`

const triggerCode = `<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Tooltip content="Hover tooltip" trigger="hover">
      <Button>Hover me</Button>
    </Tooltip>
    <Tooltip content="Click tooltip" trigger="click">
      <Button>Click me</Button>
    </Tooltip>
    <Tooltip content="Focus tooltip" trigger="focus">
      <input type="text" placeholder="Focus me" />
    </Tooltip>
  </div>
</template>

<script setup>
import { Tooltip, Button } from '@elix/ui'
<\/script>`

const placementCode = `<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Tooltip content="Top tooltip" placement="top">
      <Button>Top</Button>
    </Tooltip>
    <Tooltip content="Bottom tooltip" placement="bottom">
      <Button>Bottom</Button>
    </Tooltip>
    <Tooltip content="Left tooltip" placement="left">
      <Button>Left</Button>
    </Tooltip>
    <Tooltip content="Right tooltip" placement="right">
      <Button>Right</Button>
    </Tooltip>
  </div>
</template>

<script setup>
import { Tooltip, Button } from '@elix/ui'
<\/script>`

const examplesCode = `<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <Tooltip content="Tooltip on button">
      <Button>Button</Button>
    </Tooltip>
    <Tooltip content="Tooltip on icon">
      <span style="font-size: 24px; cursor: help;">ℹ️</span>
    </Tooltip>
    <Tooltip content="Tooltip on text">
      <span style="text-decoration: underline; cursor: help;">Hover this text</span>
    </Tooltip>
    <Tooltip content="Disabled tooltip" disabled>
      <Button disabled>Disabled</Button>
    </Tooltip>
  </div>
</template>

<script setup>
import { Tooltip, Button } from '@elix/ui'
<\/script>`

const props = [
  { name: 'content', type: 'string', required: true, description: 'Content to display in the tooltip' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'", required: false, default: "'top'", description: 'Placement of the tooltip relative to element' },
  { name: 'trigger', type: "'hover' | 'click' | 'focus'", required: false, default: "'hover'", description: 'Event that triggers the tooltip' },
  { name: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Whether the tooltip is disabled' },
  { name: 'theme', type: "'dark' | 'light'", required: false, default: "'dark'", description: 'Theme of the tooltip' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: 'Size of the tooltip' },
]
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

