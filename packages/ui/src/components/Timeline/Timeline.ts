import type { PropType } from 'vue'

export interface TimelineProps {
  reverse?: boolean
}

export const timelineProps = {
  reverse: {
    type: Boolean,
    default: false,
  },
}

export interface TimelineItemProps {
  title?: string
  time?: string
  dot?: any
  color?: 'primary' | 'success' | 'warning' | 'error' | string
}

export const timelineItemProps = {
  title: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '',
  },
  dot: {
    type: [Object, String] as PropType<any>,
    default: undefined,
  },
  color: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'error' | string>,
    default: 'primary' as const,
  },
}

