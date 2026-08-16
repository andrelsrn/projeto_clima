# 🌤️ Projeto Clima (`projeto_clima`)

Aplicação em JavaScript desenvolvida para consultar e exibir dados meteorológicos em tempo real de qualquer cidade, utilizando integrações com API externa de clima, testes automatizados e boas práticas de desenvolvimento assistido por IA.

---

## 📌 Índice
- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Executando os Testes](#-executando-os-testes)
- [Documentação do Código (JSDoc)](#-documentação-do-código-jsdoc)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Licença](#-licença)

---

## 🚀 Visão Geral

O **Projeto Clima** permite consultar a temperatura atual, umidade, condições do tempo e outras informações meteorológicas cruciais de cidades ao redor do mundo. O projeto foi refatorado e otimizado com auxílio de IA para garantir alta cobertura de testes, tratamento robusto de erros e facilidade de manutenção.

---

## ✨ Funcionalidades

- 🔍 **Busca por Cidade**: Consulta a previsão meteorológica atual informando apenas o nome da cidade.
- 🌐 **Suporte ao Português**: Resultados formatados nativamente em `pt_br` e unidades em métrico (°C).
- ⚠️ **Tratamento de Erros Eficiente**: Mensagens claras para cenários de cidade não encontrada (404), chave de API inválida (401) e falhas de rede.
- 🧪 **Suíte de Testes Automatizados**: Testes unitários com Jest para validar requisições, entradas inválidas e exceções.
- 📖 **Documentação Padronizada**: Código-fonte totalmente documentado utilizando o padrão JSDoc.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem**: JavaScript (Node.js / ES6+)
- **Testes**: [Jest](https://jestjs.io/)
- **Documentação**: [JSDoc](https://jsdoc.app/)
- **Controle de Versão**: Git & GitHub

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Versão 16.x ou superior)
- [npm](https://www.npmjs.com/) (Gerenciador de pacotes do Node)
- Uma chave de API válida da [OpenWeatherMap](https://openweathermap.org/) (ou do provedor configurado).

---

## 🔧 Instalação

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/projeto_clima.git](https://github.com/seu-usuario/projeto_clima.git)
   cd projeto_clima