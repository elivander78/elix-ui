import type { PropType } from 'vue'

export type InputSize = 'xs' | 'sm' | 'md' | 'lg'
export type InputState = 'default' | 'error' | 'success' | 'warning'

export interface InputProps {
  modelValue?: string | number
  size?: InputSize
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  state?: InputState
  clearable?: boolean
}

export const inputProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  size: {
    type: String as PropType<InputSize>,
    default: 'md' as InputSize,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String as PropType<InputState>,
    default: 'default' as InputState,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
}

