<template>
  <EuiDropdown :items="dropdownItems1" @select="handleSelect1">
    <template #trigger>
      <EuiButton>Select Option</EuiButton>
    </template>
  </EuiDropdown>
</template>

<script setup lang="ts">
import { Dropdown as EuiDropdown, Button as EuiButton, type DropdownItem } from '@elivander/elix-ui'

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

