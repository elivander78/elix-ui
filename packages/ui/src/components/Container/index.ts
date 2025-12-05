import Container from './Container.vue'
import type { App } from 'vue'

Container.install = (app: App) => {
  app.component(Container.name || 'EuiContainer', Container)
}

export { Container }
export default Container

