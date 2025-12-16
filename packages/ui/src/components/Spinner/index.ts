import Spinner from './Spinner.vue'
import type { App } from 'vue'

Spinner.install = (app: App) => {
  app.component(Spinner.name, Spinner)
}

export { Spinner }
export default Spinner

