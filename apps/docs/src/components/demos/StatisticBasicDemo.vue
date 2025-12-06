<template>
  <Row :gutter="16">
    <Col :span="6">
      <Statistic title="Total Users" :value="1234" />
    </Col>
    <Col :span="6">
      <Statistic title="Revenue" :value="5678" suffix="$" />
    </Col>
    <Col :span="6">
      <Statistic title="Growth" :value="12.5" suffix="%" trend="up" />
    </Col>
    <Col :span="6">
      <Statistic title="Loss" :value="3.2" suffix="%" trend="down" />
    </Col>
  </Row>
</template>

<script setup lang="ts">
import { Statistic, Row, Col } from '@elivander/elix-ui'
</script>

