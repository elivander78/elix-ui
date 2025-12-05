<template>
  <div class="drawer-demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <Button @click="showDrawer1 = true">Mask Closable (default)</Button>
      <Button @click="showDrawer2 = true">Mask Not Closable</Button>
    </div>
    <Drawer v-model="showDrawer1" title="Mask Closable" placement="right">
      <p>This drawer can be closed by clicking the overlay (default behavior).</p>
    </Drawer>
    <Drawer v-model="showDrawer2" title="Mask Not Closable" placement="right" :mask-closable="false">
      <p>This drawer cannot be closed by clicking the overlay. You must use the close button.</p>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Drawer } from '@elix/ui'

const showDrawer1 = ref(false)
const showDrawer2 = ref(false)
</script>

<style lang="scss" scoped>
.drawer-demo {
  width: 100%;
}
</style>
