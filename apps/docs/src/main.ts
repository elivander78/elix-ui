import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { createUi } from '@elix/ui'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/GettingStarted.vue'),
    },
    {
      path: '/theming',
      component: () => import('./pages/Theming.vue'),
    },
    {
      path: '/components/button',
      component: () => import('./pages/Components/Button.vue'),
    },
    {
      path: '/components/input',
      component: () => import('./pages/Components/Input.vue'),
    },
    {
      path: '/components/card',
      component: () => import('./pages/Components/Card.vue'),
    },
    {
      path: '/components/select',
      component: () => import('./pages/Components/Select.vue'),
    },
    {
      path: '/components/modal',
      component: () => import('./pages/Components/Modal.vue'),
    },
    {
      path: '/components/switch',
      component: () => import('./pages/Components/Switch.vue'),
    },
    {
      path: '/components/checkbox',
      component: () => import('./pages/Components/Checkbox.vue'),
    },
    {
      path: '/components/radio',
      component: () => import('./pages/Components/Radio.vue'),
    },
    {
      path: '/components/textarea',
      component: () => import('./pages/Components/Textarea.vue'),
    },
    {
      path: '/components/badge',
      component: () => import('./pages/Components/Badge.vue'),
    },
    {
      path: '/components/tag',
      component: () => import('./pages/Components/Tag.vue'),
    },
    {
      path: '/components/avatar',
      component: () => import('./pages/Components/Avatar.vue'),
    },
    {
      path: '/components/divider',
      component: () => import('./pages/Components/Divider.vue'),
    },
    {
      path: '/components/tabs',
      component: () => import('./pages/Components/Tabs.vue'),
    },
    {
      path: '/components/breadcrumbs',
      component: () => import('./pages/Components/Breadcrumbs.vue'),
    },
    {
      path: '/components/form',
      component: () => import('./pages/Components/Form.vue'),
    },
    {
      path: '/components/drawer',
      component: () => import('./pages/Components/Drawer.vue'),
    },
    {
      path: '/components/table',
      component: () => import('./pages/Components/Table.vue'),
    },
    {
      path: '/components/pagination',
      component: () => import('./pages/Components/Pagination.vue'),
    },
    {
      path: '/components/notification',
      component: () => import('./pages/Components/Notification.vue'),
    },
    {
      path: '/components/tooltip',
      component: () => import('./pages/Components/Tooltip.vue'),
    },
    {
      path: '/components/popover',
      component: () => import('./pages/Components/Popover.vue'),
    },
    {
      path: '/components/skeleton',
      component: () => import('./pages/Components/Skeleton.vue'),
    },
    {
      path: '/components/spinner',
      component: () => import('./pages/Components/Spinner.vue'),
    },
    {
      path: '/components/progress',
      component: () => import('./pages/Components/Progress.vue'),
    },
    {
      path: '/components/header',
      component: () => import('./pages/Components/Header.vue'),
    },
    {
      path: '/components/sidebar',
      component: () => import('./pages/Components/Sidebar.vue'),
    },
    {
      path: '/components/alert',
      component: () => import('./pages/Components/Alert.vue'),
    },
    {
      path: '/components/collapse',
      component: () => import('./pages/Components/Collapse.vue'),
    },
    {
      path: '/components/slider',
      component: () => import('./pages/Components/Slider.vue'),
    },
    {
      path: '/components/steps',
      component: () => import('./pages/Components/Steps.vue'),
    },
    {
      path: '/components/dropdown',
      component: () => import('./pages/Components/Dropdown.vue'),
    },
    {
      path: '/components/upload',
      component: () => import('./pages/Components/Upload.vue'),
    },
    {
      path: '/components/container',
      component: () => import('./pages/Components/Container.vue'),
    },
    {
      path: '/components/stack',
      component: () => import('./pages/Components/Stack.vue'),
    },
    {
      path: '/components/datepicker',
      component: () => import('./pages/Components/DatePicker.vue'),
    },
  ],
})

const app = createApp(App)
app.use(createUi())
app.use(router)
app.mount('#app')

