<template>
  <Dropdown :items="dropdownItems1" @select="handleSelect1">
    <template #trigger>
      <Button>Select Option</Button>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { Dropdown, Button, type DropdownItem } from '@elix/ui'

const dropdownItems1: DropdownItem[] = [
  { label: 'Option 1', key: '1' },
  { label: 'Option 2', key: '2' },
  { label: 'Option 3', key: '3', disabled: true },
  { label: 'Delete', key: '4', danger: true },
]

const handleSelect1 = (item: DropdownItem) => {
  console.log('Selected:', item)
}
</script>

