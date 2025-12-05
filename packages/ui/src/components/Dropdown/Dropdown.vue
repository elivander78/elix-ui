<template>
  <div class="eui-dropdown-wrapper" ref="wrapperRef">
    <div
      :tabindex="!props.disabled ? 0 : undefined"
      @click.stop="!props.disabled && props.trigger === 'click' && toggleDropdown()"
      @contextmenu.prevent="!props.disabled && props.trigger === 'contextmenu' && toggleDropdown()"
      @mouseenter="!props.disabled && props.trigger === 'hover' ? showDropdown() : undefined"
      @mouseleave="!props.disabled && props.trigger === 'hover' ? hideDropdown() : undefined"
      @keydown="handleKeydown"
      :style="{ display: 'inline-block', outline: 'none' }"
    >
      <slot name="trigger" />
    </div>
    <Teleport to="body">
      <Transition name="eui-dropdown">
        <div
          v-if="isVisible"
          ref="dropdownRef"
          :class="dropdownClasses"
          :style="dropdownStyle"
          @mouseenter="props.trigger === 'hover' ? showDropdown() : undefined"
          @mouseleave="props.trigger === 'hover' ? hideDropdown() : undefined"
        >
          <div v-if="items && items.length > 0" class="eui-dropdown__menu" role="menu">
            <div
              v-for="(item, index) in items"
              :key="item.key"
              :class="getItemClasses(item)"
              :tabindex="item.disabled ? -1 : 0"
              role="menuitem"
              @click="handleItemClick(item)"
              @keydown="handleItemKeydown($event, item)"
              @mouseenter="hoveredIndex = index"
              @mouseleave="hoveredIndex = null"
            >
              <span v-if="item.icon" class="eui-dropdown__item-icon">
                <component :is="item.icon" />
              </span>
              <span class="eui-dropdown__item-label">{{ item.label }}</span>
            </div>
          </div>
          <div v-else class="eui-dropdown__menu" role="menu">
            <slot name="menu" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { dropdownProps, type DropdownProps, type DropdownItem } from './Dropdown'

defineOptions({
  name: 'EuiDropdown',
})

const props = defineProps(dropdownProps)

const emit = defineEmits<{
  select: [item: DropdownItem]
}>()

const isVisible = ref(false)
const dropdownRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()
const hoveredIndex = ref<number | null>(null)

const items = computed(() => props.items)

const dropdownClasses = computed(() => {
  return [
    'eui-dropdown',
    `eui-dropdown--${props.placement || 'bottom-start'}`,
  ]
})

const dropdownStyle = computed(() => {
  return {}
})

const getItemClasses = (item: DropdownItem) => {
  return [
    'eui-dropdown__item',
    {
      'eui-dropdown__item--disabled': item.disabled,
      'eui-dropdown__item--danger': item.danger,
      'eui-dropdown__item--divider': item.divider,
      'eui-dropdown__item--hovered': hoveredIndex.value !== null && items.value?.indexOf(item) === hoveredIndex.value,
    },
  ]
}

const toggleDropdown = async () => {
  if (props.disabled) return
  if (props.trigger === 'click' || props.trigger === 'contextmenu') {
    isVisible.value = !isVisible.value
    if (isVisible.value) {
      await nextTick()
      updatePosition()
    }
  }
}

const showDropdown = async () => {
  if (props.disabled) return
  if (props.trigger === 'hover') {
    if (!isVisible.value) {
      isVisible.value = true
      await nextTick()
      updatePosition()
    }
  }
}

const hideDropdown = () => {
  if (props.trigger === 'hover') {
    isVisible.value = false
  }
}

const updatePosition = () => {
  if (!dropdownRef.value || !wrapperRef.value) return

  const wrapperRect = wrapperRef.value.getBoundingClientRect()
  const dropdownRect = dropdownRef.value.getBoundingClientRect()
  const placement = props.placement || 'bottom-start'

  let top = 0
  let left = 0

  const gap = 8

  // Parse placement
  const [position, align] = placement.split('-') as [string, string?]

  switch (position) {
    case 'top':
      top = wrapperRect.top - dropdownRect.height - gap
      left = align === 'start' ? wrapperRect.left : align === 'end' ? wrapperRect.right - dropdownRect.width : wrapperRect.left + (wrapperRect.width - dropdownRect.width) / 2
      break
    case 'bottom':
      top = wrapperRect.bottom + gap
      left = align === 'start' ? wrapperRect.left : align === 'end' ? wrapperRect.right - dropdownRect.width : wrapperRect.left + (wrapperRect.width - dropdownRect.width) / 2
      break
    case 'left':
      top = align === 'start' ? wrapperRect.top : align === 'end' ? wrapperRect.bottom - dropdownRect.height : wrapperRect.top + (wrapperRect.height - dropdownRect.height) / 2
      left = wrapperRect.left - dropdownRect.width - gap
      break
    case 'right':
      top = align === 'start' ? wrapperRect.top : align === 'end' ? wrapperRect.bottom - dropdownRect.height : wrapperRect.top + (wrapperRect.height - dropdownRect.height) / 2
      left = wrapperRect.right + gap
      break
  }

  dropdownRef.value.style.top = `${top}px`
  dropdownRef.value.style.left = `${left}px`
}

const handleItemClick = (item: DropdownItem) => {
  if (item.disabled || item.divider) return
  emit('select', item)
  if (props.trigger === 'click' || props.trigger === 'contextmenu') {
    isVisible.value = false
  }
}

const handleItemKeydown = (event: KeyboardEvent, item: DropdownItem) => {
  if (item.disabled || item.divider) return
  
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleItemClick(item)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return
  
  if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
    event.preventDefault()
    if (!isVisible.value) {
      toggleDropdown()
    }
  } else if (event.key === 'Escape' && isVisible.value) {
    event.preventDefault()
    isVisible.value = false
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (props.trigger === 'click' || props.trigger === 'contextmenu') {
    if (isVisible.value) {
      setTimeout(() => {
        if (
          dropdownRef.value &&
          wrapperRef.value &&
          !dropdownRef.value.contains(event.target as Node) &&
          !wrapperRef.value.contains(event.target as Node)
        ) {
          isVisible.value = false
        }
      }, 0)
    }
  }
}

onMounted(() => {
  if (props.trigger === 'click' || props.trigger === 'contextmenu') {
    document.addEventListener('click', handleClickOutside)
  }
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

.eui-dropdown-wrapper {
  display: inline-block;
  position: relative;
}

.eui-dropdown {
  position: fixed;
  z-index: 1500;
  min-width: 160px;
  background-color: var(--eui-bg-primary);
  @include border-shadow(var(--eui-border-color), 1px);
  border-radius: var(--eui-radius-md);
  box-shadow: var(--eui-shadow-lg);
  overflow: hidden;
}

.eui-dropdown__menu {
  padding: var(--eui-spacing-xs) 0;
  list-style: none;
  margin: 0;
}

.eui-dropdown__item {
  display: flex;
  align-items: center;
  gap: var(--eui-spacing-sm);
  width: 100%;
  padding: var(--eui-spacing-sm) var(--eui-spacing-md);
  font-size: var(--eui-font-size-sm);
  line-height: var(--eui-line-height-normal);
  color: var(--eui-text-primary);
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  text-align: left;

  &:hover:not(&--disabled):not(&--divider),
  &--hovered:not(&--disabled):not(&--divider) {
    background-color: var(--eui-bg-secondary);
  }

  &:focus-visible:not(&--disabled):not(&--divider) {
    background-color: var(--eui-bg-secondary);
    outline: 2px solid var(--eui-border-color-focus);
    outline-offset: -2px;
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--danger {
    color: var(--eui-color-error);

    &:hover:not(&--disabled),
    &--hovered:not(&--disabled) {
      background-color: var(--eui-color-error-50);
      color: var(--eui-color-error-700);
    }
  }

  &--divider {
    height: 1px;
    padding: 0;
    margin: var(--eui-spacing-xs) 0;
    background-color: var(--eui-border-color);
    cursor: default;
    pointer-events: none;
  }
}

.eui-dropdown__item-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: inherit;

  svg {
    width: 16px;
    height: 16px;
  }
}

.eui-dropdown__item-label {
  flex: 1;
  min-width: 0;
}

// Transitions
.eui-dropdown-enter-active,
.eui-dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.eui-dropdown-enter-from,
.eui-dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
}
</style>

