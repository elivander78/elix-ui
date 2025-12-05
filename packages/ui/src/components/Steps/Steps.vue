<template>
  <div :class="stepsClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import { stepsProps, type StepsProps } from './Steps'

defineOptions({
  name: 'EuiSteps',
})

const props = defineProps(stepsProps)
const slots = useSlots()

const stepsClasses = computed(() => {
  return [
    'eui-steps',
    `eui-steps--${props.direction}`,
    `eui-steps--${props.size}`,
  ]
})

const stepCount = computed(() => {
  const children = slots.default?.() || []
  return children.filter((child: any) => child.type?.name === 'EuiStep').length
})

provide('steps', {
  current: props.current,
  status: props.status,
  direction: props.direction,
  size: props.size,
  stepCount: stepCount.value,
})
</script>

<style lang="scss" scoped>
.eui-steps {
  display: flex;
  width: 100%;
  box-sizing: border-box;

  &--horizontal {
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    
    .eui-step {
      padding-right: var(--eui-spacing-sm);
      
      &:last-child {
        padding-right: 0;
      }
    }
  }

  &--vertical {
    flex-direction: column;
    gap: var(--eui-spacing-md);
  }

  &--sm {
    // Изолированные переменные для размера sm
    --eui-step-icon-size: 24px;
    --eui-step-icon-font-size: var(--eui-font-size-xs);
    --eui-step-title-font-size: var(--eui-font-size-sm);
    --eui-step-description-font-size: var(--eui-font-size-xs);
    
    .eui-step {
      // Переменные применяются через наследование
    }
  }

  &--md {
    // Изолированные переменные для размера md (значения по умолчанию)
    --eui-step-icon-size: 32px;
    --eui-step-icon-font-size: var(--eui-font-size-sm);
    --eui-step-title-font-size: var(--eui-font-size-base);
    --eui-step-description-font-size: var(--eui-font-size-sm);
  }
}
</style>

