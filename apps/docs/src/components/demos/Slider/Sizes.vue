<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p>Small:</p>
      <EuiSlider v-model="sliderValue6" size="sm" />
    </div>
    <div>
      <p>Medium:</p>
      <EuiSlider v-model="sliderValue7" size="md" />
    </div>
    <div>
      <p>Large:</p>
      <EuiSlider v-model="sliderValue8" size="lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider as EuiSlider } from '@elivander/elix-ui'

const sliderValue6 = ref(30)
const sliderValue7 = ref(50)
const sliderValue8 = ref(70)
</script>

