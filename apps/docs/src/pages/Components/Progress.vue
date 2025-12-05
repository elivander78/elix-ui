<template>
  <div class="docs-page">
    <h1>Progress</h1>
    <p>The Progress component is used to show the progress of an operation.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>With Status</h2>
    <Playground :code="statusCode" />

    <h2>With Text</h2>
    <Playground :code="textCode" />

    <h2>Different Sizes</h2>
    <Playground :code="sizesCode" />

    <h2>Animated</h2>
    <Playground :code="animatedCode" />

    <h2>Playground</h2>
    <Playground :demo-component="ProgressPlaygroundDemo" :code="playgroundCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ProgressPlaygroundDemo from '../../components/demos/ProgressPlaygroundDemo.vue'

const basicCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress :percentage="30" />
    <Progress :percentage="50" />
    <Progress :percentage="75" />
    <Progress :percentage="100" />
  </div>
</template>

<script setup>
import { Progress } from '@elivander/elix-ui'
<\/script>`

const statusCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress :percentage="50" status="active" />
    <Progress :percentage="75" status="success" />
    <Progress :percentage="30" status="error" />
  </div>
</template>

<script setup>
import { Progress } from '@elivander/elix-ui'
<\/script>`

const textCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress :percentage="50" :show-info="true" text="Uploading..." />
    <Progress :percentage="75" :show-info="true" text="Processing..." />
    <Progress :percentage="100" :show-info="true" text="Complete" />
  </div>
</template>

<script setup>
import { Progress } from '@elivander/elix-ui'
<\/script>`

const sizesCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress :percentage="50" :stroke-width="4" />
    <Progress :percentage="50" :stroke-width="8" />
    <Progress :percentage="50" :stroke-width="12" />
  </div>
</template>

<script setup>
import { Progress } from '@elivander/elix-ui'
<\/script>`

const animatedCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress :percentage="percentage" status="active" :show-info="true" />
    <div style="display: flex; gap: 10px;">
      <Button @click="percentage = Math.max(0, percentage - 10)">-10%</Button>
      <Button @click="percentage = Math.min(100, percentage + 10)">+10%</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Progress, Button } from '@elivander/elix-ui'

const percentage = ref(50)
<\/script>`

const playgroundCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Progress 
      :percent="percent" 
      :type="type"
      :status="status"
      :show-label="showLabel"
      :striped="striped"
      :animated="animated"
      :appearance="appearance"
    />
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <label style="min-width: 100px;">Percent:</label>
        <input type="range" v-model.number="percent" min="0" max="100" style="flex: 1;" />
        <span style="min-width: 50px;">{{ percent }}%</span>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <label style="min-width: 100px;">Type:</label>
        <Select v-model="type" :options="typeOptions" style="width: 150px;" />
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <label style="min-width: 100px;">Status:</label>
        <Select v-model="status" :options="statusOptions" style="width: 150px;" />
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <label style="min-width: 100px;">Appearance:</label>
        <Select v-model="appearance" :options="appearanceOptions" style="width: 150px;" />
      </div>
      <div style="display: flex; gap: 20px;">
        <label><input type="checkbox" v-model="showLabel" /> Show Label</label>
        <label><input type="checkbox" v-model="striped" /> Striped</label>
        <label><input type="checkbox" v-model="animated" /> Animated</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Progress, Select } from '@elivander/elix-ui'

const percent = ref(50)
const type = ref('line')
const status = ref('normal')
const showLabel = ref(true)
const striped = ref(false)
const animated = ref(false)
const appearance = ref('shadow')

const typeOptions = [
  { label: 'Line', value: 'line' },
  { label: 'Circle', value: 'circle' },
]

const statusOptions = [
  { label: 'Normal', value: 'normal' },
  { label: 'Success', value: 'success' },
  { label: 'Error', value: 'error' },
  { label: 'Warning', value: 'warning' },
]

const appearanceOptions = [
  { label: 'Border', value: 'border' },
  { label: 'Shadow', value: 'shadow' },
]
<\/script>`
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
