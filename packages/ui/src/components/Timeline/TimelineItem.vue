<template>
  <div :class="timelineItemClasses">
    <div class="eui-timeline-item__tail" />
    <div :class="dotClasses" :style="dotStyle">
      <slot name="dot">
        <component :is="dot" v-if="dot" />
        <div v-else class="eui-timeline-item__dot-inner" />
      </slot>
    </div>
    <div class="eui-timeline-item__content">
      <div v-if="title || $slots.title" class="eui-timeline-item__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="time || $slots.time" class="eui-timeline-item__time">
        <slot name="time">{{ time }}</slot>
      </div>
      <div v-if="$slots.default" class="eui-timeline-item__children">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, getCurrentInstance } from 'vue'
import { timelineItemProps, type TimelineItemProps } from './Timeline'

defineOptions({
  name: 'EuiTimelineItem',
})

const props = defineProps(timelineItemProps)

interface TimelineContext {
  reverse?: boolean
  itemCount: number
}

const timeline = inject<TimelineContext | undefined>('timeline')

if (!timeline) {
  throw new Error('TimelineItem must be used inside Timeline')
}

const instance = getCurrentInstance()
const itemIndex = computed(() => {
  if (!instance?.parent) return 0
  const children = instance.parent.slots?.default?.() || []
  const timelineChildren = children.filter((child: any) => child.type?.name === 'EuiTimelineItem')
  return timelineChildren.findIndex((child: any) => child === instance.vnode)
})

const isLast = computed(() => itemIndex.value === timeline.itemCount - 1)

const timelineItemClasses = computed(() => {
  return [
    'eui-timeline-item',
    {
      'eui-timeline-item--last': isLast.value,
    },
  ]
})

const dotClasses = computed(() => {
  const colorClass = typeof props.color === 'string' && ['primary', 'success', 'warning', 'error'].includes(props.color)
    ? `eui-timeline-item__dot--${props.color}`
    : ''

  return [
    'eui-timeline-item__dot',
    colorClass,
  ]
})

const dotStyle = computed(() => {
  if (typeof props.color === 'string' && !['primary', 'success', 'warning', 'error'].includes(props.color)) {
    return {
      backgroundColor: props.color,
      borderColor: props.color,
    }
  }
  return {}
})
</script>

<style lang="scss" scoped>
.eui-timeline-item {
  position: relative;
  padding-bottom: var(--eui-spacing-xl);
  padding-left: var(--eui-spacing-xl);

  &--last {
    padding-bottom: 0;

    .eui-timeline-item__tail {
      display: none;
    }
  }

  &__tail {
    position: absolute;
    left: 7px;
    top: 20px;
    bottom: 0;
    width: 2px;
    background-color: var(--eui-border-color);
  }

  &__dot {
    position: absolute;
    left: 0;
    top: 4px;
    width: 14px;
    height: 14px;
    border-radius: var(--eui-radius-full);
    border: 2px solid var(--eui-border-color);
    background-color: var(--eui-bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    &--primary {
      border-color: var(--eui-color-primary);
      background-color: var(--eui-color-primary);
    }

    &--success {
      border-color: var(--eui-color-success);
      background-color: var(--eui-color-success);
    }

    &--warning {
      border-color: var(--eui-color-warning);
      background-color: var(--eui-color-warning);
    }

    &--error {
      border-color: var(--eui-color-error);
      background-color: var(--eui-color-error);
    }
  }

  &__dot-inner {
    width: 6px;
    height: 6px;
    border-radius: var(--eui-radius-full);
    background-color: var(--eui-bg-primary);
  }

  &__content {
    position: relative;
  }

  &__title {
    font-size: var(--eui-font-size-base);
    font-weight: var(--eui-font-weight-medium);
    color: var(--eui-text-primary);
    margin-bottom: var(--eui-spacing-xs);
  }

  &__time {
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);
    margin-bottom: var(--eui-spacing-sm);
  }

  &__children {
    color: var(--eui-text-primary);
  }
}
</style>

