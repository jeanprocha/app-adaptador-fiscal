# Especificação Técnica — IDEIA 1
# Adaptador Fiscal Inteligente para Reforma Tributária

*(Documento técnico definitivo — versão detalhada)*

---

# 1. Visão Geral
Sistema SaaS especializado em validar, recalcular e atualizar documentos fiscais (NF-e, NFS-e, SPED) conforme regras da Reforma Tributária, integrado ao TOTVS Protheus.

---

# 2. Objetivos do Sistema
- Reprocessar e validar notas com novas regras (IBS/CBS).
- Detectar divergências fiscais.
- Atualizar TES/CFOP/NCM automaticamente.
- Gerar relatórios de impacto fiscal.
- Integrar de forma leve e segura ao Protheus.
- Entregar patches automáticos.

---

# 3. Requisitos Funcionais (RF)
## RF1 — Importação
- Upload de NF-e/NFS-e/XML em lote.
- Importação automática via API/FTP/REST.

## RF2 — Engine Tributária
- Regras modulares e versionadas.
- Suporte a múltiplos cenários: indústria, varejo, serviços.
- Simulação IBS/CBS.

## RF3 — Comparador Tributário
- Comparar regras atuais vs novas.
- Destacar divergências.
- Calcular impacto por SKU/CFOP/TES.

## RF4 — Relatórios
- Relatório consolidado.
- Relatório por nota.
- Relatório por produto.

## RF5 — Geração de Patch Protheus
- Atualizar TES.
- Atualizar CFOP.
- Atualizar NCM.
- Exportação em formato compatível.

## RF6 — Dashboard SaaS
- Login multiempresa.
- Upload e listagem.
- Logs e auditoria.
- Gestão de usuários.

---

# 4. Requisitos Não Funcionais (RNF)
- RNF1: SLA 99%.
- RNF2: Latência < 2s por nota.
- RNF3: Logs imutáveis.
- RNF4: Segurança LGPD.
- RNF5: Arquitetura escalável.

---

# 5. Arquitetura Técnica Detalhada
## 5.1 Diagramas de Alto Nível (texto)
- API Gateway recebe requisições.
- Serviço de Upload salva arquivos no storage.
- Worker de processamento envia para Engine Fiscal.
- Engine aplica regras, salva resultados.
- Serviço de Patch gera arquivos Protheus.
- Dashboard acessa dados via REST.

## 5.2 Microsserviços
### **1. uploader-service**
- Upload batch.
- Validação inicial.
- Envio para fila.

### **2. fiscal-engine**
- Módulo de regras tributárias versionado.
- Cálculo IBS/CBS.
- Comparação.

### **3. analyzer-service**
- Consolidação.
- Indicadores.

### **4. patch-generator**
- Geração de patches ADVPL.
- Logs de compatibilidade.

### **5. dashboard-api**
- CRUD.
- Autenticação.
- Logs.

---

# 6. Banco de Dados
## Tabelas principais
- company
- user
- notes
- note_items
- fiscal_rules
- rule_versions
- reports
- patches

---

# 7. Integração com Protheus
### Métodos:
1. Exportação de XML.
2. Conector REST (se disponível).
3. Patches ADVPL.

---

# 8. MVP (Versão 1.0)
- Upload manual de XML.
- Reprocessamento básico.
- Comparador.
- Relatórios simples.
- Patch TES/CFOP.

---

# 9. Versão 2.0
- Regras avançadas.
- Upload automático.
- Relatórios gráficos.

# 10. Versão 3.0
- SPED.
- Dashboards avançados.
- Auditoria automática.

---

# 11. Checklist de Desenvolvimento
### Backend
- [ ] Criar schema DB
- [ ] Implementar serviços
- [ ] Engine IBS/CBS
- [ ] Conectores

### Frontend
- [ ] Tela de login
- [ ] Upload
- [ ] Relatórios
- [ ] Logs

### DevOps
- [ ] CI/CD
- [ ] Monitoramento
- [ ] Backups
- [ ] Logs imutáveis

---

# 12. Testes
### Testes unitários
### Testes de performance
### Testes fiscais
### Testes de integração Protheus

---

# 13. Segurança e Compliance
- Criptografia AES256
- Tokens JWT
- Logs rastreáveis
- Backup diário

---

# 14. Roadmap
1. MVP — 12 semanas
2. Testes e homologação
3. Versão enterprise

---

Fim do Documento

