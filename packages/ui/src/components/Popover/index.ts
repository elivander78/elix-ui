import Popover from './Popover.vue'
import type { App } from 'vue'

Popover.install = (app: App) => {
  app.component(Popover.name || 'EuiPopover', Popover)
}

export { Popover }
export default Popover

