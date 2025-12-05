<template>
  <div>
    <Slider v-model="sliderValue1" :min="0" :max="100" />
    <p style="margin-top: 8px;">Value: {{ sliderValue1 }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@elivander/elix-ui'

const sliderValue1 = ref(50)
</script>

