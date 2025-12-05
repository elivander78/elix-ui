import type { PropType } from 'vue'

export type SelectSize = 'xs' | 'sm' | 'md' | 'lg'
export type SelectState = 'default' | 'error' | 'success' | 'warning'
export type SelectAppearance = 'border' | 'shadow' | 'border-shadow'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface SelectProps {
  modelValue?: string | number | (string | number)[]
  options?: SelectOption[]
  size?: SelectSize
  placeholder?: string
  disabled?: boolean
  state?: SelectState
  clearable?: boolean
  filterable?: boolean
  multiple?: boolean
  appearance?: SelectAppearance
}

export const selectProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | (string | number)[] | undefined>,
    default: undefined,
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => [],
  },
  size: {
    type: String as PropType<SelectSize>,
    default: 'md' as SelectSize,
  },
  placeholder: {
    type: String,
    default: 'Please select',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String as PropType<SelectState>,
    default: 'default' as SelectState,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  appearance: {
    type: String as PropType<SelectAppearance>,
    default: 'border' as SelectAppearance,
  },
}

