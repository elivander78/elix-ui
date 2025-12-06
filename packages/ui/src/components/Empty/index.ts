import Empty from './Empty.vue'
import type { App } from 'vue'

Empty.install = (app: App) => {
  app.component(Empty.name || 'EuiEmpty', Empty)
}

export { Empty }
export type { EmptyProps, EmptySize } from './Empty'
export default Empty

