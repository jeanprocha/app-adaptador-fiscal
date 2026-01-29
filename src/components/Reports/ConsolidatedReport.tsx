import { useMockData } from '../../hooks/useMockData'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { DiscrepancyHighlight } from '../Comparator/DiscrepancyHighlight'
import './Reports.css'

export function ConsolidatedReport() {
  const { notes, loading } = useMockData()

  if (loading) {
    return <div className="loading">Carregando relatório...</div>
  }

  const handleExport = () => {
    const data = notes.map(note => ({
      numero: note.number,
      serie: note.series,
      data: note.date,
      empresa: note.company,
      valorTotal: note.totalValue,
      itens: note.items.length,
      impostoAntigo: note.items.reduce((sum, item) => sum + item.oldTax, 0),
      impostoNovo: note.items.reduce((sum, item) => sum + item.newTax, 0),
      divergencia: note.items.reduce((sum, item) => sum + item.discrepancy, 0),
      status: note.status
    }))

    const csv = [
      ['Número', 'Série', 'Data', 'Empresa', 'Valor Total', 'Itens', 'Imposto Antigo', 'Imposto Novo', 'Divergência', 'Status'],
      ...data.map(row => [
        row.numero,
        row.serie,
        row.data,
        row.empresa,
        row.valorTotal.toFixed(2),
        row.itens.toString(),
        row.impostoAntigo.toFixed(2),
        row.impostoNovo.toFixed(2),
        row.divergencia.toFixed(2),
        row.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `relatorio_consolidado_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const totalValue = notes.reduce((sum, note) => sum + note.totalValue, 0)
  const totalOldTax = notes.reduce((sum, note) => 
    sum + note.items.reduce((itemSum, item) => itemSum + item.oldTax, 0), 0
  )
  const totalNewTax = notes.reduce((sum, note) => 
    sum + note.items.reduce((itemSum, item) => itemSum + item.newTax, 0), 0
  )
  const totalDiscrepancy = totalNewTax - totalOldTax

  return (
    <div className="report-container">
      <div className="report-header">
        <div>
          <h2>Relatório Consolidado</h2>
          <p className="report-subtitle">
            Análise de todas as notas fiscais processadas
          </p>
        </div>
        <button onClick={handleExport} className="btn btn-primary">
          Exportar CSV
        </button>
      </div>

      <div className="report-summary">
        <div className="summary-card">
          <div className="summary-item">
            <span>Total de Notas:</span>
            <strong>{notes.length}</strong>
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
              <th>Número</th>
              <th>Série</th>
              <th>Data</th>
              <th>Empresa</th>
              <th>Valor Total</th>
              <th>Itens</th>
              <th>Imposto Antigo</th>
              <th>Imposto Novo</th>
              <th>Divergência</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => {
              const oldTax = note.items.reduce((sum, item) => sum + item.oldTax, 0)
              const newTax = note.items.reduce((sum, item) => sum + item.newTax, 0)
              const discrepancy = newTax - oldTax

              return (
                <tr key={note.id}>
                  <td>{note.number}</td>
                  <td>{note.series}</td>
                  <td>{formatDate(note.date)}</td>
                  <td>{note.company}</td>
                  <td>{formatCurrency(note.totalValue)}</td>
                  <td>{note.items.length}</td>
                  <td>{formatCurrency(oldTax)}</td>
                  <td><strong>{formatCurrency(newTax)}</strong></td>
                  <td>
                    <DiscrepancyHighlight
                      value={discrepancy}
                      type={discrepancy > 0 ? 'increase' : 'decrease'}
                      format="currency"
                    />
                  </td>
                  <td>
                    <span className={`badge badge-${note.status === 'processed' ? 'success' : note.status === 'pending' ? 'warning' : 'error'}`}>
                      {note.status === 'processed' ? 'Processada' : note.status === 'pending' ? 'Pendente' : 'Erro'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan={4}><strong>Total</strong></td>
              <td><strong>{formatCurrency(totalValue)}</strong></td>
              <td></td>
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
