import Checkbox from './Checkbox.vue'
import type { App } from 'vue'

Checkbox.install = (app: App) => {
  app.component(Checkbox.name, Checkbox)
}

export { Checkbox }
export default Checkbox

