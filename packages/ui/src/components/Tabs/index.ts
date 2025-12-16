import Tabs from './Tabs.vue'
import TabPane from './TabPane.vue'
import type { App } from 'vue'

const components = [Tabs, TabPane]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export { Tabs, TabPane, install }
export type { TabOption } from './Tabs'
export default { install }

