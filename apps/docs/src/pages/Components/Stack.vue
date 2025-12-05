<template>
  <div class="docs-page">
    <h1>Stack</h1>
    <p>The Stack component arranges items in a vertical or horizontal stack.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="StackBasicDemo" :code="basicCode" />

    <h2>Horizontal</h2>
    <Playground :demo-component="StackHorizontalDemo" :code="horizontalCode" />

    <h2>Gap</h2>
    <Playground :demo-component="StackGapDemo" :code="gapCode" />

    <h2>Alignment</h2>
    <Playground :demo-component="StackAlignmentDemo" :code="alignmentCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import StackBasicDemo from '../../components/demos/StackBasicDemo.vue'
import StackHorizontalDemo from '../../components/demos/StackHorizontalDemo.vue'
import StackGapDemo from '../../components/demos/StackGapDemo.vue'
import StackAlignmentDemo from '../../components/demos/StackAlignmentDemo.vue'

const basicCode = `<template>
  <Stack gap="16px">
    <div style="background: var(--eui-bg-secondary); padding: 16px;">Item 1</div>
    <div style="background: var(--eui-bg-secondary); padding: 16px;">Item 2</div>
    <div style="background: var(--eui-bg-secondary); padding: 16px;">Item 3</div>
  </Stack>
</template>

<script setup>
import { Stack } from '@elivander/elix-ui'
<\/script>`

const horizontalCode = `<template>
  <Stack direction="horizontal" gap="16px">
    <div style="background: var(--eui-bg-secondary); padding: 16px;">Item 1</div>
    <div style="background: var(--eui-bg-secondary); padding: 16px;">Item 2</div>
    <div style="background: var(--eui-bg-secondary); padding: 16px;">Item 3</div>
  </Stack>
</template>

<script setup>
import { Stack } from '@elivander/elix-ui'
<\/script>`

const gapCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Stack gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 8px</div>
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 8px</div>
    </Stack>
    <Stack gap="24px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 24px</div>
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Gap: 24px</div>
    </Stack>
  </div>
</template>

<script setup>
import { Stack } from '@elivander/elix-ui'
<\/script>`

const alignmentCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Stack align="start" gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Start</div>
    </Stack>
    <Stack align="center" gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">Center</div>
    </Stack>
    <Stack align="end" gap="8px">
      <div style="background: var(--eui-bg-secondary); padding: 8px;">End</div>
    </Stack>
  </div>
</template>

<script setup>
import { Stack } from '@elivander/elix-ui'
<\/script>`
</script>

