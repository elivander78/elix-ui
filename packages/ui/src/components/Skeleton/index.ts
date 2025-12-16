import Skeleton from './Skeleton.vue'
import type { App } from 'vue'

Skeleton.install = (app: App) => {
  app.component(Skeleton.name, Skeleton)
}

export { Skeleton }
export default Skeleton

