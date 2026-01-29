import './Dashboard.css'

interface MetricsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: string
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  trend?: {
    value: number
    label: string
  }
}

export function MetricsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  variant = 'primary',
  trend 
}: MetricsCardProps) {
  return (
    <div className={`metrics-card metrics-card-${variant}`}>
      <div className="metrics-card-header">
        <div className="metrics-card-title">{title}</div>
        {icon && <div className="metrics-card-icon">{icon}</div>}
      </div>
      <div className="metrics-card-value">{value}</div>
      {subtitle && (
        <div className="metrics-card-subtitle">{subtitle}</div>
      )}
      {trend && (
        <div className={`metrics-card-trend trend-${trend.value > 0 ? 'up' : 'down'}`}>
          {trend.value > 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
        </div>
      )}
    </div>
  )
}
