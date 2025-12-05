<template>
  <div>
    <h3 style="margin-bottom: 12px;">Small</h3>
    <Table :columns="columns" :data="data" size="sm" hoverable />
    
    <h3 style="margin-top: 32px; margin-bottom: 12px;">Medium (Default)</h3>
    <Table :columns="columns" :data="data" size="md" hoverable />
    
    <h3 style="margin-top: 32px; margin-bottom: 12px;">Large</h3>
    <Table :columns="columns" :data="data" size="lg" hoverable />
  </div>
</template>

<script setup lang="ts">
import { Table } from '@elix/ui'

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' },
  { key: 'email', title: 'Email' },
]

const data = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
]
</script>

