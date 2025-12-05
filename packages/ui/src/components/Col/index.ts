import Col from './Col.vue'
import type { App } from 'vue'

Col.install = (app: App) => {
  app.component(Col.name || 'EuiCol', Col)
}

export { Col }
export default Col

