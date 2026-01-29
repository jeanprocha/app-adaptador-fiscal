import type { FiscalNote, FiscalRule } from '../types/fiscal'

export function calculateNoteTaxes(note: FiscalNote, oldRules: FiscalRule[], newRules: FiscalRule[]): FiscalNote {
  const updatedItems = note.items.map(item => {
    const oldRule = oldRules.find(r => 
      (r.cfop === item.cfop || !r.cfop) && 
      (r.tes === item.tes || !r.tes) &&
      (r.ncm === item.ncm || !r.ncm)
    )
    
    const newRule = newRules.find(r => 
      (r.cfop === item.cfop || !r.cfop) && 
      (r.tes === item.tes || !r.tes) &&
      (r.ncm === item.ncm || !r.ncm)
    )

    const oldRate = oldRule?.oldRate || 18.0
    const newRate = newRule?.newRate || 20.0
    
    const itemTotal = item.unitValue * item.quantity
    const oldTax = (itemTotal * oldRate) / 100
    const newTax = (itemTotal * newRate) / 100
    const discrepancy = newTax - oldTax

    return {
      ...item,
      oldTax,
      newTax,
      discrepancy,
      discrepancyType: discrepancy > 0 ? 'increase' : discrepancy < 0 ? 'decrease' : 'change'
    }
  })

  const oldTotalTax = updatedItems.reduce((sum, item) => sum + item.oldTax, 0)
  const newTotalTax = updatedItems.reduce((sum, item) => sum + item.newTax, 0)
  const totalDiscrepancy = newTotalTax - oldTotalTax

  return {
    ...note,
    items: updatedItems,
    oldTotalTax,
    newTotalTax,
    totalDiscrepancy
  }
}

export function findRuleByCfopTes(cfop: string, tes: string, rules: FiscalRule[]): FiscalRule | undefined {
  return rules.find(r => 
    (r.cfop === cfop || !r.cfop) && 
    (r.tes === tes || !r.tes)
  )
}
