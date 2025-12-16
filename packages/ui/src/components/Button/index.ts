import Button from './Button.vue'
import type { App } from 'vue'

Button.install = (app: App) => {
  app.component(Button.name, Button)
}

export { Button }
export type { ButtonProps, ButtonSize, ButtonType, ButtonShape } from './Button'
export default Button

