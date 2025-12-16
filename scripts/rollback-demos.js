#!/usr/bin/env node

/**
 * Скрипт для отката реорганизации demo файлов
 * Перемещает файлы обратно из подпапок в корень demos
 */

const fs = require('fs')
const path = require('path')

const demosDir = path.join(__dirname, '../apps/docs/src/components/demos')

function rollback() {
  console.log('Начинаем откат изменений...\n')
  
  // Находим все подпапки
  const items = fs.readdirSync(demosDir)
  const folders = items.filter(item => {
    const itemPath = path.join(demosDir, item)
    return fs.statSync(itemPath).isDirectory()
  })
  
  console.log(`Найдено ${folders.length} папок для отката\n`)
  
  for (const folder of folders) {
    const folderPath = path.join(demosDir, folder)
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.vue'))
    
    console.log(`Обработка папки: ${folder}/`)
    
    for (const file of files) {
      const oldPath = path.join(folderPath, file)
      // Восстанавливаем оригинальное имя: ComponentNameFeature.vue -> ComponentNameFeatureDemo.vue
      // Но нам нужно знать оригинальное имя. Попробуем восстановить из структуры папки
      const originalName = `${folder}${file.replace('.vue', '')}Demo.vue`
      const newPath = path.join(demosDir, originalName)
      
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath)
        console.log(`  Перемещен обратно: ${folder}/${file} -> ${originalName}`)
      }
    }
    
    // Удаляем пустую папку
    try {
      fs.rmdirSync(folderPath)
      console.log(`  Удалена папка: ${folder}/`)
    } catch (e) {
      console.warn(`  Не удалось удалить папку: ${folder}/`)
    }
    
    console.log('')
  }
  
  console.log('Откат завершен!')
}

if (require.main === module) {
  rollback()
}

