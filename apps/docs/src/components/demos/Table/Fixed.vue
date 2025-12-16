<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--eui-text-secondary);">
      Scroll horizontally - ID and Salary columns stay fixed. Notice the shadow and border on fixed columns.
    </p>
    <div style="max-width: 600px; overflow-x: auto; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); padding: 8px;">
      <EuiTable :columns="columns" :data="data" hoverable striped />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Table as EuiTable } from '@elivander/elix-ui'

const columns = [
  { key: 'id', title: 'ID', fixed: 'left', width: 80, align: 'center' },
  { key: 'name', title: 'Name', width: 150 },
  { key: 'email', title: 'Email', width: 200 },
  { key: 'department', title: 'Department', width: 150 },
  { key: 'location', title: 'Location', width: 150 },
  { key: 'salary', title: 'Salary', fixed: 'right', width: 120, align: 'right' },
]

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', location: 'San Francisco', salary: '$120k' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Design', location: 'New York', salary: '$100k' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Marketing', location: 'Chicago', salary: '$110k' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', department: 'Engineering', location: 'Seattle', salary: '$125k' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', department: 'Sales', location: 'Boston', salary: '$95k' },
]
</script>

