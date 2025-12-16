<template>
  <div class="docs-page">
    <h1>Select</h1>
    <p>The Select component is used for selecting from a list of options.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="SelectBasicDemo" :code="basicCode" />

    <h2>Sizes</h2>
    <Playground :demo-component="SelectSizesDemo" :code="sizesCode" />

    <h2>States</h2>
    <Playground :demo-component="SelectStatesDemo" :code="statesCode" />

    <h2>Clearable</h2>
    <Playground :demo-component="SelectClearableDemo" :code="clearableCode" />

    <h2>Searchable</h2>
    <Playground :demo-component="SelectSearchableDemo" :code="searchableCode" />

    <h2>Multiple</h2>
    <Playground :demo-component="SelectMultipleDemo" :code="multipleCode" />

    <h2>Appearance</h2>
    <Playground :demo-component="SelectAppearanceDemo" :code="appearanceCode" />

    <h2>API</h2>
    <ApiTable
      :props="selectProps"
      :slots="selectSlots"
      :events="selectEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import SelectBasicDemo from '../../components/demos/Select/Basic.vue'
import SelectSizesDemo from '../../components/demos/Select/Sizes.vue'
import SelectStatesDemo from '../../components/demos/Select/States.vue'
import SelectClearableDemo from '../../components/demos/Select/Clearable.vue'
import SelectSearchableDemo from '../../components/demos/Select/Searchable.vue'
import SelectMultipleDemo from '../../components/demos/Select/Multiple.vue'
import SelectAppearanceDemo from '../../components/demos/Select/Appearance.vue'

const basicCode = `<template>
  <EuiSelect
    v-model="selected"
    :options="options"
    placeholder="Select an option"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Select as EuiSelect } from '@elivander/elix-ui'

const selected = ref()
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
<\/script>`

const sizesCode = `<template>
  <EuiSelect size="xs" :options="options" placeholder="Extra Small" />
  <EuiSelect size="sm" :options="options" placeholder="Small" />
  <EuiSelect size="md" :options="options" placeholder="Medium" />
  <EuiSelect size="lg" :options="options" placeholder="Large" />
</template>

<script setup>
import { Select as EuiSelect } from '@elivander/elix-ui'

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
<\/script>`

const statesCode = `<template>
  <EuiSelect :options="options" placeholder="Normal" />
  <EuiSelect :options="options" placeholder="Error" state="error" />
  <EuiSelect :options="options" placeholder="Success" state="success" />
  <EuiSelect :options="options" placeholder="Disabled" disabled />
</template>

<script setup>
import { Select as EuiSelect } from '@elivander/elix-ui'

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
<\/script>`

const clearableCode = `<template>
  <EuiSelect
    v-model="selected"
    :options="options"
    placeholder="Select an option"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'
import { Select as EuiSelect } from '@elivander/elix-ui'

const selected = ref('1')
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
<\/script>`

const searchableCode = `<template>
  <EuiSelect
    v-model="selected"
    :options="options"
    placeholder="Type to search..."
    filterable
  />
</template>

<script setup>
import { ref } from 'vue'
import { Select as EuiSelect } from '@elivander/elix-ui'

const selected = ref()
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
]
<\/script>`

const multipleCode = `<template>
  <EuiSelect
    v-model="selected"
    :options="options"
    placeholder="Select multiple options"
    multiple
  />
</template>

<script setup>
import { ref } from 'vue'
import { Select as EuiSelect } from '@elivander/elix-ui'

const selected = ref([])
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
]
<\/script>`

const appearanceCode = `<template>
  <EuiSelect :options="options" appearance="border" placeholder="Border" />
  <EuiSelect :options="options" appearance="shadow" placeholder="Shadow" />
  <EuiSelect :options="options" appearance="border-shadow" placeholder="Border + Shadow" />
</template>

<script setup>
import { Select as EuiSelect } from '@elivander/elix-ui'

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
<\/script>`

const selectProps = [
  { name: 'options', type: 'SelectOption[]', default: '[]', description: 'Array of select options' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether to support multiple selection' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Whether to show clear button' },
  { name: 'searchable', type: 'boolean', default: 'false', description: 'Whether to enable search (use filterable prop)' },
  { name: 'filterable', type: 'boolean', default: 'false', description: 'Whether to enable filtering/search' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Select size' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether select is disabled' },
  { name: 'appearance', type: "'border' | 'shadow' | 'border-shadow'", default: "'border'", description: 'Border appearance style' },
]

const selectSlots = []

const selectEvents = [
  { name: 'update:modelValue', payload: 'string | number | (string | number)[] | undefined', description: 'Emitted when selection changes' },
  { name: 'change', payload: 'string | number | (string | number)[] | undefined', description: 'Emitted when selection changes' },
  { name: 'clear', payload: '-', description: 'Emitted when clear button is clicked' },
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

