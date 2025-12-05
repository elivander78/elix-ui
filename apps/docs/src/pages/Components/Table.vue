<template>
  <div class="docs-page">
    <h1>Table</h1>
    <p>The Table component is used to display structured data.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>With Sorting</h2>
    <Playground :code="sortableCode" />

    <h2>With Row Selection</h2>
    <Playground :code="selectableCode" />

    <h2>With Fixed Columns</h2>
    <Playground :code="fixedCode" />

    <h2>Combined Features</h2>
    <Playground :code="combinedCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <Table :columns="columns" :data="data" />
</template>

<script setup>
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
<\/script>`

const sortableCode = `<template>
  <Table :columns="columns" :data="data" @sort="handleSort" />
</template>

<script setup>
import { ref } from 'vue'
import { Table } from '@elix/ui'

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', sortable: true },
  { key: 'email', title: 'Email' },
]

const data = ref([
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
])

const handleSort = (column, order) => {
  console.log('Sort:', column, order)
}
<\/script>`

const selectableCode = `<template>
  <Table :columns="columns" :data="data" :selectable="true" :selected-rows="selectedRows" @select="handleSelect" />
</template>

<script setup>
import { ref } from 'vue'
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

const selectedRows = ref([])

const handleSelect = (rows) => {
  selectedRows.value = rows
  console.log('Selected rows:', rows)
}
<\/script>`

const fixedCode = `<template>
  <Table :columns="columns" :data="data" />
</template>

<script setup>
import { Table } from '@elix/ui'

const columns = [
  { key: 'name', title: 'Name', fixed: 'left', width: 150 },
  { key: 'age', title: 'Age' },
  { key: 'email', title: 'Email' },
  { key: 'phone', title: 'Phone' },
  { key: 'address', title: 'Address', fixed: 'right', width: 200 },
]

const data = [
  { name: 'John Doe', age: 30, email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com', phone: '234-567-8901', address: '456 Oak Ave' },
  { name: 'Bob Johnson', age: 35, email: 'bob@example.com', phone: '345-678-9012', address: '789 Pine Rd' },
]
<\/script>`

const combinedCode = `<template>
  <Table 
    :columns="columns" 
    :data="data" 
    :selectable="true"
    :selected-rows="selectedRows"
    :bordered="true"
    :striped="true"
    :hoverable="true"
    @sort="handleSort"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Table } from '@elix/ui'

const columns = [
  { key: 'name', title: 'Name', sortable: true, fixed: 'left', width: 150 },
  { key: 'age', title: 'Age', sortable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'status', title: 'Status', fixed: 'right', width: 100 },
]

const data = ref([
  { name: 'John Doe', age: 30, email: 'john@example.com', status: 'Active' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com', status: 'Inactive' },
  { name: 'Bob Johnson', age: 35, email: 'bob@example.com', status: 'Active' },
])

const selectedRows = ref([])

const handleSort = (column, order) => {
  console.log('Sort:', column, order)
}

const handleSelect = (rows) => {
  selectedRows.value = rows
  console.log('Selected rows:', rows)
}
<\/script>`
</script>

<style lang="scss" scoped>
.docs-page {
  h1 {
    margin-bottom: var(--eui-spacing-lg);
  }

  h2 {
    margin-top: var(--eui-spacing-2xl);
    margin-bottom: var(--eui-spacing-md);
  }
}
</style>
