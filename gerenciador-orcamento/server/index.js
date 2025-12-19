const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Configuração do Google Sheets
// É necessário ter o arquivo credentials.json na raiz da pasta server ou configurar variável de ambiente
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Verificação de inicialização
async function checkConnection() {
    if (!SPREADSHEET_ID) {
        console.error("❌ ERRO: variável SPREADSHEET_ID não definida no .env ou arquivo não encontrado.");
        return;
    }
    console.log(`🔍 Tentando conectar na Planilha ID: ${SPREADSHEET_ID}`);
    try {
        await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
        console.log("✅ CONEXÃO COM GOOGLE SHEETS BEM SUCEDIDA!");
    } catch (error) {
        if (error.code === 404) {
            console.error("❌ ERRO: Planilha não encontrada. Verifique o SPREADSHEET_ID.");
        } else if (error.code === 403 || error.message.includes('permission')) {
            console.error("❌ ERRO: Permissão negada. Verifique se o email da conta de serviço (no credentials.json) foi adicionado como 'Editor' na planilha.");
        } else if (error.code === 'ENOENT') {
            console.error("❌ ERRO: Arquivo credentials.json não encontrado.");
        } else {
            console.error("❌ ERRO ao conectar com Google Sheets:", error.message);
        }
    }
}

checkConnection();

// Rota para buscar dados
app.get('/api/orcamento', async (req, res) => {
    try {
        if (!SPREADSHEET_ID) {
            return res.status(500).json({ error: 'SPREADSHEET_ID not configured' });
        }

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Página1!A:E',
        });

        const rows = response.data.values;

        // Se não houver dados ou só houver o cabeçalho
        if (!rows || rows.length < 2) {
            return res.json([]);
        }

        // Ignora a primeira linha (cabeçalho) e mapeia
        // Nova Estrutura da Planilha:
        // Coluna D (row[3]): Tipo (Entrada/Saída)
        const data = rows.slice(1).map(row => {
            let tipoRaw = (row[3] || "").trim().toLowerCase();

            // Lógica inteligente para definir o tipo
            let tipo = "Saída"; // Default
            if (tipoRaw === 'entrada' || tipoRaw === 'receita' || tipoRaw === 'ganho') {
                tipo = "Entrada";
            } else if (tipoRaw === 'saída' || tipoRaw === 'saida' || tipoRaw === 'gasto' || tipoRaw === 'despesa') {
                tipo = "Saída";
            } else if (!tipoRaw) {
                // Se estiver vazio, tenta adivinhar pela Categoria
                const cat = (row[1] || "").toLowerCase();
                if (cat.includes('salario') || cat.includes('salário') || cat.includes('receita') || cat.includes('venda')) {
                    tipo = "Entrada";
                }
            }

            return {
                data: row[0],
                categoria: row[1] || "Sem Categoria",
                quantidade: parseFloat(row[2] ? row[2].replace('R$', '').replace('.', '').replace(',', '.') : 0) || 0,
                tipo: tipo
            };
        });

        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do Google Sheets', details: error.message });
    }
});

// Rota para adicionar dados
app.post('/api/orcamento', async (req, res) => {
    const { categoria, quantidade, tipo } = req.body; // Recebe o TIPO agora

    if (!SPREADSHEET_ID) {
        return res.status(500).json({ error: 'SPREADSHEET_ID not configured' });
    }

    try {
        const hoje = new Date().toLocaleDateString('pt-BR'); // Ex: 19/12/2025

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            // Importante: Aumentar o range para D
            range: 'Página1!A:D',
            valueInputOption: 'USER_ENTERED',
            resource: {
                // Salva: Data | Categoria | Valor | Tipo
                values: [[hoje, categoria, quantidade, tipo || 'Saída']],
            },
        });
        res.json({ categoria, quantidade, tipo });
    } catch (error) {
        console.error('Erro ao adicionar dados:', error);
        res.status(500).json({ error: 'Erro ao adicionar dados no Google Sheets' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
