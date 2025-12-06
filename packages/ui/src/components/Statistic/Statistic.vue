<template>
  <div class="eui-statistic">
    <div v-if="title" class="eui-statistic__title">{{ title }}</div>
    <div class="eui-statistic__value-wrapper">
      <div v-if="$slots.prefix || prefix" class="eui-statistic__prefix">
        <slot name="prefix">
          <component :is="prefix" v-if="prefix" />
        </slot>
      </div>
      <div class="eui-statistic__value">{{ value }}</div>
      <div v-if="$slots.suffix || suffix" class="eui-statistic__suffix">
        <slot name="suffix">
          <component :is="suffix" v-if="suffix" />
        </slot>
      </div>
      <div v-if="trend !== 'none'" :class="trendClasses">
        <svg
          v-if="trend === 'up'"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 12V4M4 8l4-4 4 4"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-else
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 4v8M4 8l4 4 4-4"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <div v-if="description || $slots.description" class="eui-statistic__description">
      <slot name="description">{{ description }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { statisticProps, type StatisticProps } from './Statistic'

defineOptions({
  name: 'EuiStatistic',
})

const props = defineProps(statisticProps)

const trendClasses = computed(() => {
  return [
    'eui-statistic__trend',
    `eui-statistic__trend--${props.trend}`,
  ]
})
</script>

<style lang="scss" scoped>
.eui-statistic {
  display: flex;
  flex-direction: column;
  gap: var(--eui-spacing-xs);

  &__title {
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);
    font-weight: var(--eui-font-weight-medium);
  }

  &__value-wrapper {
    display: flex;
    align-items: baseline;
    gap: var(--eui-spacing-xs);
    flex-wrap: wrap;
  }

  &__value {
    font-size: var(--eui-font-size-2xl);
    font-weight: var(--eui-font-weight-semibold);
    color: var(--eui-text-primary);
    line-height: 1.2;
  }

  &__prefix,
  &__suffix {
    display: inline-flex;
    align-items: center;
    color: var(--eui-text-secondary);
    font-size: var(--eui-font-size-lg);
  }

  &__trend {
    display: inline-flex;
    align-items: center;
    margin-left: var(--eui-spacing-xs);

    &--up {
      color: var(--eui-color-success);
    }

    &--down {
      color: var(--eui-color-error);
    }
  }

  &__description {
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);
    margin-top: var(--eui-spacing-xs);
  }
}
</style>

