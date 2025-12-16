#!/usr/bin/env node

/**
 * Скрипт для исправления импортов в demo файлах
 * Добавляет алиасы для компонентов, чтобы соответствовать именам в шаблонах
 */

const fs = require('fs')
const path = require('path')

const demosDir = path.join(__dirname, '../apps/docs/src/components/demos')

// Маппинг: имя экспорта -> имя компонента (с префиксом Eui)
const componentMap = {
  'Modal': 'EuiModal',
  'Button': 'EuiButton',
  'Input': 'EuiInput',
  'Card': 'EuiCard',
  'CardHeader': 'EuiCardHeader',
  'CardBody': 'EuiCardBody',
  'CardFooter': 'EuiCardFooter',
  'Select': 'EuiSelect',
  'Alert': 'EuiAlert',
  'Checkbox': 'EuiCheckbox',
  'Radio': 'EuiRadio',
  'Switch': 'EuiSwitch',
  'Textarea': 'EuiTextarea',
  'Form': 'EuiForm',
  'FormItem': 'EuiFormItem',
  'Table': 'EuiTable',
  'Tabs': 'EuiTabs',
  'TabPane': 'EuiTabPane',
  'Drawer': 'EuiDrawer',
  'Dropdown': 'EuiDropdown',
  'Tooltip': 'EuiTooltip',
  'Popover': 'EuiPopover',
  'Notification': 'EuiNotification',
  'Pagination': 'EuiPagination',
  'Skeleton': 'EuiSkeleton',
  'Spinner': 'EuiSpinner',
  'Progress': 'EuiProgress',
  'Slider': 'EuiSlider',
  'Steps': 'EuiSteps',
  'Step': 'EuiStep',
  'Timeline': 'EuiTimeline',
  'TimelineItem': 'EuiTimelineItem',
  'List': 'EuiList',
  'ListItem': 'EuiListItem',
  'Empty': 'EuiEmpty',
  'Result': 'EuiResult',
  'Statistic': 'EuiStatistic',
  'Container': 'EuiContainer',
  'Row': 'EuiRow',
  'Col': 'EuiCol',
  'Stack': 'EuiStack',
  'Divider': 'EuiDivider',
  'Breadcrumbs': 'EuiBreadcrumbs',
  'Tag': 'EuiTag',
  'Badge': 'EuiBadge',
  'Avatar': 'EuiAvatar',
  'Header': 'EuiHeader',
  'Sidebar': 'EuiSidebar',
  'DatePicker': 'EuiDatePicker',
  'BaseDatePicker': 'EuiBaseDatePicker',
  'Upload': 'EuiUpload',
  'Accordion': 'EuiAccordion',
  'AccordionItem': 'EuiAccordionItem',
  'Collapse': 'EuiCollapse',
  'CollapseItem': 'EuiCollapseItem',
  'ButtonGroup': 'EuiButtonGroup',
}

// Функция для поиска всех .vue файлов
function findVueFiles(dir) {
  const files = []
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const itemPath = path.join(dir, item)
    const stat = fs.statSync(itemPath)
    
    if (stat.isDirectory()) {
      files.push(...findVueFiles(itemPath))
    } else if (item.endsWith('.vue')) {
      files.push(itemPath)
    }
  }
  
  return files
}

// Функция для обновления импортов
function updateImports(content) {
  let updated = content
  let modified = false
  
  // Паттерн для импортов: import { Component1, Component2 } from '@elivander/elix-ui'
  const importPattern = /import\s+\{([^}]+)\}\s+from\s+['"]@elivander\/elix-ui['"]/g
  
  const matches = [...content.matchAll(importPattern)]
  
  for (const match of matches) {
    const [fullMatch, imports] = match
    const importList = imports.split(',').map(i => i.trim())
    
    const newImports = importList.map(imp => {
      // Проверяем, есть ли уже алиас
      if (imp.includes(' as ')) {
        return imp
      }
      
      // Проверяем, нужно ли добавить алиас
      const componentName = imp.split(' ')[0].trim()
      if (componentMap[componentName]) {
        return `${componentName} as ${componentMap[componentName]}`
      }
      
      return imp
    })
    
    const newImport = `import { ${newImports.join(', ')} } from '@elivander/elix-ui'`
    updated = updated.replace(fullMatch, newImport)
    modified = true
  }
  
  return { content: updated, modified }
}

// Функция для обработки одного файла
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(demosDir, filePath)
  
  const { content: updated, modified } = updateImports(content)
  
  if (modified) {
    fs.writeFileSync(filePath, updated, 'utf8')
    console.log(`✓ Обновлен: ${relativePath}`)
    return true
  }
  
  return false
}

// Основная функция
function main() {
  console.log('Исправление импортов в demo файлах...\n')
  
  const vueFiles = findVueFiles(demosDir)
  console.log(`Найдено ${vueFiles.length} demo файлов\n`)
  
  let updatedCount = 0
  
  for (const filePath of vueFiles) {
    if (processFile(filePath)) {
      updatedCount++
    }
  }
  
  console.log(`\nОбновлено ${updatedCount} файлов`)
}

if (require.main === module) {
  main()
}
