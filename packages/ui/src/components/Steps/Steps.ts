import type { PropType, VNode } from 'vue'

export type StepsDirection = 'horizontal' | 'vertical'
export type StepsStatus = 'process' | 'error' | 'finish' | 'wait'
export type StepsSize = 'sm' | 'md'

export interface StepsProps {
  current: number
  direction?: StepsDirection
  status?: StepsStatus
  size?: StepsSize
}

export const stepsProps = {
  current: {
    type: Number,
    required: true,
  },
  direction: {
    type: String as PropType<StepsDirection>,
    default: 'horizontal' as StepsDirection,
  },
  status: {
    type: String as PropType<StepsStatus>,
    default: undefined,
  },
  size: {
    type: String as PropType<StepsSize>,
    default: 'md' as StepsSize,
  },
}

export interface StepProps {
  title: string
  description?: string
  icon?: VNode
  status?: StepsStatus
}

export const stepProps = {
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
  status: {
    type: String as PropType<StepsStatus>,
    default: undefined,
  },
}

