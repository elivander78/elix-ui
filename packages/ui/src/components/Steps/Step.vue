<template>
  <div :class="stepClasses">
    <div class="eui-step__icon-wrapper">
      <div :class="iconClasses">
        <slot name="icon">
          <component :is="defaultIcon" v-if="!icon" />
          <component :is="icon" v-else />
        </slot>
      </div>
    </div>
    <div v-if="!isLast && direction === 'horizontal'" class="eui-step__tail" />
    <div v-if="!isLast && direction === 'vertical'" class="eui-step__tail-vertical" />
    <div class="eui-step__content">
      <div class="eui-step__title">{{ title }}</div>
      <div v-if="description" class="eui-step__description">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, h, getCurrentInstance } from 'vue'
import { stepProps, type StepProps } from './Steps'

defineOptions({
  name: 'EuiStep',
})

const props = defineProps(stepProps)

interface StepsContext {
  current: number
  status?: string
  direction: string
  size: string
  stepCount: number
}

const steps = inject<StepsContext>('steps')

if (!steps) {
  throw new Error('Step must be used inside Steps')
}

const instance = getCurrentInstance()
const stepIndex = computed(() => {
  if (!instance?.parent) return 0
  const children = instance.parent.slots?.default?.() || []
  const stepChildren = children.filter((child: any) => child.type?.name === 'EuiStep')
  return stepChildren.findIndex((child: any) => child === instance.vnode)
})

const isLast = computed(() => stepIndex.value === steps.stepCount - 1)
const direction = computed(() => steps.direction)

const computedStatus = computed(() => {
  if (props.status) return props.status
  
  if (stepIndex.value < steps.current) {
    return 'finish'
  } else if (stepIndex.value === steps.current) {
    return steps.status || 'process'
  } else {
    return 'wait'
  }
})

const stepClasses = computed(() => {
  return [
    'eui-step',
    `eui-step--${computedStatus.value}`,
    `eui-step--${direction.value}`,
    {
      'eui-step--last': isLast,
    },
  ]
})

const iconClasses = computed(() => {
  return [
    'eui-step__icon',
    `eui-step__icon--${computedStatus.value}`,
  ]
})

const defaultIcon = computed(() => {
  if (computedStatus.value === 'error') {
    return () => h('svg', {
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('circle', { cx: '10', cy: '10', r: '8', stroke: 'currentColor', 'stroke-width': '2' }),
      h('path', { d: 'M10 6v4M10 14h.01', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' }),
    ])
  }
  
  if (computedStatus.value === 'finish') {
    return () => h('svg', {
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('path', {
        d: 'M16.667 5L7.5 14.167 3.333 10',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }),
    ])
  }
  
  return () => h('span', { class: 'eui-step__number' }, stepIndex.value + 1)
})
</script>

<style lang="scss" scoped>
.eui-step {
  position: relative;
  display: flex;
  flex: 1 1 0;
  align-items: flex-start;
  gap: var(--eui-spacing-sm);

  // CSS Variables - значения по умолчанию (переопределяются из Steps для размеров)
  // Размеры иконки (переопределяются из .eui-steps--sm или .eui-steps--md)
  --eui-step-icon-size: 32px;
  --eui-step-icon-font-size: var(--eui-font-size-sm);
  --eui-step-icon-font-weight: var(--eui-font-weight-semibold);
  --eui-step-icon-border-width: 2px;
  --eui-step-icon-border-radius: var(--eui-radius-full);
  --eui-step-icon-transition: all 0.3s ease-in-out;
  
  // Размеры заголовка (переопределяются из .eui-steps--sm или .eui-steps--md)
  --eui-step-title-font-size: var(--eui-font-size-base);
  --eui-step-title-font-weight: var(--eui-font-weight-medium);
  --eui-step-title-line-height: var(--eui-line-height-normal);
  --eui-step-title-color: var(--eui-text-primary);
  --eui-step-title-transition: color 0.3s ease-in-out;
  
  // Размеры описания (переопределяются из .eui-steps--sm или .eui-steps--md)
  --eui-step-description-font-size: var(--eui-font-size-sm);
  --eui-step-description-line-height: var(--eui-line-height-relaxed);
  --eui-step-description-color: var(--eui-text-secondary);
  --eui-step-description-margin-top: var(--eui-spacing-xs);
  
  --eui-step-tail-height: 2px;
  --eui-step-tail-background: var(--eui-bg-tertiary);
  --eui-step-tail-vertical-background: var(--eui-bg-tertiary);
  --eui-step-tail-transition: background-color 0.3s ease-in-out;

  &--horizontal {
    flex-direction: row;
    min-width: 0;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
    flex: 0 0 auto;
  }

  &--last {
    flex: 0 0 auto;
  }

  // Состояние WAIT - полностью изолированные переменные и стили
  &--wait {
    --eui-step-icon-color: var(--eui-text-tertiary);
    --eui-step-icon-background: var(--eui-bg-primary);
    --eui-step-icon-border-color: var(--eui-border-color);
    --eui-step-icon-box-shadow: none;
    --eui-step-title-color: var(--eui-text-tertiary);
    --eui-step-title-font-weight: var(--eui-font-weight-medium);
    --eui-step-description-color: var(--eui-text-tertiary);
    --eui-step-tail-background: var(--eui-bg-tertiary);
    --eui-step-tail-vertical-background: var(--eui-bg-tertiary);
  }

  // Состояние PROCESS - полностью изолированные переменные и стили
  &--process {
    --eui-step-icon-color: var(--eui-text-inverse);
    --eui-step-icon-background: var(--eui-color-primary);
    --eui-step-icon-border-color: var(--eui-color-primary);
    --eui-step-icon-box-shadow: 0 0 0 4px var(--eui-color-primary-100);
    --eui-step-title-color: var(--eui-color-primary);
    --eui-step-title-font-weight: var(--eui-font-weight-semibold);
    --eui-step-description-color: var(--eui-text-secondary);
    --eui-step-tail-background: var(--eui-bg-tertiary);
    --eui-step-tail-vertical-background: var(--eui-bg-tertiary);
  }

  // Состояние FINISH - полностью изолированные переменные и стили
  &--finish {
    --eui-step-icon-color: var(--eui-text-inverse);
    --eui-step-icon-background: var(--eui-color-success);
    --eui-step-icon-border-color: var(--eui-color-success);
    --eui-step-icon-box-shadow: none;
    --eui-step-title-color: var(--eui-text-primary);
    --eui-step-title-font-weight: var(--eui-font-weight-medium);
    --eui-step-description-color: var(--eui-text-secondary);
    --eui-step-tail-background: var(--eui-color-success);
    --eui-step-tail-vertical-background: var(--eui-color-success);
  }

  // Состояние ERROR - полностью изолированные переменные и стили
  &--error {
    --eui-step-icon-color: var(--eui-text-inverse);
    --eui-step-icon-background: var(--eui-color-error);
    --eui-step-icon-border-color: var(--eui-color-error);
    --eui-step-icon-box-shadow: none;
    --eui-step-title-color: var(--eui-color-error);
    --eui-step-title-font-weight: var(--eui-font-weight-medium);
    --eui-step-description-color: var(--eui-text-secondary);
    --eui-step-tail-background: var(--eui-bg-tertiary);
    --eui-step-tail-vertical-background: var(--eui-bg-tertiary);
  }
}

.eui-step__icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
}

.eui-step__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--eui-step-icon-size);
  height: var(--eui-step-icon-size);
  font-size: var(--eui-step-icon-font-size);
  font-weight: var(--eui-step-icon-font-weight);
  color: var(--eui-step-icon-color);
  background-color: var(--eui-step-icon-background);
  border: var(--eui-step-icon-border-width) solid var(--eui-step-icon-border-color);
  border-radius: var(--eui-step-icon-border-radius);
  box-shadow: var(--eui-step-icon-box-shadow);
  transition: var(--eui-step-icon-transition);
  z-index: 1;

  svg {
    width: 100%;
    height: 100%;
    max-width: 20px;
    max-height: 20px;
  }
}

.eui-step__number {
  display: block;
}

.eui-step__tail {
  position: absolute;
  top: calc(var(--eui-step-icon-size) / 2);
  left: calc(var(--eui-step-icon-size) + var(--eui-spacing-sm));
  right: calc(-1 * var(--eui-spacing-sm));
  height: var(--eui-step-tail-height);
  background-color: var(--eui-step-tail-background);
  transform: translateY(-50%);
  transition: var(--eui-step-tail-transition);
  z-index: 0;
  pointer-events: none;
}

.eui-step__tail-vertical {
  position: absolute;
  top: 100%;
  left: 50%;
  width: var(--eui-step-tail-height);
  height: calc(100% - var(--eui-step-icon-size));
  background-color: var(--eui-step-tail-vertical-background);
  transform: translateX(-50%);
  transition: var(--eui-step-tail-transition);
  z-index: 0;
  pointer-events: none;
}

.eui-step__content {
  flex: 1;
  min-width: 0;
  padding-top: 4px;
}

.eui-step__title {
  font-size: var(--eui-step-title-font-size);
  font-weight: var(--eui-step-title-font-weight);
  line-height: var(--eui-step-title-line-height);
  color: var(--eui-step-title-color);
  transition: var(--eui-step-title-transition);
}

.eui-step__description {
  margin-top: var(--eui-step-description-margin-top);
  font-size: var(--eui-step-description-font-size);
  line-height: var(--eui-step-description-line-height);
  color: var(--eui-step-description-color);
  transition: color 0.3s ease-in-out;
}
</style>

