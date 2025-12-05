import type { PropType, VNode } from 'vue'

export type AlertType = 'success' | 'info' | 'warning' | 'error'
export type AlertVariant = 'soft' | 'solid' | 'outlined'
export type AlertAppearance = 'border' | 'shadow' | 'border-shadow' | 'none'

export interface AlertProps {
  type?: AlertType
  title?: string
  description?: string
  closable?: boolean
  icon?: boolean | VNode
  appearance?: AlertAppearance
  variant?: AlertVariant
}

export const alertProps = {
  type: {
    type: String as PropType<AlertType>,
    default: 'info' as AlertType,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  closable: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [Boolean, Object] as PropType<boolean | VNode>,
    default: true,
  },
  appearance: {
    type: String as PropType<AlertAppearance>,
    default: 'border' as AlertAppearance,
  },
  variant: {
    type: String as PropType<AlertVariant>,
    default: 'soft' as AlertVariant,
  },
}

