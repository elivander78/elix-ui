<template>
  <div class="eui-table-wrapper">
    <table :class="tableClasses">
      <thead v-if="columns.length > 0">
        <tr>
          <th v-if="selectable" :style="getColumnStyle({ key: 'select', fixed: 'left' }, true)" class="eui-table__select-header">
            <Checkbox 
              :model-value="isAllSelected" 
              :indeterminate="isIndeterminate"
              @update:model-value="handleSelectAllCheckbox" 
            />
          </th>
          <th
            v-for="column in columns"
            :key="column.key"
            :style="getColumnStyle(column, true)"
            :class="{ 'eui-table__sortable': column.sortable, 'eui-table__sorted': sortColumn === column.key, 'eui-table__fixed': column.fixed }"
            @click="handleSort(column)"
          >
            <span>{{ column.title }}</span>
            <span v-if="column.sortable" class="eui-table__sort-icon">
              <svg v-if="sortColumn !== column.key || sortOrder === null" width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4.5L6 1.5L9 4.5M3 7.5L6 10.5L9 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else-if="sortOrder === 'asc'" width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7.5L6 4.5L9 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in sortedData" :key="`row-${rowIndex}`">
          <td v-if="selectable" :style="getColumnStyle({ key: 'select', fixed: 'left' }, false)" class="eui-table__select-cell">
            <Checkbox 
              :model-value="isRowSelected(rowIndex)" 
              @update:model-value="(checked) => handleSelectRowCheckbox(rowIndex, checked)" 
            />
          </td>
          <td 
            v-for="column in columns" 
            :key="`${rowIndex}-${column.key}`" 
            :style="getColumnStyle(column, false)" 
            :class="{ 'eui-table__fixed': column.fixed }"
          >
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

defineOptions({

  name: 'EuiTable',

})

import { computed, ref } from 'vue'
import { Checkbox } from '../Checkbox'

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
  size?: 'sm' | 'md' | 'lg'
}>()

const emit = defineEmits<{
  sort: [column: string, order: 'asc' | 'desc' | null]
  select: [rows: string[]]
}>()

const sortColumn = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc' | null>(null)
const selectedRows = ref<string[]>([...props.selectedRows || []])

const tableClasses = computed(() => {
  return [
    'eui-table',
    {
      'eui-table--bordered': props.bordered,
      'eui-table--striped': props.striped,
      'eui-table--hoverable': props.hoverable,
      'eui-table--sm': props.size === 'sm',
      'eui-table--md': props.size === 'md' || !props.size,
      'eui-table--lg': props.size === 'lg',
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

const getColumnStyle = (column: TableColumn | { key: string; fixed?: 'left' | 'right' }, isHeader = false) => {
  const style: Record<string, string> = {}
  if ('width' in column && column.width) {
    style.width = typeof column.width === 'number' ? `${column.width}px` : column.width
  }
  if ('align' in column && column.align) {
    style.textAlign = column.align
  }
  if (column.fixed) {
    style.position = 'sticky'
    style[column.fixed] = '0'
    style.zIndex = isHeader ? '20' : '10'
    if (isHeader) {
      style.backgroundColor = 'var(--eui-bg-secondary)'
    } else {
      style.backgroundColor = 'var(--eui-bg-primary)'
    }
    if (column.fixed === 'left') {
      style.borderRight = '1px solid var(--eui-border-color)'
    } else {
      style.borderLeft = '1px solid var(--eui-border-color)'
      // Градиент для правой fixed колонки как в примере (только для ячеек)
      if (!isHeader) {
        style.background = 'linear-gradient(to right, transparent 0%, var(--eui-bg-primary) 12px)'
        style.backgroundClip = 'padding-box'
      }
    }
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

const handleSelectAllCheckbox = (checked: boolean) => {
  if (checked) {
    // Use row data to create unique keys instead of indices
    selectedRows.value = sortedData.value.map((row, index) => {
      // Try to use an id field if available, otherwise use index
      return row.id ? String(row.id) : `row-${index}`
    })
  } else {
    selectedRows.value = []
  }
  emit('select', selectedRows.value)
}

const handleSelectRowCheckbox = (index: number, checked: boolean) => {
  const row = sortedData.value[index]
  // Use row data to create unique key instead of index
  const rowKey = row.id ? String(row.id) : `row-${index}`
  
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
  const row = sortedData.value[index]
  const rowKey = row.id ? String(row.id) : `row-${index}`
  return selectedRows.value.includes(rowKey)
}

const isAllSelected = computed(() => {
  return sortedData.value.length > 0 && selectedRows.value.length === sortedData.value.length
})

const isIndeterminate = computed(() => {
  return selectedRows.value.length > 0 && selectedRows.value.length < sortedData.value.length
})
</script>

<style lang="scss" scoped>
.eui-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.eui-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: var(--eui-font-size-base);
  background-color: var(--eui-bg-primary);

  th,
  td {
    text-align: left;
    transition: background-color 0.15s ease;
  }

  th {
    padding: 8px 20px;
    background-color: var(--eui-bg-secondary);
    font-weight: var(--eui-font-weight-medium);
    color: var(--eui-text-secondary);
    position: relative;
    font-size: 13px;
    white-space: nowrap;
    
    &:first-child {
      padding-left: 12px;
      border-top-left-radius: var(--eui-radius-md);
    }
    
    &:last-child {
      padding-right: 12px;
      border-top-right-radius: var(--eui-radius-md);
    }
  }

  td {
    padding: 12px 20px;
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-primary);
    border-bottom: 1px solid var(--eui-border-color);
    font-weight: var(--eui-font-weight-medium);
    font-size: var(--eui-font-size-sm);
    
    &:first-child {
      padding-left: 12px;
    }
    
    &:last-child {
      padding-right: 12px;
    }
  }
  
  tbody tr:last-child td {
    border-bottom: none;
  }

  // Size variants
  &--sm {
    th {
      padding: 6px 16px;
      font-size: 11px;
      
      &:first-child {
        padding-left: 10px;
      }
      
      &:last-child {
        padding-right: 10px;
      }
    }
    
    td {
      padding: 10px 16px;
      font-size: var(--eui-font-size-xs);
      
      &:first-child {
        padding-left: 10px;
      }
      
      &:last-child {
        padding-right: 10px;
      }
    }
  }

  &--md {
    th {
      padding: 8px 20px;
      font-size: 13px;
      
      &:first-child {
        padding-left: 12px;
      }
      
      &:last-child {
        padding-right: 12px;
      }
    }
    
    td {
      padding: 12px 20px;
      font-size: var(--eui-font-size-sm);
      
      &:first-child {
        padding-left: 12px;
      }
      
      &:last-child {
        padding-right: 12px;
      }
    }
  }

  &--lg {
    th {
      padding: 10px 24px;
      font-size: 14px;
      
      &:first-child {
        padding-left: 16px;
      }
      
      &:last-child {
        padding-right: 16px;
      }
    }
    
    td {
      padding: 16px 24px;
      font-size: var(--eui-font-size-base);
      
      &:first-child {
        padding-left: 16px;
      }
      
      &:last-child {
        padding-right: 16px;
      }
    }
  }

  &--bordered {
    border: 1px solid var(--eui-border-color);
    
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
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--eui-bg-tertiary);
    }
  }

  &__sorted {
    background-color: var(--eui-bg-tertiary);
    color: var(--eui-text-primary);
  }

  &__sort-icon {
    display: inline-flex;
    align-items: center;
    margin-left: var(--eui-spacing-xs);
    color: var(--eui-text-secondary);
    transition: color 0.15s ease;
    opacity: 0.5;
  }

  &__sortable:hover &__sort-icon {
    color: var(--eui-text-primary);
    opacity: 0.8;
  }

  &__sorted &__sort-icon {
    color: var(--eui-text-primary);
    opacity: 1;
  }

  &__select-header {
    width: 48px;
    text-align: center;
    padding: 8px 8px;
    
    &:first-child {
      padding-left: 12px;
    }
    
    :deep(.eui-checkbox) {
      margin: 0 auto;
    }
  }
  
  &__select-cell {
    width: 48px;
    text-align: center;
    padding: 12px 8px;
    
    &:first-child {
      padding-left: 12px;
    }
    
    :deep(.eui-checkbox) {
      margin: 0 auto;
    }
  }

  &__fixed {
    transition: background-color 0.2s ease;
  }
}

.eui-table--hoverable tbody tr:hover {
  td.eui-table__fixed {
    background-color: var(--eui-bg-tertiary) !important;
  }
}

.eui-table--striped tbody tr:nth-child(even) {
  td.eui-table__fixed {
    background-color: var(--eui-bg-secondary) !important;
  }
}

.eui-table--striped.eui-table--hoverable tbody tr:nth-child(even):hover {
  td.eui-table__fixed {
    background-color: var(--eui-bg-tertiary) !important;
  }
}

// Ensure fixed columns maintain proper background on header hover
.eui-table th.eui-table__fixed.eui-table__sortable:hover {
  background-color: var(--eui-bg-tertiary) !important;
}

@media (max-width: 768px) {
  .eui-table-wrapper {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

