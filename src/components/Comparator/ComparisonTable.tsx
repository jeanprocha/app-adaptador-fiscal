import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useMockData } from '../../hooks/useMockData'
import { DiscrepancyHighlight } from './DiscrepancyHighlight'
import { formatCurrency, formatDate, formatPercentage } from '../../utils/formatters'
import './Comparator.css'

export function ComparisonTable() {
  const [searchParams] = useSearchParams()
  const noteId = searchParams.get('noteId')
  const { notes, oldRules, newRules, loading } = useMockData()

  const selectedNote = useMemo(() => {
    if (!noteId) return notes[0] || null
    return notes.find(n => n.id === noteId) || notes[0] || null
  }, [noteId, notes])

  if (loading) {
    return <div className="loading">Carregando dados...</div>
  }

  if (!selectedNote) {
    return (
      <div className="empty-state">
        <p>Nenhuma nota selecionada.</p>
        <Link to="/upload" className="btn btn-primary">
          Processar Notas
        </Link>
      </div>
    )
  }

  const findRule = (cfop: string, tes: string, rules: typeof oldRules) => {
    return rules.find(r => 
      (r.cfop === cfop || !r.cfop) && 
      (r.tes === tes || !r.tes)
    )
  }

  return (
    <div className="comparator-container">
      <div className="comparator-header">
        <div>
          <h2>Comparador Tributário</h2>
          <p className="comparator-subtitle">
            Nota Fiscal: {selectedNote.number}/{selectedNote.series} - 
            {formatDate(selectedNote.date)}
          </p>
        </div>
        <div className="comparator-company">
          <strong>Empresa:</strong> {selectedNote.company}
        </div>
      </div>

      <div className="rules-comparison">
        <div className="comparison-section">
          <h3>Regras Antigas (ICMS/ISS)</h3>
          <div className="rules-grid">
            {oldRules.map(rule => (
              <div key={rule.id} className="rule-card rule-old">
                <div className="rule-header">
                  <span className="rule-type">{rule.ruleType}</span>
                  <span className="rule-name">{rule.name}</span>
                </div>
                <div className="rule-rate">
                  <span className="rule-label">Taxa:</span>
                  <span className="rule-value">{formatPercentage(rule.oldRate)}</span>
                </div>
                {rule.cfop && (
                  <div className="rule-meta">
                    CFOP: {rule.cfop} | TES: {rule.tes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="comparison-section">
          <h3>Regras Novas (IBS/CBS)</h3>
          <div className="rules-grid">
            {newRules.map(rule => {
              const oldRule = oldRules.find(r => r.id === rule.id)
              const isChanged = oldRule?.oldRate !== rule.newRate
              
              return (
                <div 
                  key={rule.id} 
                  className={`rule-card rule-new ${isChanged ? 'rule-changed' : ''}`}
                >
                  <div className="rule-header">
                    <span className="rule-type">{rule.ruleType}</span>
                    <span className="rule-name">{rule.name}</span>
                  </div>
                  <div className="rule-rate">
                    <span className="rule-label">Taxa:</span>
                    <span className={`rule-value ${isChanged ? 'value-changed' : ''}`}>
                      {formatPercentage(rule.newRate)}
                    </span>
                    {isChanged && oldRule && (
                      <DiscrepancyHighlight
                        value={rule.newRate - oldRule.oldRate}
                        type={rule.newRate > oldRule.oldRate ? 'increase' : 'decrease'}
                        format="percentage"
                      />
                    )}
                  </div>
                  {rule.cfop && (
                    <div className="rule-meta">
                      CFOP: {rule.cfop} | TES: {rule.tes}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="items-comparison">
        <h3>Itens da Nota Fiscal</h3>
        <div className="table-wrapper">
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
                <th>Taxa Antiga</th>
                <th>Taxa Nova</th>
                <th>Imposto Antigo</th>
                <th>Imposto Novo</th>
                <th>Divergência</th>
              </tr>
            </thead>
            <tbody>
              {selectedNote.items.map((item, index) => {
                const oldRule = findRule(item.cfop, item.tes, oldRules)
                const newRule = findRule(item.cfop, item.tes, newRules)
                
                return (
                  <tr key={index} className={item.discrepancy !== 0 ? 'row-discrepancy' : ''}>
                    <td>{item.sku}</td>
                    <td>{item.description}</td>
                    <td>{item.ncm}</td>
                    <td>{item.cfop}</td>
                    <td>{item.tes}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.unitValue)}</td>
                    <td>{formatPercentage(oldRule?.oldRate || 18)}</td>
                    <td>
                      <strong>{formatPercentage(newRule?.newRate || 20)}</strong>
                    </td>
                    <td>{formatCurrency(item.oldTax)}</td>
                    <td>
                      <strong>{formatCurrency(item.newTax)}</strong>
                    </td>
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
                <td colSpan={9}><strong>Total da Nota</strong></td>
                <td>
                  <strong>{formatCurrency(
                    selectedNote.items.reduce((sum, item) => sum + item.oldTax, 0)
                  )}</strong>
                </td>
                <td>
                  <strong>{formatCurrency(
                    selectedNote.items.reduce((sum, item) => sum + item.newTax, 0)
                  )}</strong>
                </td>
                <td>
                  <DiscrepancyHighlight
                    value={selectedNote.items.reduce((sum, item) => sum + item.discrepancy, 0)}
                    type={
                      selectedNote.items.reduce((sum, item) => sum + item.discrepancy, 0) > 0 
                        ? 'increase' 
                        : 'decrease'
                    }
                    format="currency"
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="comparator-summary">
        <div className="summary-card">
          <h4>Resumo do Impacto</h4>
          <div className="summary-items">
            <div className="summary-item">
              <span>Valor Total da Nota:</span>
              <strong>{formatCurrency(selectedNote.totalValue)}</strong>
            </div>
            <div className="summary-item">
              <span>Imposto Antigo (Total):</span>
              <strong>{formatCurrency(
                selectedNote.items.reduce((sum, item) => sum + item.oldTax, 0)
              )}</strong>
            </div>
            <div className="summary-item">
              <span>Imposto Novo (Total):</span>
              <strong>{formatCurrency(
                selectedNote.items.reduce((sum, item) => sum + item.newTax, 0)
              )}</strong>
            </div>
            <div className="summary-item highlight">
              <span>Impacto Total:</span>
              <DiscrepancyHighlight
                value={selectedNote.items.reduce((sum, item) => sum + item.discrepancy, 0)}
                type={
                  selectedNote.items.reduce((sum, item) => sum + item.discrepancy, 0) > 0 
                    ? 'increase' 
                    : 'decrease'
                }
                format="currency"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
