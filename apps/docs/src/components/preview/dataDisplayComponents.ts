import { h, computed } from 'vue'
import { Card, CardHeader, CardBody, CardFooter, Table, Badge, Tag, Avatar, Divider, Tabs, TabPane, Breadcrumbs, Button } from '@elix/ui'
import type { PreviewState, RenderFunction } from './types'

export function renderDataDisplayComponents(
  code: string,
  codeKey: string,
  state: PreviewState,
  onlyComponent?: string
): RenderFunction {
  const codeLower = code.toLowerCase()

  // Badge examples - проверяем ПЕРЕД button, т.к. badge может содержать button
  if (codeLower.includes('badge') && (!onlyComponent || onlyComponent === 'badge')) {
    if (codeLower.includes('type=') || codeLower.includes('types')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-badges' }, [
            h(Badge, { value: 5, type: 'primary' }, () => h(Button, {}, () => 'Primary')),
            h(Badge, { value: 3, type: 'success' }, () => h(Button, {}, () => 'Success')),
            h(Badge, { value: 2, type: 'warning' }, () => h(Button, {}, () => 'Warning')),
            h(Badge, { value: 1, type: 'error' }, () => h(Button, {}, () => 'Error')),
          ]),
        ]),
      ])
    }
    if (codeLower.includes('max') || codeLower.includes('max')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-badges' }, [
            h(Badge, { value: 5, max: 3 }, () => h(Button, {}, () => 'Max 3')),
            h(Badge, { value: 100, max: 99 }, () => h(Button, {}, () => 'Max 99')),
          ]),
        ]),
      ])
    }
    if (codeLower.includes('dot') || codeLower.includes('dot')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-badges' }, [
            h(Badge, { dot: true }, () => h(Button, {}, () => 'Dot Badge')),
            h(Badge, { dot: true, type: 'success' }, () => h(Button, {}, () => 'Success Dot')),
            h(Badge, { dot: true, type: 'error' }, () => h(Button, {}, () => 'Error Dot')),
          ]),
        ]),
      ])
    }
    // Basic usage
    return () => h('div', { class: 'playground' }, [
      h('div', { class: 'playground__example' }, [
        h(Badge, { value: 5 }, () => h(Button, {}, () => 'Notifications')),
      ]),
    ])
  }

  // Если запрошен только badge, не проверяем другие компоненты
  if (onlyComponent && onlyComponent !== 'badge') {
    return null
  }

  // Card examples
  if (codeLower.includes('card')) {
    return () =>
      h(Card, {}, [
        h(CardHeader, {}, () => 'Card Title'),
        h(CardBody, {}, () => 'Card content goes here'),
        h(CardFooter, {}, () => 'Card footer'),
      ])
  }


  // Tag examples
  if (codeLower.includes('tag')) {
    return () => h('div', { class: 'preview-tags' }, [
      h(Tag, {}, () => 'Tag'),
      h(Tag, { type: 'primary' }, () => 'Primary'),
      h(Tag, { type: 'success' }, () => 'Success'),
    ])
  }

  // Avatar examples
  if (codeLower.includes('avatar')) {
    return () => h('div', { class: 'preview-avatars' }, [
      h(Avatar, {}, () => 'JD'),
      h(Avatar, { src: 'https://i.pravatar.cc/150?img=1' }),
      h(Avatar, { src: 'https://i.pravatar.cc/150?img=2', shape: 'square' }),
    ])
  }

  // Divider examples
  if (codeLower.includes('divider')) {
    return () => h('div', {}, [
      h('p', {}, 'Content above'),
      h(Divider),
      h('p', {}, 'Content below'),
    ])
  }

  // Tabs examples
  if (codeLower.includes('tabs')) {
    const tabsKey = `${codeKey}-tabs`
    if (!state.tabsValues.value[tabsKey]) {
      state.tabsValues.value[tabsKey] = 'tab1'
    }
    return () => h(Tabs, {
      modelValue: state.tabsValues.value[tabsKey],
      'onUpdate:modelValue': (v: string | number) => { state.tabsValues.value[tabsKey] = v },
    }, [
      h(TabPane, { name: 'tab1', label: 'Tab 1' }, () => 'Content 1'),
      h(TabPane, { name: 'tab2', label: 'Tab 2' }, () => 'Content 2'),
    ])
  }

  // Breadcrumbs examples
  if (codeLower.includes('breadcrumbs')) {
    return () => h(Breadcrumbs, {
      items: [
        { label: 'Home', to: '/' },
        { label: 'Components', to: '/components' },
        { label: 'Breadcrumbs' },
      ],
    })
  }

  // Table examples
  if (codeLower.includes('table')) {
    const baseColumns = [
      { key: 'name', title: 'Name' },
      { key: 'age', title: 'Age' },
      { key: 'email', title: 'Email' },
    ]
    const baseData = [
      { name: 'John Doe', age: 30, email: 'john@example.com' },
      { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
      { name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
    ]
    if (codeLower.includes('sort') || codeLower.includes('sortable')) {
      const sortColumns = [
        { key: 'name', title: 'Name', sortable: true },
        { key: 'age', title: 'Age', sortable: true },
        { key: 'email', title: 'Email' },
      ]
      return () => h(Table, {
        columns: sortColumns,
        data: baseData,
        onSort: (column: string, order: string) => console.log('Sort:', column, order),
      })
    }
    if ((codeLower.includes('select') || codeLower.includes('selectable')) && codeLower.includes('table')) {
      const selectKey = `${codeKey}-selected`
      if (!state.checkboxValues.value[selectKey]) {
        state.checkboxValues.value[selectKey] = []
      }
      return () => h(Table, {
        columns: baseColumns,
        data: baseData,
        selectable: true,
        selectedRows: state.checkboxValues.value[selectKey] as string[],
        onSelect: (rows: string[]) => { state.checkboxValues.value[selectKey] = rows },
      })
    }
    if (codeLower.includes('fixed')) {
      const fixedColumns = [
        { key: 'name', title: 'Name', fixed: 'left', width: 150 },
        { key: 'age', title: 'Age' },
        { key: 'email', title: 'Email' },
        { key: 'phone', title: 'Phone' },
        { key: 'address', title: 'Address', fixed: 'right', width: 200 },
      ]
      const fixedData = [
        { name: 'John Doe', age: 30, email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' },
        { name: 'Jane Smith', age: 25, email: 'jane@example.com', phone: '234-567-8901', address: '456 Oak Ave' },
        { name: 'Bob Johnson', age: 35, email: 'bob@example.com', phone: '345-678-9012', address: '789 Pine Rd' },
      ]
      return () => h(Table, { columns: fixedColumns, data: fixedData })
    }
    if (codeLower.includes('combined')) {
      const combinedKey = `${codeKey}-combined`
      if (!state.checkboxValues.value[combinedKey]) {
        state.checkboxValues.value[combinedKey] = []
      }
      const combinedColumns = [
        { key: 'name', title: 'Name', sortable: true, fixed: 'left', width: 150 },
        { key: 'age', title: 'Age', sortable: true },
        { key: 'email', title: 'Email', sortable: true },
        { key: 'status', title: 'Status', fixed: 'right', width: 100 },
      ]
      const combinedData = [
        { name: 'John Doe', age: 30, email: 'john@example.com', status: 'Active' },
        { name: 'Jane Smith', age: 25, email: 'jane@example.com', status: 'Inactive' },
        { name: 'Bob Johnson', age: 35, email: 'bob@example.com', status: 'Active' },
      ]
      return () => h(Table, {
        columns: combinedColumns,
        data: combinedData,
        selectable: true,
        selectedRows: state.checkboxValues.value[combinedKey] as string[],
        bordered: true,
        striped: true,
        hoverable: true,
        onSort: (column: string, order: string) => console.log('Sort:', column, order),
        onSelect: (rows: string[]) => { state.checkboxValues.value[combinedKey] = rows },
      })
    }
    return () => h(Table, { columns: baseColumns, data: baseData })
  }

  return null
}
