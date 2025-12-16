#!/usr/bin/env node

/**
 * Скрипт для реорганизации demo файлов
 * Перемещает файлы из apps/docs/src/components/demos/*.vue
 * в apps/docs/src/components/demos/{ComponentName}/{Feature}.vue
 */

const fs = require('fs')
const path = require('path')

const demosDir = path.join(__dirname, '../apps/docs/src/components/demos')
const pagesDir = path.join(__dirname, '../apps/docs/src/pages/Components')

// Список всех основных компонентов (отсортирован по длине, от длинных к коротким)
const componentNames = [
  'ButtonGroup',
  'DatePicker',
  'Button',
  'Accordion',
  'Collapse',
  'Timeline',
  'Container',
  'Textarea',
  'Checkbox',
  'Dropdown',
  'Drawer',
  'Sidebar',
  'Header',
  'Spinner',
  'Skeleton',
  'Progress',
  'Pagination',
  'Notification',
  'Tooltip',
  'Popover',
  'Statistic',
  'Select',
  'Modal',
  'Input',
  'Alert',
  'Table',
  'Tabs',
  'Steps',
  'Stack',
  'Slider',
  'Radio',
  'Switch',
  'Upload',
  'Empty',
  'Result',
  'List',
  'Form',
  'Card',
  'Badge',
  'Tag',
  'Avatar',
  'Row',
  'Col',
  'Divider',
  'Breadcrumbs',
]

// Маппинг имен компонентов (для особых случаев)
const componentNameMap = {
  'FormItem': 'Form',
  'CardHeader': 'Card',
  'CardBody': 'Card',
  'CardFooter': 'Card',
  'TimelineItem': 'Timeline',
  'ListItem': 'List',
  'TabPane': 'Tabs',
  'Step': 'Steps',
  'AccordionItem': 'Accordion',
  'CollapseItem': 'Collapse',
}

// Функция для извлечения имени компонента из имени файла
function extractComponentName(filename) {
  // Убираем расширение .vue
  const name = filename.replace('.vue', '')
  
  // Убираем суффикс Demo
  const withoutDemo = name.replace(/Demo$/, '')
  
  // Ищем самое длинное совпадение с известными компонентами
  // Сортируем по длине (от длинных к коротким), чтобы найти самое длинное совпадение
  for (const componentName of componentNames) {
    if (withoutDemo.startsWith(componentName)) {
      return componentNameMap[componentName] || componentName
    }
  }
  
  // Если не нашли, пробуем найти первое слово (fallback)
  const match = withoutDemo.match(/^([A-Z][a-zA-Z]+)/)
  if (match) {
    const componentName = match[1]
    return componentNameMap[componentName] || componentName
  }
  
  return null
}

// Функция для извлечения имени фичи из имени файла
function extractFeatureName(filename, componentName) {
  const name = filename.replace('.vue', '').replace(/Demo$/, '')
  const prefix = componentName
  if (name.startsWith(prefix)) {
    let feature = name.substring(prefix.length)
    // Если feature пустой, значит это Basic demo
    if (!feature) {
      return 'Basic'
    }
    // Преобразуем первую букву в нижний регистр и добавляем остальное
    return feature.charAt(0).toLowerCase() + feature.slice(1)
  }
  // Если не начинается с префикса, возвращаем как есть (но это не должно происходить)
  return name || 'Basic'
}

// Функция для нормализации имени фичи
function normalizeFeatureName(featureName) {
  if (!featureName) return 'Basic'
  
  // Преобразуем camelCase в PascalCase для имени файла
  // Basic, Closable, MaskClosable, Size, Slots, Centered
  return featureName.charAt(0).toUpperCase() + featureName.slice(1)
}

// Функция для чтения всех demo файлов
function getAllDemoFiles() {
  const files = fs.readdirSync(demosDir)
  // Фильтруем только файлы .vue в корне папки demos (не в подпапках)
  return files.filter(file => {
    const filePath = path.join(demosDir, file)
    const stat = fs.statSync(filePath)
    return stat.isFile() && file.endsWith('.vue') && !file.startsWith('.')
  })
}

// Функция для группировки файлов по компонентам
function groupFilesByComponent(files) {
  const groups = {}
  
  for (const file of files) {
    const componentName = extractComponentName(file)
    if (!componentName) {
      console.warn(`Не удалось определить компонент для файла: ${file}`)
      continue
    }
    
    if (!groups[componentName]) {
      groups[componentName] = []
    }
    
    const featureName = extractFeatureName(file, componentName)
    groups[componentName].push({
      oldFile: file,
      componentName,
      featureName: normalizeFeatureName(featureName),
    })
  }
  
  return groups
}

// Функция для создания папки компонента
function createComponentFolder(componentName) {
  const folderPath = path.join(demosDir, componentName)
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
    console.log(`Создана папка: ${componentName}/`)
  }
}

// Функция для перемещения файла
function moveFile(oldFile, newFile) {
  const oldPath = path.join(demosDir, oldFile)
  const newPath = path.join(demosDir, newFile)
  
  // Проверяем, не существует ли уже файл в новой локации
  if (fs.existsSync(newPath)) {
    console.log(`  Пропущен (уже существует): ${newFile}`)
    // Удаляем старый файл, если он существует
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath)
      console.log(`  Удален старый файл: ${oldFile}`)
    }
    return false
  }
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath)
    console.log(`  Перемещен: ${oldFile} -> ${newFile}`)
    return true
  } else {
    console.warn(`  Файл не найден: ${oldFile}`)
    return false
  }
}

// Функция для обновления импортов в страницах документации
function updateImportsInPages() {
  const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.vue'))
  
  for (const pageFile of pageFiles) {
    const pagePath = path.join(pagesDir, pageFile)
    let content = fs.readFileSync(pagePath, 'utf8')
    let modified = false
    
    // Находим все импорты demo файлов (старый формат: ComponentNameFeatureDemo.vue)
    const importRegex = /import\s+(\w+)\s+from\s+['"]\.\.\/\.\.\/components\/demos\/(\w+)Demo\.vue['"]/g
    const matches = [...content.matchAll(importRegex)]
    
    for (const match of matches) {
      const [fullMatch, importName, oldFileName] = match
      const componentName = extractComponentName(oldFileName + 'Demo.vue')
      
      if (componentName) {
        const featureName = extractFeatureName(oldFileName + 'Demo.vue', componentName)
        const normalizedFeature = normalizeFeatureName(featureName)
        const newPath = `../../components/demos/${componentName}/${normalizedFeature}.vue`
        
        // Обновляем импорт
        const newImport = `import ${importName} from '${newPath}'`
        content = content.replace(fullMatch, newImport)
        modified = true
        console.log(`  Обновлен импорт в ${pageFile}: ${oldFileName}Demo.vue -> ${componentName}/${normalizedFeature}.vue`)
      }
    }
    
    // Также обновляем импорты, которые уже в новом формате, но с неправильным путем
    const newFormatRegex = /import\s+(\w+)\s+from\s+['"]\.\.\/\.\.\/components\/demos\/(\w+)\/(\w+)\.vue['"]/g
    const newMatches = [...content.matchAll(newFormatRegex)]
    
    // Проверяем, что пути правильные (это больше для информации)
    for (const match of newMatches) {
      const [fullMatch, importName, folderName, fileName] = match
      const expectedComponent = extractComponentName(folderName + fileName + 'Demo.vue')
      if (expectedComponent && expectedComponent !== folderName) {
        console.log(`  Предупреждение: возможна несоответствие в ${pageFile}: ${folderName}/${fileName}.vue`)
      }
    }
    
    if (modified) {
      fs.writeFileSync(pagePath, content, 'utf8')
    }
  }
}

// Основная функция
function main() {
  console.log('Начинаем реорганизацию demo файлов...\n')
  
  const files = getAllDemoFiles()
  console.log(`Найдено ${files.length} demo файлов\n`)
  
  const groups = groupFilesByComponent(files)
  console.log(`Найдено ${Object.keys(groups).length} компонентов\n`)
  
  // Создаем папки и перемещаем файлы
  for (const [componentName, fileList] of Object.entries(groups)) {
    console.log(`Обработка компонента: ${componentName}`)
    createComponentFolder(componentName)
    
    for (const fileInfo of fileList) {
      const newFileName = `${fileInfo.featureName}.vue`
      const newFilePath = `${componentName}/${newFileName}`
      moveFile(fileInfo.oldFile, newFilePath)
    }
    
    console.log('')
  }
  
  // Обновляем импорты в страницах документации
  console.log('Обновление импортов в страницах документации...\n')
  updateImportsInPages()
  
  console.log('\nРеорганизация завершена!')
}

// Запускаем скрипт
if (require.main === module) {
  main()
}

module.exports = { extractComponentName, extractFeatureName, normalizeFeatureName }

