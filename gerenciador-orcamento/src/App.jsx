
import { useState, useEffect } from "react";

import {
  loadBudgetData,
  handleAddRow,
  removeBudgetRow,
} from "./controllers/BudgetController.js";
import { BudgetForm, BudgetTable, BudgetStatsDashboard } from "./views";

export default function App() {
  const [BudgetData, setBudgetData] = useState([]);

  // Carrega dados quando o app inicia
  useEffect(() => {
    loadBudgetData(setBudgetData);
  }, []);

  const handleAdd = (categoria, valor) => {
    handleAddRow(setBudgetData, categoria, valor);
  };

  const handleRemove = (index) => {
    removeBudgetRow(setBudgetData, index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        💰 Gerenciador de Orçamento
      </h1>

      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow">
        <BudgetForm onAdd={handleAdd} />
        <BudgetTable data={BudgetData} onRemove={handleRemove} />
        <BudgetStatsDashboard data={BudgetData} />
      </div>
    </div>
  );
}
