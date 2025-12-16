<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p>Always visible:</p>
      <EuiSlider v-model="sliderValue3" tooltip="always" />
    </div>
    <div>
      <p>On hover:</p>
      <EuiSlider v-model="sliderValue4" tooltip="hover" />
    </div>
    <div>
      <p>None:</p>
      <EuiSlider v-model="sliderValue5" tooltip="none" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider as EuiSlider } from '@elivander/elix-ui'

const sliderValue3 = ref(30)
const sliderValue4 = ref(50)
const sliderValue5 = ref(70)
</script>

