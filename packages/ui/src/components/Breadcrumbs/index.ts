import Breadcrumbs from './Breadcrumbs.vue'
import type { App } from 'vue'

Breadcrumbs.install = (app: App) => {
  app.component(Breadcrumbs.name || 'EuiBreadcrumbs', Breadcrumbs)
}

export { Breadcrumbs }
export type { BreadcrumbItem } from './types'
export default Breadcrumbs

