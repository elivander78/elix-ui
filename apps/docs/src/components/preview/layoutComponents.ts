import { h } from 'vue'
import { Header, Sidebar, Button, Input, Avatar, Badge } from '@elivander/elix-ui'
import type { PreviewState, RenderFunction } from './types'

export function renderLayoutComponents(
  code: string,
  codeKey: string,
  state: PreviewState,
  onlyComponent?: string
): RenderFunction {
  const codeLower = code.toLowerCase()

  // Header examples - проверяем ПЕРЕД button, т.к. header может содержать button
  // Проверяем наличие Header в коде - ищем <Header или Header с атрибутами/слотами
  // Более строгая проверка: ищем <Header или </Header> или Header с template slots
  const hasHeaderTag = codeLower.includes('<header') || 
                       codeLower.includes('</header>') ||
                       (codeLower.includes('header') && codeLower.includes('bordered')) ||
                       (codeLower.includes('header') && codeLower.includes('template #'))
  
  // Если запрошен только header
  if (onlyComponent === 'header') {
    // Если Header не найден, возвращаем null
    if (!hasHeaderTag) {
      return null
    }
    // Если Header найден, продолжаем проверку примеров ниже
  }
  
  // Если Header найден и либо onlyComponent не указан, либо это header
  if (hasHeaderTag && (!onlyComponent || onlyComponent === 'header')) {
    // Check for sticky header with scroll
    if (codeLower.includes('sticky') && codeLower.includes('scroll') || codeLower.includes('sticky header')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { 
          class: 'playground__example', 
          style: 'position: relative; height: 400px; overflow: auto; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md);' 
        }, [
          h(Header, { sticky: true, bordered: true }, {
            logo: () => h('h2', { style: 'margin: 0;' }, 'Logo'),
            center: () => h('nav', { style: 'display: flex; gap: 20px;' }, [
              h('a', { href: '#', style: 'text-decoration: none; color: inherit;' }, 'Home'),
              h('a', { href: '#', style: 'text-decoration: none; color: inherit;' }, 'About'),
              h('a', { href: '#', style: 'text-decoration: none; color: inherit;' }, 'Contact'),
            ]),
            right: () => h(Button, {}, () => 'Profile'),
          }),
          h('div', { style: 'height: 200vh; padding: 20px;' }, [
            h('p', {}, 'Scroll down to see the sticky header behavior. The header will remain at the top while scrolling.'),
            h('p', { style: 'margin-top: 100vh;' }, 'You\'ve scrolled far down. The header is still visible at the top.'),
          ]),
        ]),
      ])
    }
    // Check for fixed header
    if (codeLower.includes('fixed') || (codeLower.includes('scroll') && codeLower.includes('200vh'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { 
          class: 'playground__example', 
          style: 'position: relative; height: 400px; overflow: auto; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md);' 
        }, [
          h(Header, { fixed: true, bordered: true }, {
            left: () => h('h2', { style: 'margin: 0;' }, 'Logo'),
            right: () => h(Button, {}, () => 'Menu'),
          }),
          h('div', { style: 'height: 200vh; padding: 20px; padding-top: 80px;' }, 'Scroll to see fixed header'),
        ]),
      ])
    }
    // Check for navigation header - look for nav links or "with navigation"
    if (codeLower.includes('navigation') || codeLower.includes('with navigation') || 
        (codeLower.includes('home') && codeLower.includes('about') && codeLower.includes('services'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Header, { height: '64px', bordered: true }, {
            left: () => h('h2', { style: 'margin: 0;' }, 'Company'),
            center: () => h('nav', { style: 'display: flex; gap: 20px;' }, [
              h('a', { href: '#', style: 'text-decoration: none; color: inherit;' }, 'Home'),
              h('a', { href: '#', style: 'text-decoration: none; color: inherit;' }, 'About'),
              h('a', { href: '#', style: 'text-decoration: none; color: inherit;' }, 'Contact'),
            ]),
            right: () => [
              h(Button, { type: 'outline' }, () => 'Sign In'),
              h(Button, { type: 'primary' }, () => 'Sign Up'),
            ],
          }),
        ]),
      ])
    }
    // Check for search header
    if (codeLower.includes('search') || codeLower.includes('with search') || 
        (codeLower.includes('input') && codeLower.includes('placeholder="search'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Header, { bordered: true }, {
            left: () => h('h2', { style: 'margin: 0;' }, 'Logo'),
            center: () => h(Input, { placeholder: 'Search...', style: 'width: 300px;' }),
            right: () => h(Button, {}, () => 'Profile'),
          }),
        ]),
      ])
    }
    // Check for user menu header - look for avatar, badge, or "with user menu"
    if (codeLower.includes('user') || codeLower.includes('with user menu') || 
        (codeLower.includes('avatar') && codeLower.includes('john doe')) ||
        (codeLower.includes('badge') && codeLower.includes('notifications'))) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Header, { bordered: true }, {
            left: () => [
              h(Avatar, {}, () => 'JD'),
              h('span', { style: 'margin-left: 10px;' }, 'John Doe'),
            ],
            right: () => [
              h(Badge, { value: 3 }, () => h(Button, { type: 'ghost' }, () => 'Notifications')),
              h(Button, { type: 'ghost' }, () => 'Settings'),
              h(Button, { type: 'outline' }, () => 'Logout'),
            ],
          }),
        ]),
      ])
    }
    // Basic usage
    return () => h('div', { class: 'playground' }, [
      h('div', { class: 'playground__example' }, [
        h(Header, { bordered: true }, {
          left: () => h('h2', { style: 'margin: 0;' }, 'Logo'),
          right: () => h(Button, {}, () => 'Login'),
        }),
      ]),
    ])
  }

  // Если запрошен только header, не проверяем другие компоненты
  if (onlyComponent && onlyComponent !== 'header') {
    return null
  }

  // Sidebar examples
  if (codeLower.includes('sidebar')) {
    if (codeLower.includes('collapsed')) {
      const sidebarKey = `${codeKey}-sidebar`
      if (!state.switchValues.value[sidebarKey]) {
        state.switchValues.value[sidebarKey] = false
      }
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: flex; height: 400px; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md);' }, [
          h(Sidebar, {
            collapsed: state.switchValues.value[sidebarKey],
            width: '280px',
            collapsedWidth: '64px',
            bordered: true,
          }, () => h('nav', {}, [
            h('ul', { style: 'list-style: none; padding: 0; margin: 0;' }, [
              h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Home'),
              h('li', { style: 'padding: 12px; cursor: pointer;' }, 'About'),
              h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Contact'),
            ]),
          ])),
          h('main', { style: 'flex: 1; padding: 20px; overflow-y: auto;' }, [
            h(Button, { onClick: () => { state.switchValues.value[sidebarKey] = !state.switchValues.value[sidebarKey] } }, () => 'Toggle Sidebar'),
            h('p', {}, 'Main content'),
          ]),
        ]),
      ])
    }
    if (codeLower.includes('fixed')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { 
          class: 'playground__example', 
          style: 'position: relative; height: 400px; overflow: hidden; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md);' 
        }, [
          h(Sidebar, { fixed: true, width: '280px', bordered: true }, () => h('nav', {}, [
            h('ul', { style: 'list-style: none; padding: 0; margin: 0;' }, [
              h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Home'),
              h('li', { style: 'padding: 12px; cursor: pointer;' }, 'About'),
              h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Contact'),
            ]),
          ])),
          h('main', { style: 'margin-left: 280px; padding: 20px; height: 100%; overflow-y: auto;' }, 'Main content with fixed sidebar'),
        ]),
      ])
    }
    if (codeLower.includes('icon')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: flex; height: 400px; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md);' }, [
          h(Sidebar, { width: '280px', bordered: true }, () => h('nav', {}, [
            h('ul', { style: 'list-style: none; padding: 0; margin: 0;' }, [
              h('li', { style: 'padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 10px;' }, [
                h('span', {}, '🏠'),
                h('span', {}, 'Home'),
              ]),
              h('li', { style: 'padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 10px;' }, [
                h('span', {}, '📊'),
                h('span', {}, 'Dashboard'),
              ]),
              h('li', { style: 'padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 10px;' }, [
                h('span', {}, '⚙️'),
                h('span', {}, 'Settings'),
              ]),
            ]),
          ])),
          h('main', { style: 'flex: 1; padding: 20px; overflow-y: auto;' }, 'Main content'),
        ]),
      ])
    }
    if (codeLower.includes('group')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: flex; height: 400px; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md);' }, [
          h(Sidebar, { width: '280px', bordered: true }, () => h('nav', {}, [
            h('div', { style: 'padding: 12px; font-weight: bold; color: var(--eui-text-secondary);' }, 'Main'),
            h('ul', { style: 'list-style: none; padding: 0; margin: 0;' }, [
              h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Home'),
              h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Dashboard'),
            ]),
            h('div', { style: 'padding: 12px; font-weight: bold; color: var(--eui-text-secondary); margin-top: 20px;' }, 'Settings'),
            h('ul', { style: 'list-style: none; padding: 0; margin: 0;' }, [
              h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Profile'),
              h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Preferences'),
            ]),
          ])),
          h('main', { style: 'flex: 1; padding: 20px; overflow-y: auto;' }, 'Main content'),
        ]),
      ])
    }
    // Check for layout example (Header + Sidebar + Content)
    if (codeLower.includes('header') && codeLower.includes('sidebar') && codeLower.includes('content') ||
        codeLower.includes('layout') || codeLower.includes('header + sidebar')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { 
          class: 'playground__example', 
          style: 'display: flex; flex-direction: column; height: 500px; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); overflow: hidden;' 
        }, [
          h(Header, { sticky: true, bordered: true }, {
            logo: () => h('h2', { style: 'margin: 0;' }, 'App Name'),
            right: () => h(Button, {}, () => 'Menu'),
          }),
          h('div', { style: 'display: flex; flex: 1; overflow: hidden;' }, [
            h(Sidebar, { sticky: true, width: '280px', bordered: true }, () => h('nav', {}, [
              h('ul', { style: 'list-style: none; padding: 0; margin: 0;' }, [
                h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Home'),
                h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Dashboard'),
                h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Settings'),
                h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Profile'),
              ]),
            ])),
            h('main', { style: 'flex: 1; padding: 20px; overflow-y: auto;' }, [
              h('h3', {}, 'Main Content'),
              h('p', {}, 'This is the main content area. When you scroll, only this area scrolls while the header and sidebar remain fixed.'),
              h('div', { style: 'height: 100vh;' }, [
                h('p', {}, 'Scroll down to see that the sidebar stays in place.'),
              ]),
              h('p', { style: 'margin-top: 100vh;' }, 'You\'ve scrolled far down. The header and sidebar are still visible.'),
            ]),
          ]),
        ]),
      ])
    }
    return () => h('div', { class: 'playground' }, [
      h('div', { class: 'playground__example', style: 'display: flex; height: 400px; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md);' }, [
        h(Sidebar, { width: '280px', bordered: true }, () => h('nav', {}, [
          h('ul', { style: 'list-style: none; padding: 0; margin: 0;' }, [
            h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Home'),
            h('li', { style: 'padding: 12px; cursor: pointer;' }, 'About'),
            h('li', { style: 'padding: 12px; cursor: pointer;' }, 'Contact'),
          ]),
        ])),
        h('main', { style: 'flex: 1; padding: 20px; overflow-y: auto;' }, 'Main content'),
      ]),
    ])
  }

  return null
}
