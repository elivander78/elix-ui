<template>
  <div v-if="isActive" class="eui-tab-pane">
    <slot />
  </div>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiTabPane',

})

import { computed, inject, ref } from 'vue'

const props = defineProps<{
  name: string | number
  label?: string
  disabled?: boolean
}>()

const activeTab = inject<{ value: string | number }>('activeTab', ref(''))

const isActive = computed(() => {
  return activeTab.value === props.name
})
</script>

<style lang="scss" scoped>
.eui-tab-pane {
  // Tab pane content
}
</style>

