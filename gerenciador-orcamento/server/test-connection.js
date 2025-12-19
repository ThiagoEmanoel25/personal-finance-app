const { google } = require('googleapis');
require('dotenv').config();
const fs = require('fs');

async function testConnection() {
    console.log("------------------------------------------");
    console.log("🛠️  TESTE DE CONEXÃO GOOGLE SHEETS");
    console.log("------------------------------------------");

    // 1. Verifica arquivo credentials.json
    if (!fs.existsSync('credentials.json')) {
        console.error("❌ ERRO: Arquivo 'credentials.json' NÃO encontrado na pasta atual.");
        return;
    }
    const creds = JSON.parse(fs.readFileSync('credentials.json'));
    console.log(`📧 Email da Conta de Serviço: ${creds.client_email}`);
    console.log("👉 Certifique-se de que este email foi adicionado como 'Editor' na sua planilha.");

    // 2. Verifica .env e Spreadsheet ID
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
        console.error("❌ ERRO: 'SPREADSHEET_ID' não encontrado no arquivo .env.");
        return;
    }
    console.log(`📊 ID da Planilha configurado: ${spreadsheetId}`);

    // 3. Tenta conexão
    console.log("🔄 Tentando conectar...");

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const response = await sheets.spreadsheets.get({ spreadsheetId });
        console.log("------------------------------------------");
        console.log(`✅ SUCESSO! Conectado à planilha: "${response.data.properties.title}"`);
        console.log("------------------------------------------");
    } catch (error) {
        console.log("------------------------------------------");
        console.error("❌ FALHA NA CONEXÃO:");
        if (error.response) {
            console.error(`Status: ${error.response.status} - ${error.response.statusText}`);
            if (error.response.status === 403) {
                console.error("⚠️  MOTIVO: Permissão negada.");
                console.error("SOLUÇÃO: Vá na sua planilha no Google Sheets -> Compartilhar -> Cole o email acima e dê permissão de EDITOR.");
            } else if (error.response.status === 404) {
                console.error("⚠️  MOTIVO: Planilha não encontrada.");
                console.error("SOLUÇÃO: Verifique se o ID da planilha está correto.");
            }
        } else {
            console.error(error.message);
        }
    }
}

testConnection();
