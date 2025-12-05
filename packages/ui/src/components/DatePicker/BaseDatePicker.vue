<template>
  <div :class="wrapperClasses">
    <div
      ref="inputRef"
      :class="inputClasses"
      :tabindex="disabled || readonly ? -1 : 0"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <span v-if="displayValue" class="eui-date-picker__value">{{ displayValue }}</span>
      <span v-else class="eui-date-picker__placeholder">{{ placeholder }}</span>
      <span v-if="clearable && modelValue" class="eui-date-picker__clear" @click.stop="handleClear">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </span>
      <span class="eui-date-picker__icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 2h2a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h2m8 0V0m0 2H4m8 0V0M4 2V0m0 2h8M4 4h8M4 7h8M4 10h8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </div>
    <Teleport to="body">
      <Transition name="eui-date-picker">
        <div v-if="isOpen" ref="calendarRef" :class="calendarClasses" @click.stop>
          <div class="eui-date-picker__calendar-header">
            <button class="eui-date-picker__nav-btn" @click="previousMonth">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
            <div class="eui-date-picker__month-year">
              {{ currentMonthYear }}
            </div>
            <button class="eui-date-picker__nav-btn" @click="nextMonth">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div class="eui-date-picker__calendar-body">
            <div class="eui-date-picker__weekdays">
              <div v-for="day in weekdays" :key="day" class="eui-date-picker__weekday">{{ day }}</div>
            </div>
            <div class="eui-date-picker__days">
              <button
                v-for="day in calendarDays"
                :key="day.key"
                :class="getDayClasses(day)"
                :disabled="day.disabled"
                @click="selectDate(day.date)"
              >
                {{ day.label }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { baseDatePickerProps, type BaseDatePickerProps } from './BaseDatePicker'

defineOptions({
  name: 'EuiBaseDatePicker',
})

const props = defineProps(baseDatePickerProps)

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
}>()

const inputRef = ref<HTMLElement>()
const calendarRef = ref<HTMLElement>()
const isOpen = ref(false)
const currentDate = ref(new Date())

// Update currentDate when modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    let date: Date
    if (typeof newValue === 'string') {
      date = new Date(newValue)
    } else if (newValue instanceof Date) {
      date = newValue
    } else {
      return
    }
    if (!isNaN(date.getTime())) {
      currentDate.value = new Date(date.getFullYear(), date.getMonth(), 1)
    }
  }
}, { immediate: true })

const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  let date: Date
  if (typeof props.modelValue === 'string') {
    date = new Date(props.modelValue)
  } else if (props.modelValue instanceof Date) {
    date = props.modelValue
  } else {
    return ''
  }
  if (isNaN(date.getTime())) return ''
  
  return formatDate(date, props.format)
})

const wrapperClasses = computed(() => {
  return [
    'eui-date-picker-wrapper',
    `eui-date-picker-wrapper--${props.size}`,
    `eui-date-picker-wrapper--appearance-${props.appearance}`,
    {
      'eui-date-picker-wrapper--disabled': props.disabled,
      'eui-date-picker-wrapper--readonly': props.readonly,
      'eui-date-picker-wrapper--error': props.status === 'error',
      'eui-date-picker-wrapper--success': props.status === 'success',
    },
  ]
})

const inputClasses = computed(() => {
  return ['eui-date-picker__input']
})

const calendarClasses = computed(() => {
  return ['eui-date-picker__calendar']
})

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - (firstDay.getDay() || 7) + 1) // Start from Monday
  
  const days: Array<{ key: string; label: number; date: Date; disabled: boolean; isCurrentMonth: boolean; isSelected: boolean }> = []
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const isCurrentMonth = date.getMonth() === month
    const isSelected = props.modelValue ? isSameDay(date, props.modelValue) : false
    
    days.push({
      key: `${date.getTime()}`,
      label: date.getDate(),
      date,
      disabled: props.disabled || false,
      isCurrentMonth,
      isSelected: !!isSelected,
    })
  }
  
  return days
})

const formatDate = (date: Date, format: string): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', String(year))
    .replace('YY', String(year).slice(-2))
}

const isSameDay = (date1: Date, date2: Date | string | null): boolean => {
  if (!date2) return false
  let d2: Date
  if (typeof date2 === 'string') {
    d2 = new Date(date2)
  } else if (date2 instanceof Date) {
    d2 = date2
  } else {
    return false
  }
  if (isNaN(d2.getTime())) return false
  return date1.getDate() === d2.getDate() &&
    date1.getMonth() === d2.getMonth() &&
    date1.getFullYear() === d2.getFullYear()
}

const getDayClasses = (day: any) => {
  return [
    'eui-date-picker__day',
    {
      'eui-date-picker__day--other-month': !day.isCurrentMonth,
      'eui-date-picker__day--selected': day.isSelected,
      'eui-date-picker__day--today': isSameDay(day.date, new Date()),
    },
  ]
}

const handleClick = () => {
  if (props.disabled || props.readonly) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    updatePosition()
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) return
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    isOpen.value = !isOpen.value
  } else if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault()
    isOpen.value = false
  }
}

const handleClear = () => {
  emit('update:modelValue', null)
}

const selectDate = (date: Date) => {
  emit('update:modelValue', date)
  isOpen.value = false
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const updatePosition = () => {
  if (!calendarRef.value || !inputRef.value || !isOpen.value) return
  const rect = inputRef.value.getBoundingClientRect()
  calendarRef.value.style.top = `${rect.bottom + 8}px`
  calendarRef.value.style.left = `${rect.left}px`
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    calendarRef.value &&
    inputRef.value &&
    !calendarRef.value.contains(event.target as Node) &&
    !inputRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', updatePosition, true)
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
})
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-date-picker-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;

  &--sm {
    .eui-date-picker__input {
      padding: var(--eui-spacing-xs) var(--eui-spacing-md);
      font-size: var(--eui-font-size-sm);
      min-height: 28px;
    }
  }

  &--md {
    .eui-date-picker__input {
      padding: var(--eui-spacing-sm) var(--eui-spacing-md);
      font-size: var(--eui-font-size-base);
      min-height: 36px;
    }
  }

  &--lg {
    .eui-date-picker__input {
      padding: var(--eui-spacing-md) var(--eui-spacing-lg);
      font-size: var(--eui-font-size-lg);
      min-height: 44px;
    }
  }
}

.eui-date-picker__input {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--eui-spacing-sm) var(--eui-spacing-md);
  font-family: var(--eui-font-family-sans);
  font-size: var(--eui-font-size-base);
  line-height: var(--eui-line-height-normal);
  color: var(--eui-text-primary);
  background-color: var(--eui-bg-primary);
  @include border-shadow(var(--eui-border-color), 1px);
  border-radius: var(--eui-radius-md);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover:not(:disabled) {
    @include border-shadow(var(--eui-border-color-hover), 1px);
  }

  &:focus {
    @include border-shadow(var(--eui-border-color-focus), 1px);
    box-shadow: 0 0 0 2px var(--eui-focus-ring-primary);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.eui-date-picker__value {
  flex: 1;
  text-align: left;
}

.eui-date-picker__placeholder {
  flex: 1;
  text-align: left;
  color: var(--eui-text-tertiary);
}

.eui-date-picker__clear {
  display: flex;
  align-items: center;
  padding: var(--eui-spacing-xs);
  margin-right: var(--eui-spacing-xs);
  color: var(--eui-text-tertiary);
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--eui-text-primary);
  }
}

.eui-date-picker__icon {
  display: flex;
  align-items: center;
  color: var(--eui-text-tertiary);
}

.eui-date-picker__calendar {
  position: fixed;
  z-index: 1500;
  min-width: 280px;
  padding: var(--eui-spacing-md);
  background-color: var(--eui-bg-primary);
  @include border-shadow(var(--eui-border-color), 1px);
  border-radius: var(--eui-radius-lg);
  box-shadow: var(--eui-shadow-lg);
}

.eui-date-picker__calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--eui-spacing-md);
}

.eui-date-picker__nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: var(--eui-text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--eui-radius-md);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-secondary);
  }
}

.eui-date-picker__month-year {
  font-size: var(--eui-font-size-base);
  font-weight: var(--eui-font-weight-semibold);
  color: var(--eui-text-primary);
}

.eui-date-picker__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--eui-spacing-xs);
  margin-bottom: var(--eui-spacing-xs);
}

.eui-date-picker__weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: var(--eui-font-size-xs);
  font-weight: var(--eui-font-weight-medium);
  color: var(--eui-text-tertiary);
}

.eui-date-picker__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--eui-spacing-xs);
}

.eui-date-picker__day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: var(--eui-font-size-sm);
  color: var(--eui-text-primary);
  background: transparent;
  border: none;
  border-radius: var(--eui-radius-md);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: var(--eui-bg-secondary);
  }

  &--selected {
    color: var(--eui-text-inverse);
    background-color: var(--eui-color-primary);
    font-weight: var(--eui-font-weight-semibold);
  }

  &--today {
    border: 1px solid var(--eui-color-primary);
  }

  &--other-month {
    color: var(--eui-text-tertiary);
    opacity: 0.5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// Transitions
.eui-date-picker-enter-active,
.eui-date-picker-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.eui-date-picker-enter-from,
.eui-date-picker-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
}
</style>

