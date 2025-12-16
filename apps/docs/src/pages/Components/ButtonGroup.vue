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
import ButtonGroupBasicDemo from '../../components/demos/ButtonGroup/Basic.vue'
import ButtonGroupSegmentedDemo from '../../components/demos/ButtonGroup/Segmented.vue'
import ButtonGroupSizesDemo from '../../components/demos/ButtonGroup/Sizes.vue'
import ButtonGroupVariantsDemo from '../../components/demos/ButtonGroup/Variants.vue'

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
  <EuiButtonGroup>
    <EuiButton>Today</EuiButton>
    <EuiButton>Week</EuiButton>
    <EuiButton>Month</EuiButton>
  </EuiButtonGroup>
</template>`

const segmentedCode = `<template>
  <EuiButtonGroup segmented>
    <EuiButton>Option 1</EuiButton>
    <EuiButton>Option 2</EuiButton>
    <EuiButton>Option 3</EuiButton>
  </EuiButtonGroup>
</template>`

const sizesCode = `<template>
  <EuiButtonGroup size="xs">
    <EuiButton>XS</EuiButton>
    <EuiButton>XS</EuiButton>
  </EuiButtonGroup>
  <EuiButtonGroup size="sm">
    <EuiButton>SM</EuiButton>
    <EuiButton>SM</EuiButton>
  </EuiButtonGroup>
</template>`

const variantsCode = `<template>
  <EuiButtonGroup variant="primary">
    <EuiButton>Primary</EuiButton>
    <EuiButton>Primary</EuiButton>
  </EuiButtonGroup>
  <EuiButtonGroup variant="outline">
    <EuiButton>Outline</EuiButton>
    <EuiButton>Outline</EuiButton>
  </EuiButtonGroup>
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

