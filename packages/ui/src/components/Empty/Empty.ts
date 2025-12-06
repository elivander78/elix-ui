import type { PropType, VNode } from 'vue'

export type EmptySize = 'sm' | 'md' | 'lg'

export interface EmptyProps {
  description?: string
  icon?: VNode
  size?: EmptySize
}

export const emptyProps = {
  description: {
    type: String,
    default: 'No data',
  },
  icon: {
    type: Object as PropType<VNode>,
    default: undefined,
  },
  size: {
    type: String as PropType<EmptySize>,
    default: 'md' as EmptySize,
  },
}

