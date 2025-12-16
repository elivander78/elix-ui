<template>
  <div class="docs-page">
    <h1>Textarea</h1>
    <p>The Textarea component is used for multi-line text input.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="TextareaBasicDemo" :code="basicCode" />

    <h2>Sizes</h2>
    <Playground :demo-component="TextareaSizesDemo" :code="sizesCode" />

    <h2>Rows</h2>
    <Playground :demo-component="TextareaRowsDemo" :code="rowsCode" />

    <h2>Auto Resize</h2>
    <Playground :demo-component="TextareaAutosizeDemo" :code="autosizeCode" />

    <h2>Character Count</h2>
    <Playground :demo-component="TextareaCountDemo" :code="countCode" />

    <h2>States</h2>
    <Playground :demo-component="TextareaStatesDemo" :code="statesCode" />

    <h2>Appearance</h2>
    <Playground :demo-component="TextareaAppearanceDemo" :code="appearanceCode" />

    <h2>API</h2>
    <ApiTable
      :props="textareaProps"
      :slots="textareaSlots"
      :events="textareaEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import TextareaBasicDemo from '../../components/demos/Textarea/Basic.vue'
import TextareaSizesDemo from '../../components/demos/Textarea/Sizes.vue'
import TextareaRowsDemo from '../../components/demos/Textarea/Rows.vue'
import TextareaAutosizeDemo from '../../components/demos/Textarea/Autosize.vue'
import TextareaCountDemo from '../../components/demos/Textarea/Count.vue'
import TextareaStatesDemo from '../../components/demos/Textarea/States.vue'
import TextareaAppearanceDemo from '../../components/demos/Textarea/Appearance.vue'

const basicCode = `<template>
  <EuiTextarea v-model="value" placeholder="Enter text" />
</template>

<script setup>
import { ref } from 'vue'
import { Textarea as EuiTextarea } from '@elivander/elix-ui'

const value = ref('')
<\/script>`

const sizesCode = `<template>
  <EuiTextarea size="xs" placeholder="Extra Small" />
  <EuiTextarea size="sm" placeholder="Small" />
  <EuiTextarea size="md" placeholder="Medium" />
  <EuiTextarea size="lg" placeholder="Large" />
</template>`

const rowsCode = `<template>
  <EuiTextarea v-model="value" :rows="3" placeholder="3 rows" />
  <EuiTextarea v-model="value" :rows="5" placeholder="5 rows" />
</template>

<script setup>
import { ref } from 'vue'
import { Textarea as EuiTextarea } from '@elivander/elix-ui'

const value = ref('')
<\/script>`

const autosizeCode = `<template>
  <EuiTextarea v-model="value" autosize placeholder="Type to see auto-resize" />
</template>

<script setup>
import { ref } from 'vue'
import { Textarea as EuiTextarea } from '@elivander/elix-ui'

const value = ref('')
<\/script>`

const countCode = `<template>
  <EuiTextarea v-model="value" :maxlength="100" show-count placeholder="Type to see character count" />
</template>

<script setup>
import { ref } from 'vue'
import { Textarea as EuiTextarea } from '@elivander/elix-ui'

const value = ref('')
<\/script>`

const statesCode = `<template>
  <EuiTextarea placeholder="Normal" />
  <EuiTextarea placeholder="Error" state="error" />
  <EuiTextarea placeholder="Success" state="success" />
  <EuiTextarea placeholder="Disabled" disabled />
</template>`

const appearanceCode = `<template>
  <EuiTextarea appearance="border" placeholder="Border" />
  <EuiTextarea appearance="shadow" placeholder="Shadow" />
  <EuiTextarea appearance="border-shadow" placeholder="Border + Shadow" />
</template>`

const textareaProps = [
  { name: 'rows', type: 'number', default: '3', description: 'Number of rows' },
  { name: 'autosize', type: 'boolean', default: 'false', description: 'Whether to auto-resize (not yet implemented)' },
  { name: 'maxlength', type: 'number', default: '-', description: 'Maximum character count' },
  { name: 'showCount', type: 'boolean', default: 'false', description: 'Whether to show character count (not yet implemented)' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether textarea is disabled' },
  { name: 'appearance', type: "'border' | 'shadow' | 'border-shadow'", default: "'border'", description: 'Border appearance style (not yet implemented)' },
]

const textareaSlots = []

const textareaEvents = [
  { name: 'update:modelValue', payload: 'string', description: 'Emitted when value changes' },
  { name: 'focus', payload: 'FocusEvent', description: 'Emitted when textarea is focused' },
  { name: 'blur', payload: 'FocusEvent', description: 'Emitted when textarea loses focus' },
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
