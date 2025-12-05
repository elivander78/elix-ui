import Alert from './Alert.vue'
import type { App } from 'vue'

Alert.install = (app: App) => {
  app.component(Alert.name || 'EuiAlert', Alert)
}

export { Alert }
export type { AlertProps, AlertType, AlertVariant, AlertAppearance } from './Alert'
export default Alert

