<template>
  <div class="docs-page">
    <h1>Input</h1>
    <p>The Input component is used for text input.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="InputBasicDemo" :code="basicCode" />

    <h2>Sizes</h2>
    <Playground :demo-component="InputSizesDemo" :code="sizesCode" />

    <h2>States</h2>
    <Playground :demo-component="InputStatesDemo" :code="statesCode" />

    <h2>With Icons</h2>
    <Playground :demo-component="InputIconsDemo" :code="iconsCode" />

    <h2>Clearable</h2>
    <Playground :demo-component="InputClearableDemo" :code="clearableCode" />

    <h2>Appearance</h2>
    <Playground :demo-component="InputAppearanceDemo" :code="appearanceCode" />

    <h2>API</h2>
    <ApiTable
      :props="inputProps"
      :slots="inputSlots"
      :events="inputEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import InputBasicDemo from '../../components/demos/InputBasicDemo.vue'
import InputSizesDemo from '../../components/demos/InputSizesDemo.vue'
import InputStatesDemo from '../../components/demos/InputStatesDemo.vue'
import InputIconsDemo from '../../components/demos/InputIconsDemo.vue'
import InputClearableDemo from '../../components/demos/InputClearableDemo.vue'
import InputAppearanceDemo from '../../components/demos/InputAppearanceDemo.vue'

const basicCode = `<template>
  <Input v-model="value" placeholder="Enter text" />
</template>

<script setup>
import { ref } from 'vue'
import { Input } from '@elivander/elix-ui'

const value = ref('')
<\/script>`

const sizesCode = `<template>
  <Input size="xs" placeholder="Extra Small" />
  <Input size="sm" placeholder="Small" />
  <Input size="md" placeholder="Medium" />
  <Input size="lg" placeholder="Large" />
</template>`

const statesCode = `<template>
  <Input placeholder="Normal" />
  <Input placeholder="Error" state="error" />
  <Input placeholder="Success" state="success" />
  <Input placeholder="Disabled" disabled />
</template>`

const iconsCode = `<template>
  <Input placeholder="With prefix icon">
    <template #prefix>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M7.333 2.667a4.667 4.667 0 1 0 0 9.333 4.667 4.667 0 0 0 0-9.333ZM14 14l-2.9-2.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </template>
  </Input>
  <Input placeholder="With suffix icon">
    <template #suffix>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </template>
  </Input>
</template>`

const clearableCode = `<template>
  <Input v-model="value" placeholder="Type to see clear button" clearable />
</template>

<script setup>
import { ref } from 'vue'
import { Input } from '@elivander/elix-ui'

const value = ref('')
<\/script>`

const appearanceCode = `<template>
  <Input appearance="border" placeholder="Border" />
  <Input appearance="shadow" placeholder="Shadow" />
  <Input appearance="border-shadow" placeholder="Border + Shadow" />
</template>`

const inputProps = [
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether input is disabled' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether input is readonly' },
  { name: 'prefix', type: 'slot', default: '-', description: 'Prefix icon/content slot' },
  { name: 'suffix', type: 'slot', default: '-', description: 'Suffix icon/content slot' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Whether to show clear button' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Whether input has error (use state prop)' },
  { name: 'success', type: 'boolean', default: 'false', description: 'Whether input has success state (use state prop)' },
  { name: 'state', type: "'default' | 'error' | 'success' | 'warning'", default: "'default'", description: 'Input state' },
  { name: 'appearance', type: "'border' | 'shadow' | 'border-shadow'", default: "'border'", description: 'Border appearance style' },
]

const inputSlots = [
  { name: 'prefix', description: 'Icon/content before input' },
  { name: 'suffix', description: 'Icon/content after input' },
]

const inputEvents = [
  { name: 'update:modelValue', payload: 'string | number', description: 'Emitted when input value changes' },
  { name: 'focus', payload: 'FocusEvent', description: 'Emitted when input is focused' },
  { name: 'blur', payload: 'FocusEvent', description: 'Emitted when input loses focus' },
  { name: 'clear', payload: '-', description: 'Emitted when clear button is clicked' },
]
</script>

<style lang="scss" scoped>
.docs-page {
  max-width: 100%;

  h1 {
    margin-bottom: var(--eui-spacing-lg);
  }

  h2 {
    margin-top: var(--eui-spacing-2xl);
    margin-bottom: var(--eui-spacing-md);
  }
}
</style>

