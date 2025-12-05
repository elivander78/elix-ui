<template>
  <Collapse v-model="activeKey" :accordion="true">
    <CollapseItem name="1" title="Accordion Panel 1">
      <div style="padding: 8px 0;">
        <p>This is accordion mode - only one panel can be open at a time.</p>
        <p style="margin-top: 8px;">When you open another panel, this one will automatically close with a smooth animation.</p>
        <div style="margin-top: 12px; padding: 12px; background: var(--eui-color-info-50); border-left: 3px solid var(--eui-color-info); border-radius: 4px;">
          <strong>Note:</strong> Accordion mode is useful for FAQ sections or when you want to ensure only one section is visible at a time.
        </div>
      </div>
    </CollapseItem>
    <CollapseItem name="2" title="Accordion Panel 2">
      <div style="padding: 8px 0;">
        <p>Opening this panel will close panel 1 automatically.</p>
        <p style="margin-top: 8px;">The transition between panels is smooth and animated.</p>
        <ul style="margin-top: 12px; padding-left: 20px;">
          <li>Item A - Accordion behavior</li>
          <li>Item B - Single selection</li>
          <li>Item C - Auto-close others</li>
        </ul>
      </div>
    </CollapseItem>
    <CollapseItem name="3" title="Accordion Panel 3">
      <div style="padding: 8px 0;">
        <p>This is the third panel in accordion mode.</p>
        <p style="margin-top: 8px;">Notice how the animation smoothly transitions when switching between panels.</p>
        <div style="margin-top: 12px; padding: 12px; background: var(--eui-color-success-50); border-left: 3px solid var(--eui-color-success); border-radius: 4px;">
          <strong>Tip:</strong> Use accordion mode when you have mutually exclusive content sections.
        </div>
      </div>
    </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@elix/ui'

const activeKey = ref('1')
</script>

