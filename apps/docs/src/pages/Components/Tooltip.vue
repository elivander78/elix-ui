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
  <EuiTooltip content="This is a tooltip">
    <EuiButton>Hover me</EuiButton>
  </EuiTooltip>
</template>

<script setup>
import { Tooltip as EuiTooltip, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const triggerCode = `<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <EuiTooltip content="Hover tooltip" trigger="hover">
      <EuiButton>Hover me</EuiButton>
    </EuiTooltip>
    <EuiTooltip content="Click tooltip" trigger="click">
      <EuiButton>Click me</EuiButton>
    </EuiTooltip>
    <EuiTooltip content="Focus tooltip" trigger="focus">
      <input type="text" placeholder="Focus me" />
    </EuiTooltip>
  </div>
</template>

<script setup>
import { Tooltip as EuiTooltip, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const placementCode = `<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <EuiTooltip content="Top tooltip" placement="top">
      <EuiButton>Top</EuiButton>
    </EuiTooltip>
    <EuiTooltip content="Bottom tooltip" placement="bottom">
      <EuiButton>Bottom</EuiButton>
    </EuiTooltip>
    <EuiTooltip content="Left tooltip" placement="left">
      <EuiButton>Left</EuiButton>
    </EuiTooltip>
    <EuiTooltip content="Right tooltip" placement="right">
      <EuiButton>Right</EuiButton>
    </EuiTooltip>
  </div>
</template>

<script setup>
import { Tooltip as EuiTooltip, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const examplesCode = `<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <EuiTooltip content="Tooltip on button">
      <EuiButton>Button</EuiButton>
    </EuiTooltip>
    <EuiTooltip content="Tooltip on icon">
      <span style="font-size: 24px; cursor: help;">ℹ️</span>
    </EuiTooltip>
    <EuiTooltip content="Tooltip on text">
      <span style="text-decoration: underline; cursor: help;">Hover this text</span>
    </EuiTooltip>
    <EuiTooltip content="Disabled tooltip" disabled>
      <EuiButton disabled>Disabled</EuiButton>
    </EuiTooltip>
  </div>
</template>

<script setup>
import { Tooltip as EuiTooltip, Button as EuiButton } from '@elivander/elix-ui'
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

