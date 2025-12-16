import Pagination from './Pagination.vue'
import type { App } from 'vue'

Pagination.install = (app: App) => {
  app.component(Pagination.name, Pagination)
}

export { Pagination }
export default Pagination

