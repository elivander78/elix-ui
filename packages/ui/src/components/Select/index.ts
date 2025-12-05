import Select from './Select.vue'
import type { App } from 'vue'

Select.install = (app: App) => {
  app.component(Select.name || 'EuiSelect', Select)
}

export { Select }
export type { SelectProps, SelectSize, SelectState, SelectOption } from './Select'
export default Select

