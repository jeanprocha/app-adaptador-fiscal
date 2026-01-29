import { useState } from 'react'
import { useMockData } from '../../hooks/useMockData'
import './Upload.css'

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { simulateUpload } = useMockData()

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      await processFiles(files)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await processFiles(Array.from(files))
    }
  }

  const processFiles = async (files: File[]) => {
    setIsProcessing(true)
    
    await simulateUpload(files.length)
    
    setIsProcessing(false)
    
    // Redireciona para a lista de notas após processamento
    if (files.length > 0) {
      setTimeout(() => {
        window.location.href = '/upload?view=list'
      }, 500)
    }
  }

  return (
    <div className="upload-container">
      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${isProcessing ? 'processing' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="upload-content">
            <div className="upload-spinner"></div>
            <h3>Processando arquivos...</h3>
            <p>Aguarde enquanto processamos suas notas fiscais</p>
          </div>
        ) : (
          <>
            <div className="upload-icon">📤</div>
            <h3>Arraste arquivos aqui</h3>
            <p>ou clique para selecionar</p>
            <input
              type="file"
              id="file-input"
              multiple
              onChange={handleFileSelect}
              className="file-input"
              disabled={isProcessing}
            />
            <label htmlFor="file-input" className="file-input-label btn btn-primary">
              Selecionar Arquivos
            </label>
            <p className="upload-hint">
              Simulação: qualquer tipo de arquivo será processado
            </p>
          </>
        )}
      </div>
    </div>
  )
}
