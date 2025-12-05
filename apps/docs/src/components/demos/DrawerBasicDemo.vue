<template>
  <div class="drawer-demo">
    <Button @click="showDrawer = true">Open Drawer</Button>
    <Drawer v-model="showDrawer" title="Drawer Title" placement="right">
      <p>Drawer content goes here. You can add any content you want.</p>
      <p style="margin-top: 16px;">Click outside or close button to close the drawer.</p>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Drawer } from '@elivander/elix-ui'

const showDrawer = ref(false)
</script>

<style lang="scss" scoped>
.drawer-demo {
  width: 100%;
}
</style>
