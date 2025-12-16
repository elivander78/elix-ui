<template>
  <div class="modal-demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <EuiButton @click="showModal1 = true">Centered (default)</EuiButton>
      <EuiButton @click="showModal2 = true">Not Centered</EuiButton>
    </div>
    <EuiModal v-model="showModal1" title="Centered Modal" :centered="true">
      <p>This modal is centered on the screen (default behavior).</p>
    </EuiModal>
    <EuiModal v-model="showModal2" title="Not Centered Modal" :centered="false">
      <p>This modal is not explicitly centered (positioned by default flex centering).</p>
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
