<template>
  <EuiTable :columns="columns" :data="[]">
    <template #empty>
      <EuiEmpty description="No data in table" />
    </template>
  </EuiTable>
</template>

<script setup lang="ts">
import { Empty as EuiEmpty, Table as EuiTable } from '@elivander/elix-ui'

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' },
]
</script>

