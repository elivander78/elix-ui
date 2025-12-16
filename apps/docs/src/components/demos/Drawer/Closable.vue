<template>
  <div class="drawer-demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <EuiButton @click="showDrawer1 = true">With Close Button (default)</EuiButton>
      <EuiButton @click="showDrawer2 = true">Without Close Button</EuiButton>
    </div>
    <EuiDrawer v-model="showDrawer1" title="Drawer with Close Button" placement="right">
      <p>This drawer has a close button (default behavior).</p>
    </EuiDrawer>
    <EuiDrawer v-model="showDrawer2" title="Drawer without Close Button" placement="right" :closable="false">
      <p>This drawer doesn't have a close button. You can only close it by clicking the overlay.</p>
    </EuiDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer1 = ref(false)
const showDrawer2 = ref(false)
</script>

<style lang="scss" scoped>
.drawer-demo {
  width: 100%;
}
</style>
