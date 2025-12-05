import type { PropType } from 'vue'

export type DatePickerSize = 'sm' | 'md' | 'lg'
export type DatePickerStatus = 'default' | 'error' | 'success'
export type DatePickerAppearance = 'border' | 'shadow' | 'border-shadow'

export interface BaseDatePickerProps {
  modelValue?: Date | string | null
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  format?: string
  clearable?: boolean
  size?: DatePickerSize
  status?: DatePickerStatus
  appearance?: DatePickerAppearance
}

export const baseDatePickerProps = {
  modelValue: {
    type: [Date, String] as PropType<Date | string | null>,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Select date',
  },
  format: {
    type: String,
    default: 'DD.MM.YYYY',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<DatePickerSize>,
    default: 'md' as DatePickerSize,
  },
  status: {
    type: String as PropType<DatePickerStatus>,
    default: 'default' as DatePickerStatus,
  },
  appearance: {
    type: String as PropType<DatePickerAppearance>,
    default: 'border' as DatePickerAppearance,
  },
}

