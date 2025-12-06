import type { PropType, VNode } from 'vue'

export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '500'

export interface ResultProps {
  status: ResultStatus
  title: string
  description?: string
  icon?: VNode
  extra?: VNode
}

export const resultProps = {
  status: {
    type: String as PropType<ResultStatus>,
    required: true,
  },
  title: {
    type: String,
    required: true,
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
}

