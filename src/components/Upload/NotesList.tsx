import { useMockData } from '../../hooks/useMockData'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { Link } from 'react-router-dom'
import './Upload.css'

export function NotesList() {
  const { notes, loading } = useMockData()

  if (loading) {
    return <div className="loading">Carregando notas...</div>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <span className="badge badge-success">Processada</span>
      case 'pending':
        return <span className="badge badge-warning">Pendente</span>
      case 'error':
        return <span className="badge badge-error">Erro</span>
      default:
        return <span className="badge badge-info">{status}</span>
    }
  }

  return (
    <div className="notes-list-container">
      <div className="notes-header">
        <h2>Notas Fiscais Processadas</h2>
        <span className="notes-count">{notes.length} notas</span>
      </div>

      <div className="notes-table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Série</th>
              <th>Data</th>
              <th>Empresa</th>
              <th>Valor Total</th>
              <th>Itens</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.number}</td>
                <td>{note.series}</td>
                <td>{formatDate(note.date)}</td>
                <td>{note.company}</td>
                <td>{formatCurrency(note.totalValue)}</td>
                <td>{note.items.length}</td>
                <td>{getStatusBadge(note.status)}</td>
                <td>
                  <Link 
                    to={`/comparator?noteId=${note.id}`}
                    className="btn-link"
                  >
                    Ver Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {notes.length === 0 && (
        <div className="empty-state">
          <p>Nenhuma nota fiscal processada ainda.</p>
          <Link to="/upload?view=upload" className="btn btn-primary">
            Processar Notas
          </Link>
        </div>
      )}
    </div>
  )
}
