import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
import type { App } from 'vue'

Collapse.install = (app: App) => {
  app.component(Collapse.name || 'EuiCollapse', Collapse)
  app.component(CollapseItem.name || 'EuiCollapseItem', CollapseItem)
}

CollapseItem.install = (app: App) => {
  app.component(CollapseItem.name || 'EuiCollapseItem', CollapseItem)
}

export { Collapse, CollapseItem }
export type { CollapseProps, CollapseItemProps, CollapseAppearance } from './Collapse'
export default Collapse

