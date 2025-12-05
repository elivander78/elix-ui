<template>
  <div class="drawer-demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <Button @click="showDrawer1 = true">With Close Button (default)</Button>
      <Button @click="showDrawer2 = true">Without Close Button</Button>
    </div>
    <Drawer v-model="showDrawer1" title="Drawer with Close Button" placement="right">
      <p>This drawer has a close button (default behavior).</p>
    </Drawer>
    <Drawer v-model="showDrawer2" title="Drawer without Close Button" placement="right" :closable="false">
      <p>This drawer doesn't have a close button. You can only close it by clicking the overlay.</p>
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
