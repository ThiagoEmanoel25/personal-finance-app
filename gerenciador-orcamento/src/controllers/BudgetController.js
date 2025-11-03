// cordena o Model com a view
import { getbudgetData, addbudgetRow } from "../models/budgetmodels";


export async function LoadBudgetData(setBudgetData) {

    const data = await getbudgetData();
    setBudgetData(data);
}

export async function handleAddRow(setBudgetData, categoria, quantidade) {
  const newItem = await addBudgetRow(categoria, quantidade);
  setBudgetData(prev => [...prev, newItem]);
}