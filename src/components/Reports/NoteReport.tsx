import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useMockData } from '../../hooks/useMockData'
import { formatCurrency, formatDate, formatPercentage } from '../../utils/formatters'
import { DiscrepancyHighlight } from '../Comparator/DiscrepancyHighlight'
import './Reports.css'

export function NoteReport() {
  const [searchParams] = useSearchParams()
  const noteId = searchParams.get('noteId')
  const { notes, loading } = useMockData()

  const selectedNote = useMemo(() => {
    if (!noteId) return notes[0] || null
    return notes.find(n => n.id === noteId) || null
  }, [noteId, notes])

  if (loading) {
    return <div className="loading">Carregando relatório...</div>
  }

  if (!selectedNote) {
    return (
      <div className="empty-state">
        <p>Nota fiscal não encontrada.</p>
        <Link to="/reports" className="btn btn-primary">Voltar aos Relatórios</Link>
      </div>
    )
  }

  const oldTax = selectedNote.items.reduce((sum, item) => sum + item.oldTax, 0)
  const newTax = selectedNote.items.reduce((sum, item) => sum + item.newTax, 0)
  const discrepancy = newTax - oldTax

  const handleExport = () => {
    const data = {
      numero: selectedNote.number,
      serie: selectedNote.series,
      data: selectedNote.date,
      empresa: selectedNote.company,
      valorTotal: selectedNote.totalValue,
      itens: selectedNote.items.map(item => ({
        sku: item.sku,
        descricao: item.description,
        ncm: item.ncm,
        cfop: item.cfop,
        tes: item.tes,
        quantidade: item.quantity,
        valorUnitario: item.unitValue,
        impostoAntigo: item.oldTax,
        impostoNovo: item.newTax,
        divergencia: item.discrepancy
      }))
    }

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `nota_${selectedNote.number}_${selectedNote.series}.json`
    link.click()
  }

  return (
    <div className="report-container">
      <div className="report-header">
        <div>
          <h2>Relatório por Nota Fiscal</h2>
          <p className="report-subtitle">
            Nota: {selectedNote.number}/{selectedNote.series} - {formatDate(selectedNote.date)}
          </p>
        </div>
        <button onClick={handleExport} className="btn btn-primary">
          Exportar JSON
        </button>
      </div>

      <div className="note-details">
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Empresa:</span>
            <span className="detail-value">{selectedNote.company}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Valor Total:</span>
            <span className="detail-value">{formatCurrency(selectedNote.totalValue)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total de Itens:</span>
            <span className="detail-value">{selectedNote.items.length}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className={`badge badge-${selectedNote.status === 'processed' ? 'success' : selectedNote.status === 'pending' ? 'warning' : 'error'}`}>
              {selectedNote.status === 'processed' ? 'Processada' : selectedNote.status === 'pending' ? 'Pendente' : 'Erro'}
            </span>
          </div>
        </div>

        <div className="tax-summary">
          <div className="summary-card">
            <h4>Resumo Tributário</h4>
            <div className="summary-items">
              <div className="summary-item">
                <span>Imposto Antigo (Total):</span>
                <strong>{formatCurrency(oldTax)}</strong>
              </div>
              <div className="summary-item">
                <span>Imposto Novo (Total):</span>
                <strong>{formatCurrency(newTax)}</strong>
              </div>
              <div className="summary-item highlight">
                <span>Impacto Total:</span>
                <DiscrepancyHighlight
                  value={discrepancy}
                  type={discrepancy > 0 ? 'increase' : 'decrease'}
                  format="currency"
                />
              </div>
            </div>
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
              <th>CFOP</th>
              <th>TES</th>
              <th>Qtd</th>
              <th>Valor Unit.</th>
              <th>Valor Total</th>
              <th>Taxa Antiga</th>
              <th>Taxa Nova</th>
              <th>Imposto Antigo</th>
              <th>Imposto Novo</th>
              <th>Divergência</th>
            </tr>
          </thead>
          <tbody>
            {selectedNote.items.map((item, index) => {
              const itemTotal = item.unitValue * item.quantity
              const oldRate = (item.oldTax / itemTotal) * 100
              const newRate = (item.newTax / itemTotal) * 100

              return (
                <tr key={index} className={item.discrepancy !== 0 ? 'row-discrepancy' : ''}>
                  <td>{item.sku}</td>
                  <td>{item.description}</td>
                  <td>{item.ncm}</td>
                  <td>{item.cfop}</td>
                  <td>{item.tes}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.unitValue)}</td>
                  <td>{formatCurrency(itemTotal)}</td>
                  <td>{formatPercentage(oldRate)}</td>
                  <td><strong>{formatPercentage(newRate)}</strong></td>
                  <td>{formatCurrency(item.oldTax)}</td>
                  <td><strong>{formatCurrency(item.newTax)}</strong></td>
                  <td>
                    <DiscrepancyHighlight
                      value={item.discrepancy}
                      type={item.discrepancyType}
                      format="currency"
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan={7}><strong>Total da Nota</strong></td>
              <td><strong>{formatCurrency(selectedNote.totalValue)}</strong></td>
              <td></td>
              <td></td>
              <td><strong>{formatCurrency(oldTax)}</strong></td>
              <td><strong>{formatCurrency(newTax)}</strong></td>
              <td>
                <DiscrepancyHighlight
                  value={discrepancy}
                  type={discrepancy > 0 ? 'increase' : 'decrease'}
                  format="currency"
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
