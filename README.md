# Adaptador Fiscal - MVP Demonstrativo

Sistema SaaS demonstrativo para validação e recálculo de documentos fiscais (NF-e, NFS-e) conforme regras da Reforma Tributária.

## 🚀 Características

- **Dashboard** com métricas e gráficos de impacto tributário
- **Upload Simulado** de arquivos XML (NF-e, NFS-e)
- **Comparador Tributário** mostrando regras antigas vs novas (ICMS/ISS → IBS/CBS)
- **Relatórios** consolidados, por nota e por produto
- **Dados Mockados** para demonstração

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse no navegador:

```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
app-adaptador-fiscal/
├── public/
│   └── mock-data/          # Dados mockados (notas, regras, produtos)
├── src/
│   ├── components/
│   │   ├── Dashboard/      # Componentes do dashboard
│   │   ├── Upload/         # Componentes de upload
│   │   ├── Comparator/     # Comparador tributário
│   │   ├── Reports/        # Relatórios
│   │   └── Layout/         # Layout (Header)
│   ├── pages/              # Páginas da aplicação
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utilitários e formatação
│   ├── types/              # Tipos TypeScript
│   └── styles/             # Estilos globais
```

## 🎯 Funcionalidades

### Dashboard
- Métricas gerais (total de notas, valor total, divergências)
- Gráficos de status das notas
- Gráficos de distribuição de divergências

### Upload de XML
- Interface drag-and-drop para upload simulado
- Listagem de notas processadas
- Status de processamento

### Comparador Tributário
- Comparação side-by-side de regras antigas vs novas
- Destaque de divergências
- Análise por item da nota fiscal
- Resumo de impacto tributário

### Relatórios
- **Consolidado**: Visão geral de todas as notas
- **Por Nota**: Detalhamento de uma nota específica
- **Por Produto**: Análise de impacto por SKU/Produto
- Exportação em CSV/JSON

## 🛠️ Tecnologias

- React 18+
- TypeScript
- Vite
- React Router
- Recharts (gráficos)
- CSS Modules

## 📝 Notas

Este é um MVP demonstrativo com dados mockados. Não há:
- Backend/API real
- Autenticação
- Banco de dados
- Processamento real de XML

Todas as funcionalidades são simuladas para fins de apresentação.

## 📄 Licença

Projeto demonstrativo - Uso interno
