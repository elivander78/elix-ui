<template>
  <nav class="eui-breadcrumbs">
    <ol class="eui-breadcrumbs__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="breadcrumbClasses(index)"
      >
        <router-link
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="eui-breadcrumbs__link"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="eui-breadcrumbs__current">
          {{ item.label }}
        </span>
        <span v-if="index < items.length - 1" class="eui-breadcrumbs__separator">
          <slot name="separator">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </slot>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface BreadcrumbItem {
  label: string
  to?: string | { path: string }
}

const props = defineProps<{
  items: BreadcrumbItem[]
}>()

const breadcrumbClasses = (index: number) => {
  return [
    'eui-breadcrumbs__item',
    {
      'eui-breadcrumbs__item--last': index === props.items.length - 1,
    },
  ]
}
</script>

<style lang="scss" scoped>
.eui-breadcrumbs {
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--eui-spacing-xs);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: var(--eui-spacing-xs);

    &--last {
      .eui-breadcrumbs__current {
        color: var(--eui-text-primary);
        font-weight: var(--eui-font-weight-medium);
      }
    }
  }

  &__link {
    color: var(--eui-text-secondary);
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: var(--eui-color-primary);
    }
  }

  &__current {
    color: var(--eui-text-secondary);
  }

  &__separator {
    display: flex;
    align-items: center;
    color: var(--eui-text-tertiary);

    svg {
      width: 14px;
      height: 14px;
    }
  }
}
</style>

