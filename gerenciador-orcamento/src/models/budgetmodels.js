const API_URL = 'http://localhost:3001/api/orcamento';

// Retorna os dados do backend
export async function getBudgetData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Falha na comunicação com o servidor');
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
}

// Adiciona um novo item no backend
export async function addBudgetRow(categoria, quantidade, tipo) {
  const newItem = { categoria, quantidade: parseFloat(quantidade), tipo };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar no Google Sheets');
    }

    // Retorna o item confirmado pelo backend (ou o local se preferir otimista)
    return await response.json();
  } catch (error) {
    console.error("Erro ao adicionar:", error);
    throw error;
  }
}


