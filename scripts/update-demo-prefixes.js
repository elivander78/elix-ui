#!/usr/bin/env node

/**
 * Скрипт для обновления всех demo файлов - добавление префикса Eui к компонентам
 */

const fs = require('fs')
const path = require('path')

const demosDir = path.join(__dirname, '../apps/docs/src/components/demos')

// Маппинг компонентов: имя без префикса -> имя с префиксом
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

// Функция для обновления компонентов в шаблоне
function updateTemplate(content) {
  let updated = content
  
  // Обновляем открывающие теги: <ComponentName -> <EuiComponentName
  for (const [oldName, newName] of Object.entries(componentMap)) {
    // Открывающие теги: <ComponentName или <ComponentName 
    const openTagPattern = new RegExp(`<${oldName}(\\s|>|/|\\n)`, 'g')
    updated = updated.replace(openTagPattern, `<${newName}$1`)
    
    // Закрывающие теги: </ComponentName>
    const closeTagPattern = new RegExp(`</${oldName}>`, 'g')
    updated = updated.replace(closeTagPattern, `</${newName}>`)
  }
  
  return updated
}

// Функция для обновления импортов
function updateImports(content) {
  let updated = content
  
  // Обновляем импорты: { ComponentName } -> { ComponentName as EuiComponentName }
  // Но на самом деле, импорты остаются теми же, просто используем с префиксом в шаблоне
  // Или можно оставить импорты как есть, если Vue автоматически конвертирует
  
  return updated
}

// Функция для обработки одного файла
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(demosDir, filePath)
  
  // Обновляем шаблон
  let updated = updateTemplate(content)
  
  // Проверяем, были ли изменения
  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8')
    console.log(`✓ Обновлен: ${relativePath}`)
    return true
  }
  
  return false
}

// Основная функция
function main() {
  console.log('Обновление demo файлов с префиксом Eui...\n')
  
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

