import { getBudgetData, addBudgetRow } from "../models/budgetmodels.js";

export async function loadBudgetData(setBudgetData) {
    const data = await getBudgetData();
    // Inverte para mostrar o mais recente primeiro (já que o sheet manda o mais antigo primeiro)
    setBudgetData(data.reverse());
}

export async function handleAddRow(setBudgetData, categoria, quantidade, tipo) {
    const newItem = await addBudgetRow(categoria, quantidade, tipo);
    setBudgetData((prev) => [newItem, ...prev]);
}

// mantém apenas esta versão
export function removeBudgetRow(setBudgetData, index) {
    setBudgetData((prev) => prev.filter((_, i) => i !== index));
}
