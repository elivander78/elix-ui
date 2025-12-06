<template>
  <div class="docs-page">
    <h1>ButtonGroup</h1>
    <p>Группа кнопок для логической группировки связанных действий.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="ButtonGroupBasicDemo" :code="basicCode" />

    <h2>Segmented</h2>
    <Playground :demo-component="ButtonGroupSegmentedDemo" :code="segmentedCode" />

    <h2>Sizes</h2>
    <Playground :demo-component="ButtonGroupSizesDemo" :code="sizesCode" />

    <h2>Variants</h2>
    <Playground :demo-component="ButtonGroupVariantsDemo" :code="variantsCode" />

    <h2>API</h2>
    <ApiTable
      :props="buttonGroupProps"
      :slots="buttonGroupSlots"
      :events="buttonGroupEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import ButtonGroupBasicDemo from '../../components/demos/ButtonGroupBasicDemo.vue'
import ButtonGroupSegmentedDemo from '../../components/demos/ButtonGroupSegmentedDemo.vue'
import ButtonGroupSizesDemo from '../../components/demos/ButtonGroupSizesDemo.vue'
import ButtonGroupVariantsDemo from '../../components/demos/ButtonGroupVariantsDemo.vue'

const buttonGroupProps = [
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Размер кнопок в группе' },
  { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost'", default: "'primary'", description: 'Вариант кнопок в группе' },
  { name: 'segmented', type: 'boolean', default: 'false', description: 'Убрать пробелы между кнопками (segmented режим)' },
  { name: 'appearance', type: "'border' | 'shadow' | 'border-shadow'", default: "'border'", description: 'Стиль контейнера группы' },
]

const buttonGroupSlots = [
  { name: 'default', description: 'Содержимое группы (обычно Button компоненты)' },
]

const buttonGroupEvents = []

const basicCode = `<template>
  <ButtonGroup>
    <Button>Today</Button>
    <Button>Week</Button>
    <Button>Month</Button>
  </ButtonGroup>
</template>`

const segmentedCode = `<template>
  <ButtonGroup segmented>
    <Button>Option 1</Button>
    <Button>Option 2</Button>
    <Button>Option 3</Button>
  </ButtonGroup>
</template>`

const sizesCode = `<template>
  <ButtonGroup size="xs">
    <Button>XS</Button>
    <Button>XS</Button>
  </ButtonGroup>
  <ButtonGroup size="sm">
    <Button>SM</Button>
    <Button>SM</Button>
  </ButtonGroup>
</template>`

const variantsCode = `<template>
  <ButtonGroup variant="primary">
    <Button>Primary</Button>
    <Button>Primary</Button>
  </ButtonGroup>
  <ButtonGroup variant="outline">
    <Button>Outline</Button>
    <Button>Outline</Button>
  </ButtonGroup>
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

