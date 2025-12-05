<template>
  <div class="modal-demo">
    <Button @click="showModal = true">Open Modal</Button>
    <Modal v-model="showModal" title="Modal Title">
      <p>Modal content goes here. You can add any content you want.</p>
      <p style="margin-top: 16px;">Click outside or close button to close the modal.</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Modal } from '@elivander/elix-ui'

const showModal = ref(false)
</script>

<style lang="scss" scoped>
.modal-demo {
  width: 100%;
}
</style>
