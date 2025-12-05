<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--eui-text-secondary);">
      All features work together: select rows, sort columns, scroll to see fixed columns.
    </p>
    <div style="max-width: 700px; overflow-x: auto; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); padding: 8px;">
      <Table 
        :columns="columns" 
        :data="data" 
        selectable 
        hoverable 
        striped 
        @select="handleSelect"
        @sort="handleSort"
      />
    </div>
    <p v-if="selected.length > 0" style="margin-top: 16px;">
      Selected: {{ selected.length }} row(s) - IDs: {{ selected.join(', ') }}
    </p>
    <p v-if="sortInfo" style="margin-top: 8px;">
      Sorted by: {{ sortInfo.column }} ({{ sortInfo.order }})
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@elivander/elix-ui'

const selected = ref<string[]>([])
const sortInfo = ref<{ column: string; order: string } | null>(null)

const columns = [
  { key: 'name', title: 'Name', fixed: 'left', width: 150, sortable: true },
  { key: 'age', title: 'Age', width: 100, sortable: true },
  { key: 'email', title: 'Email', width: 200, sortable: true },
  { key: 'department', title: 'Department', width: 150, sortable: true },
  { key: 'location', title: 'Location', width: 150, sortable: true },
  { key: 'salary', title: 'Salary', fixed: 'right', width: 120, align: 'right', sortable: true },
]

const data = [
  { id: 1, name: 'Zoe Anderson', age: 22, email: 'zoe@example.com', department: 'Engineering', location: 'Austin', salary: '$85k' },
  { id: 2, name: 'John Doe', age: 30, email: 'john@example.com', department: 'Engineering', location: 'San Francisco', salary: '$120k' },
  { id: 3, name: 'Alice Brown', age: 28, email: 'alice@example.com', department: 'Design', location: 'Seattle', salary: '$125k' },
  { id: 4, name: 'Bob Johnson', age: 35, email: 'bob@example.com', department: 'Marketing', location: 'Chicago', salary: '$110k' },
  { id: 5, name: 'Jane Smith', age: 25, email: 'jane@example.com', department: 'Sales', location: 'New York', salary: '$100k' },
  { id: 6, name: 'Charlie Wilson', age: 32, email: 'charlie@example.com', department: 'Engineering', location: 'Boston', salary: '$95k' },
]

const handleSelect = (rows: string[]) => {
  selected.value = rows
}

const handleSort = (column: string, order: 'asc' | 'desc' | null) => {
  sortInfo.value = order ? { column, order } : null
}
</script>

