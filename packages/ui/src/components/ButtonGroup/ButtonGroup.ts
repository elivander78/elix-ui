import type { PropType } from 'vue'
import type { ButtonSize, ButtonType, ButtonAppearance } from '../Button/Button'

export type ButtonGroupSize = ButtonSize
export type ButtonGroupVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonGroupAppearance = ButtonAppearance

export interface ButtonGroupProps {
  size?: ButtonGroupSize
  variant?: ButtonGroupVariant
  segmented?: boolean
  appearance?: ButtonGroupAppearance
}

export const buttonGroupProps = {
  size: {
    type: String as PropType<ButtonGroupSize>,
    default: 'md' as ButtonGroupSize,
  },
  variant: {
    type: String as PropType<ButtonGroupVariant>,
    default: 'primary' as ButtonGroupVariant,
  },
  segmented: {
    type: Boolean,
    default: false,
  },
  appearance: {
    type: String as PropType<ButtonGroupAppearance>,
    default: 'border' as ButtonGroupAppearance,
  },
}

