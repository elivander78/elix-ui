import type { App } from 'vue'

export type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'elix-ui-theme'

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
 * Save theme to localStorage
 */
function saveThemeToStorage(theme: ThemeMode | ThemeConfig): void {
  if (typeof theme === 'string') {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (error) {
      // Ignore localStorage errors (e.g., in private browsing mode)
      console.warn('Failed to save theme to localStorage:', error)
    }
  }
}

/**
 * Load theme from localStorage
 */
function loadThemeFromStorage(): ThemeMode | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') {
      return saved as ThemeMode
    }
  } catch (error) {
    // Ignore localStorage errors
    console.warn('Failed to load theme from localStorage:', error)
  }
  return null
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
    // Save to localStorage
    saveThemeToStorage(theme)
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
  // First, try to get from localStorage
  const savedTheme = loadThemeFromStorage()
  if (savedTheme) {
    return savedTheme
  }
  
  // Fallback to DOM classes
  const root = document.documentElement
  if (root.classList.contains('theme-dark')) {
    return 'dark'
  }
  return 'light'
}

