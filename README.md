
Readme · MD
# 🌤️ Aplicação de Previsão do Tempo
 
Aplicação web responsiva e moderna desenvolvida em JavaScript puro (Vanilla JS), HTML5 e CSS3, que consome a API pública **Open-Meteo** para apresentar previsões meteorológicas em tempo real de qualquer cidade do mundo.
 
---
 
## 🚀 Tecnologias Utilizadas
 
- **Frontend:** HTML5, CSS3 (Glassmorphism & Responsividade), JavaScript (ES6+)
- **APIs Externas:** 
  - [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
  - [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs)
- **Fontes e Ícones:** Google Fonts (Poppins), Font Awesome 6
- **Testes:** Jest & Babel
---
 
## 🛠️ Instalação e Execução
 
### Pré-requisitos
 
- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes)
### Passos
 
1. **Clonar o repositório:**
```bash
   git clone https://github.com/SEU_USUARIO/projeto_clima.git
   cd projeto_clima
```
 
2. **Instalar as dependências de desenvolvimento:**
```bash
   npm install
```
 
3. **Executar a aplicação:**
   Abra o arquivo `index.html` diretamente em um navegador web de sua preferência ou utilize a extensão **Live Server** no VS Code.
4. **Executar os testes:**
```bash
   npm test
```
 
---
 
## 💻 Exemplo de Uso
 
1. Abra a aplicação no navegador.
2. Digite o nome de uma cidade no campo de busca (ex: `Resende` ou `Paris`).
3. Clique em **Buscar** ou pressione `Enter`.
4. A tela exibirá:
   - Temperatura atual
   - Descrição do clima
   - Umidade
   - Velocidade do vento
   - Probabilidade de chuva
   - Horário local da medição
5. O tema da interface alterna automaticamente entre os modos **Dia** e **Noite** com base no horário solar da localidade.
---
 
## 🔒 Relatório de Auditoria de Segurança e Privacidade
 
### Riscos Identificados & Mitigações
 
**1. Exposição de Chaves de API (API Keys)**
- **Status:** Baixo Risco
- **Detalhes:** A API Open-Meteo é gratuita e pública, dispensando o uso de chaves de acesso (`API Key`). Não há credenciais sensíveis expostas no código client-side.
**2. Vulnerabilidade a XSS (Cross-Site Scripting)**
- **Mitigação:** Os dados retornados pela busca de cidades e as mensagens de erro passam por sanitização via função `sanitizeHTML` antes de serem renderizados no DOM.
**3. Privacidade do Usuário**
- **Política de Coleta:** A aplicação não solicita geolocalização do dispositivo e não utiliza cookies ou armazenamento local (`localStorage`) para rastrear buscas.
**4. Comunicação Segura**
- **Mitigação:** Todas as requisições de API utilizam o protocolo criptografado `HTTPS`.
---
 
## ⚖️ Licenciamento e Conformidade
 
- **Licença do Projeto:** [MIT License](https://opensource.org/licenses/MIT)
  - Uso livre comercial e educacional com preservação de direitos autorais.
- **Atribuição de Dados:** Os dados meteorológicos são fornecidos por [Open-Meteo.com](https://open-meteo.com/) sob a licença Creative Commons Attribution 4.0 International (CC BY 4.0).
- **Atribuição de Ícones e Fontes:** Créditos das bibliotecas de terceiros (Font Awesome e Google Fonts) estão registrados no arquivo `NOTICE.md`.
---
 
## 📝 Estrutura do Projeto
 
```
projeto_clima/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── api.js
│   └── utils.js
├── tests/
│   └── app.test.js
├── package.json
├── README.md
└── NOTICE.md
```
 
---
 
## 🤝 Contribuindo
 
Contribuições são bem-vindas! Por favor, abra uma issue para discutir mudanças propostas ou envie um pull request.
 
---
 
## 📧 Contato
 
Para dúvidas ou sugestões, entre em contato através do repositório do projeto.
 
---
 
**Desenvolvido com ❤️ e JavaScript puro**