import type { PropType } from 'vue'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'text'
export type ButtonShape = 'rounded' | 'pill' | 'square'

export interface ButtonProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  shape?: ButtonShape
  nativeType?: 'button' | 'submit' | 'reset'
  block?: boolean
}

export const buttonProps = {
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md' as ButtonSize,
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'primary' as ButtonType,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'rounded' as ButtonShape,
  },
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  block: {
    type: Boolean,
    default: false,
  },
}

