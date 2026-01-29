import { useState, useEffect } from 'react'
import type { FiscalNote, FiscalRule, Product, DashboardMetrics } from '../types/fiscal'

export function useMockData() {
  const [notes, setNotes] = useState<FiscalNote[]>([])
  const [oldRules, setOldRules] = useState<FiscalRule[]>([])
  const [newRules, setNewRules] = useState<FiscalRule[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [notesData, oldRulesData, newRulesData, productsData] = await Promise.all([
          fetch('/mock-data/notes.json').then(r => r.json()),
          fetch('/mock-data/rules-old.json').then(r => r.json()),
          fetch('/mock-data/rules-new.json').then(r => r.json()),
          fetch('/mock-data/products.json').then(r => r.json())
        ])

        setNotes(notesData)
        setOldRules(oldRulesData)
        setNewRules(newRulesData)
        setProducts(productsData)
      } catch (error) {
        console.error('Erro ao carregar dados mockados:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const simulateUpload = async (fileCount: number = 5) => {
    setLoading(true)
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading(false)
        resolve()
      }, 2000)
    })
  }

  const getMetrics = (): DashboardMetrics => {
    const processed = notes.filter(n => n.status === 'processed').length
    const pending = notes.filter(n => n.status === 'pending').length
    const error = notes.filter(n => n.status === 'error').length
    const totalValue = notes.reduce((sum, n) => sum + n.totalValue, 0)
    
    // Calcula divergência total somando as diferenças de impostos
    const totalDiscrepancies = notes.reduce((sum, n) => {
      return sum + (n.items?.reduce((itemSum, item) => {
        return itemSum + (item.discrepancy || 0)
      }, 0) || 0)
    }, 0)

    return {
      totalNotes: notes.length,
      totalValue,
      totalDiscrepancies: Math.abs(totalDiscrepancies),
      processedNotes: processed,
      pendingNotes: pending,
      errorNotes: error
    }
  }

  return {
    notes,
    oldRules,
    newRules,
    products,
    loading,
    simulateUpload,
    getMetrics,
    setNotes
  }
}
