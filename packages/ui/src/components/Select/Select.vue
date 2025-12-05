<template>
  <div ref="wrapperRef" :class="wrapperClasses" @click="toggleDropdown">
    <div :class="selectClasses">
      <span v-if="selectedOption" class="eui-select__selected">
        {{ selectedOption.label }}
      </span>
      <span v-else class="eui-select__placeholder">{{ placeholder }}</span>
    </div>
    <span v-if="clearable && modelValue && !disabled" class="eui-select__clear" @click.stop="handleClear">
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
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          :class="optionClasses(option)"
          @click="handleSelect(option)"
        >
          {{ option.label }}
        </div>
        <div v-if="filteredOptions.length === 0" class="eui-select__empty">No options</div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { selectProps, type SelectProps, type SelectOption } from './Select'

const props = defineProps(selectProps)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
  change: [value: string | number | undefined]
  clear: []
}>()

const isOpen = ref(false)
const filterQuery = ref('')
const dropdownRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()

const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue)
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
    {
      'eui-select-wrapper--disabled': props.disabled,
      'eui-select-wrapper--error': props.state === 'error',
      'eui-select-wrapper--success': props.state === 'success',
      'eui-select-wrapper--warning': props.state === 'warning',
      'eui-select-wrapper--open': isOpen.value,
    },
  ]
})

const selectClasses = computed(() => {
  return [
    'eui-select',
    {
      'eui-select--placeholder': !selectedOption.value,
    },
  ]
})

const dropdownClasses = computed(() => {
  return ['eui-select-dropdown']
})

const optionClasses = (option: SelectOption) => {
  return [
    'eui-select-option',
    {
      'eui-select-option--selected': option.value === props.modelValue,
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
    }
  }
}

const closeDropdown = () => {
  isOpen.value = false
  filterQuery.value = ''
}

const handleSelect = (option: SelectOption) => {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  closeDropdown()
}

const handleClear = (e: Event) => {
  e.stopPropagation()
  emit('update:modelValue', undefined)
  emit('change', undefined)
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

  &:hover:not(:disabled) {
    border-color: var(--eui-border-color-hover);
  }
}

.eui-select__selected {
  flex: 1;
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
  overflow-y: auto;
}

.eui-select-option {
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
}

.eui-select__empty {
  padding: var(--eui-spacing-md);
  text-align: center;
  color: var(--eui-text-tertiary);
  font-size: var(--eui-font-size-sm);
}
</style>

