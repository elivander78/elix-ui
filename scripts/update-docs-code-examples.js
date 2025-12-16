#!/usr/bin/env node

/**
 * Скрипт для обновления примеров кода в страницах документации
 * Обновляет строки с кодом (basicCode, closableCode и т.д.)
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

// Функция для обновления кода в строках
function updateCodeString(code) {
  let updated = code
  
  // Обновляем открывающие теги: <ComponentName -> <EuiComponentName
  for (const [oldName, newName] of Object.entries(componentMap)) {
    // Открывающие теги: <ComponentName или <ComponentName 
    const openTagPattern = new RegExp(`<${oldName}(\\s|>|/|\\n|@)`, 'g')
    updated = updated.replace(openTagPattern, `<${newName}$1`)
    
    // Закрывающие теги: </ComponentName>
    const closeTagPattern = new RegExp(`</${oldName}>`, 'g')
    updated = updated.replace(closeTagPattern, `</${newName}>`)
  }
  
  return updated
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
    const updatedCode = updateCodeString(code)
    
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
  console.log('Обновление примеров кода в страницах документации...\n')
  
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

