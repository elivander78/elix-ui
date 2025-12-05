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
import ContainerBasicDemo from '../../components/demos/ContainerBasicDemo.vue'
import ContainerMaxWidthDemo from '../../components/demos/ContainerMaxWidthDemo.vue'
import ContainerPaddedDemo from '../../components/demos/ContainerPaddedDemo.vue'
import ContainerFluidDemo from '../../components/demos/ContainerFluidDemo.vue'

const basicCode = `<template>
  <Container>
    <div style="background: var(--eui-bg-secondary); padding: 20px; border-radius: 8px;">
      Container content
    </div>
  </Container>
</template>

<script setup>
import { Container } from '@elix/ui'
<\/script>`

const maxWidthCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Container max-width="sm">
      <div style="background: var(--eui-bg-secondary); padding: 20px;">Small (640px)</div>
    </Container>
    <Container max-width="md">
      <div style="background: var(--eui-bg-secondary); padding: 20px;">Medium (768px)</div>
    </Container>
    <Container max-width="lg">
      <div style="background: var(--eui-bg-secondary); padding: 20px;">Large (1024px)</div>
    </Container>
  </div>
</template>

<script setup>
import { Container } from '@elix/ui'
<\/script>`

const paddedCode = `<template>
  <Container :padded="true" max-width="md">
    <div style="background: var(--eui-bg-secondary); padding: 20px;">
      Container with padding
    </div>
  </Container>
</template>

<script setup>
import { Container } from '@elix/ui'
<\/script>`

const fluidCode = `<template>
  <Container :fluid="true">
    <div style="background: var(--eui-bg-secondary); padding: 20px; border-radius: 8px;">
      Fluid container - takes full width
    </div>
  </Container>
</template>

<script setup>
import { Container } from '@elix/ui'
<\/script>`
</script>

