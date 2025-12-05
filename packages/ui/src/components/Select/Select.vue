<template>
  <div ref="wrapperRef" :class="wrapperClasses" @click="toggleDropdown">
    <div :class="selectClasses">
      <!-- Multiple mode: show tags -->
      <template v-if="multiple">
        <div v-if="selectedOptions.length > 0" class="eui-select__tags">
          <span
            v-for="(option, index) in selectedOptions"
            :key="option.value"
            class="eui-select__tag"
          >
            {{ option.label }}
            <span
              class="eui-select__tag-close"
              @click.stop="handleRemoveTag(option.value)"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M9 3L3 9M3 3l6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </span>
        </div>
        <span v-else class="eui-select__placeholder">{{ placeholder }}</span>
      </template>
      <!-- Single mode: show selected option -->
      <template v-else>
        <span v-if="selectedOption" class="eui-select__selected">
          {{ selectedOption.label }}
        </span>
        <span v-else class="eui-select__placeholder">{{ placeholder }}</span>
      </template>
    </div>
    <span v-if="clearable && hasValue && !disabled" class="eui-select__clear" @click.stop="handleClear">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="eui-select__arrow">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <Teleport to="body">
      <div v-if="isOpen" ref="dropdownRef" :class="dropdownClasses">
        <div v-if="filterable" class="eui-select-dropdown__search">
          <input
            ref="searchInputRef"
            v-model="filterQuery"
            type="text"
            class="eui-select-search"
            placeholder="Search..."
            @click.stop
          />
        </div>
        <div class="eui-select-dropdown__options">
          <div
            v-for="option in filteredOptions"
            :key="option.value"
            :class="optionClasses(option)"
            @click="handleSelect(option)"
          >
            <span v-if="multiple" class="eui-select-option__check">
              <svg
                v-if="selectedValues.includes(option.value)"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.333 4L6 11.333 2.667 8"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            {{ option.label }}
          </div>
          <div v-if="filteredOptions.length === 0" class="eui-select__empty">No options</div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { selectProps, type SelectProps, type SelectOption } from './Select'

const props = defineProps(selectProps)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[] | undefined]
  change: [value: string | number | (string | number)[] | undefined]
  clear: []
}>()

const isOpen = ref(false)
const filterQuery = ref('')
const dropdownRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()
const searchInputRef = ref<HTMLInputElement>()

const isMultiple = computed(() => props.multiple)

const selectedValues = computed(() => {
  if (isMultiple.value) {
    return Array.isArray(props.modelValue) ? props.modelValue : []
  }
  return []
})

const selectedOption = computed(() => {
  if (isMultiple.value) return null
  return props.options.find((opt) => opt.value === props.modelValue)
})

const selectedOptions = computed(() => {
  if (!isMultiple.value) return []
  return props.options.filter((opt) => selectedValues.value.includes(opt.value))
})

const filteredOptions = computed(() => {
  if (!props.filterable || !filterQuery.value) {
    return props.options
  }
  const query = filterQuery.value.toLowerCase()
  return props.options.filter((opt) => opt.label.toLowerCase().includes(query))
})

const wrapperClasses = computed(() => {
  return [
    'eui-select-wrapper',
    `eui-select-wrapper--${props.size}`,
    `eui-select-wrapper--appearance-${props.appearance}`,
    {
      'eui-select-wrapper--disabled': props.disabled,
      'eui-select-wrapper--error': props.state === 'error',
      'eui-select-wrapper--success': props.state === 'success',
      'eui-select-wrapper--warning': props.state === 'warning',
      'eui-select-wrapper--open': isOpen.value,
    },
  ]
})

const hasValue = computed(() => {
  if (isMultiple.value) {
    return selectedValues.value.length > 0
  }
  return !!props.modelValue
})

const selectClasses = computed(() => {
  return [
    'eui-select',
    {
      'eui-select--placeholder': !hasValue.value,
      'eui-select--multiple': isMultiple.value,
    },
  ]
})

const dropdownClasses = computed(() => {
  return ['eui-select-dropdown']
})

const optionClasses = (option: SelectOption) => {
  const isSelected = isMultiple.value
    ? selectedValues.value.includes(option.value)
    : option.value === props.modelValue
  
  return [
    'eui-select-option',
    {
      'eui-select-option--selected': isSelected,
      'eui-select-option--disabled': option.disabled,
    },
  ]
}

const toggleDropdown = async () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick()
    updateDropdownPosition()
    if (props.filterable) {
      filterQuery.value = ''
      // Focus search input when dropdown opens
      await nextTick()
      searchInputRef.value?.focus()
    }
  }
}

const closeDropdown = () => {
  isOpen.value = false
  filterQuery.value = ''
}

const handleSelect = (option: SelectOption) => {
  if (option.disabled) return
  
  if (isMultiple.value) {
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = currentValues.indexOf(option.value)
    
    if (index > -1) {
      // Remove if already selected
      currentValues.splice(index, 1)
    } else {
      // Add if not selected
      currentValues.push(option.value)
    }
    
    emit('update:modelValue', currentValues)
    emit('change', currentValues)
    // Don't close dropdown in multiple mode
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    closeDropdown()
  }
}

const handleRemoveTag = (value: string | number) => {
  if (!isMultiple.value) return
  
  const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const index = currentValues.indexOf(value)
  
  if (index > -1) {
    currentValues.splice(index, 1)
    emit('update:modelValue', currentValues)
    emit('change', currentValues)
  }
}

const handleClear = (e: Event) => {
  e.stopPropagation()
  const clearedValue = isMultiple.value ? [] : undefined
  emit('update:modelValue', clearedValue)
  emit('change', clearedValue)
  emit('clear')
}

// Handle click outside
const updateDropdownPosition = () => {
  if (dropdownRef.value && wrapperRef.value) {
    const rect = wrapperRef.value.getBoundingClientRect()
    dropdownRef.value.style.top = `${rect.bottom + 4}px`
    dropdownRef.value.style.left = `${rect.left}px`
    dropdownRef.value.style.width = `${rect.width}px`
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownRef.value &&
    wrapperRef.value &&
    !dropdownRef.value.contains(event.target as Node) &&
    !wrapperRef.value.contains(event.target as Node)
  ) {
    closeDropdown()
  }
}

watch(isOpen, (open) => {
  if (open) {
    updateDropdownPosition()
    window.addEventListener('scroll', updateDropdownPosition, true)
    window.addEventListener('resize', updateDropdownPosition)
  } else {
    window.removeEventListener('scroll', updateDropdownPosition, true)
    window.removeEventListener('resize', updateDropdownPosition)
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updateDropdownPosition, true)
  window.removeEventListener('resize', updateDropdownPosition)
})
</script>

<style lang="scss" scoped>
.eui-select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: var(--eui-font-family-sans);

  &--xs {
    .eui-select {
      padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
      font-size: var(--eui-font-size-xs);
      min-height: 24px;
    }
  }

  &--sm {
    .eui-select {
      padding: var(--eui-spacing-xs) var(--eui-spacing-md);
      font-size: var(--eui-font-size-sm);
      min-height: 28px;
    }
  }

  &--md {
    .eui-select {
      padding: var(--eui-spacing-sm) var(--eui-spacing-md);
      font-size: var(--eui-font-size-base);
      min-height: 36px;
    }
  }

  &--lg {
    .eui-select {
      padding: var(--eui-spacing-md) var(--eui-spacing-lg);
      font-size: var(--eui-font-size-lg);
      min-height: 44px;
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;

    .eui-select {
      cursor: not-allowed;
    }
  }

  &--error {
    .eui-select {
      border-color: var(--eui-color-error);
    }

    &.eui-select-wrapper--open .eui-select {
      border-color: var(--eui-color-error);
      box-shadow: 0 0 0 2px var(--eui-color-error-100);
    }
  }

  &--success {
    .eui-select {
      border-color: var(--eui-color-success);
    }

    &.eui-select-wrapper--open .eui-select {
      border-color: var(--eui-color-success);
      box-shadow: 0 0 0 2px var(--eui-color-success-100);
    }
  }

  &--warning {
    .eui-select {
      border-color: var(--eui-color-warning);
    }

    &.eui-select-wrapper--open .eui-select {
      border-color: var(--eui-color-warning);
      box-shadow: 0 0 0 2px var(--eui-color-warning-100);
    }
  }

  &--open {
    .eui-select {
      border-color: var(--eui-border-color-focus);
      box-shadow: 0 0 0 2px var(--eui-color-primary-100);
    }
  }

  // Appearance
  &--appearance-shadow {
    .eui-select {
      border-color: transparent !important;
      box-shadow: 0 0 0 1px var(--eui-border-color) !important;
      
      &:hover:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-border-color-hover) !important;
      }
    }
    
    &.eui-select-wrapper--open .eui-select {
      box-shadow: 0 0 0 1px var(--eui-border-color-focus), 0 0 0 2px var(--eui-color-primary-100) !important;
    }
    
    &.eui-select-wrapper--error .eui-select {
      box-shadow: 0 0 0 1px var(--eui-color-error) !important;
      &.eui-select-wrapper--open {
        box-shadow: 0 0 0 1px var(--eui-color-error), 0 0 0 2px var(--eui-color-error-100) !important;
      }
    }
    
    &.eui-select-wrapper--success .eui-select {
      box-shadow: 0 0 0 1px var(--eui-color-success) !important;
      &.eui-select-wrapper--open {
        box-shadow: 0 0 0 1px var(--eui-color-success), 0 0 0 2px var(--eui-color-success-100) !important;
      }
    }
  }

  &--appearance-border-shadow {
    .eui-select {
      box-shadow: 0 0 0 1px var(--eui-border-color) !important;
      
      &:hover:not(:disabled) {
        box-shadow: 0 0 0 1px var(--eui-border-color-hover) !important;
      }
    }
    
    &.eui-select-wrapper--open .eui-select {
      box-shadow: 0 0 0 1px var(--eui-border-color-focus), 0 0 0 2px var(--eui-color-primary-100) !important;
    }
    
    &.eui-select-wrapper--error .eui-select {
      box-shadow: 0 0 0 1px var(--eui-color-error) !important;
      &.eui-select-wrapper--open {
        box-shadow: 0 0 0 1px var(--eui-color-error), 0 0 0 2px var(--eui-color-error-100) !important;
      }
    }
    
    &.eui-select-wrapper--success .eui-select {
      box-shadow: 0 0 0 1px var(--eui-color-success) !important;
      &.eui-select-wrapper--open {
        box-shadow: 0 0 0 1px var(--eui-color-success), 0 0 0 2px var(--eui-color-success-100) !important;
      }
    }
  }
}

.eui-select {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--eui-spacing-sm) var(--eui-spacing-md);
  padding-right: calc(var(--eui-spacing-md) + 32px);
  font-family: inherit;
  font-size: var(--eui-font-size-base);
  line-height: var(--eui-line-height-normal);
  color: var(--eui-text-primary);
  background-color: var(--eui-bg-primary);
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-md);
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;

  &--placeholder {
    color: var(--eui-text-tertiary);
  }

  &--multiple {
    padding: var(--eui-spacing-xs) var(--eui-spacing-md);
    padding-right: calc(var(--eui-spacing-md) + 32px);
    min-height: auto;
  }

  &:hover:not(:disabled) {
    border-color: var(--eui-border-color-hover);
  }
}

.eui-select__selected {
  flex: 1;
}

.eui-select__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--eui-spacing-xs);
  flex: 1;
  min-width: 0;
}

.eui-select__tag {
  display: inline-flex;
  align-items: center;
  gap: var(--eui-spacing-xs);
  padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
  font-size: var(--eui-font-size-sm);
  color: var(--eui-text-primary);
  background-color: var(--eui-bg-secondary);
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-sm);
  line-height: 1;
}

.eui-select__tag-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  color: var(--eui-text-secondary);
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--eui-text-primary);
  }

  svg {
    width: 10px;
    height: 10px;
  }
}

.eui-select__placeholder {
  flex: 1;
  color: var(--eui-text-tertiary);
}

.eui-select__arrow {
  position: absolute;
  right: var(--eui-spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: var(--eui-text-secondary);
  pointer-events: none;
  transition: transform 0.2s ease-in-out;
}

.eui-select-wrapper--open .eui-select__arrow {
  transform: translateY(-50%) rotate(180deg);
}

.eui-select__clear {
  position: absolute;
  right: calc(var(--eui-spacing-sm) + 20px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  padding: var(--eui-spacing-xs);
  color: var(--eui-text-tertiary);
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  z-index: 1;

  &:hover {
    color: var(--eui-text-primary);
  }

  svg {
    width: 14px;
    height: 14px;
  }
}

.eui-select-dropdown {
  position: fixed;
  z-index: 1000;
  min-width: 200px;
  margin-top: var(--eui-spacing-xs);
  background-color: var(--eui-bg-primary);
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-md);
  box-shadow: var(--eui-shadow-lg);
  max-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.eui-select-dropdown__search {
  padding: var(--eui-spacing-sm);
  border-bottom: 1px solid var(--eui-border-color);
  flex-shrink: 0;
}

.eui-select-search {
  width: 100%;
  padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
  font-size: var(--eui-font-size-base);
  font-family: inherit;
  color: var(--eui-text-primary);
  background-color: var(--eui-bg-primary);
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-sm);
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: var(--eui-color-primary);
  }

  &::placeholder {
    color: var(--eui-text-tertiary);
  }
}

.eui-select-dropdown__options {
  overflow-y: auto;
  max-height: 250px;
}

.eui-select-option {
  display: flex;
  align-items: center;
  gap: var(--eui-spacing-sm);
  padding: var(--eui-spacing-sm) var(--eui-spacing-md);
  font-size: var(--eui-font-size-base);
  color: var(--eui-text-primary);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover:not(&--disabled) {
    background-color: var(--eui-bg-secondary);
  }

  &--selected {
    color: var(--eui-color-primary);
    background-color: var(--eui-color-primary-50);
    font-weight: var(--eui-font-weight-medium);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--eui-color-primary);
  }
}

.eui-select__empty {
  padding: var(--eui-spacing-md);
  text-align: center;
  color: var(--eui-text-tertiary);
  font-size: var(--eui-font-size-sm);
}
</style>

