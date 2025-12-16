#!/usr/bin/env node

/**
 * Финальный скрипт для исправления всех импортов demo файлов
 * Использует реальную структуру файлов для определения правильных путей
 */

const fs = require('fs')
const path = require('path')

const pagesDir = path.join(__dirname, '../apps/docs/src/pages/Components')
const demosDir = path.join(__dirname, '../apps/docs/src/components/demos')

// Создаем маппинг всех demo файлов: старое имя -> новый путь
function buildFileMapping() {
  const mapping = {}
  
  // Сканируем все папки компонентов
  const items = fs.readdirSync(demosDir)
  const folders = items.filter(item => {
    const itemPath = path.join(demosDir, item)
    return fs.statSync(itemPath).isDirectory()
  })
  
  for (const folder of folders) {
    const folderPath = path.join(demosDir, folder)
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.vue'))
    
    for (const file of files) {
      // Старое имя: ComponentNameFeatureDemo.vue
      // Новое имя: ComponentName/Feature.vue
      const featureName = file.replace('.vue', '')
      // Пробуем восстановить старое имя
      const oldName = `${folder}${featureName}Demo.vue`
      const newPath = `${folder}/${file}`
      
      mapping[oldName] = newPath
      
      // Также добавляем варианты без Demo суффикса
      mapping[`${folder}${featureName}Demo.vue`] = newPath
    }
  }
  
  // Также сканируем файлы в корне (если остались)
  const rootFiles = fs.readdirSync(demosDir).filter(file => {
    const filePath = path.join(demosDir, file)
    return fs.statSync(filePath).isFile() && file.endsWith('.vue')
  })
  
  for (const file of rootFiles) {
    mapping[file] = file // Оставляем как есть
  }
  
  return mapping
}

// Функция для обновления импортов в файле
function updateImportsInFile(filePath, mapping) {
  let content = fs.readFileSync(filePath, 'utf8')
  let modified = false
  
  // Паттерн для импортов: import Name from '../../components/demos/FileName.vue'
  const importPattern = /import\s+(\w+)\s+from\s+['"]\.\.\/\.\.\/components\/demos\/([^'"]+)['"]/g
  
  const matches = [...content.matchAll(importPattern)]
  
  for (const match of matches) {
    const [fullMatch, importName, oldPath] = match
    
    // Если путь уже в новом формате (ComponentName/Feature.vue), пропускаем
    if (oldPath.includes('/')) {
      const [folder, file] = oldPath.split('/')
      const correctPath = mapping[`${folder}${file.replace('.vue', '')}Demo.vue`]
      if (correctPath && correctPath !== oldPath) {
        const newImport = `import ${importName} from '../../components/demos/${correctPath}'`
        content = content.replace(fullMatch, newImport)
        modified = true
        console.log(`  Исправлен: ${oldPath} -> ${correctPath}`)
      }
      continue
    }
    
    // Старый формат без папки
    const newPath = mapping[oldPath]
    if (newPath && newPath !== oldPath) {
      const newImport = `import ${importName} from '../../components/demos/${newPath}'`
      content = content.replace(fullMatch, newImport)
      modified = true
      console.log(`  Исправлен: ${oldPath} -> ${newPath}`)
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8')
    return true
  }
  
  return false
}

// Основная функция
function main() {
  console.log('Построение маппинга файлов...\n')
  const mapping = buildFileMapping()
  console.log(`Найдено ${Object.keys(mapping).length} файлов в маппинге\n`)
  
  console.log('Исправление импортов...\n')
  
  const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.vue'))
  let updatedCount = 0
  
  for (const pageFile of pageFiles) {
    const pagePath = path.join(pagesDir, pageFile)
    console.log(`Обработка: ${pageFile}`)
    
    if (updateImportsInFile(pagePath, mapping)) {
      updatedCount++
      console.log(`  ✓ Обновлен\n`)
    } else {
      console.log(`  - Без изменений\n`)
    }
  }
  
  console.log(`\nИсправлено импортов в ${updatedCount} файлах`)
}

if (require.main === module) {
  main()
}

