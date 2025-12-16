import Input from './Input.vue'
import type { App } from 'vue'

Input.install = (app: App) => {
  app.component(Input.name, Input)
}

export { Input }
export type { InputProps, InputSize, InputState } from './Input'
export default Input

