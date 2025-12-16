<template>
  <div class="docs-page">
    <h1>Timeline</h1>
    <p>Компонент для отображения временной линии событий.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="TimelineBasicDemo" :code="basicCode" />

    <h2>With Colors</h2>
    <Playground :demo-component="TimelineWithColorsDemo" :code="colorsCode" />

    <h2>API</h2>
    <ApiTable
      :props="timelineProps"
      :slots="timelineSlots"
      :events="timelineEvents"
    />
    <h3>TimelineItem</h3>
    <ApiTable
      :props="timelineItemProps"
      :slots="timelineItemSlots"
      :events="timelineItemEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import TimelineBasicDemo from '../../components/demos/Timeline/Basic.vue'
import TimelineWithColorsDemo from '../../components/demos/Timeline/WithColors.vue'

const timelineProps = [
  { name: 'reverse', type: 'boolean', default: 'false', description: 'Обратный порядок элементов' },
]

const timelineSlots = [
  { name: 'default', description: 'Содержимое временной линии (TimelineItem компоненты)' },
]

const timelineEvents = []

const timelineItemProps = [
  { name: 'title', type: 'string', default: '', description: 'Заголовок события' },
  { name: 'time', type: 'string', default: '', description: 'Время события' },
  { name: 'dot', type: 'VNode', default: '', description: 'Кастомная точка' },
  { name: 'color', type: "'primary' | 'success' | 'warning' | 'error' | string", default: "'primary'", description: 'Цвет точки' },
]

const timelineItemSlots = [
  { name: 'default', description: 'Дополнительный контент' },
  { name: 'dot', description: 'Кастомная точка' },
  { name: 'title', description: 'Заголовок события' },
  { name: 'time', description: 'Время события' },
]

const timelineItemEvents = []

const basicCode = `<template>
  <EuiTimeline>
    <EuiTimelineItem title="Create account" time="2024-01-01" />
    <EuiTimelineItem title="Verify email" time="2024-01-02" />
  </EuiTimeline>
</template>`

const colorsCode = `<template>
  <EuiTimeline>
    <EuiTimelineItem title="Order placed" color="success" />
    <EuiTimelineItem title="Payment confirmed" color="success" />
  </EuiTimeline>
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

  h3 {
    margin-top: var(--eui-spacing-xl);
    margin-bottom: var(--eui-spacing-md);
  }
}
</style>

