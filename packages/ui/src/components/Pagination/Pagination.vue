<template>
  <div :class="paginationClasses">
    <template v-if="simple">
      <button
        class="eui-pagination__prev"
        :disabled="currentPage === 1"
        @click="handlePrev"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <input
        type="number"
        :min="1"
        :max="totalPages"
        :value="currentPage"
        @input="handleSimpleInput"
        class="eui-pagination__simple-input"
      />
      <span class="eui-pagination__simple-separator">/</span>
      <span class="eui-pagination__simple-total">{{ totalPages }}</span>
      <button
        class="eui-pagination__next"
        :disabled="currentPage === totalPages"
        @click="handleNext"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </template>
    <template v-else>
      <div v-if="showTotal" class="eui-pagination__total">
        Total: {{ total }} items
      </div>
      <button
        class="eui-pagination__prev"
        :disabled="currentPage === 1"
        @click="handlePrev"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <template v-for="(page, index) in visiblePages" :key="index">
        <button
          v-if="page !== 'ellipsis'"
          :class="pageClasses(page)"
          @click="handlePageClick(page)"
        >
          {{ page }}
        </button>
        <span v-else class="eui-pagination__ellipsis">...</span>
      </template>
      <button
        class="eui-pagination__next"
        :disabled="currentPage === totalPages"
        @click="handleNext"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div v-if="showQuickJumper" class="eui-pagination__jumper">
        <span>Go to</span>
        <input
          type="number"
          :min="1"
          :max="totalPages"
          :value="jumpPage"
          @input="handleJumpInput"
          @keyup.enter="handleJump"
          class="eui-pagination__jumper-input"
        />
        <button @click="handleJump" class="eui-pagination__jumper-btn">Go</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue?: number
  page?: number
  total: number
  pageSize?: number
  showSizeChanger?: boolean
  size?: 'sm' | 'md' | 'lg'
  showTotal?: boolean
  showQuickJumper?: boolean
  simple?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [page: number]
  change: [page: number]
}>()

const currentPage = computed(() => props.modelValue || props.page || 1)
const totalPages = computed(() => Math.ceil(props.total / (props.pageSize || 10)))
const jumpPage = ref(1)

const paginationClasses = computed(() => {
  return [
    'eui-pagination',
    {
      [`eui-pagination--${props.size || 'md'}`]: true,
      'eui-pagination--simple': props.simple,
    },
  ]
})

const visiblePages = computed(() => {
  const pages: (number | 'ellipsis')[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('ellipsis')
      pages.push(total)
    } else if (current >= total - 2) {
      pages.push(1)
      pages.push('ellipsis')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('ellipsis')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('ellipsis')
      pages.push(total)
    }
  }

  return pages
})

const pageClasses = (page: number) => {
  return [
    'eui-pagination__page',
    {
      'eui-pagination__page--active': page === currentPage.value,
    },
  ]
}

const handlePageClick = (page: number | 'ellipsis') => {
  if (page === 'ellipsis' || page === currentPage.value) return
  emit('update:modelValue', page)
  emit('change', page)
}

const handleJumpInput = (e: Event) => {
  const value = parseInt((e.target as HTMLInputElement).value)
  jumpPage.value = isNaN(value) ? 1 : Math.max(1, Math.min(totalPages.value, value))
}

const handleJump = () => {
  if (jumpPage.value >= 1 && jumpPage.value <= totalPages.value) {
    emit('update:modelValue', jumpPage.value)
    emit('change', jumpPage.value)
  }
}

const handlePrev = () => {
  if (currentPage.value > 1) {
    const newPage = currentPage.value - 1
    emit('update:modelValue', newPage)
    emit('change', newPage)
  }
}

const handleNext = () => {
  if (currentPage.value < totalPages.value) {
    emit('update:modelValue', currentPage.value + 1)
    emit('change', currentPage.value + 1)
  }
}

const handleSimpleInput = (e: Event) => {
  const value = parseInt((e.target as HTMLInputElement).value)
  if (!isNaN(value) && value >= 1 && value <= totalPages.value) {
    emit('update:modelValue', value)
    emit('change', value)
  }
}
</script>

<style lang="scss" scoped>
.eui-pagination {
  display: flex;
  align-items: center;
  gap: var(--eui-spacing-xs);

  &__prev,
  &__next,
  &__page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--eui-spacing-sm);
    font-size: var(--eui-font-size-base);
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-primary);
    border: 1px solid var(--eui-border-color);
    border-radius: var(--eui-radius-md);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover:not(:disabled) {
      border-color: var(--eui-border-color-hover);
      background-color: var(--eui-bg-secondary);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__page {
    &--active {
      color: var(--eui-text-inverse);
      background-color: var(--eui-color-primary);
      border-color: var(--eui-color-primary);
    }
  }

  &__ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--eui-spacing-sm);
    color: var(--eui-text-secondary);
  }

  &__total {
    display: flex;
    align-items: center;
    margin-right: var(--eui-spacing-md);
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);
  }

  &__jumper {
    display: flex;
    align-items: center;
    gap: var(--eui-spacing-xs);
    margin-left: var(--eui-spacing-md);
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);

    &-input {
      width: 50px;
      padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
      font-size: var(--eui-font-size-sm);
      color: var(--eui-text-primary);
      background-color: var(--eui-bg-primary);
      border: 1px solid var(--eui-border-color);
      border-radius: var(--eui-radius-sm);
      text-align: center;
    }

    &-btn {
      padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
      font-size: var(--eui-font-size-sm);
      color: var(--eui-text-primary);
      background-color: var(--eui-bg-primary);
      border: 1px solid var(--eui-border-color);
      border-radius: var(--eui-radius-sm);
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: var(--eui-bg-secondary);
      }
    }
  }

  &--sm {
    .eui-pagination__prev,
    .eui-pagination__next,
    .eui-pagination__page {
      min-width: 24px;
      height: 24px;
      font-size: var(--eui-font-size-sm);
    }
  }

  &--lg {
    .eui-pagination__prev,
    .eui-pagination__next,
    .eui-pagination__page {
      min-width: 40px;
      height: 40px;
      font-size: var(--eui-font-size-lg);
    }
  }

  &--simple {
    .eui-pagination__simple-input {
      width: 50px;
      padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
      font-size: var(--eui-font-size-base);
      color: var(--eui-text-primary);
      background-color: var(--eui-bg-primary);
      border: 1px solid var(--eui-border-color);
      border-radius: var(--eui-radius-sm);
      text-align: center;
      margin: 0 var(--eui-spacing-xs);
    }

    .eui-pagination__simple-separator {
      margin: 0 var(--eui-spacing-xs);
      color: var(--eui-text-secondary);
    }

    .eui-pagination__simple-total {
      margin-left: var(--eui-spacing-xs);
      color: var(--eui-text-secondary);
    }
  }
}
</style>

