<template>
  <div class="docs-page">
    <h1>Modal</h1>
    <p>The Modal component is used to display content in a dialog.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="ModalBasicDemo" :code="basicCode" />

    <h2>Closable</h2>
    <p>Control whether the modal shows a close button.</p>
    <Playground :demo-component="ModalClosableDemo" :code="closableCode" />

    <h2>Mask Closable</h2>
    <p>Control whether the modal can be closed by clicking the overlay.</p>
    <Playground :demo-component="ModalMaskClosableDemo" :code="maskClosableCode" />

    <h2>Size</h2>
    <p>Control the modal size using the `width` prop.</p>
    <Playground :demo-component="ModalSizeDemo" :code="sizeCode" />

    <h2>Custom Slots</h2>
    <p>Customize the modal header and footer using slots.</p>
    <Playground :demo-component="ModalSlotsDemo" :code="slotsCode" />

    <h2>Centered</h2>
    <p>Control whether the modal is centered on the screen.</p>
    <Playground :demo-component="ModalCenteredDemo" :code="centeredCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ModalBasicDemo from '../../components/demos/ModalBasicDemo.vue'
import ModalClosableDemo from '../../components/demos/ModalClosableDemo.vue'
import ModalMaskClosableDemo from '../../components/demos/ModalMaskClosableDemo.vue'
import ModalSizeDemo from '../../components/demos/ModalSizeDemo.vue'
import ModalSlotsDemo from '../../components/demos/ModalSlotsDemo.vue'
import ModalCenteredDemo from '../../components/demos/ModalCenteredDemo.vue'

const basicCode = `<template>
  <Button @click="showModal = true">Open Modal</Button>
  <Modal v-model="showModal" title="Modal Title">
    <p>Modal content goes here</p>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Modal } from '@elivander/elix-ui'

const showModal = ref(false)
<\/script>`

const closableCode = `<template>
  <div>
    <Button @click="showModal1 = true">With Close Button (default)</Button>
    <Button @click="showModal2 = true">Without Close Button</Button>
  </div>
  <Modal v-model="showModal1" title="Modal with Close Button">
    <p>This modal has a close button (default behavior).</p>
  </Modal>
  <Modal v-model="showModal2" title="Modal without Close Button" :closable="false">
    <p>This modal doesn't have a close button. You can only close it by clicking the overlay.</p>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Modal } from '@elivander/elix-ui'

const showModal1 = ref(false)
const showModal2 = ref(false)
<\/script>`

const maskClosableCode = `<template>
  <div>
    <Button @click="showModal1 = true">Mask Closable (default)</Button>
    <Button @click="showModal2 = true">Mask Not Closable</Button>
  </div>
  <Modal v-model="showModal1" title="Mask Closable">
    <p>This modal can be closed by clicking the overlay (default behavior).</p>
  </Modal>
  <Modal v-model="showModal2" title="Mask Not Closable" :mask-closable="false">
    <p>This modal cannot be closed by clicking the overlay. You must use the close button.</p>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Modal } from '@elivander/elix-ui'

const showModal1 = ref(false)
const showModal2 = ref(false)
<\/script>`

const sizeCode = `<template>
  <div>
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
    <p>You can customize the modal size using the \`width\` prop.</p>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Button, Modal } from '@elivander/elix-ui'

const showModal = ref(false)
const modalType = ref('default')

const currentWidth = computed(() => {
  switch (modalType.value) {
    case 'narrow': return 400
    case 'default': return 520
    case 'wide': return 800
    case 'custom': return '70%'
    default: return 520
  }
})

const currentWidthText = computed(() => {
  switch (modalType.value) {
    case 'narrow': return '400px'
    case 'default': return '520px'
    case 'wide': return '800px'
    case 'custom': return '70%'
    default: return '520px'
  }
})

const openModal = (type) => {
  modalType.value = type
  showModal.value = true
}
<\/script>`

const slotsCode = `<template>
  <Button @click="showModal = true">Open Modal with Slots</Button>
  <Modal v-model="showModal">
    <template #header>
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <h3 style="margin: 0;">Custom Header</h3>
        <Button size="sm" type="outline">Action</Button>
      </div>
    </template>
    
    <div>
      <p>This modal uses custom header and footer slots.</p>
      <p>You can customize the header and footer content using slots.</p>
    </div>
    
    <template #footer>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <Button type="outline" @click="showModal = false">Cancel</Button>
        <Button type="primary" @click="showModal = false">Save</Button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Modal } from '@elivander/elix-ui'

const showModal = ref(false)
<\/script>`

const centeredCode = `<template>
  <div>
    <Button @click="showModal1 = true">Centered (default)</Button>
    <Button @click="showModal2 = true">Not Centered</Button>
  </div>
  <Modal v-model="showModal1" title="Centered Modal" :centered="true">
    <p>This modal is centered on the screen (default behavior).</p>
  </Modal>
  <Modal v-model="showModal2" title="Not Centered Modal" :centered="false">
    <p>This modal is not explicitly centered (positioned by default flex centering).</p>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Modal } from '@elivander/elix-ui'

const showModal1 = ref(false)
const showModal2 = ref(false)
<\/script>`
</script>

<style lang="scss" scoped>
.docs-page {
  h1 {
    margin-bottom: var(--eui-spacing-lg);
  }

  h2 {
    margin-top: var(--eui-spacing-2xl);
    margin-bottom: var(--eui-spacing-md);
  }
}
</style>

