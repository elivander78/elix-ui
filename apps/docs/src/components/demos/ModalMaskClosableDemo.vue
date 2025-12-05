<template>
  <div class="modal-demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <Button @click="showModal1 = true">Mask Closable (default)</Button>
      <Button @click="showModal2 = true">Mask Not Closable</Button>
    </div>
    <Modal v-model="showModal1" title="Mask Closable">
      <p>This modal can be closed by clicking the overlay (default behavior).</p>
    </Modal>
    <Modal v-model="showModal2" title="Mask Not Closable" :mask-closable="false">
      <p>This modal cannot be closed by clicking the overlay. You must use the close button.</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Modal } from '@elix/ui'

const showModal1 = ref(false)
const showModal2 = ref(false)
</script>

<style lang="scss" scoped>
.modal-demo {
  width: 100%;
}
</style>
