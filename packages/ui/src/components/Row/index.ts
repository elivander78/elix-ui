import Row from './Row.vue'
import type { App } from 'vue'

Row.install = (app: App) => {
  app.component(Row.name || 'EuiRow', Row)
}

export { Row }
export default Row

