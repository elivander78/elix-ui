import Tooltip from './Tooltip.vue'
import type { App } from 'vue'

Tooltip.install = (app: App) => {
  app.component(Tooltip.name || 'EuiTooltip', Tooltip)
}

export { Tooltip }
export default Tooltip

