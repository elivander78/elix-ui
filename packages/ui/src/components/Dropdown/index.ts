import Dropdown from './Dropdown.vue'
import type { App } from 'vue'

Dropdown.install = (app: App) => {
  app.component(Dropdown.name || 'EuiDropdown', Dropdown)
}

export { Dropdown }
export type { DropdownProps, DropdownItem, DropdownTrigger, DropdownPlacement } from './Dropdown'
export default Dropdown

