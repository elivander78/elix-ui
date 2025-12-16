<template>
  <div class="docs-page">
    <h1>Container</h1>
    <p>The Container component limits content width and centers it.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="ContainerBasicDemo" :code="basicCode" />

    <h2>Max Width</h2>
    <Playground :demo-component="ContainerMaxWidthDemo" :code="maxWidthCode" />

    <h2>Padded</h2>
    <Playground :demo-component="ContainerPaddedDemo" :code="paddedCode" />

    <h2>Fluid</h2>
    <Playground :demo-component="ContainerFluidDemo" :code="fluidCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ContainerBasicDemo from '../../components/demos/Container/Basic.vue'
import ContainerMaxWidthDemo from '../../components/demos/Container/MaxWidth.vue'
import ContainerPaddedDemo from '../../components/demos/Container/Padded.vue'
import ContainerFluidDemo from '../../components/demos/Container/Fluid.vue'

const basicCode = `<template>
  <EuiContainer>
    <div style="background: var(--eui-bg-secondary); padding: 20px; border-radius: 8px;">
      Container content
    </div>
  </EuiContainer>
</template>

<script setup>
import { Container as EuiContainer } from '@elivander/elix-ui'
<\/script>`

const maxWidthCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <EuiContainer max-width="sm">
      <div style="background: var(--eui-bg-secondary); padding: 20px;">Small (640px)</div>
    </EuiContainer>
    <EuiContainer max-width="md">
      <div style="background: var(--eui-bg-secondary); padding: 20px;">Medium (768px)</div>
    </EuiContainer>
    <EuiContainer max-width="lg">
      <div style="background: var(--eui-bg-secondary); padding: 20px;">Large (1024px)</div>
    </EuiContainer>
  </div>
</template>

<script setup>
import { Container as EuiContainer } from '@elivander/elix-ui'
<\/script>`

const paddedCode = `<template>
  <EuiContainer :padded="true" max-width="md">
    <div style="background: var(--eui-bg-secondary); padding: 20px;">
      Container with padding
    </div>
  </EuiContainer>
</template>

<script setup>
import { Container as EuiContainer } from '@elivander/elix-ui'
<\/script>`

const fluidCode = `<template>
  <EuiContainer :fluid="true">
    <div style="background: var(--eui-bg-secondary); padding: 20px; border-radius: 8px;">
      Fluid container - takes full width
    </div>
  </EuiContainer>
</template>

<script setup>
import { Container as EuiContainer } from '@elivander/elix-ui'
<\/script>`
</script>

