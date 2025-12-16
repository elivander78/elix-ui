<template>
  <div :class="accordionClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { accordionProps, type AccordionProps } from './Accordion'

defineOptions({
  name: 'EuiAccordion',
})

const props = defineProps(accordionProps)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
}>()

const accordionClasses = computed(() => {
  return [
    'eui-accordion',
    `eui-accordion--style-${props.style}`,
  ]
})

const activeItem = computed(() => props.modelValue)

const isItemActive = (name: string | number) => {
  return activeItem.value === name
}

const toggleItem = (name: string | number) => {
  const newValue = isItemActive(name) ? undefined : name
  emit('update:modelValue', newValue)
}

provide('accordion', {
  activeItem,
  isItemActive,
  toggleItem,
  style: props.style,
})
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-accordion {
  width: 100%;
  display: flex;
  flex-direction: column;

  &--style-default {
    // Default style - no special styling
  }

  &--style-shadow {
    // Shadow style will be applied to items
  }

  &--style-bordered {
    // Bordered style is applied to items, not container
  }

  &--style-splitted {
    gap: var(--eui-spacing-md);
  }
}
</style>

