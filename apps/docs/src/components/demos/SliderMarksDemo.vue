<template>
  <Slider 
    v-model="sliderValue2" 
    :min="0" 
    :max="100" 
    :marks="{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@elix/ui'

const sliderValue2 = ref(50)
</script>

