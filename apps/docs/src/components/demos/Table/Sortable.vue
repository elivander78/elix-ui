<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--eui-text-secondary);">
      Click column headers to sort. Notice how rows reorder while maintaining their data.
    </p>
    <EuiTable :columns="columns" :data="data" hoverable striped />
  </div>
</template>

<script setup lang="ts">
import { Table as EuiTable } from '@elivander/elix-ui'

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', sortable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'role', title: 'Role', sortable: true },
]

const data = [
  { name: 'Zoe Anderson', age: 22, email: 'zoe@example.com', role: 'Intern' },
  { name: 'John Doe', age: 30, email: 'john@example.com', role: 'Developer' },
  { name: 'Alice Brown', age: 28, email: 'alice@example.com', role: 'Developer' },
  { name: 'Bob Johnson', age: 35, email: 'bob@example.com', role: 'Manager' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com', role: 'Designer' },
  { name: 'Charlie Wilson', age: 32, email: 'charlie@example.com', role: 'Designer' },
]
</script>

