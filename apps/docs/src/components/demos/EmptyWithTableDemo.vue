<template>
  <Table :columns="columns" :data="[]">
    <template #empty>
      <Empty description="No data in table" />
    </template>
  </Table>
</template>

<script setup lang="ts">
import { Empty, Table } from '@elivander/elix-ui'

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' },
]
</script>

