<template>
  <div class="drawer-demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
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
      <p style="margin-top: 16px;">You can customize the drawer size using the `width` or `size` prop.</p>
    </EuiDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer = ref(false)
const drawerType = ref<'narrow' | 'default' | 'wide' | 'custom'>('default')

const currentWidth = computed(() => {
  switch (drawerType.value) {
    case 'narrow':
      return 300
    case 'default':
      return 400
    case 'wide':
      return 600
    case 'custom':
      return '50%'
    default:
      return 400
  }
})

const currentWidthText = computed(() => {
  switch (drawerType.value) {
    case 'narrow':
      return '300px'
    case 'default':
      return '400px'
    case 'wide':
      return '600px'
    case 'custom':
      return '50%'
    default:
      return '400px'
  }
})

const openDrawer = (type: 'narrow' | 'default' | 'wide' | 'custom') => {
  drawerType.value = type
  showDrawer.value = true
}
</script>

<style lang="scss" scoped>
.drawer-demo {
  width: 100%;
}
</style>
