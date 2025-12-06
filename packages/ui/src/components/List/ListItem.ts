import type { PropType, VNode } from 'vue'

export interface ListItemProps {
  title?: string
  description?: string
  icon?: VNode
  extra?: VNode
  clickable?: boolean
}

export const listItemProps = {
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: Object as PropType<VNode>,
    default: undefined,
  },
  extra: {
    type: Object as PropType<VNode>,
    default: undefined,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
}

