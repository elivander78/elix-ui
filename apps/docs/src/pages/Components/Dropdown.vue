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
import DropdownBasicDemo from '../../components/demos/DropdownBasicDemo.vue'
import DropdownTriggersDemo from '../../components/demos/DropdownTriggersDemo.vue'
import DropdownPlacementsDemo from '../../components/demos/DropdownPlacementsDemo.vue'
import DropdownItemsDemo from '../../components/demos/DropdownItemsDemo.vue'

const basicCode = `<template>
  <Dropdown>
    <template #trigger>
      <Button>Click me</Button>
    </template>
    <template #menu>
      <div style="padding: 8px;">Menu content</div>
    </template>
  </Dropdown>
</template>

<script setup>
import { Dropdown, Button } from '@elivander/elix-ui'
<\/script>`

const triggersCode = `<template>
  <div style="display: flex; gap: 8px;">
    <Dropdown trigger="click">
      <template #trigger>
        <Button>Click</Button>
      </template>
      <template #menu>
        <div style="padding: 8px;">Click trigger</div>
      </template>
    </Dropdown>
    <Dropdown trigger="hover">
      <template #trigger>
        <Button>Hover</Button>
      </template>
      <template #menu>
        <div style="padding: 8px;">Hover trigger</div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup>
import { Dropdown, Button } from '@elivander/elix-ui'
<\/script>`

const placementsCode = `<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Dropdown placement="bottom-start">
      <template #trigger><Button>Bottom Start</Button></template>
      <template #menu><div style="padding: 8px;">Menu</div></template>
    </Dropdown>
    <Dropdown placement="top-start">
      <template #trigger><Button>Top Start</Button></template>
      <template #menu><div style="padding: 8px;">Menu</div></template>
    </Dropdown>
  </div>
</template>

<script setup>
import { Dropdown, Button } from '@elivander/elix-ui'
<\/script>`

const itemsCode = `<template>
  <Dropdown :items="items" @select="handleSelect">
    <template #trigger>
      <Button>Select Option</Button>
    </template>
  </Dropdown>
</template>

<script setup>
import { Dropdown, Button } from '@elivander/elix-ui'

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

