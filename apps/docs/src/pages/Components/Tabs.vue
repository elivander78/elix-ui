<template>
  <div class="docs-page">
    <h1>Tabs</h1>
    <p>The Tabs component is used to organize content into multiple panels.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Multiple Tabs</h2>
    <Playground :code="multipleCode" />

    <h2>Tab Types</h2>
    <Playground :code="typesCode" />

    <h2>Disabled Tabs</h2>
    <Playground :code="disabledCode" />

    <h2>API</h2>
    <ApiTable :props="tabsProps" :events="tabsEvents" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'

const tabsProps = [
  { name: 'modelValue', type: 'string | number', description: 'Active tab name/value' },
  { name: 'type', type: "'line' | 'card'", default: "'line'", description: 'Tab type/style' },
]

const tabsEvents = [
  { name: 'update:modelValue', payload: 'string | number', description: 'Emitted when active tab changes' },
  { name: 'change', payload: 'string | number', description: 'Emitted when tab is changed' },
]

const basicCode = `<template>
  <EuiTabs v-model="activeTab">
    <EuiTabPane name="tab1" label="Tab 1">Content 1</EuiTabPane>
    <EuiTabPane name="tab2" label="Tab 2">Content 2</EuiTabPane>
  </EuiTabs>
</template>

<script setup>
import { ref } from 'vue'
import { Tabs as EuiTabs, TabPane as EuiTabPane } from '@elivander/elix-ui'

const activeTab = ref('tab1')
<\/script>`

const multipleCode = `<template>
  <EuiTabs v-model="activeTab">
    <EuiTabPane name="tab1" label="Tab 1">Content for Tab 1</EuiTabPane>
    <EuiTabPane name="tab2" label="Tab 2">Content for Tab 2</EuiTabPane>
    <EuiTabPane name="tab3" label="Tab 3">Content for Tab 3</EuiTabPane>
    <EuiTabPane name="tab4" label="Tab 4">Content for Tab 4</EuiTabPane>
  </EuiTabs>
</template>

<script setup>
import { ref } from 'vue'
import { Tabs as EuiTabs, TabPane as EuiTabPane } from '@elivander/elix-ui'

const activeTab = ref('tab1')
<\/script>`

const typesCode = `<template>
  <div>
    <h3>Line Type</h3>
    <EuiTabs v-model="activeTab1" type="line">
      <EuiTabPane name="tab1" label="Tab 1">Line tab content</EuiTabPane>
      <EuiTabPane name="tab2" label="Tab 2">Line tab content</EuiTabPane>
    </EuiTabs>
    
    <h3 style="margin-top: 40px;">Card Type</h3>
    <EuiTabs v-model="activeTab2" type="card">
      <EuiTabPane name="tab1" label="Tab 1">Card tab content</EuiTabPane>
      <EuiTabPane name="tab2" label="Tab 2">Card tab content</EuiTabPane>
    </EuiTabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Tabs as EuiTabs, TabPane as EuiTabPane } from '@elivander/elix-ui'

const activeTab1 = ref('tab1')
const activeTab2 = ref('tab1')
<\/script>`

const disabledCode = `<template>
  <EuiTabs v-model="activeTab">
    <EuiTabPane name="tab1" label="Tab 1">Content 1</EuiTabPane>
    <EuiTabPane name="tab2" label="Tab 2" disabled>Content 2 (disabled)</EuiTabPane>
    <EuiTabPane name="tab3" label="Tab 3">Content 3</EuiTabPane>
  </EuiTabs>
</template>

<script setup>
import { ref } from 'vue'
import { Tabs as EuiTabs, TabPane as EuiTabPane } from '@elivander/elix-ui'

const activeTab = ref('tab1')
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

