import type { PropType } from 'vue'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'text'
export type ButtonShape = 'rounded' | 'pill' | 'square'
export type ButtonAppearance = 'border' | 'shadow' | 'border-shadow'

export interface ButtonProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  shape?: ButtonShape
  nativeType?: 'button' | 'submit' | 'reset'
  block?: boolean
  appearance?: ButtonAppearance
}

export const buttonProps = {
  size: {
    type: String as PropType<ButtonSize>,
    default: undefined,
  },
  type: {
    type: String as PropType<ButtonType>,
    default: undefined,
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
  appearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'border' as ButtonAppearance,
  },
}

