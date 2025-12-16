#!/usr/bin/env node

/**
 * Скрипт для добавления defineOptions с префиксом Eui во все компоненты
 */

const fs = require('fs')
const path = require('path')

const componentsDir = path.join(__dirname, '../packages/ui/src/components')

// Маппинг имен компонентов (для особых случаев)
const componentNameMap = {
  'ButtonGroup': 'EuiButtonGroup',
  'FormItem': 'EuiFormItem',
  'CardHeader': 'EuiCardHeader',
  'CardBody': 'EuiCardBody',
  'CardFooter': 'EuiCardFooter',
  'TimelineItem': 'EuiTimelineItem',
  'ListItem': 'EuiListItem',
  'TabPane': 'EuiTabPane',
  'Step': 'EuiStep',
  'AccordionItem': 'EuiAccordionItem',
  'CollapseItem': 'EuiCollapseItem',
  'BaseDatePicker': 'EuiBaseDatePicker',
}

// Функция для получения имени компонента из имени файла
function getComponentName(filePath) {
  const fileName = path.basename(filePath, '.vue')
  const componentName = componentNameMap[fileName] || `Eui${fileName}`
  return componentName
}

// Функция для проверки, есть ли уже defineOptions
function hasDefineOptions(content) {
  return /defineOptions\s*\(/s.test(content)
}

// Функция для добавления defineOptions
function addDefineOptions(content, componentName) {
  // Ищем начало script setup
  const scriptSetupMatch = content.match(/(<script\s+setup[^>]*>)/)
  if (!scriptSetupMatch) {
    console.warn(`  Не найден <script setup> в файле`)
    return content
  }
  
  const scriptStart = scriptSetupMatch[0]
  const scriptStartIndex = content.indexOf(scriptStart)
  const afterScriptStart = content.substring(scriptStartIndex + scriptStart.length)
  
  // Ищем первую строку после script setup (импорты или пустая строка)
  const firstLineMatch = afterScriptStart.match(/^(\s*)(import|const|export|define)/m)
  
  if (firstLineMatch) {
    const indent = firstLineMatch[1]
    const insertIndex = scriptStartIndex + scriptStart.length + firstLineMatch.index
    const defineOptionsBlock = `\n${indent}defineOptions({\n${indent}  name: '${componentName}',\n${indent}})\n`
    return content.slice(0, insertIndex) + defineOptionsBlock + content.slice(insertIndex)
  }
  
  // Если не нашли, вставляем после script setup
  const insertIndex = scriptStartIndex + scriptStart.length
  const defineOptionsBlock = `\n\ndefineOptions({\n  name: '${componentName}',\n})\n`
  return content.slice(0, insertIndex) + defineOptionsBlock + content.slice(insertIndex)
}

// Функция для обработки одного файла
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  
  // Пропускаем, если уже есть defineOptions
  if (hasDefineOptions(content)) {
    console.log(`  Пропущен (уже есть defineOptions): ${path.basename(filePath)}`)
    return false
  }
  
  const componentName = getComponentName(filePath)
  const newContent = addDefineOptions(content, componentName)
  
  fs.writeFileSync(filePath, newContent, 'utf8')
  console.log(`  ✓ Добавлен: ${componentName}`)
  return true
}

// Функция для рекурсивного поиска всех .vue файлов
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

// Основная функция
function main() {
  console.log('Добавление префикса Eui во все компоненты...\n')
  
  const vueFiles = findVueFiles(componentsDir)
  console.log(`Найдено ${vueFiles.length} компонентов\n`)
  
  let updatedCount = 0
  
  for (const filePath of vueFiles) {
    const relativePath = path.relative(componentsDir, filePath)
    console.log(`Обработка: ${relativePath}`)
    
    if (processFile(filePath)) {
      updatedCount++
    }
    console.log('')
  }
  
  console.log(`\nОбновлено ${updatedCount} компонентов`)
}

if (require.main === module) {
  main()
}

