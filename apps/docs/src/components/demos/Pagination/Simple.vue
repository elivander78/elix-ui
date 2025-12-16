<template>
  <div class="pagination-demo" style="display: flex; flex-direction: column; gap: 20px;">
    <EuiPagination v-model="currentPage1" :total="100" :page-size="10" simple />
    <EuiPagination v-model="currentPage2" :total="250" :page-size="10" simple />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Pagination as EuiPagination } from '@elivander/elix-ui'

const currentPage1 = ref(1)
const currentPage2 = ref(1)
</script>

<style lang="scss" scoped>
.pagination-demo {
  width: 100%;
}
</style>

