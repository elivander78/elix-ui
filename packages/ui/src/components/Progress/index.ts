import Progress from './Progress.vue'
import type { App } from 'vue'

Progress.install = (app: App) => {
  app.component(Progress.name, Progress)
}

export { Progress }
export default Progress

