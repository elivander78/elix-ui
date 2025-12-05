import Header from './Header.vue'
import type { App } from 'vue'

Header.install = (app: App) => {
  app.component(Header.name || 'EuiHeader', Header)
}

export { Header }
export default Header

