import Stack from './Stack.vue'
import type { App } from 'vue'

Stack.install = (app: App) => {
  app.component(Stack.name, Stack)
}

export { Stack }
export default Stack

