<template>
  <EuiTimeline>
    <EuiTimelineItem title="Order placed" time="2024-01-01" color="success" />
    <EuiTimelineItem title="Payment confirmed" time="2024-01-02" color="success" />
    <EuiTimelineItem title="Shipping" time="2024-01-03" color="primary" />
    <EuiTimelineItem title="Delivered" time="2024-01-04" color="success" />
  </EuiTimeline>
</template>

<script setup lang="ts">
import { Timeline as EuiTimeline, TimelineItem as EuiTimelineItem } from '@elivander/elix-ui'
</script>

