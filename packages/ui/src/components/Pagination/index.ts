import Pagination from './Pagination.vue'
import type { App } from 'vue'

Pagination.install = (app: App) => {
  app.component(Pagination.name || 'EuiPagination', Pagination)
}

export { Pagination }
export default Pagination

