<template>
  <EuiRow :gutter="16">
    <EuiCol :span="6">
      <EuiStatistic title="Total Users" :value="1234" />
    </EuiCol>
    <EuiCol :span="6">
      <EuiStatistic title="Revenue" :value="5678" suffix="$" />
    </EuiCol>
    <EuiCol :span="6">
      <EuiStatistic title="Growth" :value="12.5" suffix="%" trend="up" />
    </EuiCol>
    <EuiCol :span="6">
      <EuiStatistic title="Loss" :value="3.2" suffix="%" trend="down" />
    </EuiCol>
  </EuiRow>
</template>

<script setup lang="ts">
import { Statistic as EuiStatistic, Row as EuiRow, Col as EuiCol } from '@elivander/elix-ui'
</script>

