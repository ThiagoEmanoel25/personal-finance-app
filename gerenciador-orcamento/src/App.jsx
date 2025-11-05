import { useEffect, useState } from "react";
import {
  loadBudgetData,
  handleAddRow,
  handleRemoveRow,
} from "./controllers/BudgetController";
import { BudgetForm, BudgetTable, BudgetStatsDashboard } from "./views";

export default function App() {
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    loadBudgetData(setBudgetData);
  }, []);

  const handleAdd = (categoria, quantidade) => {
    handleAddRow(setBudgetData, categoria, quantidade);
  };

  const handleRemove = (index) => {
    handleRemoveRow(setBudgetData, index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        💰 Gerenciador de Orçamento
      </h1>
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow">
        <BudgetForm onAdd={handleAdd} />
        <BudgetTable data={budgetData} onRemove={handleRemove} />
        <BudgetStatsDashboard data={budgetData} />
      </div>
    </div>
  );
}