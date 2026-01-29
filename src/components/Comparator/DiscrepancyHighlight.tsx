import './Comparator.css'

interface DiscrepancyHighlightProps {
  value: number
  type?: 'increase' | 'decrease' | 'change'
  format?: 'currency' | 'percentage' | 'number'
}

export function DiscrepancyHighlight({ 
  value, 
  type = 'change',
  format = 'currency'
}: DiscrepancyHighlightProps) {
  const getClassName = () => {
    if (type === 'increase') return 'discrepancy-increase'
    if (type === 'decrease') return 'discrepancy-decrease'
    return 'discrepancy-change'
  }

  const formatValue = () => {
    if (format === 'currency') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)
    }
    if (format === 'percentage') {
      return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
    }
    return value.toFixed(2)
  }

  const getIcon = () => {
    if (type === 'increase') return '↑'
    if (type === 'decrease') return '↓'
    return '→'
  }

  return (
    <span className={`discrepancy-value ${getClassName()}`}>
      {getIcon()} {formatValue()}
    </span>
  )
}
