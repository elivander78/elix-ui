<template>
  <div class="docs-page">
    <h1>Collapse / Accordion</h1>
    <p>The Collapse component is used to show and hide content sections.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="CollapseBasicDemo" :code="basicCode" />

    <h2>Accordion Mode</h2>
    <Playground :demo-component="CollapseAccordionDemo" :code="accordionCode" />

    <h2>Multiple Open</h2>
    <Playground :demo-component="CollapseMultipleDemo" :code="multipleCode" />

    <h2>Appearance</h2>
    <Playground :demo-component="CollapseAppearanceDemo" :code="appearanceCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import CollapseBasicDemo from '../../components/demos/CollapseBasicDemo.vue'
import CollapseAccordionDemo from '../../components/demos/CollapseAccordionDemo.vue'
import CollapseMultipleDemo from '../../components/demos/CollapseMultipleDemo.vue'
import CollapseAppearanceDemo from '../../components/demos/CollapseAppearanceDemo.vue'

const basicCode = `<template>
  <Collapse v-model="activeKeys">
    <CollapseItem name="1" title="Panel 1">
      Content of panel 1
    </CollapseItem>
    <CollapseItem name="2" title="Panel 2">
      Content of panel 2
    </CollapseItem>
    <CollapseItem name="3" title="Panel 3">
      Content of panel 3
    </CollapseItem>
  </Collapse>
</template>

<script setup>
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@elivander/elix-ui'

const activeKeys = ref(['1'])
<\/script>`

const accordionCode = `<template>
  <Collapse v-model="activeKey" :accordion="true">
    <CollapseItem name="1" title="Accordion Panel 1">
      Only one panel can be open at a time.
    </CollapseItem>
    <CollapseItem name="2" title="Accordion Panel 2">
      Opening this will close the other.
    </CollapseItem>
    <CollapseItem name="3" title="Accordion Panel 3">
      This is accordion mode.
    </CollapseItem>
  </Collapse>
</template>

<script setup>
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@elivander/elix-ui'

const activeKey = ref('1')
<\/script>`

const multipleCode = `<template>
  <Collapse v-model="activeKeys">
    <CollapseItem name="1" title="Multiple Panel 1">
      Multiple panels can be open.
    </CollapseItem>
    <CollapseItem name="2" title="Multiple Panel 2">
      This is multiple mode.
    </CollapseItem>
    <CollapseItem name="3" title="Multiple Panel 3">
      All panels can be open simultaneously.
    </CollapseItem>
  </Collapse>
</template>

<script setup>
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@elivander/elix-ui'

const activeKeys = ref(['1', '2'])
<\/script>`

const appearanceCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Collapse v-model="keys1" appearance="border">
      <CollapseItem name="1" title="Border appearance" />
    </Collapse>
    <Collapse v-model="keys2" appearance="shadow">
      <CollapseItem name="1" title="Shadow appearance" />
    </Collapse>
    <Collapse v-model="keys3" appearance="border-shadow">
      <CollapseItem name="1" title="Border + Shadow" />
    </Collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@elivander/elix-ui'

const keys1 = ref(['1'])
const keys2 = ref(['1'])
const keys3 = ref(['1'])
<\/script>`
</script>

