import Drawer from './Drawer.vue'
import { useDrawer } from './useDrawer'
import type { App } from 'vue'

Drawer.install = (app: App) => {
  app.component(Drawer.name || 'EuiDrawer', Drawer)
}

export { Drawer, useDrawer }
export default Drawer

