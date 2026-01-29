export interface FiscalNoteItem {
  sku: string
  description: string
  ncm: string
  cfop: string
  tes: string
  quantity: number
  unitValue: number
  oldTax: number
  newTax: number
  discrepancy: number
  discrepancyType?: 'increase' | 'decrease' | 'change'
}

export interface FiscalNote {
  id: string
  number: string
  series: string
  date: string
  totalValue: number
  company: string
  items: FiscalNoteItem[]
  status: 'processed' | 'pending' | 'error'
  oldTotalTax?: number
  newTotalTax?: number
  totalDiscrepancy?: number
}

export interface FiscalRule {
  id: string
  name: string
  cfop?: string
  ncm?: string
  tes?: string
  oldRate: number
  newRate: number
  ruleType: 'IBS' | 'CBS' | 'ICMS' | 'ISS'
}

export interface Product {
  sku: string
  description: string
  ncm: string
  category: string
}

export interface DashboardMetrics {
  totalNotes: number
  totalValue: number
  totalDiscrepancies: number
  processedNotes: number
  pendingNotes: number
  errorNotes: number
}
