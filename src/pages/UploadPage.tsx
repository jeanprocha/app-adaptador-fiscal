import { UploadZone } from '../components/Upload/UploadZone'
import { NotesList } from '../components/Upload/NotesList'
import { useSearchParams } from 'react-router-dom'

export function UploadPage() {
  const [searchParams] = useSearchParams()
  const view = searchParams.get('view') || 'upload'

  return (
    <div className="main-content">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Processar Notas Fiscais</h1>
          <p className="page-description">
            Faça upload de arquivos XML (NF-e, NFS-e) para processamento e análise tributária
          </p>
        </div>
        {view === 'list' ? <NotesList /> : <UploadZone />}
      </div>
    </div>
  )
}
