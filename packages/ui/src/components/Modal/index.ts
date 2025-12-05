import Modal from './Modal.vue'
import { useModal } from './useModal'
import type { App } from 'vue'

Modal.install = (app: App) => {
  app.component(Modal.name || 'EuiModal', Modal)
}

export { Modal, useModal }
export default Modal

