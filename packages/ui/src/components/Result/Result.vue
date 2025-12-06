<template>
  <div :class="resultClasses">
    <div class="eui-result__icon-wrapper">
      <div v-if="$slots.icon || icon || defaultIcon" :class="iconClasses">
        <slot name="icon">
          <component :is="icon" v-if="icon" />
          <component :is="defaultIcon" v-else />
        </slot>
      </div>
    </div>
    <div class="eui-result__title">{{ title }}</div>
    <div v-if="description || $slots.description" class="eui-result__description">
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="$slots.extra || extra" class="eui-result__extra">
      <slot name="extra">
        <component :is="extra" v-if="extra" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { resultProps, type ResultProps, type ResultStatus } from './Result'

defineOptions({
  name: 'EuiResult',
})

const props = defineProps(resultProps)

const resultClasses = computed(() => {
  return [
    'eui-result',
    `eui-result--${props.status}`,
  ]
})

const iconClasses = computed(() => {
  return [
    'eui-result__icon',
    `eui-result__icon--${props.status}`,
  ]
})

const defaultIcon = computed(() => {
  const status = props.status

  if (status === 'success') {
    return () => h('svg', {
      viewBox: '0 0 64 64',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('circle', { cx: '32', cy: '32', r: '30', stroke: 'currentColor', 'stroke-width': '2' }),
      h('path', {
        d: 'M20 32l8 8 16-16',
        stroke: 'currentColor',
        'stroke-width': '3',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }),
    ])
  }

  if (status === 'error') {
    return () => h('svg', {
      viewBox: '0 0 64 64',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('circle', { cx: '32', cy: '32', r: '30', stroke: 'currentColor', 'stroke-width': '2' }),
      h('path', {
        d: 'M32 20v24M32 32h.01',
        stroke: 'currentColor',
        'stroke-width': '3',
        'stroke-linecap': 'round',
      }),
    ])
  }

  if (status === 'info') {
    return () => h('svg', {
      viewBox: '0 0 64 64',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('circle', { cx: '32', cy: '32', r: '30', stroke: 'currentColor', 'stroke-width': '2' }),
      h('path', {
        d: 'M32 24v8M32 40h.01',
        stroke: 'currentColor',
        'stroke-width': '3',
        'stroke-linecap': 'round',
      }),
    ])
  }

  if (status === 'warning') {
    return () => h('svg', {
      viewBox: '0 0 64 64',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('path', {
        d: 'M32 8L8 56h48L32 8z',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linejoin': 'round',
      }),
      h('path', {
        d: 'M32 36v8M32 24h.01',
        stroke: 'currentColor',
        'stroke-width': '3',
        'stroke-linecap': 'round',
      }),
    ])
  }

  if (status === '404' || status === '500') {
    return () => h('svg', {
      viewBox: '0 0 64 64',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('path', {
        d: 'M20 20l24 24M44 20l-24 24',
        stroke: 'currentColor',
        'stroke-width': '3',
        'stroke-linecap': 'round',
      }),
    ])
  }

  return null
})
</script>

<style lang="scss" scoped>
.eui-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--eui-spacing-3xl);
  text-align: center;

  &__icon-wrapper {
    margin-bottom: var(--eui-spacing-xl);
  }

  &__icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--eui-radius-full);

    :deep(svg) {
      width: 100%;
      height: 100%;
    }

    &--success {
      color: var(--eui-color-success);
      background-color: var(--eui-bg-success);
    }

    &--error {
      color: var(--eui-color-error);
      background-color: var(--eui-bg-error);
    }

    &--info {
      color: var(--eui-color-info);
      background-color: var(--eui-bg-info);
    }

    &--warning {
      color: var(--eui-color-warning);
      background-color: var(--eui-bg-warning);
    }

    &--404,
    &--500 {
      color: var(--eui-text-tertiary);
      background-color: var(--eui-bg-tertiary);
    }
  }

  &__title {
    font-size: var(--eui-font-size-2xl);
    font-weight: var(--eui-font-weight-semibold);
    color: var(--eui-text-primary);
    margin-bottom: var(--eui-spacing-md);
  }

  &__description {
    font-size: var(--eui-font-size-base);
    color: var(--eui-text-secondary);
    margin-bottom: var(--eui-spacing-xl);
    max-width: 500px;
  }

  &__extra {
    margin-top: var(--eui-spacing-lg);
  }
}
</style>

