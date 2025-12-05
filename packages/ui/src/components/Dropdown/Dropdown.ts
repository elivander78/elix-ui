import type { PropType, VNode } from 'vue'

export type DropdownTrigger = 'click' | 'hover' | 'contextmenu'
export type DropdownPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'

export interface DropdownItem {
  label: string
  icon?: VNode
  key: string | number
  disabled?: boolean
  danger?: boolean
  divider?: boolean
}

export interface DropdownProps {
  trigger?: DropdownTrigger
  placement?: DropdownPlacement
  disabled?: boolean
  items?: DropdownItem[]
}

export const dropdownProps = {
  trigger: {
    type: String as PropType<DropdownTrigger>,
    default: 'click' as DropdownTrigger,
  },
  placement: {
    type: String as PropType<DropdownPlacement>,
    default: 'bottom-start' as DropdownPlacement,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array as PropType<DropdownItem[]>,
    default: undefined,
  },
}

