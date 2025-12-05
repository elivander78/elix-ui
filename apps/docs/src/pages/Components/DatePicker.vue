<template>
  <div class="docs-page">
    <h1>DatePicker</h1>
    <p>The DatePicker component is used to select dates.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="DatePickerBasicDemo" :code="basicCode" />

    <h2>With Format</h2>
    <Playground :demo-component="DatePickerFormatDemo" :code="formatCode" />

    <h2>Clearable</h2>
    <Playground :demo-component="DatePickerClearableDemo" :code="clearableCode" />

    <h2>States</h2>
    <Playground :demo-component="DatePickerStatesDemo" :code="statesCode" />

    <h2>Appearance</h2>
    <Playground :demo-component="DatePickerAppearanceDemo" :code="appearanceCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import DatePickerBasicDemo from '../../components/demos/DatePickerBasicDemo.vue'
import DatePickerFormatDemo from '../../components/demos/DatePickerFormatDemo.vue'
import DatePickerClearableDemo from '../../components/demos/DatePickerClearableDemo.vue'
import DatePickerStatesDemo from '../../components/demos/DatePickerStatesDemo.vue'
import DatePickerAppearanceDemo from '../../components/demos/DatePickerAppearanceDemo.vue'

const basicCode = `<template>
  <DatePicker v-model="date" />
  <p style="margin-top: 8px;">Selected: {{ date }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from '@elix/ui'

const date = ref(null)
<\/script>`

const formatCode = `<template>
  <DatePicker v-model="date" format="DD.MM.YYYY" />
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from '@elix/ui'

const date = ref(null)
<\/script>`

const clearableCode = `<template>
  <DatePicker v-model="date" :clearable="true" />
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from '@elix/ui'

const date = ref(new Date())
<\/script>`

const statesCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <DatePicker v-model="date1" status="error" />
    <DatePicker v-model="date2" status="success" />
    <DatePicker v-model="date3" :disabled="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from '@elix/ui'

const date1 = ref(null)
const date2 = ref(null)
const date3 = ref(new Date())
<\/script>`

const appearanceCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <DatePicker v-model="date1" appearance="border" />
    <DatePicker v-model="date2" appearance="shadow" />
    <DatePicker v-model="date3" appearance="border-shadow" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from '@elix/ui'

const date1 = ref(null)
const date2 = ref(null)
const date3 = ref(null)
<\/script>`
</script>

