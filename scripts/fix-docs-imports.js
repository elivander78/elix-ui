#!/usr/bin/env node

/**
 * Скрипт для исправления импортов в примерах кода на страницах документации
 */

const fs = require('fs')
const path = require('path')

const pagesDir = path.join(__dirname, '../apps/docs/src/pages/Components')

// Маппинг компонентов
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

// Функция для обновления импортов в строке кода
function updateImportsInCode(code) {
  // Паттерн для импортов: import { Component1, Component2 } from '@elivander/elix-ui'
  const importPattern = /import\s+\{([^}]+)\}\s+from\s+['"]@elivander\/elix-ui['"]/g
  
  return code.replace(importPattern, (match, imports) => {
    const importList = imports.split(',').map(i => i.trim())
    
    const newImports = importList.map(imp => {
      if (imp.includes(' as ')) {
        return imp
      }
      
      const componentName = imp.split(' ')[0].trim()
      if (componentMap[componentName]) {
        return `${componentName} as ${componentMap[componentName]}`
      }
      
      return imp
    })
    
    return `import { ${newImports.join(', ')} } from '@elivander/elix-ui'`
  })
}

// Функция для обработки файла
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(pagesDir, filePath)
  let modified = false
  
  // Находим все строки с кодом (const xxxCode = `...`)
  const codePattern = /const\s+(\w+Code)\s*=\s*`([^`]*)`/gs
  
  const matches = [...content.matchAll(codePattern)]
  
  for (const match of matches) {
    const [fullMatch, varName, code] = match
    const updatedCode = updateImportsInCode(code)
    
    if (updatedCode !== code) {
      const newMatch = `const ${varName} = \`${updatedCode}\``
      content = content.replace(fullMatch, newMatch)
      modified = true
      console.log(`  Обновлен: ${varName}`)
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`✓ Обновлен: ${relativePath}\n`)
    return true
  }
  
  return false
}

// Основная функция
function main() {
  console.log('Исправление импортов в примерах кода документации...\n')
  
  const pageFiles = fs.readdirSync(pagesDir)
    .filter(file => file.endsWith('.vue'))
    .map(file => path.join(pagesDir, file))
  
  console.log(`Найдено ${pageFiles.length} страниц\n`)
  
  let updatedCount = 0
  
  for (const filePath of pageFiles) {
    if (processFile(filePath)) {
      updatedCount++
    }
  }
  
  console.log(`\nОбновлено ${updatedCount} файлов`)
}

if (require.main === module) {
  main()
}

