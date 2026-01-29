import { useState } from 'react'
import { ConsolidatedReport } from '../components/Reports/ConsolidatedReport'
import { NoteReport } from '../components/Reports/NoteReport'
import { ProductReport } from '../components/Reports/ProductReport'

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'consolidated' | 'note' | 'product'>('consolidated')

  return (
    <div className="main-content">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Relatórios</h1>
          <p className="page-description">
            Visualize relatórios detalhados de impacto tributário por nota, produto ou consolidado
          </p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'consolidated' ? 'active' : ''}`}
            onClick={() => setActiveTab('consolidated')}
          >
            Consolidado
          </button>
          <button
            className={`tab ${activeTab === 'note' ? 'active' : ''}`}
            onClick={() => setActiveTab('note')}
          >
            Por Nota
          </button>
          <button
            className={`tab ${activeTab === 'product' ? 'active' : ''}`}
            onClick={() => setActiveTab('product')}
          >
            Por Produto
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'consolidated' && <ConsolidatedReport />}
          {activeTab === 'note' && <NoteReport />}
          {activeTab === 'product' && <ProductReport />}
        </div>
      </div>
    </div>
  )
}
