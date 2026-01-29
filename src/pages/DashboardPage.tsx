import { DashboardOverview } from '../components/Dashboard/DashboardOverview'

export function DashboardPage() {
  return (
    <div className="main-content">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">
            Visão geral das notas fiscais processadas e métricas de impacto tributário
          </p>
        </div>
        <DashboardOverview />
      </div>
    </div>
  )
}
