import Switch from './Switch.vue'
import type { App } from 'vue'

Switch.install = (app: App) => {
  app.component(Switch.name, Switch)
}

export { Switch }
export default Switch

