<template>
  <div class="spinner-demo" style="position: relative; height: 300px; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); padding: 20px;">
    <Card>
      <CardBody>
        <h3>Card Content</h3>
        <p>This is some content in a card. Scroll to see the overlay spinner when loading.</p>
      </CardBody>
    </Card>
    <Spinner v-if="loading" overlay label="Loading..." />
    <Button @click="loading = !loading" style="margin-top: 16px;">Toggle Loading</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Spinner, Card, CardBody, Button } from '@elivander/elix-ui'

const loading = ref(true)
</script>

<style lang="scss" scoped>
.spinner-demo {
  width: 100%;
}
</style>

