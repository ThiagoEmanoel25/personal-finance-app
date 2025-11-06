import { useEffect, useState } from "react";
import { loadBudgetData, handleAddRow } from "./controllers/BudgetController";
import { BudgetForm, BudgetTable, BudgetStatsDashboard } from "./views";

export default function App() {
  const [budgetData, setBudgetData] = useState([]);

  // Carrega dados quando o app inicia
  useEffect(() => {
    loadBudgetData(setBudgetData);
  }, []);

  const handleAdd = (categoria, valor) => {
    handleAddRow(setBudgetData, categoria, valor);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        💰 Gerenciador de Orçamento
      </h1>

      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow">
        <BudgetForm onAdd={handleAdd} />
        <BudgetTable data={budgetData} />
        <BudgetStatsDashboard data={budgetData} />
      </div>
    </div>
  );
}
