import Notification from './Notification.vue'
import { useNotification } from './useNotification'
import type { App } from 'vue'

Notification.install = (app: App) => {
  app.component(Notification.name || 'EuiNotification', Notification)
}

export { Notification, useNotification }
export type { NotificationOptions } from './Notification'
export default Notification

