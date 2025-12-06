<template>
  <div class="docs-page">
    <h1>Empty</h1>
    <p>Компонент для отображения пустого состояния (нет данных).</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="EmptyBasicDemo" :code="basicCode" />

    <h2>With Table</h2>
    <Playground :demo-component="EmptyWithTableDemo" :code="tableCode" />

    <h2>API</h2>
    <ApiTable
      :props="emptyProps"
      :slots="emptySlots"
      :events="emptyEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import EmptyBasicDemo from '../../components/demos/EmptyBasicDemo.vue'
import EmptyWithTableDemo from '../../components/demos/EmptyWithTableDemo.vue'

const emptyProps = [
  { name: 'description', type: 'string', default: "'No data'", description: 'Текст описания' },
  { name: 'icon', type: 'VNode', default: '', description: 'Кастомная иконка' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Размер компонента' },
]

const emptySlots = [
  { name: 'default', description: 'Дополнительный контент' },
  { name: 'icon', description: 'Кастомная иконка' },
  { name: 'description', description: 'Кастомное описание' },
]

const emptyEvents = []

const basicCode = `<template>
  <Empty description="No data available" />
</template>`

const tableCode = `<template>
  <Table :columns="columns" :data="[]">
    <template #empty>
      <Empty description="No data in table" />
    </template>
  </Table>
</template>`
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

