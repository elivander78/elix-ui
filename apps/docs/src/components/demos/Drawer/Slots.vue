<template>
  <div class="drawer-demo">
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
        <p style="margin-top: 16px;">You can customize the header and footer content using slots.</p>
      </div>
      
      <template #footer>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <EuiButton type="outline" @click="showDrawer = false">Cancel</EuiButton>
          <EuiButton type="primary" @click="showDrawer = false">Save</EuiButton>
        </div>
      </template>
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
