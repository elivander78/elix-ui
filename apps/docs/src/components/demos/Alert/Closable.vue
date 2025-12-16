<template>
  <EuiAlert 
    v-if="alertVisible1"
    type="info" 
    title="Closable Alert" 
    description="Click the X button to close this alert."
    :closable="true"
    @close="handleClose1"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Alert as EuiAlert } from '@elivander/elix-ui'

const alertVisible1 = ref(true)

const handleClose1 = () => {
  alertVisible1.value = false
  console.log('Alert closed')
}
</script>

