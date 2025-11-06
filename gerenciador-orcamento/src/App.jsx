// VIEW PRINCIPAL — App.jsx
// Une as Views, Controllers e o estado principal do aplicativo

import { useState, useEffect } from "react";

// Importa as Views (componentes de interface)
import { BudgetForm, BudgetTable, BudgetStatsDashboard } from "./views";

// Importa as funções do Controller (lógica da aplicação)
import {
  loadBudgetData,
  handleAddRow,
  removeBudgetRow,
} from "./controllers/BudgetController";

export default function App() {
  // Estado central do app — lista de despesas
  const [budgetData, setBudgetData] = useState([]);

  // Carrega os dados iniciais quando o app é aberto
  useEffect(() => {
    loadBudgetData(setBudgetData);
  }, []);

  // Função chamada quando o usuário adiciona um item no formulário
  const handleAdd = (categoria, valor) => {
    handleAddRow(setBudgetData, categoria, valor);
  };

  // Função chamada quando o usuário clica em "🗑️" na tabela
  const handleRemove = (index) => {
    removeBudgetRow(setBudgetData, index);
  };

  // JSX — estrutura visual do app
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        💰 Gerenciador de Orçamento
      </h1>

      {/* Container central */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        {/* Formulário de entrada */}
        <BudgetForm onAdd={handleAdd} />

        {/* Tabela de despesas */}
        <div className="mt-4">
          <BudgetTable data={budgetData} onRemove={handleRemove} />
        </div>

        {/* Dashboard com resumo */}
        <BudgetStatsDashboard data={budgetData} />
      </div>
    </div>
  );
}
