<template>
  <div class="drawer-demo">
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
      <p>Drawer content goes here. This drawer is positioned on the {{ placement }} side.</p>
      <p style="margin-top: 16px;">You can see the slide animation when opening and closing.</p>
    </EuiDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer = ref(false)
const placement = ref<'left' | 'right' | 'top' | 'bottom'>('right')
const maskClosable = ref(true)

const openDrawer = (pos: 'left' | 'right' | 'top' | 'bottom') => {
  placement.value = pos
  showDrawer.value = true
}
</script>

<style lang="scss" scoped>
.drawer-demo {
  width: 100%;
}
</style>
