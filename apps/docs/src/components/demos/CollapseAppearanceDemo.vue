<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Collapse v-model="keys1" appearance="border">
      <CollapseItem name="1" title="Border appearance">
        <div style="padding: 8px 0;">
          <p>This collapse uses the border appearance style.</p>
          <p style="margin-top: 8px;">Notice the border styling around the collapse component.</p>
          <div style="margin-top: 12px; padding: 12px; background: var(--eui-bg-secondary); border-radius: 4px;">
            The border appearance provides a clear visual boundary for the collapse component.
          </div>
        </div>
      </CollapseItem>
    </Collapse>
    <Collapse v-model="keys2" appearance="shadow">
      <CollapseItem name="1" title="Shadow appearance">
        <div style="padding: 8px 0;">
          <p>This collapse uses the shadow appearance style.</p>
          <p style="margin-top: 8px;">The shadow gives it a subtle elevation effect.</p>
          <div style="margin-top: 12px; padding: 12px; background: var(--eui-bg-secondary); border-radius: 4px;">
            Shadow appearance creates depth and helps the component stand out from the background.
          </div>
        </div>
      </CollapseItem>
    </Collapse>
    <Collapse v-model="keys3" appearance="border-shadow">
      <CollapseItem name="1" title="Border + Shadow">
        <div style="padding: 8px 0;">
          <p>This collapse combines both border and shadow appearance.</p>
          <p style="margin-top: 8px;">You get the benefits of both styling options.</p>
          <div style="margin-top: 12px; padding: 12px; background: var(--eui-bg-secondary); border-radius: 4px;">
            The border-shadow combination provides maximum visual definition and depth.
          </div>
        </div>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@elix/ui'

const keys1 = ref(['1'])
const keys2 = ref(['1'])
const keys3 = ref(['1'])
</script>

