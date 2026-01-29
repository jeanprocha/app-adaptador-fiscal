import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

export function Header() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>Adaptador Fiscal</h1>
          <span className="header-subtitle">MVP Demonstrativo</span>
        </div>
        <nav className="header-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/upload" 
            className={`nav-link ${isActive('/upload') ? 'active' : ''}`}
          >
            Processar Notas
          </Link>
          <Link 
            to="/comparator" 
            className={`nav-link ${isActive('/comparator') ? 'active' : ''}`}
          >
            Comparador
          </Link>
          <Link 
            to="/reports" 
            className={`nav-link ${isActive('/reports') ? 'active' : ''}`}
          >
            Relatórios
          </Link>
        </nav>
      </div>
    </header>
  )
}
