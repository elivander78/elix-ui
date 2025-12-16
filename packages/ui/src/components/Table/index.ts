import Table from './Table.vue'
import type { App } from 'vue'

Table.install = (app: App) => {
  app.component(Table.name, Table)
}

export { Table }
export type { TableColumn } from './Table'
export default Table

