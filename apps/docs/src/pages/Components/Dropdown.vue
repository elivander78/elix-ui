<template>
  <div class="docs-page">
    <h1>Dropdown</h1>
    <p>The Dropdown component displays a menu of options.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="DropdownBasicDemo" :code="basicCode" />

    <h2>Triggers</h2>
    <Playground :demo-component="DropdownTriggersDemo" :code="triggersCode" />

    <h2>Placements</h2>
    <Playground :demo-component="DropdownPlacementsDemo" :code="placementsCode" />

    <h2>With Items</h2>
    <Playground :demo-component="DropdownItemsDemo" :code="itemsCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import DropdownBasicDemo from '../../components/demos/Dropdown/Basic.vue'
import DropdownTriggersDemo from '../../components/demos/Dropdown/Triggers.vue'
import DropdownPlacementsDemo from '../../components/demos/Dropdown/Placements.vue'
import DropdownItemsDemo from '../../components/demos/Dropdown/Items.vue'

const basicCode = `<template>
  <EuiDropdown>
    <template #trigger>
      <EuiButton>Click me</EuiButton>
    </template>
    <template #menu>
      <div style="padding: 8px;">Menu content</div>
    </template>
  </EuiDropdown>
</template>

<script setup>
import { Dropdown as EuiDropdown, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const triggersCode = `<template>
  <div style="display: flex; gap: 8px;">
    <EuiDropdown trigger="click">
      <template #trigger>
        <EuiButton>Click</EuiButton>
      </template>
      <template #menu>
        <div style="padding: 8px;">Click trigger</div>
      </template>
    </EuiDropdown>
    <EuiDropdown trigger="hover">
      <template #trigger>
        <EuiButton>Hover</EuiButton>
      </template>
      <template #menu>
        <div style="padding: 8px;">Hover trigger</div>
      </template>
    </EuiDropdown>
  </div>
</template>

<script setup>
import { Dropdown as EuiDropdown, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const placementsCode = `<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <EuiDropdown placement="bottom-start">
      <template #trigger><EuiButton>Bottom Start</EuiButton></template>
      <template #menu><div style="padding: 8px;">Menu</div></template>
    </EuiDropdown>
    <EuiDropdown placement="top-start">
      <template #trigger><EuiButton>Top Start</EuiButton></template>
      <template #menu><div style="padding: 8px;">Menu</div></template>
    </EuiDropdown>
  </div>
</template>

<script setup>
import { Dropdown as EuiDropdown, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const itemsCode = `<template>
  <EuiDropdown :items="items" @select="handleSelect">
    <template #trigger>
      <EuiButton>Select Option</EuiButton>
    </template>
  </EuiDropdown>
</template>

<script setup>
import { Dropdown as EuiDropdown, Button as EuiButton } from '@elivander/elix-ui'

const items = [
  { label: 'Option 1', key: '1' },
  { label: 'Option 2', key: '2' },
  { label: 'Option 3', key: '3', disabled: true },
  { label: 'Delete', key: '4', danger: true },
]

const handleSelect = (item) => {
  console.log('Selected:', item)
}
<\/script>`
</script>

