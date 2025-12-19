    # Configuração do Backend com Google Sheets

Este projeto utiliza um servidor Node.js simples para conectar o Frontend ao Google Sheets.

## Passos para Configuração

1.  **Credenciais do Google Cloud**:
    *   Acesse o [Google Cloud Console](https://console.cloud.google.com/).
    *   Crie um novo projeto.
    *   Ative a **Google Sheets API** (APIs e Serviços > Biblioteca).
    *   Vá em **APIs e Serviços > Credenciais**.
    *   Crie uma credencial de **Conta de Serviço**.
    *   Gere uma chave JSON para essa conta e faça o download.
    *   Renomeie o arquivo para `credentials.json` e coloque-o dentro da pasta `gerenciador-orcamento/server`.

2.  **Preparar a Planilha**:
    *   Crie uma nova planilha no Google Sheets.
    *   Copie o email da conta de serviço (está dentro do `credentials.json` como `client_email` ou no painel do Google Cloud).
    *   Clique em "Compartilhar" na sua planilha e compartilhe com esse email (como Editor).
    *   Copie o ID da planilha da URL (é a parte estranha entre `/d/` e `/edit`).
        *   Exemplo: `https://docs.google.com/spreadsheets/d/1XyZ.../edit` -> O ID é `1XyZ...`.

3.  **Configurar Variáveis de Ambiente**:
    *   Na pasta `server`, crie um arquivo `.env` (copie de `.env.example`).
    *   Coloque o ID da planilha: `SPREADSHEET_ID=seu_id_aqui`.

4.  **Rodar o Servidor**:
    *   Abra um terminal na pasta `server`.
    *   Execute: `node index.js` (ou `npm start` se configurado).
    *   O servidor rodará na porta 3001.

5.  **Rodar o Frontend**:
    *   Em outro terminal, na pasta raiz `gerenciador-orcamento`, execute `npm run dev`.
