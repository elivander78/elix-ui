#!/usr/bin/env node

/**
 * Финальная проверка и исправление всех компонентов с префиксом Eui
 */

const fs = require('fs')
const path = require('path')

const componentsDir = path.join(__dirname, '../packages/ui/src/components')

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

// Функция для проверки компонента
function checkComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(componentsDir, filePath)
  
  const issues = []
  
  // Проверяем наличие defineOptions
  if (!/defineOptions\s*\(/.test(content)) {
    issues.push('Нет defineOptions')
  }
  
  // Проверяем наличие name: 'Eui...
  if (!/name:\s*['"]Eui/.test(content)) {
    issues.push('Нет name с префиксом Eui')
  }
  
  return {
    file: relativePath,
    issues,
  }
}

// Функция для проверки index.ts
function checkIndexFile(indexPath) {
  const content = fs.readFileSync(indexPath, 'utf8')
  const relativePath = path.relative(componentsDir, indexPath)
  
  const issues = []
  
  // Проверяем наличие fallback с ||
  if (/\.name\s*\|\|\s*['"]Eui/.test(content)) {
    issues.push('Есть fallback с ||')
  }
  
  // Проверяем наличие component.__name
  if (/component\.__name/.test(content)) {
    issues.push('Используется component.__name')
  }
  
  return {
    file: relativePath,
    issues,
  }
}

// Основная функция
function main() {
  console.log('Проверка всех компонентов...\n')
  
  const vueFiles = findVueFiles(componentsDir)
  console.log(`Найдено ${vueFiles.length} компонентов\n`)
  
  let componentsWithIssues = 0
  let totalIssues = 0
  
  for (const filePath of vueFiles) {
    const result = checkComponent(filePath)
    if (result.issues.length > 0) {
      componentsWithIssues++
      totalIssues += result.issues.length
      console.log(`❌ ${result.file}`)
      result.issues.forEach(issue => console.log(`   - ${issue}`))
    }
  }
  
  console.log(`\nПроверка index.ts файлов...\n`)
  
  const indexFiles = []
  const items = fs.readdirSync(componentsDir)
  for (const item of items) {
    const itemPath = path.join(componentsDir, item)
    if (fs.statSync(itemPath).isDirectory()) {
      const indexPath = path.join(itemPath, 'index.ts')
      if (fs.existsSync(indexPath)) {
        indexFiles.push(indexPath)
      }
    }
  }
  
  let indexFilesWithIssues = 0
  let totalIndexIssues = 0
  
  for (const indexPath of indexFiles) {
    const result = checkIndexFile(indexPath)
    if (result.issues.length > 0) {
      indexFilesWithIssues++
      totalIndexIssues += result.issues.length
      console.log(`❌ ${result.file}`)
      result.issues.forEach(issue => console.log(`   - ${issue}`))
    }
  }
  
  console.log(`\n📊 Итоги:`)
  console.log(`   Компонентов с проблемами: ${componentsWithIssues}/${vueFiles.length}`)
  console.log(`   Всего проблем в компонентах: ${totalIssues}`)
  console.log(`   index.ts с проблемами: ${indexFilesWithIssues}/${indexFiles.length}`)
  console.log(`   Всего проблем в index.ts: ${totalIndexIssues}`)
  
  if (componentsWithIssues === 0 && indexFilesWithIssues === 0) {
    console.log(`\n✅ Все компоненты правильно настроены с префиксом Eui!`)
  }
}

if (require.main === module) {
  main()
}

