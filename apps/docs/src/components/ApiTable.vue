<template>
  <div class="api-table">
    <h3>Props</h3>
    <table v-if="propsList && propsList.length > 0" class="api-table__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in propsList" :key="prop.name">
          <td><code>{{ prop.name }}</code></td>
          <td><code>{{ prop.type }}</code></td>
          <td><code v-if="prop.default">{{ prop.default }}</code><span v-else>-</span></td>
          <td>{{ prop.description }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No props</p>

    <h3>Slots</h3>
    <table v-if="slotsList && slotsList.length > 0" class="api-table__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="slot in slotsList" :key="slot.name">
          <td><code>{{ slot.name }}</code></td>
          <td>{{ slot.description }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No slots</p>

    <h3>Events</h3>
    <table v-if="eventsList && eventsList.length > 0" class="api-table__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Payload</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in eventsList" :key="event.name">
          <td><code>{{ event.name }}</code></td>
          <td><code>{{ event.payload }}</code></td>
          <td>{{ event.description }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No events</p>

    <h3 v-if="methodsList && methodsList.length > 0">Methods</h3>
    <table v-if="methodsList && methodsList.length > 0" class="api-table__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Parameters</th>
          <th>Returns</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="method in methodsList" :key="method.name">
          <td><code>{{ method.name }}</code></td>
          <td><code>{{ method.params }}</code></td>
          <td><code>{{ method.returns }}</code></td>
          <td>{{ method.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
</script>

<style lang="scss" scoped>
.api-table {
  margin: var(--eui-spacing-xl) 0;

  h3 {
    margin-top: var(--eui-spacing-xl);
    margin-bottom: var(--eui-spacing-md);
    font-size: var(--eui-font-size-lg);
    font-weight: var(--eui-font-weight-semibold);
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: var(--eui-spacing-lg);

    th,
    td {
      padding: var(--eui-spacing-sm) var(--eui-spacing-md);
      text-align: left;
      border-bottom: 1px solid var(--eui-border-color);
    }

    th {
      background-color: var(--eui-bg-secondary);
      font-weight: var(--eui-font-weight-semibold);
      color: var(--eui-text-primary);
    }

    td {
      color: var(--eui-text-primary);
    }

    code {
      padding: 2px 6px;
      background-color: var(--eui-bg-secondary);
      border-radius: var(--eui-radius-sm);
      font-family: var(--eui-font-family-mono);
      font-size: 0.9em;
    }
  }
}
</style>

