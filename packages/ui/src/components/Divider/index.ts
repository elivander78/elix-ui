import Divider from './Divider.vue'
import type { App } from 'vue'

Divider.install = (app: App) => {
  app.component(Divider.name, Divider)
}

export { Divider }
export default Divider

