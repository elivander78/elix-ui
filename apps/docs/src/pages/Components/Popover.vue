<template>
  <div class="docs-page">
    <h1>Popover</h1>
    <p>The Popover component is used to display content in a popup that appears relative to a trigger element.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Triggers</h2>
    <p>Popover can be triggered by click, hover, or focus events.</p>
    <Playground :code="triggerCode" />

    <h2>Placements</h2>
    <p>Popover can be positioned in different directions relative to the trigger.</p>
    <Playground :code="placementCode" />

    <h2>Props</h2>
    <ApiTable :props="props" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicCode = `<template>
  <EuiPopover title="Popover Title" trigger="click">
    <template #trigger>
      <EuiButton>Click me</EuiButton>
    </template>
    <p>Popover content goes here</p>
  </EuiPopover>
</template>

<script setup>
import { Popover as EuiPopover, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const triggerCode = `<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <EuiPopover title="Click Popover" trigger="click">
      <template #trigger>
        <EuiButton>Click me</EuiButton>
      </template>
      <p>This popover appears on click</p>
    </EuiPopover>
    <EuiPopover title="Hover Popover" trigger="hover">
      <template #trigger>
        <EuiButton>Hover me</EuiButton>
      </template>
      <p>This popover appears on hover</p>
    </EuiPopover>
    <EuiPopover title="Focus Popover" trigger="focus">
      <template #trigger>
        <input type="text" placeholder="Focus me" />
      </template>
      <p>This popover appears on focus</p>
    </EuiPopover>
  </div>
</template>

<script setup>
import { Popover as EuiPopover, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const placementCode = `<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <EuiPopover placement="top" :showArrow="true">
      <template #trigger>
        <EuiButton>Top</EuiButton>
      </template>
      <p>Top placement</p>
    </EuiPopover>
    <EuiPopover placement="bottom" :showArrow="true">
      <template #trigger>
        <EuiButton>Bottom</EuiButton>
      </template>
      <p>Bottom placement</p>
    </EuiPopover>
    <EuiPopover placement="left" :showArrow="false">
      <template #trigger>
        <EuiButton>Left (no arrow)</EuiButton>
      </template>
      <p>Left placement without arrow</p>
    </EuiPopover>
    <EuiPopover placement="right" :showArrow="true">
      <template #trigger>
        <EuiButton>Right</EuiButton>
      </template>
      <p>Right placement</p>
    </EuiPopover>
  </div>
</template>

<script setup>
import { Popover as EuiPopover, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const props = [
  { name: 'title', type: 'string', required: false, description: 'Title of the popover' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'", required: false, default: "'bottom'", description: 'Placement of the popover relative to trigger' },
  { name: 'trigger', type: "'click' | 'hover' | 'focus'", required: false, default: "'click'", description: 'Event that triggers the popover' },
  { name: 'showArrow', type: 'boolean', required: false, default: 'true', description: 'Whether to show the arrow pointing to the trigger' },
  { name: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Whether the popover is disabled' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: 'Size of the popover' },
  { name: 'variant', type: "'default' | 'filled'", required: false, default: "'default'", description: 'Variant style of the popover' },
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

