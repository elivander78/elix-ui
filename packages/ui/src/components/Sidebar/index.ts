import Sidebar from './Sidebar.vue'
import type { App } from 'vue'

Sidebar.install = (app: App) => {
  app.component(Sidebar.name || 'EuiSidebar', Sidebar)
}

export { Sidebar }
export default Sidebar

