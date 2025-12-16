<template>
  <div class="drawer-demo">
    <EuiButton @click="showDrawer = true">Open Scrollable Drawer</EuiButton>
    <EuiDrawer v-model="showDrawer" title="Scrollable Drawer" placement="right" :scrollable="true">
      <div style="padding-bottom: 20px;">
        <h3>Section 1</h3>
        <p>This drawer has scrollable content. When the content is longer than the drawer height, you can scroll.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        
        <h3 style="margin-top: 40px;">Section 2</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        
        <h3 style="margin-top: 40px;">Section 3</h3>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        
        <h3 style="margin-top: 40px;">Section 4</h3>
        <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.</p>
        
        <h3 style="margin-top: 40px;">Section 5</h3>
        <p>Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
        <p>Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
      </div>
    </EuiDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button as EuiButton, Drawer as EuiDrawer } from '@elivander/elix-ui'

const showDrawer = ref(false)
</script>

<style lang="scss" scoped>
.drawer-demo {
  width: 100%;
}
</style>
