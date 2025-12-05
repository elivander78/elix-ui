<template>
  <div class="eui-table-wrapper">
    <table :class="tableClasses">
      <thead v-if="columns.length > 0">
        <tr>
          <th v-if="selectable" :style="getColumnStyle({ key: 'select', fixed: 'left' })" class="eui-table__select-header">
            <input type="checkbox" :checked="isAllSelected" @change="handleSelectAll" />
          </th>
          <th
            v-for="column in columns"
            :key="column.key"
            :style="getColumnStyle(column)"
            :class="{ 'eui-table__sortable': column.sortable, 'eui-table__sorted': sortColumn === column.key }"
            @click="handleSort(column)"
          >
            <span>{{ column.title }}</span>
            <span v-if="column.sortable" class="eui-table__sort-icon">
              <svg v-if="sortColumn !== column.key || sortOrder === null" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else-if="sortOrder === 'asc'" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(180 6 6)"/>
              </svg>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in sortedData" :key="rowIndex">
          <td v-if="selectable" :style="getColumnStyle({ key: 'select', fixed: 'left' })" class="eui-table__select-cell">
            <input type="checkbox" :checked="isRowSelected(rowIndex)" @change="handleSelectRow(rowIndex, $event)" />
          </td>
          <td v-for="column in columns" :key="column.key" :style="getColumnStyle(column)">
            <slot :name="`cell-${column.key}`" :row="row" :column="column" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
        <tr v-if="sortedData.length === 0">
          <td :colspan="columns.length + (selectable ? 1 : 0)" class="eui-table__empty">
            <slot name="empty">No data</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface TableColumn {
  key: string
  title: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  fixed?: 'left' | 'right'
}

const props = defineProps<{
  columns: TableColumn[]
  data: Record<string, any>[]
  bordered?: boolean
  striped?: boolean
  hoverable?: boolean
  selectable?: boolean
  selectedRows?: string[]
}>()

const emit = defineEmits<{
  sort: [column: string, order: 'asc' | 'desc' | null]
  select: [rows: string[]]
}>()

const sortColumn = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc' | null>(null)
const selectedRows = ref<string[]>(props.selectedRows || [])

const tableClasses = computed(() => {
  return [
    'eui-table',
    {
      'eui-table--bordered': props.bordered,
      'eui-table--striped': props.striped,
      'eui-table--hoverable': props.hoverable,
    },
  ]
})

const sortedData = computed(() => {
  if (!sortColumn.value || !sortOrder.value) {
    return props.data
  }
  const sorted = [...props.data]
  sorted.sort((a, b) => {
    const aVal = a[sortColumn.value!]
    const bVal = b[sortColumn.value!]
    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
  return sorted
})

const getColumnStyle = (column: TableColumn) => {
  const style: Record<string, string> = {}
  if (column.width) {
    style.width = typeof column.width === 'number' ? `${column.width}px` : column.width
  }
  if (column.align) {
    style.textAlign = column.align
  }
  if (column.fixed) {
    style.position = 'sticky'
    style[column.fixed] = '0'
    style.zIndex = '10'
    style.backgroundColor = 'var(--eui-bg-secondary)'
  }
  return style
}

const handleSort = (column: TableColumn) => {
  if (!column.sortable) return
  if (sortColumn.value === column.key) {
    if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc'
    } else if (sortOrder.value === 'desc') {
      sortOrder.value = null
      sortColumn.value = null
    }
  } else {
    sortColumn.value = column.key
    sortOrder.value = 'asc'
  }
  emit('sort', column.key, sortOrder.value)
}

const handleSelectAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  if (checked) {
    selectedRows.value = sortedData.value.map((_, index) => String(index))
  } else {
    selectedRows.value = []
  }
  emit('select', selectedRows.value)
}

const handleSelectRow = (index: number, event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  const rowKey = String(index)
  if (checked) {
    if (!selectedRows.value.includes(rowKey)) {
      selectedRows.value.push(rowKey)
    }
  } else {
    selectedRows.value = selectedRows.value.filter((key) => key !== rowKey)
  }
  emit('select', selectedRows.value)
}

const isRowSelected = (index: number) => {
  return selectedRows.value.includes(String(index))
}

const isAllSelected = computed(() => {
  return sortedData.value.length > 0 && selectedRows.value.length === sortedData.value.length
})
</script>

<style lang="scss" scoped>
.eui-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.eui-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--eui-font-size-base);

  th,
  td {
    padding: var(--eui-spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--eui-border-color);
  }

  th {
    background-color: var(--eui-bg-secondary);
    font-weight: var(--eui-font-weight-semibold);
    color: var(--eui-text-primary);
  }

  td {
    color: var(--eui-text-primary);
  }

  &--bordered {
    th,
    td {
      border: 1px solid var(--eui-border-color);
    }
  }

  &--striped {
    tbody tr:nth-child(even) {
      background-color: var(--eui-bg-secondary);
    }
  }

  &--hoverable {
    tbody tr {
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: var(--eui-bg-tertiary);
      }
    }
  }

  &__empty {
    text-align: center;
    color: var(--eui-text-secondary);
    padding: var(--eui-spacing-xl) !important;
  }

  &__sortable {
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: var(--eui-bg-tertiary);
    }
  }

  &__sorted {
    background-color: var(--eui-bg-tertiary);
  }

  &__sort-icon {
    display: inline-flex;
    align-items: center;
    margin-left: var(--eui-spacing-xs);
    color: var(--eui-text-secondary);
  }

  &__select-header,
  &__select-cell {
    width: 48px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .eui-table-wrapper {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

