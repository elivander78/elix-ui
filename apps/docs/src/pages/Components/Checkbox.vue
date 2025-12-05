<template>
  <div class="docs-page">
    <h1>Checkbox</h1>
    <p>The Checkbox component is used for selecting one or more options.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="CheckboxBasicDemo" :code="basicCode" />

    <h2>Single Checkbox</h2>
    <Playground :demo-component="CheckboxSingleDemo" :code="singleCode" />

    <h2>Checkbox Group</h2>
    <Playground :demo-component="CheckboxGroupDemo" :code="groupCode" />

    <h2>Indeterminate</h2>
    <Playground :demo-component="CheckboxIndeterminateDemo" :code="indeterminateCode" />

    <h2>Disabled</h2>
    <Playground :demo-component="CheckboxDisabledDemo" :code="disabledCode" />

    <h2>API</h2>
    <ApiTable
      :props="checkboxProps"
      :slots="checkboxSlots"
      :events="checkboxEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import CheckboxBasicDemo from '../../components/demos/CheckboxBasicDemo.vue'
import CheckboxSingleDemo from '../../components/demos/CheckboxSingleDemo.vue'
import CheckboxGroupDemo from '../../components/demos/CheckboxGroupDemo.vue'
import CheckboxIndeterminateDemo from '../../components/demos/CheckboxIndeterminateDemo.vue'
import CheckboxDisabledDemo from '../../components/demos/CheckboxDisabledDemo.vue'

const basicCode = `<template>
  <Checkbox v-model="checked">I agree</Checkbox>
</template>

<script setup>
import { ref } from 'vue'
import { Checkbox } from '@elix/ui'

const checked = ref(false)
<\/script>`

const singleCode = `<template>
  <Checkbox v-model="checked" label="Accept terms and conditions" />
</template>

<script setup>
import { ref } from 'vue'
import { Checkbox } from '@elix/ui'

const checked = ref(false)
<\/script>`

const groupCode = `<template>
  <Checkbox v-model="checked1">Option 1</Checkbox>
  <Checkbox v-model="checked2">Option 2</Checkbox>
  <Checkbox v-model="checked3">Option 3</Checkbox>
</template>

<script setup>
import { ref } from 'vue'
import { Checkbox } from '@elix/ui'

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)
<\/script>`

const indeterminateCode = `<template>
  <Checkbox v-model="checked" :indeterminate="indeterminate" @change="handleChange">
    Select all
  </Checkbox>
</template>

<script setup>
import { ref } from 'vue'
import { Checkbox } from '@elix/ui'

const checked = ref(false)
const indeterminate = ref(true)

const handleChange = (value) => {
  indeterminate.value = false
}
<\/script>`

const disabledCode = `<template>
  <Checkbox v-model="checked1">Enabled</Checkbox>
  <Checkbox v-model="checked2" disabled>Disabled</Checkbox>
  <Checkbox v-model="checked3" disabled :checked="true">Disabled Checked</Checkbox>
</template>

<script setup>
import { ref } from 'vue'
import { Checkbox } from '@elix/ui'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(true)
<\/script>`

const checkboxProps = [
  { name: 'modelValue', type: 'boolean', default: 'false', description: 'Whether checkbox is checked' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Whether checkbox is in indeterminate state' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether checkbox is disabled' },
  { name: 'label', type: 'string', default: '-', description: 'Checkbox label (use default slot instead)' },
  { name: 'appearance', type: "'border' | 'shadow'", default: "'border'", description: 'Checkbox appearance style (not yet implemented)' },
]

const checkboxSlots = [
  { name: 'default', description: 'Checkbox label' },
]

const checkboxEvents = [
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
