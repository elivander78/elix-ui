import Empty from './Empty.vue'
import type { App } from 'vue'

Empty.install = (app: App) => {
  app.component(Empty.name, Empty)
}

export { Empty }
export type { EmptyProps, EmptySize } from './Empty'
export default Empty

