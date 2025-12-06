import type { PropType } from 'vue'

export type ListSize = 'sm' | 'md' | 'lg'
export type ListAppearance = 'border' | 'shadow' | 'border-shadow'

export interface ListProps {
  bordered?: boolean
  hoverable?: boolean
  size?: ListSize
  appearance?: ListAppearance
}

export const listProps = {
  bordered: {
    type: Boolean,
    default: false,
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ListSize>,
    default: 'md' as ListSize,
  },
  appearance: {
    type: String as PropType<ListAppearance>,
    default: 'border' as ListAppearance,
  },
}

