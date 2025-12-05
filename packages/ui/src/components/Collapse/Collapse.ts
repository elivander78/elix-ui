import type { PropType } from 'vue'

export type CollapseAppearance = 'border' | 'shadow' | 'border-shadow'

export interface CollapseProps {
  modelValue?: string | number | (string | number)[]
  accordion?: boolean
  bordered?: boolean
  appearance?: CollapseAppearance
}

export const collapseProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
    default: undefined,
  },
  accordion: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  appearance: {
    type: String as PropType<CollapseAppearance>,
    default: 'border' as CollapseAppearance,
  },
}

export interface CollapseItemProps {
  name: string | number
  title?: string
  disabled?: boolean
}

export const collapseItemProps = {
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

