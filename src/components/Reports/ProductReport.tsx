import { useMemo } from 'react'
import { useMockData } from '../../hooks/useMockData'
import { formatCurrency } from '../../utils/formatters'
import { DiscrepancyHighlight } from '../Comparator/DiscrepancyHighlight'
import './Reports.css'

export function ProductReport() {
  const { notes, products, loading } = useMockData()

  const productData = useMemo(() => {
    if (loading || !notes || notes.length === 0) {
      return []
    }

    const productMap = new Map<string, {
      sku: string
      description: string
      ncm: string
      category: string
      totalQuantity: number
      totalValue: number
      totalOldTax: number
      totalNewTax: number
      totalDiscrepancy: number
      noteCount: number
    }>()

    notes.forEach(note => {
      note.items.forEach(item => {
        const existing = productMap.get(item.sku) || {
          sku: item.sku,
          description: item.description,
          ncm: item.ncm,
          category: products.find(p => p.sku === item.sku)?.category || 'N/A',
          totalQuantity: 0,
          totalValue: 0,
          totalOldTax: 0,
          totalNewTax: 0,
          totalDiscrepancy: 0,
          noteCount: 0
        }

        existing.totalQuantity += item.quantity
        existing.totalValue += item.unitValue * item.quantity
        existing.totalOldTax += item.oldTax
        existing.totalNewTax += item.newTax
        existing.totalDiscrepancy += item.discrepancy
        existing.noteCount += 1

        productMap.set(item.sku, existing)
      })
    })

    return Array.from(productMap.values()).sort((a, b) => 
      Math.abs(b.totalDiscrepancy) - Math.abs(a.totalDiscrepancy)
    )
  }, [notes, products, loading])

  if (loading) {
    return <div className="loading">Carregando relatório...</div>
  }

  const handleExport = () => {
    const csv = [
      ['SKU', 'Descrição', 'NCM', 'Categoria', 'Qtd Total', 'Valor Total', 'Imposto Antigo', 'Imposto Novo', 'Divergência', 'Notas'],
      ...productData.map(row => [
        row.sku,
        row.description,
        row.ncm,
        row.category,
        row.totalQuantity.toString(),
        row.totalValue.toFixed(2),
        row.totalOldTax.toFixed(2),
        row.totalNewTax.toFixed(2),
        row.totalDiscrepancy.toFixed(2),
        row.noteCount.toString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `relatorio_produtos_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const totalValue = productData.reduce((sum, p) => sum + p.totalValue, 0)
  const totalOldTax = productData.reduce((sum, p) => sum + p.totalOldTax, 0)
  const totalNewTax = productData.reduce((sum, p) => sum + p.totalNewTax, 0)
  const totalDiscrepancy = totalNewTax - totalOldTax

  return (
    <div className="report-container">
      <div className="report-header">
        <div>
          <h2>Relatório por Produto</h2>
          <p className="report-subtitle">
            Análise de impacto tributário por SKU/Produto
          </p>
        </div>
        <button onClick={handleExport} className="btn btn-primary">
          Exportar CSV
        </button>
      </div>

      <div className="report-summary">
        <div className="summary-card">
          <div className="summary-item">
            <span>Total de Produtos Únicos:</span>
            <strong>{productData.length}</strong>
          </div>
          <div className="summary-item">
            <span>Valor Total:</span>
            <strong>{formatCurrency(totalValue)}</strong>
          </div>
          <div className="summary-item">
            <span>Imposto Antigo (Total):</span>
            <strong>{formatCurrency(totalOldTax)}</strong>
          </div>
          <div className="summary-item">
            <span>Imposto Novo (Total):</span>
            <strong>{formatCurrency(totalNewTax)}</strong>
          </div>
          <div className="summary-item highlight">
            <span>Impacto Total:</span>
            <DiscrepancyHighlight
              value={totalDiscrepancy}
              type={totalDiscrepancy > 0 ? 'increase' : 'decrease'}
              format="currency"
            />
          </div>
        </div>
      </div>

      <div className="report-table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Descrição</th>
              <th>NCM</th>
              <th>Categoria</th>
              <th>Qtd Total</th>
              <th>Valor Total</th>
              <th>Imposto Antigo</th>
              <th>Imposto Novo</th>
              <th>Divergência</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product) => (
              <tr 
                key={product.sku}
                className={product.totalDiscrepancy !== 0 ? 'row-discrepancy' : ''}
              >
                <td>{product.sku}</td>
                <td>{product.description}</td>
                <td>{product.ncm}</td>
                <td>
                  <span className="badge badge-info">{product.category}</span>
                </td>
                <td>{product.totalQuantity}</td>
                <td>{formatCurrency(product.totalValue)}</td>
                <td>{formatCurrency(product.totalOldTax)}</td>
                <td><strong>{formatCurrency(product.totalNewTax)}</strong></td>
                <td>
                  <DiscrepancyHighlight
                    value={product.totalDiscrepancy}
                    type={product.totalDiscrepancy > 0 ? 'increase' : 'decrease'}
                    format="currency"
                  />
                </td>
                <td>{product.noteCount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan={5}><strong>Total</strong></td>
              <td><strong>{formatCurrency(totalValue)}</strong></td>
              <td><strong>{formatCurrency(totalOldTax)}</strong></td>
              <td><strong>{formatCurrency(totalNewTax)}</strong></td>
              <td>
                <DiscrepancyHighlight
                  value={totalDiscrepancy}
                  type={totalDiscrepancy > 0 ? 'increase' : 'decrease'}
                  format="currency"
                />
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
