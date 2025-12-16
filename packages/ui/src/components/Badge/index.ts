import Badge from './Badge.vue'
import type { App } from 'vue'

Badge.install = (app: App) => {
  app.component(Badge.name, Badge)
}

export { Badge }
export default Badge

