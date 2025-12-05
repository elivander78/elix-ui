<template>
  <div>
    <Slider v-model="sliderRange1" :min="0" :max="100" :range="true" />
    <p style="margin-top: 8px;">Range: {{ sliderRange1 }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@elix/ui'

const sliderRange1 = ref([20, 80])
</script>

