<template>
  <List>
    <ListItem title="Settings">
      <template #icon>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" stroke-width="2"/>
          <path d="M10 2.5v2.5M10 15v2.5M17.5 10h-2.5M5 10H2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </template>
    </ListItem>
    <ListItem title="Notifications" clickable>
      <template #icon>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2.5a5 5 0 015 5v2.5l2 2v1.5H3v-1.5l2-2V7.5a5 5 0 015-5z" stroke="currentColor" stroke-width="2"/>
          <path d="M7.5 15a2.5 2.5 0 005 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </template>
      <template #extra>
        <Badge>New</Badge>
      </template>
    </ListItem>
  </List>
</template>

<script setup lang="ts">
import { List, ListItem, Badge } from '@elivander/elix-ui'
</script>

