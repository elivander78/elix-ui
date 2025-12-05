<template>
  <div class="progress-demo">
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <Progress 
        :percent="percent" 
        :type="type"
        :status="status"
        :show-label="showLabel"
        :striped="striped"
        :animated="animated"
        :appearance="appearance"
      />
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="min-width: 100px; font-size: 14px;">Percent:</label>
          <input type="range" v-model.number="percent" min="0" max="100" style="flex: 1;" />
          <span style="min-width: 50px; font-size: 14px;">{{ percent }}%</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="min-width: 100px; font-size: 14px;">Type:</label>
          <Select v-model="type" :options="typeOptions" style="width: 150px;" />
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="min-width: 100px; font-size: 14px;">Status:</label>
          <Select v-model="status" :options="statusOptions" style="width: 150px;" />
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="min-width: 100px; font-size: 14px;">Appearance:</label>
          <Select v-model="appearance" :options="appearanceOptions" style="width: 150px;" />
        </div>
        <div style="display: flex; gap: 20px;">
          <label style="font-size: 14px;">
            <input type="checkbox" v-model="showLabel" style="margin-right: 4px;" />
            Show Label
          </label>
          <label style="font-size: 14px;">
            <input type="checkbox" v-model="striped" style="margin-right: 4px;" />
            Striped
          </label>
          <label style="font-size: 14px;">
            <input type="checkbox" v-model="animated" style="margin-right: 4px;" />
            Animated
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Progress, Select } from '@elivander/elix-ui'

const percent = ref(50)
const type = ref('line')
const status = ref('normal')
const showLabel = ref(true)
const striped = ref(false)
const animated = ref(false)
const appearance = ref('shadow')

const typeOptions = [
  { label: 'Line', value: 'line' },
  { label: 'Circle', value: 'circle' },
]

const statusOptions = [
  { label: 'Normal', value: 'normal' },
  { label: 'Success', value: 'success' },
  { label: 'Error', value: 'error' },
  { label: 'Warning', value: 'warning' },
]

const appearanceOptions = [
  { label: 'Border', value: 'border' },
  { label: 'Shadow', value: 'shadow' },
]
</script>

<style lang="scss" scoped>
.progress-demo {
  width: 100%;
}
</style>

