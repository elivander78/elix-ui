<template>
  <Collapse v-model="activeKeys">
    <CollapseItem name="1" title="Multiple Panel 1">
      <div style="padding: 8px 0;">
        <p>In multiple mode, you can have several panels open at the same time.</p>
        <p style="margin-top: 8px;">This is useful when you want to show multiple sections of content simultaneously.</p>
        <div style="margin-top: 12px; padding: 12px; background: var(--eui-bg-secondary); border-radius: 4px;">
          <strong>Example:</strong> You can keep this panel open while opening others to compare content.
        </div>
      </div>
    </CollapseItem>
    <CollapseItem name="2" title="Multiple Panel 2">
      <div style="padding: 8px 0;">
        <p>This panel can stay open even when panel 1 is open.</p>
        <p style="margin-top: 8px;">Each panel animates independently when opening or closing.</p>
        <ul style="margin-top: 12px; padding-left: 20px;">
          <li>Independent state management</li>
          <li>Smooth individual animations</li>
          <li>No interference between panels</li>
        </ul>
      </div>
    </CollapseItem>
    <CollapseItem name="3" title="Multiple Panel 3">
      <div style="padding: 8px 0;">
        <p>All three panels can be open at the same time in multiple mode.</p>
        <p style="margin-top: 8px;">This allows users to view all content sections simultaneously if needed.</p>
        <div style="margin-top: 12px; padding: 12px; background: var(--eui-color-warning-50); border-left: 3px solid var(--eui-color-warning); border-radius: 4px;">
          <strong>Use case:</strong> Multiple mode is perfect for settings panels or documentation where users might need to reference multiple sections.
        </div>
      </div>
    </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@elix/ui'

const activeKeys = ref(['1', '2'])
</script>

