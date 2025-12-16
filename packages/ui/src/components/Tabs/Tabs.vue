<template>
  <div :class="tabsClasses">
    <div class="eui-tabs__nav">
      <button
        v-for="pane in panes"
        :key="pane.name"
        :class="tabClasses(pane.name)"
        :disabled="pane.disabled"
        @click="handleTabClick(pane.name)"
      >
        {{ pane.label }}
      </button>
    </div>
    <div class="eui-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiTabs',

})

import { computed, provide, ref, useSlots, watch, type ComputedRef } from 'vue'

export interface TabOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = defineProps<{
  modelValue?: string | number
  type?: 'line' | 'card'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const slots = useSlots()
const activeTab = ref(props.modelValue || '')

watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    activeTab.value = newValue
  }
}, { immediate: true })

const panes = computed(() => {
  const children = slots.default?.() || []
  return children
    .filter((child: any) => {
      if (!child || typeof child !== 'object') return false
      const type = child.type
      if (!type) return false
      return type.name === 'TabPane' || 
             type.__name === 'TabPane' ||
             (typeof type === 'object' && (type.setup || type.render))
    })
    .map((child: any) => {
      const props = child.props || {}
      return {
        name: props.name || props.value,
        label: props.label || props.name || props.value || '',
        disabled: props.disabled,
      }
    })
    .filter((pane: any) => pane.name !== undefined)
})

const tabsClasses = computed(() => {
  return [
    'eui-tabs',
    {
      [`eui-tabs--${props.type || 'line'}`]: true,
    },
  ]
})

const tabClasses = (value: string | number) => {
  return [
    'eui-tabs__tab',
    {
      'eui-tabs__tab--active': activeTab.value === value,
    },
  ]
}

const handleTabClick = (value: string | number) => {
  activeTab.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    activeTab.value = newValue
  }
}, { immediate: true })

provide('activeTab', activeTab)
</script>

<style lang="scss" scoped>
.eui-tabs {
  &__nav {
    display: flex;
    gap: var(--eui-spacing-md);
    border-bottom: 1px solid var(--eui-border-color);
  }

  &__tab {
    padding: var(--eui-spacing-sm) var(--eui-spacing-md);
    font-size: var(--eui-font-size-base);
    color: var(--eui-text-secondary);
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: var(--eui-text-primary);
    }

    &--active {
      color: var(--eui-color-primary);
      border-bottom-color: var(--eui-color-primary);
    }
  }

  &--card {
    .eui-tabs__nav {
      border-bottom: none;
      gap: var(--eui-spacing-xs);
    }

    .eui-tabs__tab {
      border: 1px solid var(--eui-border-color);
      border-bottom: none;
      border-radius: var(--eui-radius-md) var(--eui-radius-md) 0 0;
      background-color: var(--eui-bg-secondary);

      &--active {
        background-color: var(--eui-bg-primary);
        border-bottom-color: var(--eui-bg-primary);
      }
    }
  }

  &__content {
    padding: var(--eui-spacing-lg) 0;
  }
}
</style>

