<template>
  <div class="modal-demo">
    <EuiButton @click="showModal = true">Open Modal with Slots</EuiButton>
    <EuiModal v-model="showModal">
      <template #header>
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
          <h3 style="margin: 0;">Custom Header</h3>
          <EuiButton size="sm" type="outline">Action</EuiButton>
        </div>
      </template>
      
      <div>
        <p>This modal uses custom header and footer slots.</p>
        <p style="margin-top: 16px;">You can customize the header and footer content using slots.</p>
      </div>
      
      <template #footer>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <EuiButton type="outline" @click="showModal = false">Cancel</EuiButton>
          <EuiButton type="primary" @click="showModal = false">Save</EuiButton>
        </div>
      </template>
    </EuiModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button as EuiButton, Modal as EuiModal } from '@elivander/elix-ui'

const showModal = ref(false)
</script>

<style lang="scss" scoped>
.modal-demo {
  width: 100%;
}
</style>
