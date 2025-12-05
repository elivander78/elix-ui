import type { PropType } from 'vue'

export type SliderSize = 'sm' | 'md' | 'lg'
export type SliderTooltip = 'always' | 'hover' | 'none'

export interface SliderProps {
  modelValue: number | [number, number]
  min?: number
  max?: number
  step?: number
  range?: boolean
  tooltip?: SliderTooltip
  marks?: Record<number, string>
  disabled?: boolean
  size?: SliderSize
}

export const sliderProps = {
  modelValue: {
    type: [Number, Array] as PropType<number | [number, number]>,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  range: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: String as PropType<SliderTooltip>,
    default: 'hover' as SliderTooltip,
  },
  marks: {
    type: Object as PropType<Record<number, string>>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<SliderSize>,
    default: 'md' as SliderSize,
  },
}

