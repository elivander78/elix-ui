<template>
  <div>
    <Table 
      :columns="columns" 
      :data="data" 
      selectable 
      hoverable 
      striped 
      @select="handleSelect"
    />
    <p v-if="selected.length > 0" style="margin-top: 16px;">
      Selected: {{ selected.length }} row(s)
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@elix/ui'

const selected = ref<string[]>([])

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', sortable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'role', title: 'Role', sortable: true },
]

const data = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', role: 'Designer' },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com', role: 'Manager' },
  { id: 4, name: 'Alice Brown', age: 28, email: 'alice@example.com', role: 'Developer' },
  { id: 5, name: 'Charlie Wilson', age: 32, email: 'charlie@example.com', role: 'Designer' },
]

const handleSelect = (rows: string[]) => {
  selected.value = rows
}
</script>

