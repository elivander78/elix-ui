<template>
  <div class="preview-modal-wrapper">
    <Button @click="isVisible = true">Open Modal1</Button>
    <Modal v-model="isVisible" :title="title" :closable="closable" :mask-closable="maskClosable">
      <slot />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Modal } from '@elivander/elix-ui'

defineProps<{
  title?: string
  closable?: boolean
  maskClosable?: boolean
}>()

const isVisible = ref(false)
</script>
