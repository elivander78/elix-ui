<template>
  <div class="docs-page">
    <h1>Table</h1>
    <p>The Table component is used to display structured data.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Striped Table</h2>
    <Playground :code="stripedCode" />

    <h2>Bordered Table</h2>
    <Playground :code="borderedCode" />

    <h2>With Loading (Skeleton)</h2>
    <Playground :code="loadingCode" />

    <h2>Sortable</h2>
    <p>Click on column headers to sort. Click again to reverse order, click third time to remove sorting.</p>
    <Playground :demo-component="TableSortableDemo" :code="sortableCode" />

    <h2>Fixed Columns</h2>
    <p>Fixed columns remain visible when scrolling horizontally. Try scrolling the table below.</p>
    <Playground :demo-component="TableFixedDemo" :code="fixedColumnsCode" />

    <h2>Sortable with Fixed Columns</h2>
    <p>Sorting and fixed columns work independently. Fixed columns stay in place while sorting works on all columns.</p>
    <Playground :demo-component="TableSortableFixedDemo" :code="sortableFixedCode" />

    <h2>Sizes</h2>
    <p>Tables come in three sizes: small, medium (default), and large.</p>
    <Playground :demo-component="TableSizesDemo" :code="sizesCode" />

    <h2>Selectable</h2>
    <p>Enable row selection with checkboxes. Selected rows persist through sorting.</p>
    <Playground :demo-component="TableSelectableDemo" :code="selectableCode" />

    <h2>Selectable with Sorting and Fixed Columns</h2>
    <p>All features work together independently. Selection persists through sorting, and fixed columns remain visible.</p>
    <Playground :demo-component="TableSelectableSortableFixedDemo" :code="selectableSortableFixedCode" />

    <h2>API</h2>
    <ApiTable :props="tableProps" :events="tableEvents" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import TableSortableDemo from '../../components/demos/TableSortableDemo.vue'
import TableFixedDemo from '../../components/demos/TableFixedDemo.vue'
import TableSortableFixedDemo from '../../components/demos/TableSortableFixedDemo.vue'
import TableSizesDemo from '../../components/demos/TableSizesDemo.vue'
import TableSelectableDemo from '../../components/demos/TableSelectableDemo.vue'
import TableSelectableSortableFixedDemo from '../../components/demos/TableSelectableSortableFixedDemo.vue'

const tableProps = [
  { name: 'columns', type: 'TableColumn[]', description: 'Table column definitions' },
  { name: 'data', type: 'Record<string, any>[]', description: 'Table data' },
  { name: 'striped', type: 'boolean', default: 'false', description: 'Whether table rows are striped' },
  { name: 'bordered', type: 'boolean', default: 'false', description: 'Whether table has borders' },
  { name: 'hoverable', type: 'boolean', default: 'false', description: 'Whether table rows have hover effect' },
  { name: 'selectable', type: 'boolean', default: 'false', description: 'Whether rows can be selected' },
  { name: 'selectedRows', type: 'string[]', description: 'Array of selected row indices' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Table size' },
]

const tableEvents = [
  { name: 'sort', payload: '[column: string, order: "asc" | "desc" | null]', description: 'Emitted when column is sorted' },
  { name: 'select', payload: 'string[]', description: 'Emitted when rows are selected' },
]

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

const stripedCode = `<template>
  <Table :columns="columns" :data="data" striped />
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
  { name: 'Alice Brown', age: 28, email: 'alice@example.com' },
]
<\/script>`

const borderedCode = `<template>
  <Table :columns="columns" :data="data" bordered />
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

const loadingCode = `<template>
  <div>
    <Table v-if="loading" :columns="columns" :data="[]">
      <template #empty>
        <div style="padding: 40px; text-align: center;">
          <Skeleton :rows="3" />
        </div>
      </template>
    </Table>
    <Table v-else :columns="columns" :data="data" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Table, Skeleton } from '@elix/ui'

const loading = ref(true)

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

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
<\/script>`

const sortableCode = `<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--eui-text-secondary);">
      Click column headers to sort. Notice how rows reorder while maintaining their data.
    </p>
    <Table :columns="columns" :data="data" hoverable striped />
  </div>
</template>

<script setup>
import { Table } from '@elix/ui'

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
<\/script>`

const fixedColumnsCode = `<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--eui-text-secondary);">
      Scroll horizontally - ID and Salary columns stay fixed. Notice the shadow and border on fixed columns.
    </p>
    <div style="max-width: 600px; overflow-x: auto; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); padding: 8px;">
      <Table :columns="columns" :data="data" hoverable striped />
    </div>
  </div>
</template>

<script setup>
import { Table } from '@elix/ui'

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
<\/script>`

const sortableFixedCode = `<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--eui-text-secondary);">
      Sort any column - fixed columns stay in place. Scroll horizontally to see fixed columns work.
    </p>
    <div style="max-width: 700px; overflow-x: auto; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); padding: 8px;">
      <Table :columns="columns" :data="data" hoverable striped />
    </div>
  </div>
</template>

<script setup>
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
<\/script>`

const sizesCode = `<template>
  <div>
    <h3 style="margin-bottom: 12px;">Small</h3>
    <Table :columns="columns" :data="data" size="sm" hoverable />
    
    <h3 style="margin-top: 32px; margin-bottom: 12px;">Medium (Default)</h3>
    <Table :columns="columns" :data="data" size="md" hoverable />
    
    <h3 style="margin-top: 32px; margin-bottom: 12px;">Large</h3>
    <Table :columns="columns" :data="data" size="lg" hoverable />
  </div>
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

const selectableCode = `<template>
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

<script setup>
import { ref } from 'vue'
import { Table } from '@elix/ui'

const selected = ref([])

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

const handleSelect = (rows) => {
  selected.value = rows
}
<\/script>`

const selectableSortableFixedCode = `<template>
  <div style="max-width: 700px; overflow-x: auto;">
    <Table 
      :columns="columns" 
      :data="data" 
      selectable 
      hoverable 
      striped 
      @select="handleSelect"
      @sort="handleSort"
    />
    <p v-if="selected.length > 0" style="margin-top: 16px;">
      Selected: {{ selected.length }} row(s) - IDs: {{ selected.join(', ') }}
    </p>
    <p v-if="sortInfo" style="margin-top: 8px;">
      Sorted by: {{ sortInfo.column }} ({{ sortInfo.order }})
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Table } from '@elix/ui'

const selected = ref([])
const sortInfo = ref(null)

const columns = [
  { key: 'name', title: 'Name', fixed: 'left', width: 150, sortable: true },
  { key: 'age', title: 'Age', width: 100, sortable: true },
  { key: 'email', title: 'Email', width: 200, sortable: true },
  { key: 'department', title: 'Department', width: 150, sortable: true },
  { key: 'salary', title: 'Salary', fixed: 'right', width: 120, align: 'right', sortable: true },
]

const data = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', department: 'Engineering', salary: '$120k' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', department: 'Design', salary: '$100k' },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com', department: 'Marketing', salary: '$110k' },
  { id: 4, name: 'Alice Brown', age: 28, email: 'alice@example.com', department: 'Engineering', salary: '$125k' },
  { id: 5, name: 'Charlie Wilson', age: 32, email: 'charlie@example.com', department: 'Sales', salary: '$95k' },
]

const handleSelect = (rows) => {
  selected.value = rows
}

const handleSort = (column, order) => {
  sortInfo.value = order ? { column, order } : null
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
