import Form from './Form.vue'
import FormItem from './FormItem.vue'
import type { App } from 'vue'

const components = [Form, FormItem]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name || component.__name, component)
  })
}

export { Form, FormItem, install }
export type { FormRules } from './Form'
export default { install }

