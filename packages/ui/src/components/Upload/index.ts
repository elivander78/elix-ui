import Upload from './Upload.vue'
import type { App } from 'vue'

Upload.install = (app: App) => {
  app.component(Upload.name || 'EuiUpload', Upload)
}

export { Upload }
export type { UploadProps, UploadFile, UploadFileStatus } from './Upload'
export default Upload

