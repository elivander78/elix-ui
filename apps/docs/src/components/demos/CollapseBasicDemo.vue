<template>
  <Collapse v-model="activeKeys">
    <CollapseItem name="1" title="Panel 1">
      <div style="padding: 8px 0;">
        <p>This is the content of panel 1. You can see the smooth animation when opening and closing.</p>
        <p style="margin-top: 8px;">The collapse component supports multiple panels being open at the same time.</p>
        <ul style="margin-top: 8px; padding-left: 20px;">
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </div>
    </CollapseItem>
    <CollapseItem name="2" title="Panel 2">
      <div style="padding: 8px 0;">
        <p>This is the content of panel 2. Notice how the animation smoothly expands and collapses.</p>
        <p style="margin-top: 8px;">You can add any content here - text, images, forms, or other components.</p>
        <div style="margin-top: 12px; padding: 12px; background: var(--eui-bg-secondary); border-radius: 4px;">
          <strong>Example nested content:</strong> This could be a form, a list, or any other component.
        </div>
      </div>
    </CollapseItem>
    <CollapseItem name="3" title="Panel 3">
      <div style="padding: 8px 0;">
        <p>This is the content of panel 3. The animation uses max-height for smooth transitions.</p>
        <p style="margin-top: 8px;">Each panel maintains its own state independently.</p>
        <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
          <span style="padding: 4px 8px; background: var(--eui-bg-tertiary); border-radius: 4px; font-size: 12px;">Tag 1</span>
          <span style="padding: 4px 8px; background: var(--eui-bg-tertiary); border-radius: 4px; font-size: 12px;">Tag 2</span>
          <span style="padding: 4px 8px; background: var(--eui-bg-tertiary); border-radius: 4px; font-size: 12px;">Tag 3</span>
        </div>
      </div>
    </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@elivander/elix-ui'

const activeKeys = ref(['1'])
</script>

