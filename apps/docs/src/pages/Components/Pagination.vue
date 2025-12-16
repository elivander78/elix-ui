<template>
  <div class="docs-page">
    <h1>Pagination</h1>
    <p>The Pagination component is used to navigate through pages of content.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Different Sizes</h2>
    <Playground :code="sizesCode" />

    <h2>With Total Count</h2>
    <Playground :code="totalCode" />

    <h2>With Quick Jumper</h2>
    <Playground :code="jumperCode" />

    <h2>Combined Features</h2>
    <Playground :code="combinedCode" />

    <h2>Simple Version</h2>
    <Playground :demo-component="PaginationSimpleDemo" :code="simpleCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import PaginationSimpleDemo from '../../components/demos/Pagination/Simple.vue'

const basicCode = `<template>
  <EuiPagination v-model="currentPage" :total="100" :page-size="10" />
</template>

<script setup>
import { ref } from 'vue'
import { Pagination as EuiPagination } from '@elivander/elix-ui'

const currentPage = ref(1)
<\/script>`

const sizesCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <EuiPagination v-model="currentPage1" :total="100" :page-size="10" size="sm" />
    <EuiPagination v-model="currentPage2" :total="100" :page-size="10" size="md" />
    <EuiPagination v-model="currentPage3" :total="100" :page-size="10" size="lg" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Pagination as EuiPagination } from '@elivander/elix-ui'

const currentPage1 = ref(1)
const currentPage2 = ref(1)
const currentPage3 = ref(1)
<\/script>`

const totalCode = `<template>
  <EuiPagination v-model="currentPage" :total="250" :page-size="10" :show-total="true" />
</template>

<script setup>
import { ref } from 'vue'
import { Pagination as EuiPagination } from '@elivander/elix-ui'

const currentPage = ref(1)
<\/script>`

const jumperCode = `<template>
  <EuiPagination v-model="currentPage" :total="500" :page-size="10" :show-quick-jumper="true" />
</template>

<script setup>
import { ref } from 'vue'
import { Pagination as EuiPagination } from '@elivander/elix-ui'

const currentPage = ref(1)
<\/script>`

const combinedCode = `<template>
  <EuiPagination 
    v-model="currentPage" 
    :total="1000" 
    :page-size="10" 
    :show-total="true"
    :show-quick-jumper="true"
    size="md"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Pagination as EuiPagination } from '@elivander/elix-ui'

const currentPage = ref(1)
<\/script>`

const simpleCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <EuiPagination v-model="currentPage1" :total="100" :page-size="10" simple />
    <EuiPagination v-model="currentPage2" :total="250" :page-size="10" simple />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Pagination as EuiPagination } from '@elivander/elix-ui'

const currentPage1 = ref(1)
const currentPage2 = ref(1)
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
