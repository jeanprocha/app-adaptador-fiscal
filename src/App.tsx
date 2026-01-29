import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Layout/Header'
import { DashboardPage } from './pages/DashboardPage'
import { UploadPage } from './pages/UploadPage'
import { ComparatorPage } from './pages/ComparatorPage'
import { ReportsPage } from './pages/ReportsPage'
import './styles/global.css'
import './styles/tabs.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/comparator" element={<ComparatorPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
