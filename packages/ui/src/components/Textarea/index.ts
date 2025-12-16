import Textarea from './Textarea.vue'
import type { App } from 'vue'

Textarea.install = (app: App) => {
  app.component(Textarea.name, Textarea)
}

export { Textarea }
export default Textarea

