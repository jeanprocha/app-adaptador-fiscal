import { ComparisonTable } from '../components/Comparator/ComparisonTable'

export function ComparatorPage() {
  return (
    <div className="main-content">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Comparador Tributário</h1>
          <p className="page-description">
            Compare regras tributárias antigas (ICMS/ISS) com as novas regras (IBS/CBS) e visualize o impacto
          </p>
        </div>
        <ComparisonTable />
      </div>
    </div>
  )
}
