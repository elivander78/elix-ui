import type { PropType } from 'vue'

export type AccordionStyle = 'default' | 'shadow' | 'bordered' | 'splitted'

export interface AccordionProps {
  modelValue?: string | number
  style?: AccordionStyle
}

export const accordionProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number | undefined>,
    default: undefined,
  },
  style: {
    type: String as PropType<AccordionStyle>,
    default: 'default' as AccordionStyle,
  },
}

export interface AccordionItemProps {
  name: string | number
  title?: string
  description?: string
  disabled?: boolean
}

export const accordionItemProps = {
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

