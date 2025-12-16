<template>
  <div class="docs-page">
    <h1>Switch</h1>
    <p>The Switch component is used to toggle between two states.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="SwitchBasicDemo" :code="basicCode" />

    <h2>Sizes</h2>
    <Playground :demo-component="SwitchSizesDemo" :code="sizesCode" />

    <h2>With Labels</h2>
    <Playground :demo-component="SwitchLabelsDemo" :code="labelsCode" />

    <h2>Loading</h2>
    <Playground :demo-component="SwitchLoadingDemo" :code="loadingCode" />

    <h2>Disabled</h2>
    <Playground :demo-component="SwitchDisabledDemo" :code="disabledCode" />

    <h2>API</h2>
    <ApiTable
      :props="switchProps"
      :slots="switchSlots"
      :events="switchEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import SwitchBasicDemo from '../../components/demos/Switch/Basic.vue'
import SwitchSizesDemo from '../../components/demos/Switch/Sizes.vue'
import SwitchLabelsDemo from '../../components/demos/Switch/Labels.vue'
import SwitchLoadingDemo from '../../components/demos/Switch/Loading.vue'
import SwitchDisabledDemo from '../../components/demos/Switch/Disabled.vue'

const basicCode = `<template>
  <EuiSwitch v-model="checked" />
</template>

<script setup>
import { ref } from 'vue'
import { Switch as EuiSwitch } from '@elivander/elix-ui'

const checked = ref(false)
<\/script>`

const sizesCode = `<template>
  <EuiSwitch v-model="checked1" size="sm" />
  <EuiSwitch v-model="checked2" size="md" />
  <EuiSwitch v-model="checked3" size="lg" />
</template>

<script setup>
import { ref } from 'vue'
import { Switch as EuiSwitch } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)
<\/script>`

const labelsCode = `<template>
  <EuiSwitch v-model="checked1">Enable notifications</EuiSwitch>
  <EuiSwitch v-model="checked2" checked-label="On" unchecked-label="Off" />
</template>

<script setup>
import { ref } from 'vue'
import { Switch as EuiSwitch } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(true)
<\/script>`

const loadingCode = `<template>
  <EuiSwitch v-model="checked" loading />
</template>

<script setup>
import { ref } from 'vue'
import { Switch as EuiSwitch } from '@elivander/elix-ui'

const checked = ref(false)
<\/script>`

const disabledCode = `<template>
  <EuiSwitch v-model="checked1" />
  <EuiSwitch v-model="checked2" disabled />
  <EuiSwitch v-model="checked3" disabled :checked="true" />
</template>

<script setup>
import { ref } from 'vue'
import { Switch as EuiSwitch } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(true)
<\/script>`

const switchProps = [
  { name: 'modelValue', type: 'boolean', default: 'false', description: 'Whether switch is checked' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Switch size' },
  { name: 'label', type: 'string', default: '-', description: 'Switch label (use default slot instead)' },
  { name: 'checkedLabel', type: 'string', default: '-', description: 'Label when checked' },
  { name: 'uncheckedLabel', type: 'string', default: '-', description: 'Label when unchecked' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether switch is disabled' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Whether switch is in loading state (not yet implemented)' },
]

const switchSlots = [
  { name: 'default', description: 'Switch label' },
]

const switchEvents = [
  { name: 'update:modelValue', payload: 'boolean', description: 'Emitted when checked state changes' },
  { name: 'change', payload: 'boolean', description: 'Emitted when checked state changes' },
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
