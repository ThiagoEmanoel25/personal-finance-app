import { getBudgetData, addBudgetRow } from "../models/budgetmodels.js";

export async function loadBudgetData(setBudgetData) {
    const data = await getBudgetData();
    setBudgetData(data);
}

export async function handleAddRow(setBudgetData, categoria, quantidade) {
    const newItem = await addBudgetRow(categoria, quantidade);
    setBudgetData((prev) => [...prev, newItem]);
}

// mantém apenas esta versão
export function removeBudgetRow(setBudgetData, index) {
    setBudgetData((prev) => prev.filter((_, i) => i !== index));
}
