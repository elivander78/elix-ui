import List from './List.vue'
import ListItem from './ListItem.vue'
import type { App } from 'vue'

List.install = (app: App) => {
  app.component(List.name || 'EuiList', List)
}

ListItem.install = (app: App) => {
  app.component(ListItem.name || 'EuiListItem', ListItem)
}

export { List, ListItem }
export type { ListProps, ListSize, ListAppearance } from './List'
export type { ListItemProps } from './ListItem'
export default List

