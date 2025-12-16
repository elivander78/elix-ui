<template>
  <div class="docs-page">
    <h1>Drawer</h1>
    <p>The Drawer component is used to display content in a side panel that slides in from the edges of the screen.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="DrawerBasicDemo" :code="basicCode" />

    <h2>Placements</h2>
    <p>Drawer can be placed on any side of the screen: left, right, top, or bottom.</p>
    <Playground :demo-component="DrawerPlacementDemo" :code="placementCode" />

    <h2>Closable</h2>
    <p>Control whether the drawer shows a close button.</p>
    <Playground :demo-component="DrawerClosableDemo" :code="closableCode" />

    <h2>Mask Closable</h2>
    <p>Control whether the drawer can be closed by clicking the overlay.</p>
    <Playground :demo-component="DrawerMaskClosableDemo" :code="maskClosableCode" />

    <h2>Scrollable</h2>
    <p>Drawer with scrollable content when the content is longer than the drawer height.</p>
    <Playground :demo-component="DrawerScrollableDemo" :code="scrollableCode" />

    <h2>Size</h2>
    <p>Control the drawer size using the `width` or `size` prop.</p>
    <Playground :demo-component="DrawerSizeDemo" :code="sizeCode" />

    <h2>Custom Slots</h2>
    <p>Customize the drawer header and footer using slots.</p>
    <Playground :demo-component="DrawerSlotsDemo" :code="slotsCode" />

    <h2>Props</h2>
    <ApiTable :props="props" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import DrawerBasicDemo from '../../components/demos/Drawer/Basic.vue'
import DrawerPlacementDemo from '../../components/demos/Drawer/Placement.vue'
import DrawerClosableDemo from '../../components/demos/Drawer/Closable.vue'
import DrawerMaskClosableDemo from '../../components/demos/Drawer/MaskClosable.vue'
import DrawerScrollableDemo from '../../components/demos/Drawer/Scrollable.vue'
import DrawerSizeDemo from '../../components/demos/Drawer/Size.vue'
import DrawerSlotsDemo from '../../components/demos/Drawer/Slots.vue'

const basicCode = `<template>
  <EuiButton @click="showDrawer = true">Open Drawer</EuiButton>
  <EuiDrawer v-model="showDrawer" title="Drawer Title" placement="right">
    <p>Drawer content goes here</p>
  </EuiDrawer>
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer = ref(false)
<\/script>`

const placementCode = `<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <EuiButton @click="openDrawer('left')">Open Left</EuiButton>
    <EuiButton @click="openDrawer('right')">Open Right</EuiButton>
    <EuiButton @click="openDrawer('top')">Open Top</EuiButton>
    <EuiButton @click="openDrawer('bottom')">Open Bottom</EuiButton>
  </div>
  <EuiDrawer 
    v-model="showDrawer" 
    title="Drawer Title" 
    :placement="placement"
    :maskClosable="maskClosable"
  >
    <p>Drawer content goes here</p>
  </EuiDrawer>
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer = ref(false)
const placement = ref<'left' | 'right' | 'top' | 'bottom'>('right')
const maskClosable = ref(true)

const openDrawer = (pos: 'left' | 'right' | 'top' | 'bottom') => {
  placement.value = pos
  showDrawer.value = true
}
<\/script>`

const closableCode = `<template>
  <div>
    <EuiButton @click="showDrawer1 = true">With Close Button (default)</EuiButton>
    <EuiButton @click="showDrawer2 = true">Without Close Button</EuiButton>
  </div>
  <EuiDrawer v-model="showDrawer1" title="Drawer with Close Button" placement="right">
    <p>This drawer has a close button (default behavior).</p>
  </EuiDrawer>
  <EuiDrawer v-model="showDrawer2" title="Drawer without Close Button" placement="right" :closable="false">
    <p>This drawer doesn't have a close button. You can only close it by clicking the overlay.</p>
  </EuiDrawer>
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer1 = ref(false)
const showDrawer2 = ref(false)
<\/script>`

const maskClosableCode = `<template>
  <div>
    <EuiButton @click="showDrawer1 = true">Mask Closable (default)</EuiButton>
    <EuiButton @click="showDrawer2 = true">Mask Not Closable</EuiButton>
  </div>
  <EuiDrawer v-model="showDrawer1" title="Mask Closable" placement="right">
    <p>This drawer can be closed by clicking the overlay (default behavior).</p>
  </EuiDrawer>
  <EuiDrawer v-model="showDrawer2" title="Mask Not Closable" placement="right" :mask-closable="false">
    <p>This drawer cannot be closed by clicking the overlay. You must use the close button.</p>
  </EuiDrawer>
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer1 = ref(false)
const showDrawer2 = ref(false)
<\/script>`

const scrollableCode = `<template>
  <EuiButton @click="showDrawer = true">Open Scrollable Drawer</EuiButton>
  <EuiDrawer v-model="showDrawer" title="Scrollable Drawer" placement="right" :scrollable="true">
    <div>
      <h3>Section 1</h3>
      <p>This drawer has scrollable content. When the content is longer than the drawer height, you can scroll.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      
      <h3 style="margin-top: 40px;">Section 2</h3>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      
      <h3 style="margin-top: 40px;">Section 3</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
      
      <h3 style="margin-top: 40px;">Section 4</h3>
      <p>Excepteur sint occaecat cupidatat non proident.</p>
      
      <h3 style="margin-top: 40px;">Section 5</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
    </div>
  </EuiDrawer>
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer = ref(false)
<\/script>`

const sizeCode = `<template>
  <div>
    <EuiButton @click="openDrawer('narrow')">Narrow (300px)</EuiButton>
    <EuiButton @click="openDrawer('default')">Default (400px)</EuiButton>
    <EuiButton @click="openDrawer('wide')">Wide (600px)</EuiButton>
    <EuiButton @click="openDrawer('custom')">Custom Size</EuiButton>
  </div>
  <EuiDrawer 
    v-model="showDrawer" 
    title="Drawer Title" 
    placement="right"
    :width="currentWidth"
  >
    <p>This drawer has a width of {{ currentWidthText }}.</p>
    <p>You can customize the drawer size using the \`width\` or \`size\` prop.</p>
  </Drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Button, Drawer } from '@elivander/elix-ui'

const showDrawer = ref(false)
const drawerType = ref('default')

const currentWidth = computed(() => {
  switch (drawerType.value) {
    case 'narrow': return 300
    case 'default': return 400
    case 'wide': return 600
    case 'custom': return '50%'
    default: return 400
  }
})

const currentWidthText = computed(() => {
  switch (drawerType.value) {
    case 'narrow': return '300px'
    case 'default': return '400px'
    case 'wide': return '600px'
    case 'custom': return '50%'
    default: return '400px'
  }
})

const openDrawer = (type) => {
  drawerType.value = type
  showDrawer.value = true
}
<\/script>`

const slotsCode = `<template>
  <EuiButton @click="showDrawer = true">Open Drawer with Slots</EuiButton>
  <EuiDrawer v-model="showDrawer" placement="right">
    <template #header>
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <h3 style="margin: 0;">Custom Header</h3>
        <EuiButton size="sm" type="outline">Action</EuiButton>
      </div>
    </template>
    
    <div>
      <p>This drawer uses custom header and footer slots.</p>
      <p>You can customize the header and footer content using slots.</p>
    </div>
    
    <template #footer>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <EuiButton type="outline" @click="showDrawer = false">Cancel</EuiButton>
        <EuiButton type="primary" @click="showDrawer = false">Save</EuiButton>
      </div>
    </template>
  </EuiDrawer>
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer = ref(false)
<\/script>`

const props = [
  { name: 'modelValue', type: 'boolean', required: true, description: 'Controls the visibility of the drawer' },
  { name: 'title', type: 'string', required: false, description: 'Title of the drawer' },
  { name: 'placement', type: "'left' | 'right' | 'top' | 'bottom'", required: false, default: "'right'", description: 'Placement of the drawer' },
  { name: 'width', type: 'string | number', required: false, description: 'Width of the drawer (for left/right) or height (for top/bottom)' },
  { name: 'size', type: 'string | number', required: false, description: 'Size of the drawer (alternative to width prop)' },
  { name: 'closable', type: 'boolean', required: false, default: 'true', description: 'Whether to show the close button' },
  { name: 'maskClosable', type: 'boolean', required: false, default: 'true', description: 'Whether to close drawer when clicking the mask' },
  { name: 'scrollable', type: 'boolean', required: false, default: 'true', description: 'Whether the drawer body is scrollable' },
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

