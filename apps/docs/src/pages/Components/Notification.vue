<template>
  <div class="docs-page">
    <h1>Notification</h1>
    <p>The Notification component is used to display messages to users.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>All Types</h2>
    <Playground :code="allTypesCode" />

    <h2>Duration Control</h2>
    <Playground :code="durationCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <div>
    <Button @click="showSuccess">Success</Button>
    <Button @click="showError">Error</Button>
    <Button @click="showWarning">Warning</Button>
    <Button @click="showInfo">Info</Button>
  </div>
  <Notification :notifications="notifications" @remove="remove" />
</template>

<script setup>
import { ref } from 'vue'
import { Button, Notification, useNotification } from '@elix/ui'

const { notifications, success, error, warning, info, remove } = useNotification()

const showSuccess = () => success('Success', 'Operation completed successfully')
const showError = () => error('Error', 'Something went wrong')
const showWarning = () => warning('Warning', 'Please check your input')
const showInfo = () => info('Info', 'This is an informational message')
<\/script>`

const allTypesCode = `<template>
  <div>
    <Button @click="showSuccess">Success</Button>
    <Button @click="showError">Error</Button>
    <Button @click="showWarning">Warning</Button>
    <Button @click="showInfo">Info</Button>
  </div>
  <Notification :notifications="notifications" @remove="remove" />
</template>

<script setup>
import { ref } from 'vue'
import { Button, Notification, useNotification } from '@elix/ui'

const { notifications, success, error, warning, info, remove } = useNotification()

const showSuccess = () => success('Success', 'Operation completed successfully')
const showError = () => error('Error', 'Something went wrong')
const showWarning = () => warning('Warning', 'Please check your input')
const showInfo = () => info('Info', 'This is an informational message')
<\/script>`

const durationCode = `<template>
  <div>
    <Button @click="showShort">Short Duration (2s)</Button>
    <Button @click="showLong">Long Duration (5s)</Button>
    <Button @click="showPersistent">Persistent (0s)</Button>
    <Button @click="showDefault">Default Duration</Button>
  </div>
  <Notification :notifications="notifications" @remove="remove" />
</template>

<script setup>
import { ref } from 'vue'
import { Button, Notification, useNotification } from '@elix/ui'

const { notifications, success, error, warning, info, remove } = useNotification()

const showShort = () => success('Success', 'This will close in 2 seconds', 2000)
const showLong = () => error('Error', 'This will close in 5 seconds', 5000)
const showPersistent = () => warning('Warning', 'This will stay until closed', 0)
const showDefault = () => info('Info', 'Default duration (4.5s)', undefined)
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

