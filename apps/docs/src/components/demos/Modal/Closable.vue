<template>
  <div class="modal-demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <EuiButton @click="showModal1 = true">With Close Button (default)</EuiButton>
      <EuiButton @click="showModal2 = true">Without Close Button</EuiButton>
    </div>
    <EuiModal v-model="showModal1" title="Modal with Close Button">
      <p>This modal has a close button (default behavior).</p>
    </EuiModal>
    <EuiModal v-model="showModal2" title="Modal without Close Button" :closable="false">
      <p>This modal doesn't have a close button. You can only close it by clicking the overlay.</p>
    </EuiModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button as EuiButton, Modal as EuiModal } from '@elivander/elix-ui'

const showModal1 = ref(false)
const showModal2 = ref(false)
</script>

<style lang="scss" scoped>
.modal-demo {
  width: 100%;
}
</style>
