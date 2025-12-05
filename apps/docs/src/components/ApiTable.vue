<template>
  <div class="api-table">
    <h3 v-if="propsList && propsList.length > 0">Props</h3>
    <Table
      v-if="propsList && propsList.length > 0"
      :columns="propsColumns"
      :data="propsData"
      hoverable
      striped
      class="api-table__table"
    >
      <template #cell-name="{ value }">
        <code class="api-table__code">{{ value }}</code>
      </template>
      <template #cell-type="{ value }">
        <code class="api-table__code">{{ value }}</code>
      </template>
      <template #cell-default="{ value }">
        <code v-if="value && value !== '-'" class="api-table__code">{{ value }}</code>
        <span v-else class="api-table__empty">-</span>
      </template>
    </Table>
    <p v-else class="api-table__empty-text">No props</p>

    <h3 v-if="slotsList && slotsList.length > 0">Slots</h3>
    <Table
      v-if="slotsList && slotsList.length > 0"
      :columns="slotsColumns"
      :data="slotsData"
      hoverable
      striped
      class="api-table__table"
    >
      <template #cell-name="{ value }">
        <code class="api-table__code">{{ value }}</code>
      </template>
    </Table>
    <p v-else class="api-table__empty-text">No slots</p>

    <h3 v-if="eventsList && eventsList.length > 0">Events</h3>
    <Table
      v-if="eventsList && eventsList.length > 0"
      :columns="eventsColumns"
      :data="eventsData"
      hoverable
      striped
      class="api-table__table"
    >
      <template #cell-name="{ value }">
        <code class="api-table__code">{{ value }}</code>
      </template>
      <template #cell-payload="{ value }">
        <code class="api-table__code">{{ value }}</code>
      </template>
    </Table>
    <p v-else class="api-table__empty-text">No events</p>

    <h3 v-if="methodsList && methodsList.length > 0">Methods</h3>
    <Table
      v-if="methodsList && methodsList.length > 0"
      :columns="methodsColumns"
      :data="methodsData"
      hoverable
      striped
      class="api-table__table"
    >
      <template #cell-name="{ value }">
        <code class="api-table__code">{{ value }}</code>
      </template>
      <template #cell-params="{ value }">
        <code class="api-table__code">{{ value }}</code>
      </template>
      <template #cell-returns="{ value }">
        <code class="api-table__code">{{ value }}</code>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Table, type TableColumn } from '@elivander/elix-ui'

export interface ApiProp {
  name: string
  type: string
  default?: string
  description: string
}

export interface ApiSlot {
  name: string
  description: string
}

export interface ApiEvent {
  name: string
  payload: string
  description: string
}

export interface ApiMethod {
  name: string
  params: string
  returns: string
  description: string
}

const componentProps = defineProps<{
  props?: ApiProp[]
  slots?: ApiSlot[]
  events?: ApiEvent[]
  methods?: ApiMethod[]
}>()

const propsList = computed(() => componentProps.props || [])
const slotsList = computed(() => componentProps.slots || [])
const eventsList = computed(() => componentProps.events || [])
const methodsList = computed(() => componentProps.methods || [])

const propsColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', fixed: 'left', width: 180 },
  { key: 'type', title: 'Type', width: 200 },
  { key: 'default', title: 'Default', width: 150 },
  { key: 'description', title: 'Description' },
])

const propsData = computed(() =>
  propsList.value.map((prop) => ({
    name: prop.name,
    type: prop.type,
    default: prop.default || '-',
    description: prop.description,
  }))
)

const slotsColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', fixed: 'left', width: 180 },
  { key: 'description', title: 'Description' },
])

const slotsData = computed(() =>
  slotsList.value.map((slot) => ({
    name: slot.name,
    description: slot.description,
  }))
)

const eventsColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', fixed: 'left', width: 180 },
  { key: 'payload', title: 'Payload', width: 250 },
  { key: 'description', title: 'Description' },
])

const eventsData = computed(() =>
  eventsList.value.map((event) => ({
    name: event.name,
    payload: event.payload,
    description: event.description,
  }))
)

const methodsColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', fixed: 'left', width: 180 },
  { key: 'params', title: 'Parameters', width: 250 },
  { key: 'returns', title: 'Returns', width: 200 },
  { key: 'description', title: 'Description' },
])

const methodsData = computed(() =>
  methodsList.value.map((method) => ({
    name: method.name,
    params: method.params,
    returns: method.returns,
    description: method.description,
  }))
)
</script>

<style lang="scss" scoped>
.api-table {
  margin: var(--eui-spacing-xl) 0;
  max-width: 100%;
  overflow-x: auto;

  h3 {
    margin-top: var(--eui-spacing-xl);
    margin-bottom: var(--eui-spacing-md);
    font-size: var(--eui-font-size-lg);
    font-weight: var(--eui-font-weight-semibold);
    color: var(--eui-text-primary);
  }

  &__table {
    margin-bottom: var(--eui-spacing-lg);
    min-width: 0;
    width: 100%;
    
    :deep(.eui-table-wrapper) {
      max-width: 100%;
      overflow-x: auto;
    }
  }

  &__code {
    padding: 3px 8px;
    background: linear-gradient(135deg, var(--eui-bg-secondary) 0%, var(--eui-bg-tertiary) 100%);
    border-radius: var(--eui-radius-sm);
    font-family: var(--eui-font-family-mono);
    font-size: 0.875em;
    color: var(--eui-text-primary);
    border: 1px solid var(--eui-border-color);
    display: inline-block;
    line-height: 1.4;
    word-break: break-word;
    max-width: 100%;
  }

  &__empty {
    color: var(--eui-text-tertiary);
    font-style: italic;
  }

  &__empty-text {
    color: var(--eui-text-secondary);
    font-style: italic;
    margin: var(--eui-spacing-md) 0;
  }
}
</style>

