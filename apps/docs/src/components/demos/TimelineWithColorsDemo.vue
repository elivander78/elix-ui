<template>
  <Timeline>
    <TimelineItem title="Order placed" time="2024-01-01" color="success" />
    <TimelineItem title="Payment confirmed" time="2024-01-02" color="success" />
    <TimelineItem title="Shipping" time="2024-01-03" color="primary" />
    <TimelineItem title="Delivered" time="2024-01-04" color="success" />
  </Timeline>
</template>

<script setup lang="ts">
import { Timeline, TimelineItem } from '@elivander/elix-ui'
</script>

