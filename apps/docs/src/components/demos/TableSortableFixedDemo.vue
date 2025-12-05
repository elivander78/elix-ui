<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--eui-text-secondary);">
      Sort any column - fixed columns stay in place. Scroll horizontally to see fixed columns work.
    </p>
    <div style="max-width: 700px; overflow-x: auto; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); padding: 8px;">
      <Table :columns="columns" :data="data" hoverable striped />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Table } from '@elix/ui'

const columns = [
  { key: 'name', title: 'Name', fixed: 'left', width: 150, sortable: true },
  { key: 'age', title: 'Age', width: 100, sortable: true },
  { key: 'email', title: 'Email', width: 200, sortable: true },
  { key: 'department', title: 'Department', width: 150, sortable: true },
  { key: 'location', title: 'Location', width: 150, sortable: true },
  { key: 'salary', title: 'Salary', fixed: 'right', width: 120, align: 'right', sortable: true },
]

const data = [
  { name: 'Zoe Anderson', age: 22, email: 'zoe@example.com', department: 'Engineering', location: 'Austin', salary: '$85k' },
  { name: 'John Doe', age: 30, email: 'john@example.com', department: 'Engineering', location: 'San Francisco', salary: '$120k' },
  { name: 'Alice Brown', age: 28, email: 'alice@example.com', department: 'Design', location: 'Seattle', salary: '$125k' },
  { name: 'Bob Johnson', age: 35, email: 'bob@example.com', department: 'Marketing', location: 'Chicago', salary: '$110k' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com', department: 'Sales', location: 'New York', salary: '$100k' },
  { name: 'Charlie Wilson', age: 32, email: 'charlie@example.com', department: 'Engineering', location: 'Boston', salary: '$95k' },
]
</script>

