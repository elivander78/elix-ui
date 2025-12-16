<template>
  <div class="docs-page">
    <h1>Notification</h1>
    <p>The Notification component is used to display messages to users.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="NotificationBasicDemo" :code="basicCode" />

    <h2>All Types</h2>
    <Playground :demo-component="NotificationTypesDemo" :code="allTypesCode" />

    <h2>Duration Control</h2>
    <Playground :demo-component="NotificationDurationDemo" :code="durationCode" />

    <h2>Position & Appearance</h2>
    <Playground :demo-component="NotificationPositionAppearanceDemo" :code="positionAppearanceCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import NotificationBasicDemo from '../../components/demos/Notification/Basic.vue'
import NotificationTypesDemo from '../../components/demos/Notification/Types.vue'
import NotificationDurationDemo from '../../components/demos/Notification/Duration.vue'
import NotificationPositionAppearanceDemo from '../../components/demos/Notification/PositionAppearance.vue'

const basicCode = `<template>
  <div>
    <EuiButton @click="showSuccess">Success</EuiButton>
    <EuiButton @click="showError">Error</EuiButton>
    <EuiButton @click="showWarning">Warning</EuiButton>
    <EuiButton @click="showInfo">Info</EuiButton>
  </div>
  <EuiNotification :notifications="notifications" @remove="remove" />
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Notification as EuiNotification, useNotification } from '@elivander/elix-ui'

const { notifications, success, error, warning, info, remove } = useNotification()

const showSuccess = () => success('Success', 'Operation completed successfully')
const showError = () => error('Error', 'Something went wrong')
const showWarning = () => warning('Warning', 'Please check your input')
const showInfo = () => info('Info', 'This is an informational message')
<\/script>`

const allTypesCode = `<template>
  <div>
    <EuiButton @click="showSuccess">Success</EuiButton>
    <EuiButton @click="showError">Error</EuiButton>
    <EuiButton @click="showWarning">Warning</EuiButton>
    <EuiButton @click="showInfo">Info</EuiButton>
  </div>
  <EuiNotification :notifications="notifications" @remove="remove" />
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Notification as EuiNotification, useNotification } from '@elivander/elix-ui'

const { notifications, success, error, warning, info, remove } = useNotification()

const showSuccess = () => success('Success', 'Operation completed successfully')
const showError = () => error('Error', 'Something went wrong')
const showWarning = () => warning('Warning', 'Please check your input')
const showInfo = () => info('Info', 'This is an informational message')
<\/script>`

const durationCode = `<template>
  <div>
    <EuiButton @click="showShort">Short Duration (2s)</EuiButton>
    <EuiButton @click="showLong">Long Duration (5s)</EuiButton>
    <EuiButton @click="showPersistent">Persistent (0s)</EuiButton>
    <EuiButton @click="showDefault">Default Duration</EuiButton>
  </div>
  <EuiNotification :notifications="notifications" @remove="remove" />
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Notification as EuiNotification, useNotification } from '@elivander/elix-ui'

const { notifications, success, error, warning, info, remove } = useNotification()

const showShort = () => success('Success', 'This will close in 2 seconds', 2000)
const showLong = () => error('Error', 'This will close in 5 seconds', 5000)
const showPersistent = () => warning('Warning', 'This will stay until closed', 0)
const showDefault = () => info('Info', 'Default duration (4.5s)', undefined)
<\/script>`

const positionAppearanceCode = `<template>
  <div>
    <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
      <EuiButton @click="showNotification('success')">Success</EuiButton>
      <EuiButton @click="showNotification('error')">Error</EuiButton>
      <EuiButton @click="showNotification('warning')">Warning</EuiButton>
      <EuiButton @click="showNotification('info')">Info</EuiButton>
    </div>
    <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; align-items: center;">
      <label>Position:</label>
      <EuiSelect v-model="position" :options="positionOptions" style="width: 150px;" />
      <label>Duration (ms):</label>
      <EuiInput v-model.number="duration" type="number" placeholder="0 = no auto-close" style="width: 150px;" />
      <label>Appearance:</label>
      <EuiSelect v-model="appearance" :options="appearanceOptions" style="width: 150px;" />
    </div>
    <EuiNotification :notifications="notifications" @remove="remove" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Notification as EuiNotification, Select as EuiSelect, Input as EuiInput, useNotification } from '@elivander/elix-ui'

const { notifications, add, remove } = useNotification()

const position = ref('top-right')
const duration = ref(4500)
const appearance = ref('shadow')

const positionOptions = [
  { label: 'Top Right', value: 'top-right' },
  { label: 'Top Left', value: 'top-left' },
  { label: 'Bottom Right', value: 'bottom-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
]

const appearanceOptions = [
  { label: 'Border', value: 'border' },
  { label: 'Shadow', value: 'shadow' },
]

const showNotification = (type) => {
  add({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    message: 'Notification message',
    type: type,
    duration: duration.value || 0,
    position: position.value,
    appearance: appearance.value,
  })
}
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

