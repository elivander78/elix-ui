import { h } from 'vue'
import { Pagination } from '@elivander/elix-ui'
import type { PreviewState, RenderFunction } from './types'

export function renderNavigationComponents(
  code: string,
  codeKey: string,
  state: PreviewState
): RenderFunction {
  const codeLower = code.toLowerCase()

  // Pagination examples
  if (codeLower.includes('pagination')) {
    const paginationKey = `${codeKey}-pagination`
    if (!state.tabsValues.value[paginationKey]) {
      state.tabsValues.value[paginationKey] = 1
    }
    if (codeLower.includes('size=') || codeLower.includes('sizes')) {
      return () => h('div', { class: 'preview-pagination-wrapper', style: 'display: flex; flex-direction: column; gap: 20px;' }, [
        h(Pagination, {
          modelValue: state.tabsValues.value[`${paginationKey}-sm`] || 1,
          'onUpdate:modelValue': (v: number) => { state.tabsValues.value[`${paginationKey}-sm`] = v },
          total: 100,
          pageSize: 10,
          size: 'sm',
        }),
        h(Pagination, {
          modelValue: state.tabsValues.value[`${paginationKey}-md`] || 1,
          'onUpdate:modelValue': (v: number) => { state.tabsValues.value[`${paginationKey}-md`] = v },
          total: 100,
          pageSize: 10,
          size: 'md',
        }),
        h(Pagination, {
          modelValue: state.tabsValues.value[`${paginationKey}-lg`] || 1,
          'onUpdate:modelValue': (v: number) => { state.tabsValues.value[`${paginationKey}-lg`] = v },
          total: 100,
          pageSize: 10,
          size: 'lg',
        }),
      ])
    }
    if (codeLower.includes('show-total') || codeLower.includes('total')) {
      return () => h(Pagination, {
        modelValue: state.tabsValues.value[paginationKey] as number,
        'onUpdate:modelValue': (v: number) => { state.tabsValues.value[paginationKey] = v },
        total: 250,
        pageSize: 10,
        showTotal: true,
      })
    }
    if (codeLower.includes('quick-jumper') || codeLower.includes('jumper')) {
      return () => h(Pagination, {
        modelValue: state.tabsValues.value[paginationKey] as number,
        'onUpdate:modelValue': (v: number) => { state.tabsValues.value[paginationKey] = v },
        total: 500,
        pageSize: 10,
        showQuickJumper: true,
      })
    }
    if (codeLower.includes('combined')) {
      return () => h(Pagination, {
        modelValue: state.tabsValues.value[paginationKey] as number,
        'onUpdate:modelValue': (v: number) => { state.tabsValues.value[paginationKey] = v },
        total: 1000,
        pageSize: 10,
        showTotal: true,
        showQuickJumper: true,
        size: 'md',
      })
    }
    if (codeLower.includes('simple') || codeLower.includes('simple version')) {
      return () => h('div', { style: 'display: flex; flex-direction: column; gap: 20px;' }, [
        h(Pagination, {
          modelValue: state.tabsValues.value[`${paginationKey}-simple1`] as number || 1,
          'onUpdate:modelValue': (v: number) => { state.tabsValues.value[`${paginationKey}-simple1`] = v },
          total: 100,
          pageSize: 10,
          simple: true,
        }),
        h(Pagination, {
          modelValue: state.tabsValues.value[`${paginationKey}-simple2`] as number || 1,
          'onUpdate:modelValue': (v: number) => { state.tabsValues.value[`${paginationKey}-simple2`] = v },
          total: 250,
          pageSize: 10,
          simple: true,
        }),
      ])
    }
    return () => h(Pagination, {
      modelValue: state.tabsValues.value[paginationKey] as number,
      'onUpdate:modelValue': (v: number) => { state.tabsValues.value[paginationKey] = v },
      total: 100,
      pageSize: 10,
    })
  }

  return null
}
