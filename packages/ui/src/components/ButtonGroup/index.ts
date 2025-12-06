import ButtonGroup from './ButtonGroup.vue'
import type { App } from 'vue'

ButtonGroup.install = (app: App) => {
  app.component(ButtonGroup.name || 'EuiButtonGroup', ButtonGroup)
}

export { ButtonGroup }
export type { ButtonGroupProps, ButtonGroupSize, ButtonGroupVariant, ButtonGroupAppearance } from './ButtonGroup'
export default ButtonGroup

