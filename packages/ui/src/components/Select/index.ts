import Select from './Select.vue'
import type { App } from 'vue'

Select.install = (app: App) => {
  app.component(Select.name, Select)
}

export { Select }
export type { SelectProps, SelectSize, SelectState, SelectOption } from './Select'
export default Select

