#!/usr/bin/env node

/**
 * Скрипт для обновления регистрации компонентов в index.ts файлах
 * Убирает fallback имена, так как теперь все компоненты имеют defineOptions
 */

const fs = require('fs')
const path = require('path')

const componentsDir = path.join(__dirname, '../packages/ui/src/components')

// Функция для получения имени компонента из имени файла
function getComponentName(fileName) {
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
  
  const baseName = fileName.replace('.vue', '')
  return componentNameMap[baseName] || `Eui${baseName}`
}

// Функция для обновления index.ts файла
function updateIndexFile(indexPath) {
  let content = fs.readFileSync(indexPath, 'utf8')
  let modified = false
  
  // Паттерн для app.component(Component.name || 'EuiComponent', Component)
  const pattern = /app\.component\((\w+)\.name\s*\|\|\s*['"](Eui\w+)['"],\s*\1\)/g
  
  const matches = [...content.matchAll(pattern)]
  
  for (const match of matches) {
    const [fullMatch, componentVar, fallbackName] = match
    // Убираем fallback, оставляем только component.name
    const newRegistration = `app.component(${componentVar}.name, ${componentVar})`
    content = content.replace(fullMatch, newRegistration)
    modified = true
    console.log(`  Обновлена регистрация: ${componentVar} (было: ${fallbackName})`)
  }
  
  // Также обновляем случаи с component.name || component.__name
  const pattern2 = /app\.component\((\w+)\.name\s*\|\|\s*\1\.__name,\s*\1\)/g
  const matches2 = [...content.matchAll(pattern2)]
  
  for (const match of matches2) {
    const [fullMatch, componentVar] = match
    const newRegistration = `app.component(${componentVar}.name, ${componentVar})`
    content = content.replace(fullMatch, newRegistration)
    modified = true
    console.log(`  Обновлена регистрация: ${componentVar} (убрано __name)`)
  }
  
  // Обновляем случаи с forEach
  const forEachPattern = /components\.forEach\(\(component\)\s*=>\s*\{[\s\S]*?app\.component\(component\.name\s*\|\|\s*component\.__name,\s*component\)[\s\S]*?\}\)/
  
  if (forEachPattern.test(content)) {
    content = content.replace(
      /app\.component\(component\.name\s*\|\|\s*component\.__name,\s*component\)/g,
      'app.component(component.name, component)'
    )
    modified = true
    console.log(`  Обновлена регистрация в forEach`)
  }
  
  if (modified) {
    fs.writeFileSync(indexPath, content, 'utf8')
    return true
  }
  
  return false
}

// Функция для поиска всех index.ts файлов
function findIndexFiles(dir) {
  const files = []
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const itemPath = path.join(dir, item)
    const stat = fs.statSync(itemPath)
    
    if (stat.isDirectory()) {
      const indexPath = path.join(itemPath, 'index.ts')
      if (fs.existsSync(indexPath)) {
        files.push(indexPath)
      }
    }
  }
  
  return files
}

// Основная функция
function main() {
  console.log('Обновление регистрации компонентов...\n')
  
  const indexFiles = findIndexFiles(componentsDir)
  console.log(`Найдено ${indexFiles.length} index.ts файлов\n`)
  
  let updatedCount = 0
  
  for (const indexPath of indexFiles) {
    const relativePath = path.relative(componentsDir, indexPath)
    console.log(`Обработка: ${relativePath}`)
    
    if (updateIndexFile(indexPath)) {
      updatedCount++
      console.log(`  ✓ Обновлен\n`)
    } else {
      console.log(`  - Без изменений\n`)
    }
  }
  
  console.log(`\nОбновлено ${updatedCount} файлов`)
}

if (require.main === module) {
  main()
}

