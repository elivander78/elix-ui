<template>
  <div class="modal-demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <Button @click="openModal('narrow')">Narrow (400px)</Button>
      <Button @click="openModal('default')">Default (520px)</Button>
      <Button @click="openModal('wide')">Wide (800px)</Button>
      <Button @click="openModal('custom')">Custom Size</Button>
    </div>
    <Modal 
      v-model="showModal" 
      title="Modal Title" 
      :width="currentWidth"
    >
      <p>This modal has a width of {{ currentWidthText }}.</p>
      <p style="margin-top: 16px;">You can customize the modal size using the `width` prop.</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button, Modal } from '@elivander/elix-ui'

const showModal = ref(false)
const modalType = ref<'narrow' | 'default' | 'wide' | 'custom'>('default')

const currentWidth = computed(() => {
  switch (modalType.value) {
    case 'narrow':
      return 400
    case 'default':
      return 520
    case 'wide':
      return 800
    case 'custom':
      return '70%'
    default:
      return 520
  }
})

const currentWidthText = computed(() => {
  switch (modalType.value) {
    case 'narrow':
      return '400px'
    case 'default':
      return '520px'
    case 'wide':
      return '800px'
    case 'custom':
      return '70%'
    default:
      return '520px'
  }
})

const openModal = (type: 'narrow' | 'default' | 'wide' | 'custom') => {
  modalType.value = type
  showModal.value = true
}
</script>

<style lang="scss" scoped>
.modal-demo {
  width: 100%;
}
</style>
