import Skeleton from './Skeleton.vue'
import type { App } from 'vue'

Skeleton.install = (app: App) => {
  app.component(Skeleton.name || 'EuiSkeleton', Skeleton)
}

export { Skeleton }
export default Skeleton

