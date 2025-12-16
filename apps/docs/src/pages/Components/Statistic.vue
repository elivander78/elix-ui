<template>
  <div class="docs-page">
    <h1>Statistic</h1>
    <p>Компонент для отображения статистики и метрик (KPI).</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="StatisticBasicDemo" :code="basicCode" />

    <h2>API</h2>
    <ApiTable
      :props="statisticProps"
      :slots="statisticSlots"
      :events="statisticEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import StatisticBasicDemo from '../../components/demos/Statistic/Basic.vue'

const statisticProps = [
  { name: 'title', type: 'string', default: '', description: 'Заголовок метрики (required)' },
  { name: 'value', type: 'string | number', default: '', description: 'Значение метрики (required)' },
  { name: 'prefix', type: 'VNode', default: '', description: 'Префикс перед значением' },
  { name: 'suffix', type: 'VNode', default: '', description: 'Суффикс после значения' },
  { name: 'trend', type: "'up' | 'down' | 'none'", default: "'none'", description: 'Тренд (стрелка вверх/вниз)' },
  { name: 'description', type: 'string', default: '', description: 'Описание метрики' },
]

const statisticSlots = [
  { name: 'default', description: 'Дополнительный контент' },
  { name: 'prefix', description: 'Префикс перед значением' },
  { name: 'suffix', description: 'Суффикс после значения' },
  { name: 'description', description: 'Кастомное описание' },
]

const statisticEvents = []

const basicCode = `<template>
  <EuiStatistic title="Total Users" :value="1234" />
  <EuiStatistic title="Revenue" :value="5678" suffix="$" />
  <EuiStatistic title="Growth" :value="12.5" suffix="%" trend="up" />
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

