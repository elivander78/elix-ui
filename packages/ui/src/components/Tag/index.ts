import Tag from './Tag.vue'
import type { App } from 'vue'

Tag.install = (app: App) => {
  app.component(Tag.name, Tag)
}

export { Tag }
export default Tag

