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
    // Different Statuses - проверяем "Different Statuses"
    if (codeLower.includes('different statuses') || (codeLower.includes('statuses') && codeLower.includes('type="success"'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-badges', style: 'display: flex; gap: 20px; align-items: center;' }, [
            h(Badge, { value: 5, type: 'success' }, () => h(Button, {}, () => 'Success')),
            h(Badge, { value: 3, type: 'error' }, () => h(Button, {}, () => 'Error')),
            h(Badge, { value: 2, type: 'warning' }, () => h(Button, {}, () => 'Warning')),
            h(Badge, { value: 10, type: 'info' }, () => h(Button, {}, () => 'Info')),
          ]),
        ]),
      ])
    }
    // Numbers - проверяем "Numbers" в заголовке
    if (codeLower.includes('<h2>numbers</h2>') || (codeLower.includes('numbers') && codeLower.includes('value="12"'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-badges', style: 'display: flex; gap: 20px; align-items: center;' }, [
            h(Badge, { value: 5 }, () => h(Button, {}, () => '5')),
            h(Badge, { value: 12 }, () => h(Button, {}, () => '12')),
            h(Badge, { value: 99 }, () => h(Button, {}, () => '99')),
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
    // Grid of Cards - проверяем уникальную строку "Card 1" и "Card 2" и "Card 3"
    if (codeLower.includes('card 1') && codeLower.includes('card 2') && codeLower.includes('card 3')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;' }, [
          h(Card, { bordered: true }, [
            h(CardHeader, {}, () => 'Card 1'),
            h(CardBody, {}, () => 'Content 1'),
          ]),
          h(Card, { shadow: 'md' }, [
            h(CardHeader, {}, () => 'Card 2'),
            h(CardBody, {}, () => 'Content 2'),
          ]),
          h(Card, { bordered: true, shadow: 'lg' }, [
            h(CardHeader, {}, () => 'Card 3'),
            h(CardBody, {}, () => 'Content 3'),
          ]),
        ]),
      ])
    }
    // With Shadow - проверяем "Small Shadow" и "Medium Shadow"
    if (codeLower.includes('small shadow') && codeLower.includes('medium shadow')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;' }, [
          h(Card, { shadow: 'sm' }, [
            h(CardHeader, {}, () => 'Small Shadow'),
            h(CardBody, {}, () => 'Content'),
          ]),
          h(Card, { shadow: 'md' }, [
            h(CardHeader, {}, () => 'Medium Shadow'),
            h(CardBody, {}, () => 'Content'),
          ]),
          h(Card, { shadow: 'lg' }, [
            h(CardHeader, {}, () => 'Large Shadow'),
            h(CardBody, {}, () => 'Content'),
          ]),
        ]),
      ])
    }
    // Without Border - проверяем "No Border"
    if (codeLower.includes('no border') || codeLower.includes('shadow only')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;' }, [
          h(Card, {}, [
            h(CardHeader, {}, () => 'No Border'),
            h(CardBody, {}, () => 'Content'),
          ]),
          h(Card, { shadow: 'md' }, [
            h(CardHeader, {}, () => 'Shadow Only'),
            h(CardBody, {}, () => 'Content'),
          ]),
        ]),
      ])
    }
    // With Image - проверяем "Card with Image"
    if (codeLower.includes('card with image') || codeLower.includes('this card has an image')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;' }, [
          h(Card, { shadow: 'md' }, [
            h('img', { src: 'https://picsum.photos/400/200?random=1', style: 'width: 100%; height: 200px; object-fit: cover;' }),
            h(CardHeader, {}, () => 'Card with Image'),
            h(CardBody, {}, () => 'This card has an image at the top'),
          ]),
          h(Card, { bordered: true, hoverable: true }, [
            h('img', { src: 'https://picsum.photos/400/200?random=2', style: 'width: 100%; height: 200px; object-fit: cover;' }),
            h(CardHeader, {}, () => 'Hoverable Card'),
            h(CardBody, {}, () => 'Hover over this card'),
          ]),
        ]),
      ])
    }
    // Hoverable - проверяем "Hoverable with Shadow"
    if (codeLower.includes('hoverable with shadow') || (codeLower.includes('hoverable') && codeLower.includes('hover over me'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;' }, [
          h(Card, { hoverable: true }, [
            h(CardHeader, {}, () => 'Hoverable Card'),
            h(CardBody, {}, () => 'Hover over me'),
          ]),
          h(Card, { hoverable: true, shadow: 'md' }, [
            h(CardHeader, {}, () => 'Hoverable with Shadow'),
            h(CardBody, {}, () => 'Hover over me'),
          ]),
        ]),
      ])
    }
    // Basic usage - проверяем "Card footer"
    if (codeLower.includes('card footer')) {
      return () =>
        h(Card, {}, [
          h(CardHeader, {}, () => 'Card Title'),
          h(CardBody, {}, () => 'Card content goes here'),
          h(CardFooter, {}, () => 'Card footer'),
        ])
    }
    // Fallback
    return () =>
      h(Card, {}, [
        h(CardHeader, {}, () => 'Card Title'),
        h(CardBody, {}, () => 'Card content goes here'),
        h(CardFooter, {}, () => 'Card footer'),
      ])
  }


  // Tag examples
  if (codeLower.includes('tag')) {
    // Tag Set - проверяем "Tag Set" или наличие всех типов
    if (codeLower.includes('tag set') || (codeLower.includes('default') && codeLower.includes('info') && codeLower.includes('warning'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-tags', style: 'display: flex; flex-wrap: wrap; gap: 8px;' }, [
            h(Tag, {}, () => 'Default'),
            h(Tag, { type: 'primary' }, () => 'Primary'),
            h(Tag, { type: 'success' }, () => 'Success'),
            h(Tag, { type: 'warning' }, () => 'Warning'),
            h(Tag, { type: 'error' }, () => 'Error'),
            h(Tag, { type: 'info' }, () => 'Info'),
          ]),
        ]),
      ])
    }
    // With Icons - проверяем "Star" и "Verified"
    if (codeLower.includes('star') || codeLower.includes('verified')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-tags', style: 'display: flex; flex-wrap: wrap; gap: 8px;' }, [
            h(Tag, {}, {
              icon: () => h('svg', { width: '14', height: '14', viewBox: '0 0 14 14', fill: 'none' }, [
                h('path', { d: 'M7 1L9 5L13 6L9 7L7 11L5 7L1 6L5 5L7 1Z', fill: 'currentColor' }),
              ]),
              default: () => 'Star',
            }),
            h(Tag, { type: 'success' }, {
              icon: () => h('svg', { width: '14', height: '14', viewBox: '0 0 14 14', fill: 'none' }, [
                h('path', { d: 'M11.5 3.5L5.5 9.5L2.5 6.5', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
              ]),
              default: () => 'Verified',
            }),
          ]),
        ]),
      ])
    }
    // Closable Tags - проверяем "Closable Tags" или closable в коде
    if (codeLower.includes('closable tags') || (codeLower.includes('closable') && codeLower.includes('@close'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-tags', style: 'display: flex; flex-wrap: wrap; gap: 8px;' }, [
            h(Tag, { closable: true, onClose: () => console.log('Tag closed') }, () => 'Closable'),
            h(Tag, { type: 'primary', closable: true, onClose: () => console.log('Tag closed') }, () => 'Primary'),
            h(Tag, { type: 'success', closable: true, onClose: () => console.log('Tag closed') }, () => 'Success'),
          ]),
        ]),
      ])
    }
    // Round Tags - проверяем "Round Tags"
    if (codeLower.includes('round tags')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-tags', style: 'display: flex; flex-wrap: wrap; gap: 8px;' }, [
            h(Tag, { round: true }, () => 'Round'),
            h(Tag, { type: 'primary', round: true }, () => 'Primary'),
            h(Tag, { type: 'success', round: true }, () => 'Success'),
          ]),
        ]),
      ])
    }
    // Sizes - проверяем "Sizes" и наличие size="sm"
    if (codeLower.includes('sizes') && codeLower.includes('size="sm"')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-tags', style: 'display: flex; flex-wrap: wrap; gap: 8px; align-items: center;' }, [
            h(Tag, { size: 'sm' }, () => 'Small'),
            h(Tag, { size: 'md' }, () => 'Medium'),
            h(Tag, { size: 'lg' }, () => 'Large'),
          ]),
        ]),
      ])
    }
    // Basic usage
    return () => h('div', { class: 'playground' }, [
      h('div', { class: 'playground__example' }, [
        h('div', { class: 'preview-tags', style: 'display: flex; flex-wrap: wrap; gap: 8px;' }, [
          h(Tag, {}, () => 'Tag'),
          h(Tag, { type: 'primary' }, () => 'Primary'),
          h(Tag, { type: 'success' }, () => 'Success'),
        ]),
      ]),
    ])
  }

  // Avatar examples
  if (codeLower.includes('avatar')) {
    // Photo - проверяем "Photo" в заголовке
    if (codeLower.includes('<h2>photo</h2>') || (codeLower.includes('photo') && !codeLower.includes('letter') && !codeLower.includes('icon') && !codeLower.includes('size') && !codeLower.includes('shape'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-avatars', style: 'display: flex; gap: 16px; align-items: center;' }, [
            h(Avatar, { src: 'https://i.pravatar.cc/150?img=1' }),
            h(Avatar, { src: 'https://i.pravatar.cc/150?img=2' }),
            h(Avatar, { src: 'https://i.pravatar.cc/150?img=3' }),
          ]),
        ]),
      ])
    }
    // Letters - проверяем "Letters" в заголовке или наличие "AB" и "CD"
    if (codeLower.includes('<h2>letters</h2>') || (codeLower.includes('letters') && codeLower.includes('ab') && codeLower.includes('cd'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-avatars', style: 'display: flex; gap: 16px; align-items: center;' }, [
            h(Avatar, {}, () => 'JD'),
            h(Avatar, {}, () => 'AB'),
            h(Avatar, {}, () => 'CD'),
          ]),
        ]),
      ])
    }
    // Icon - проверяем "Icon" в заголовке
    if (codeLower.includes('<h2>icon</h2>') || (codeLower.includes('icon') && !codeLower.includes('photo') && !codeLower.includes('letter') && !codeLower.includes('size') && !codeLower.includes('shape'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-avatars', style: 'display: flex; gap: 16px; align-items: center;' }, [
            h(Avatar),
            h(Avatar, { size: 'lg' }),
          ]),
        ]),
      ])
    }
    // Sizes - проверяем "Sizes" в заголовке и наличие size="xs"
    if (codeLower.includes('<h2>sizes</h2>') || (codeLower.includes('sizes') && codeLower.includes('size="xs"'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-avatars', style: 'display: flex; gap: 16px; align-items: center;' }, [
            h(Avatar, { size: 'xs' }, () => 'XS'),
            h(Avatar, { size: 'sm' }, () => 'SM'),
            h(Avatar, { size: 'md' }, () => 'MD'),
            h(Avatar, { size: 'lg' }, () => 'LG'),
            h(Avatar, { size: 'xl' }, () => 'XL'),
          ]),
        ]),
      ])
    }
    // Shapes - проверяем "Shapes" в заголовке
    if (codeLower.includes('<h2>shapes</h2>') || (codeLower.includes('shapes') && codeLower.includes('shape="circle"'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { class: 'preview-avatars', style: 'display: flex; gap: 16px; align-items: center;' }, [
            h(Avatar, { shape: 'circle' }, () => 'C'),
            h(Avatar, { shape: 'square' }, () => 'S'),
            h(Avatar, { src: 'https://i.pravatar.cc/150?img=1', shape: 'circle' }),
            h(Avatar, { src: 'https://i.pravatar.cc/150?img=2', shape: 'square' }),
          ]),
        ]),
      ])
    }
    // Basic usage
    return () => h('div', { class: 'playground' }, [
      h('div', { class: 'playground__example' }, [
        h('div', { class: 'preview-avatars', style: 'display: flex; gap: 16px; align-items: center;' }, [
          h(Avatar, {}, () => 'JD'),
          h(Avatar, { src: 'https://i.pravatar.cc/150?img=1' }),
          h(Avatar, { src: 'https://i.pravatar.cc/150?img=2', shape: 'square' }),
        ]),
      ]),
    ])
  }

  // Divider examples
  if (codeLower.includes('divider')) {
    // Horizontal Variants - проверяем "Horizontal Variants" или "solid divider"
    if (codeLower.includes('horizontal variants') || codeLower.includes('solid divider')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('p', {}, 'Solid divider'),
          h(Divider),
          h('p', {}, 'Dashed divider'),
          h(Divider, { dashed: true }),
          h('p', {}, 'More content'),
        ]),
      ])
    }
    // Vertical Divider - проверяем "Vertical Divider" или vertical="true"
    if (codeLower.includes('vertical divider') || codeLower.includes('vertical=')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: flex; align-items: center;' }, [
          h('span', {}, 'Left'),
          h(Divider, { vertical: true }),
          h('span', {}, 'Middle'),
          h(Divider, { vertical: true, dashed: true }),
          h('span', {}, 'Right'),
        ]),
      ])
    }
    // With Text - проверяем "With Text" или наличие "OR" в Divider
    if (codeLower.includes('with text') || (codeLower.includes('divider') && codeLower.includes('or'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('p', {}, 'Content above'),
          h(Divider, {}, () => 'OR'),
          h('p', {}, 'Content below'),
          h(Divider, { dashed: true }, () => 'Dashed with text'),
          h('p', {}, 'More content'),
        ]),
      ])
    }
    // Basic usage
    return () => h('div', { class: 'playground' }, [
      h('div', { class: 'playground__example' }, [
        h('p', {}, 'Content above'),
        h(Divider),
        h('p', {}, 'Content below'),
      ]),
    ])
  }

  // Tabs examples
  if (codeLower.includes('tabs')) {
    // Multiple Tabs - проверяем "Multiple Tabs" или наличие "Tab 4"
    if (codeLower.includes('multiple tabs') || codeLower.includes('tab 4')) {
      const tabsKey = `${codeKey}-tabs-multiple`
      if (!state.tabsValues.value[tabsKey]) {
        state.tabsValues.value[tabsKey] = 'tab1'
      }
      return () => h(Tabs, {
        modelValue: state.tabsValues.value[tabsKey],
        'onUpdate:modelValue': (v: string | number) => { state.tabsValues.value[tabsKey] = v },
      }, [
        h(TabPane, { name: 'tab1', label: 'Tab 1' }, () => 'Content for Tab 1'),
        h(TabPane, { name: 'tab2', label: 'Tab 2' }, () => 'Content for Tab 2'),
        h(TabPane, { name: 'tab3', label: 'Tab 3' }, () => 'Content for Tab 3'),
        h(TabPane, { name: 'tab4', label: 'Tab 4' }, () => 'Content for Tab 4'),
      ])
    }
    // Tab Types - проверяем "Tab Types" или наличие type="card"
    if (codeLower.includes('tab types') || codeLower.includes('type="card"')) {
      const tabsKey1 = `${codeKey}-tabs-type1`
      const tabsKey2 = `${codeKey}-tabs-type2`
      if (!state.tabsValues.value[tabsKey1]) {
        state.tabsValues.value[tabsKey1] = 'tab1'
      }
      if (!state.tabsValues.value[tabsKey2]) {
        state.tabsValues.value[tabsKey2] = 'tab1'
      }
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('h3', { style: 'margin-bottom: 16px;' }, 'Line Type'),
          h(Tabs, {
            modelValue: state.tabsValues.value[tabsKey1],
            type: 'line',
            'onUpdate:modelValue': (v: string | number) => { state.tabsValues.value[tabsKey1] = v },
          }, [
            h(TabPane, { name: 'tab1', label: 'Tab 1' }, () => 'Line tab content'),
            h(TabPane, { name: 'tab2', label: 'Tab 2' }, () => 'Line tab content'),
          ]),
          h('h3', { style: 'margin-top: 40px; margin-bottom: 16px;' }, 'Card Type'),
          h(Tabs, {
            modelValue: state.tabsValues.value[tabsKey2],
            type: 'card',
            'onUpdate:modelValue': (v: string | number) => { state.tabsValues.value[tabsKey2] = v },
          }, [
            h(TabPane, { name: 'tab1', label: 'Tab 1' }, () => 'Card tab content'),
            h(TabPane, { name: 'tab2', label: 'Tab 2' }, () => 'Card tab content'),
          ]),
        ]),
      ])
    }
    // Disabled Tabs - проверяем "Disabled Tabs" или disabled="true"
    if (codeLower.includes('disabled tabs') || (codeLower.includes('disabled') && codeLower.includes('tab 2'))) {
      const tabsKey = `${codeKey}-tabs-disabled`
      if (!state.tabsValues.value[tabsKey]) {
        state.tabsValues.value[tabsKey] = 'tab1'
      }
      return () => h(Tabs, {
        modelValue: state.tabsValues.value[tabsKey],
        'onUpdate:modelValue': (v: string | number) => { state.tabsValues.value[tabsKey] = v },
      }, [
        h(TabPane, { name: 'tab1', label: 'Tab 1' }, () => 'Content 1'),
        h(TabPane, { name: 'tab2', label: 'Tab 2', disabled: true }, () => 'Content 2 (disabled)'),
        h(TabPane, { name: 'tab3', label: 'Tab 3' }, () => 'Content 3'),
      ])
    }
    // Basic usage
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
    // With Length Limit - проверяем "With Length Limit" или наличие "Gaming Laptops"
    if (codeLower.includes('with length limit') || codeLower.includes('gaming laptops')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Breadcrumbs, {
            items: [
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
              { label: 'Electronics', to: '/products/electronics' },
              { label: 'Computers', to: '/products/electronics/computers' },
              { label: 'Laptops', to: '/products/electronics/computers/laptops' },
              { label: 'Gaming Laptops' },
            ],
          }),
        ]),
      ])
    }
    // Custom Separator - проверяем "Custom Separator" или наличие separator slot
    if (codeLower.includes('custom separator') || (codeLower.includes('separator') && codeLower.includes('template #separator'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Breadcrumbs, {
            items: [
              { label: 'Home', to: '/' },
              { label: 'Components', to: '/components' },
              { label: 'Breadcrumbs' },
            ],
          }, {
            separator: () => h('span', { style: 'margin: 0 8px;' }, '/'),
          }),
        ]),
      ])
    }
    // Basic usage
    return () => h('div', { class: 'playground' }, [
      h('div', { class: 'playground__example' }, [
        h(Breadcrumbs, {
          items: [
            { label: 'Home', to: '/' },
            { label: 'Components', to: '/components' },
            { label: 'Breadcrumbs' },
          ],
        }),
      ]),
    ])
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
    // Striped Table - проверяем "Striped Table" или striped="true"
    if (codeLower.includes('striped table') || (codeLower.includes('striped') && codeLower.includes('alice brown'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Table, {
            columns: [
              ...baseColumns,
              { key: 'status', title: 'Status' },
            ],
            data: [
              ...baseData,
              { name: 'Alice Brown', age: 28, email: 'alice@example.com', status: 'Active' },
            ],
            striped: true,
          }),
        ]),
      ])
    }
    // Bordered Table - проверяем "Bordered Table"
    if (codeLower.includes('bordered table') || (codeLower.includes('bordered') && !codeLower.includes('striped'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Table, {
            columns: baseColumns,
            data: baseData,
            bordered: true,
          }),
        ]),
      ])
    }
    // With Loading - проверяем "With Loading" или наличие Skeleton
    if (codeLower.includes('with loading') || codeLower.includes('skeleton')) {
      const Skeleton = () => h('div', { style: 'display: flex; flex-direction: column; gap: 8px;' }, [
        h('div', { style: 'height: 20px; background: var(--eui-bg-secondary); border-radius: 4px; width: 100%;' }),
        h('div', { style: 'height: 20px; background: var(--eui-bg-secondary); border-radius: 4px; width: 80%;' }),
        h('div', { style: 'height: 20px; background: var(--eui-bg-secondary); border-radius: 4px; width: 90%;' }),
      ])
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h('div', { style: 'padding: 40px; text-align: center;' }, [
            h(Skeleton),
          ]),
        ]),
      ])
    }
    if (codeLower.includes('sort') || codeLower.includes('sortable')) {
      const sortColumns = [
        { key: 'name', title: 'Name', sortable: true },
        { key: 'age', title: 'Age', sortable: true },
        { key: 'email', title: 'Email' },
      ]
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Table, {
            columns: sortColumns,
            data: baseData,
            onSort: (column: string, order: string) => console.log('Sort:', column, order),
          }),
        ]),
      ])
    }
    if ((codeLower.includes('select') || codeLower.includes('selectable')) && codeLower.includes('table')) {
      const selectKey = `${codeKey}-selected`
      if (!state.checkboxValues.value[selectKey]) {
        state.checkboxValues.value[selectKey] = []
      }
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Table, {
            columns: baseColumns,
            data: baseData,
            selectable: true,
            selectedRows: state.checkboxValues.value[selectKey] as string[],
            onSelect: (rows: string[]) => { state.checkboxValues.value[selectKey] = rows },
          }),
        ]),
      ])
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
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Table, { columns: fixedColumns, data: fixedData }),
        ]),
      ])
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
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Table, {
            columns: combinedColumns,
            data: combinedData,
            selectable: true,
            selectedRows: state.checkboxValues.value[combinedKey] as string[],
            bordered: true,
            striped: true,
            hoverable: true,
            onSort: (column: string, order: string) => console.log('Sort:', column, order),
            onSelect: (rows: string[]) => { state.checkboxValues.value[combinedKey] = rows },
          }),
        ]),
      ])
    }
    // Basic usage
    return () => h('div', { class: 'playground' }, [
      h('div', { class: 'playground__example' }, [
        h(Table, { columns: baseColumns, data: baseData }),
      ]),
    ])
  }

  return null
}
