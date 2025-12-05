import type { App } from 'vue'

export type ThemeMode = 'light' | 'dark'

export interface ThemeConfig {
  colors?: Partial<Record<string, string>>
  radius?: Partial<Record<string, string>>
  spacing?: Partial<Record<string, string>>
  [key: string]: any
}

export interface UiOptions {
  theme?: ThemeMode | ThemeConfig
}

/**
 * Apply theme to the document
 */
export function applyTheme(theme: ThemeMode | ThemeConfig): void {
  if (typeof theme === 'string') {
    // Simple theme mode
    const root = document.documentElement
    root.classList.remove('theme-light', 'theme-dark')
    root.classList.add(`theme-${theme}`)
  } else {
    // Custom theme config
    const root = document.documentElement
    root.classList.remove('theme-light', 'theme-dark')
    
    // Apply custom CSS variables
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--eui-color-${key}`, value)
      })
    }
    
    if (theme.radius) {
      Object.entries(theme.radius).forEach(([key, value]) => {
        root.style.setProperty(`--eui-radius-${key}`, value)
      })
    }
    
    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--eui-spacing-${key}`, value)
      })
    }
  }
}

/**
 * Get current theme mode
 */
export function getCurrentTheme(): ThemeMode {
  const root = document.documentElement
  if (root.classList.contains('theme-dark')) {
    return 'dark'
  }
  return 'light'
}

