// Simulação de um banco de dados (array na memória)
let budgetData = [];

// Retorna os dados
export async function getBudgetData() {
  return budgetData;
}

// Adiciona um novo item
export async function addBudgetRow(categoria, quantidade) {
  const newItem = { categoria, quantidade: parseFloat(quantidade) };
  budgetData.push(newItem);
  return newItem;
}


