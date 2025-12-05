import Avatar from './Avatar.vue'
import type { App } from 'vue'

Avatar.install = (app: App) => {
  app.component(Avatar.name || 'EuiAvatar', Avatar)
}

export { Avatar }
export default Avatar

