import type { Breakpoint } from '../tokens/breakpoints'

export interface ResponsiveValue<T> {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

/**
 * Get responsive value based on current breakpoint
 */
export function getResponsiveValue<T>(
  value: T | ResponsiveValue<T>,
  currentBreakpoint: Breakpoint
): T | undefined {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const responsiveValue = value as ResponsiveValue<T>
    
    // Try to find value for current breakpoint or smaller
    const breakpoints: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs']
    const currentIndex = breakpoints.indexOf(currentBreakpoint)
    
    for (let i = currentIndex; i < breakpoints.length; i++) {
      const bp = breakpoints[i]
      if (responsiveValue[bp] !== undefined) {
        return responsiveValue[bp]
      }
    }
    
    return undefined
  }
  
  return value as T
}

/**
 * Generate responsive classes for a component
 */
export function generateResponsiveClasses(
  prefix: string,
  value: string | number | ResponsiveValue<string | number>,
  currentBreakpoint: Breakpoint
): string[] {
  const classes: string[] = []
  
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const responsiveValue = value as ResponsiveValue<string | number>
    Object.entries(responsiveValue).forEach(([bp, val]) => {
      classes.push(`${prefix}--${bp}-${val}`)
    })
  } else {
    classes.push(`${prefix}--${value}`)
  }
  
  return classes
}

