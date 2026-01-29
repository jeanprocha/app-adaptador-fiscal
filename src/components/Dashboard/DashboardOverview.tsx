import { useMockData } from '../../hooks/useMockData'
import { MetricsCard } from './MetricsCard'
import { formatCurrency } from '../../utils/formatters'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import './Dashboard.css'

export function DashboardOverview() {
  const { loading, getMetrics } = useMockData()
  const metrics = getMetrics()

  if (loading) {
    return <div className="loading">Carregando dados...</div>
  }

  const chartData = [
    { name: 'Processadas', value: metrics.processedNotes, color: '#10b981' },
    { name: 'Pendentes', value: metrics.pendingNotes, color: '#f59e0b' },
    { name: 'Erro', value: metrics.errorNotes, color: '#ef4444' }
  ]

  const discrepancyData = [
    { name: 'Aumento', value: Math.round(metrics.totalDiscrepancies * 0.7), color: '#ef4444' },
    { name: 'Redução', value: Math.round(metrics.totalDiscrepancies * 0.3), color: '#10b981' }
  ]

  return (
    <div className="dashboard-overview">
      <div className="metrics-grid">
        <MetricsCard
          title="Total de Notas"
          value={metrics.totalNotes}
          subtitle="Notas fiscais processadas"
          variant="primary"
          icon="📄"
        />
        <MetricsCard
          title="Valor Total"
          value={formatCurrency(metrics.totalValue)}
          subtitle="Soma de todas as notas"
          variant="success"
          icon="💰"
        />
        <MetricsCard
          title="Divergências"
          value={formatCurrency(metrics.totalDiscrepancies)}
          subtitle="Impacto tributário total"
          variant="warning"
          icon="⚠️"
        />
        <MetricsCard
          title="Processadas"
          value={metrics.processedNotes}
          subtitle={`${metrics.pendingNotes} pendentes, ${metrics.errorNotes} com erro`}
          variant="info"
          icon="✅"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-title">Status das Notas</div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-title">Distribuição de Divergências</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={discrepancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
