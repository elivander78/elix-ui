<template>
  <div class="drawer-demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <EuiButton @click="showDrawer1 = true">Mask Closable (default)</EuiButton>
      <EuiButton @click="showDrawer2 = true">Mask Not Closable</EuiButton>
    </div>
    <EuiDrawer v-model="showDrawer1" title="Mask Closable" placement="right">
      <p>This drawer can be closed by clicking the overlay (default behavior).</p>
    </EuiDrawer>
    <EuiDrawer v-model="showDrawer2" title="Mask Not Closable" placement="right" :mask-closable="false">
      <p>This drawer cannot be closed by clicking the overlay. You must use the close button.</p>
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
