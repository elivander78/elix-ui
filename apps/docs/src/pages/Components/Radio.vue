<template>
  <div class="docs-page">
    <h1>Radio</h1>
    <p>The Radio component is used for selecting a single option from a group.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="RadioBasicDemo" :code="basicCode" />

    <h2>Horizontal Group</h2>
    <Playground :demo-component="RadioHorizontalDemo" :code="horizontalCode" />

    <h2>Vertical Group</h2>
    <Playground :demo-component="RadioVerticalDemo" :code="verticalCode" />

    <h2>Disabled</h2>
    <Playground :demo-component="RadioDisabledDemo" :code="disabledCode" />

    <h2>API</h2>
    <ApiTable
      :props="radioProps"
      :slots="radioSlots"
      :events="radioEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import RadioBasicDemo from '../../components/demos/RadioBasicDemo.vue'
import RadioHorizontalDemo from '../../components/demos/RadioHorizontalDemo.vue'
import RadioVerticalDemo from '../../components/demos/RadioVerticalDemo.vue'
import RadioDisabledDemo from '../../components/demos/RadioDisabledDemo.vue'

const basicCode = `<template>
  <Radio v-model="value" value="option1">Option 1</Radio>
  <Radio v-model="value" value="option2">Option 2</Radio>
</template>

<script setup>
import { ref } from 'vue'
import { Radio } from '@elivander/elix-ui'

const value = ref('option1')
<\/script>`

const horizontalCode = `<template>
  <div style="display: flex; gap: 16px;">
    <Radio v-model="value" value="option1">Option 1</Radio>
    <Radio v-model="value" value="option2">Option 2</Radio>
    <Radio v-model="value" value="option3">Option 3</Radio>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Radio } from '@elivander/elix-ui'

const value = ref('option1')
<\/script>`

const verticalCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Radio v-model="value" value="option1">Option 1</Radio>
    <Radio v-model="value" value="option2">Option 2</Radio>
    <Radio v-model="value" value="option3">Option 3</Radio>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Radio } from '@elivander/elix-ui'

const value = ref('option1')
<\/script>`

const disabledCode = `<template>
  <Radio v-model="value" value="option1">Enabled</Radio>
  <Radio v-model="value" value="option2" disabled>Disabled</Radio>
  <Radio v-model="value" value="option3" disabled>Disabled Selected</Radio>
</template>

<script setup>
import { ref } from 'vue'
import { Radio } from '@elivander/elix-ui'

const value = ref('option3')
<\/script>`

const radioProps = [
  { name: 'value', type: 'string | number', default: '-', description: 'Radio value' },
  { name: 'modelValue', type: 'string | number', default: '-', description: 'Selected value' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether radio is disabled' },
  { name: 'label', type: 'string', default: '-', description: 'Radio label (use default slot instead)' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Radio size (not yet implemented)' },
]

const radioSlots = [
  { name: 'default', description: 'Radio label' },
]

const radioEvents = [
  { name: 'update:modelValue', payload: 'string | number', description: 'Emitted when selection changes' },
  { name: 'change', payload: 'string | number', description: 'Emitted when selection changes' },
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
