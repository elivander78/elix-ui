<template>
  <div class="docs-page">
    <h1>Slider</h1>
    <p>The Slider component is used to select a value or range of values.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="SliderBasicDemo" :code="basicCode" />

    <h2>Range</h2>
    <Playground :demo-component="SliderRangeDemo" :code="rangeCode" />

    <h2>With Marks</h2>
    <Playground :demo-component="SliderMarksDemo" :code="marksCode" />

    <h2>Tooltip</h2>
    <Playground :demo-component="SliderTooltipDemo" :code="tooltipCode" />

    <h2>Sizes</h2>
    <Playground :demo-component="SliderSizesDemo" :code="sizesCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import SliderBasicDemo from '../../components/demos/SliderBasicDemo.vue'
import SliderRangeDemo from '../../components/demos/SliderRangeDemo.vue'
import SliderMarksDemo from '../../components/demos/SliderMarksDemo.vue'
import SliderTooltipDemo from '../../components/demos/SliderTooltipDemo.vue'
import SliderSizesDemo from '../../components/demos/SliderSizesDemo.vue'

const basicCode = `<template>
  <div>
    <Slider v-model="value" :min="0" :max="100" />
    <p>Value: {{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Slider } from '@elivander/elix-ui'

const value = ref(50)
<\/script>`

const rangeCode = `<template>
  <div>
    <Slider v-model="range" :min="0" :max="100" :range="true" />
    <p>Range: {{ range }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Slider } from '@elivander/elix-ui'

const range = ref([20, 80])
<\/script>`

const marksCode = `<template>
  <Slider 
    v-model="value" 
    :min="0" 
    :max="100" 
    :marks="{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Slider } from '@elivander/elix-ui'

const value = ref(50)
<\/script>`

const tooltipCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p>Always visible:</p>
      <Slider v-model="value1" tooltip="always" />
    </div>
    <div>
      <p>On hover:</p>
      <Slider v-model="value2" tooltip="hover" />
    </div>
    <div>
      <p>None:</p>
      <Slider v-model="value3" tooltip="none" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Slider } from '@elivander/elix-ui'

const value1 = ref(30)
const value2 = ref(50)
const value3 = ref(70)
<\/script>`

const sizesCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p>Small:</p>
      <Slider v-model="value1" size="sm" />
    </div>
    <div>
      <p>Medium:</p>
      <Slider v-model="value2" size="md" />
    </div>
    <div>
      <p>Large:</p>
      <Slider v-model="value3" size="lg" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Slider } from '@elivander/elix-ui'

const value1 = ref(30)
const value2 = ref(50)
const value3 = ref(70)
<\/script>`
</script>

