import Spinner from './Spinner.vue'
import type { App } from 'vue'

Spinner.install = (app: App) => {
  app.component(Spinner.name || 'EuiSpinner', Spinner)
}

export { Spinner }
export default Spinner

