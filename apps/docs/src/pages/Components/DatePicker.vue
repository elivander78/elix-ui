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
import DatePickerBasicDemo from '../../components/demos/DatePicker/Basic.vue'
import DatePickerFormatDemo from '../../components/demos/DatePicker/Format.vue'
import DatePickerClearableDemo from '../../components/demos/DatePicker/Clearable.vue'
import DatePickerStatesDemo from '../../components/demos/DatePicker/States.vue'
import DatePickerAppearanceDemo from '../../components/demos/DatePicker/Appearance.vue'

const basicCode = `<template>
  <EuiDatePicker v-model="date" />
  <p style="margin-top: 8px;">Selected: {{ date }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker as EuiDatePicker } from '@elivander/elix-ui'

const date = ref(null)
<\/script>`

const formatCode = `<template>
  <EuiDatePicker v-model="date" format="DD.MM.YYYY" />
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker as EuiDatePicker } from '@elivander/elix-ui'

const date = ref(null)
<\/script>`

const clearableCode = `<template>
  <EuiDatePicker v-model="date" :clearable="true" />
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker as EuiDatePicker } from '@elivander/elix-ui'

const date = ref(new Date())
<\/script>`

const statesCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <EuiDatePicker v-model="date1" status="error" />
    <EuiDatePicker v-model="date2" status="success" />
    <EuiDatePicker v-model="date3" :disabled="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker as EuiDatePicker } from '@elivander/elix-ui'

const date1 = ref(null)
const date2 = ref(null)
const date3 = ref(new Date())
<\/script>`

const appearanceCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <EuiDatePicker v-model="date1" appearance="border" />
    <EuiDatePicker v-model="date2" appearance="shadow" />
    <EuiDatePicker v-model="date3" appearance="border-shadow" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker as EuiDatePicker } from '@elivander/elix-ui'

const date1 = ref(null)
const date2 = ref(null)
const date3 = ref(null)
<\/script>`
</script>

