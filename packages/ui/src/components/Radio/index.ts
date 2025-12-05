import Radio from './Radio.vue'
import type { App } from 'vue'

Radio.install = (app: App) => {
  app.component(Radio.name || 'EuiRadio', Radio)
}

export { Radio }
export default Radio

