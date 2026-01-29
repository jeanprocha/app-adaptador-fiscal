# Adaptador Fiscal - Sistema de Análise Tributária

## O que é?

Sistema SaaS para analisar, validar e recalcular documentos fiscais (NF-e, NFS-e) conforme as novas regras da Reforma Tributária. O sistema compara as regras antigas (ICMS/ISS) com as novas regras (IBS/CBS) e calcula o impacto financeiro.

---

## Principais Funcionalidades (Versão Completa)

O **Adaptador Fiscal** oferece seis funcionalidades principais para empresas integradas ao Protheus:

**1. Importação Automática de Notas**
   - Sistema recebe notas fiscais (NF-e, NFS-e, SPED) via upload em lote ou importação automática por API/FTP
   - **Como funciona:** Arquivos XML são validados e enviados para uma fila de processamento que processa múltiplas notas simultaneamente

**2. Engine Tributária Inteligente**
   - Motor de cálculo com regras tributárias modulares e versionadas, suportando diferentes cenários (indústria, varejo, serviços)
   - Aplica automaticamente as novas regras IBS/CBS da Reforma Tributária
   - **Como funciona:** Engine processa cada nota, identifica CFOP/TES/NCM e aplica as regras correspondentes para calcular impostos antigos e novos

**3. Comparador Tributário**
   - Compara lado a lado as regras antigas (ICMS/ISS) com as novas (IBS/CBS) e calcula impacto por produto, CFOP ou TES
   - Destaca automaticamente todas as divergências encontradas
   - **Como funciona:** Para cada item da nota, calcula impostos nas duas bases e identifica diferenças, mostrando valores e percentuais de impacto

**4. Relatórios de Impacto Fiscal**
   - Gera relatórios consolidados, por nota ou por produto com todos os cálculos tributários
   - Exporta dados em formatos padrão (CSV, JSON) para análise externa
   - **Como funciona:** Sistema consolida dados processados de todas as notas, agrupa conforme solicitado e gera relatórios formatados

**5. Geração Automática de Patches Protheus**
   - **Diferencial principal:** Sistema gera automaticamente patches ADVPL para atualizar TES, CFOP e NCM no Protheus
   - Patches são gerados em formato compatível e prontos para aplicação no sistema
   - **Como funciona:** Identifica divergências, determina atualizações necessárias e gera arquivos de patch ADVPL que atualizam as tabelas do Protheus automaticamente

**6. Dashboard SaaS Multiempresa**
   - Plataforma web com login por empresa, gestão de usuários e auditoria completa
   - Visualiza métricas, processa notas, acompanha logs e exporta relatórios
   - **Como funciona:** API REST serve dados seguros para o dashboard web, com autenticação multiempresa e logs imutáveis de todas as operações

O fluxo completo integrado: **Importação → Processamento → Comparação → Relatórios → Geração de Patches → Aplicação no Protheus**

---

## Funcionalidades Principais

### 1. Dashboard
- **Visualiza métricas gerais** de todas as notas processadas
- Mostra total de notas, valor total e divergências encontradas
- Exibe gráficos de status (processadas, pendentes, com erro)
- Apresenta gráficos de distribuição de divergências tributárias

### 2. Processamento de Notas Fiscais
- **Upload de arquivos XML** (NF-e, NFS-e) via drag-and-drop
- Simula processamento de notas fiscais
- Lista todas as notas processadas com seus status
- Exibe informações principais: número, série, data, empresa, valor total

### 3. Comparador Tributário
- **Compara regras antigas vs novas** lado a lado
  - Regras Antigas: ICMS (18%), ISS (15%)
  - Regras Novas: IBS (20-22%), CBS (18%)
- **Destaca divergências** encontradas em cada item
- Mostra cálculo detalhado por item da nota fiscal:
  - Taxa de imposto antiga vs nova
  - Valor do imposto antigo vs novo
  - Diferença (divergência) calculada
- Exibe resumo do impacto total da nota fiscal

### 4. Relatórios

#### Relatório Consolidado
- Visão geral de **todas as notas processadas**
- Tabela com informações principais de cada nota
- Totais consolidados de impostos e divergências
- **Exportação em CSV**

#### Relatório por Nota
- Detalhamento completo de **uma nota fiscal específica**
- Todos os itens da nota com cálculos tributários
- Resumo tributário da nota
- **Exportação em JSON**

#### Relatório por Produto
- Análise de impacto tributário **por SKU/Produto**
- Agrupa dados de todas as notas que contêm cada produto
- Mostra quantidade total, valor total, impostos e divergência por produto
- Ordena produtos por maior impacto tributário
- **Exportação em CSV**

---

## O que o Sistema Calcula?

### Para cada Item da Nota Fiscal:
1. **Imposto Antigo**: Calcula com base nas regras atuais (ICMS/ISS)
2. **Imposto Novo**: Calcula com base nas novas regras (IBS/CBS)
3. **Divergência**: Diferença entre imposto novo e antigo
   - Valor positivo = aumento de imposto (vermelho)
   - Valor negativo = redução de imposto (verde)

### Para cada Nota Fiscal:
- Soma de todos os impostos antigos
- Soma de todos os impostos novos
- Impacto total (divergência total)

### Para o Dashboard:
- Total de notas processadas
- Valor total de todas as notas
- Total de divergências encontradas
- Distribuição por status (processadas, pendentes, erros)

---

## Tipos de Dados Processados

### Notas Fiscais (NF-e, NFS-e)
- Informações da nota: número, série, data, empresa
- Itens: SKU, descrição, NCM, CFOP, TES
- Valores: quantidade, valor unitário, valor total
- Cálculos: impostos antigos, impostos novos, divergências

### Regras Tributárias
- **CFOP (Código Fiscal de Operações)**: 5102, 5933
- **TES (Tipo de Entrada/Saída)**: 501, 502, 503, 701
- **NCM (Nomenclatura Comum do Mercosul)**: Classificação de produtos
- **Taxas**: Percentuais de imposto por regra

---

## Como Funciona?

1. **Upload**: Usuário faz upload de arquivos XML de notas fiscais
2. **Processamento**: Sistema processa e valida os dados
3. **Aplicação de Regras**: Sistema aplica regras tributárias antigas e novas
4. **Cálculo**: Sistema calcula impostos e divergências
5. **Visualização**: Usuário visualiza resultados no dashboard, comparador e relatórios
6. **Exportação**: Usuário pode exportar dados em CSV ou JSON

---

## Casos de Uso

### Para Empresas
- **Avaliar impacto** da Reforma Tributária nas notas fiscais
- **Identificar produtos** mais impactados pelas mudanças
- **Calcular aumento ou redução** de impostos
- **Preparar relatórios** para análise gerencial

### Para Consultores Fiscais
- **Analisar múltiplas notas** de forma consolidada
- **Comparar cenários** antes e depois da reforma
- **Gerar relatórios** para apresentação aos clientes
- **Identificar divergências** e oportunidades de otimização

### Para Gestores
- **Visualizar métricas** de impacto tributário
- **Tomar decisões** baseadas em dados
- **Monitorar processamento** de notas fiscais
- **Exportar dados** para outras ferramentas

---

## Características Técnicas (MVP)

- **Frontend**: React + TypeScript + Vite
- **Dados**: Mockados para demonstração
- **Visualização**: Gráficos interativos (Recharts)
- **Navegação**: React Router
- **Estilização**: CSS Modules com design moderno
- **Exportação**: CSV e JSON
- **Responsivo**: Funciona em diferentes tamanhos de tela

---

## Observações Importantes

- Este é um **MVP demonstrativo** com dados mockados
- Não possui backend ou banco de dados real
- Não possui autenticação ou gestão de usuários
- Upload de arquivos é simulado para demonstração
- Todos os cálculos são baseados em regras simplificadas para fins de apresentação

---

## Próximos Passos (Versão Completa)

- Integração real com Protheus TOTVS
- Processamento real de arquivos XML
- Banco de dados para armazenar notas e regras
- Sistema de autenticação e multi-empresa
- Engine tributária completa com todas as regras
- Geração automática de patches ADVPL
- Processamento em lote de múltiplas notas
- Notificações e alertas de divergências

---

**Versão:** MVP Demonstrativo 1.0  
**Data:** 2024  
**Status:** Em desenvolvimento
