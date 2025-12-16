<template>
  <div class="drawer-demo">
    <EuiButton @click="showDrawer = true">Open Drawer</EuiButton>
    <EuiDrawer v-model="showDrawer" title="Drawer Title" placement="right">
      <p>Drawer content goes here. You can add any content you want.</p>
      <p style="margin-top: 16px;">Click outside or close button to close the drawer.</p>
    </EuiDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer = ref(false)
</script>

<style lang="scss" scoped>
.drawer-demo {
  width: 100%;
}
</style>
