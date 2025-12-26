import { useState, useEffect } from "react";
import {
    loadBudgetData,
    handleAddRow,
    removeBudgetRow,
} from "../controllers/BudgetController.js";
import { BudgetForm, BudgetTable, DashboardCards, BalanceChart, CategoryChart } from "./index.js";

export default function Dashboard() {
    const [BudgetData, setBudgetData] = useState([]);

    // Carrega dados quando o app inicia
    useEffect(() => {
        loadBudgetData(setBudgetData);
    }, []);

    const handleAdd = (categoria, valor, tipo) => {
        handleAddRow(setBudgetData, categoria, valor, tipo);
    };

    const handleRemove = (index) => {
        removeBudgetRow(setBudgetData, index);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8 animate__animated animate__fadeIn">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Gerenciador de Orçamento
                    </h1>
                    <p className="text-gray-500">Painel de Controle Financeiro</p>
                </div>

                {/* Logout Button Simulation */}
                <button
                    onClick={() => {
                        localStorage.removeItem('authToken');
                        window.location.reload();
                    }}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                >
                    Sair
                </button>
            </header>

            {/* Grid Layout: Desktop 2 Columns, Mobile 1 Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Esquerda: Dashboard (Stats) - Ocupa 7 colunas no desktop */}
                <div className="lg:col-span-7 space-y-6">
                    <DashboardCards data={BudgetData} />
                    <BalanceChart data={BudgetData} />
                    <CategoryChart data={BudgetData} />
                </div>

                {/* Direita: Operacional (Form + Table) - Ocupa 5 colunas no desktop */}
                <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Lançamentos</h2>
                    <BudgetForm onAdd={handleAdd} />
                    <div className="mt-4">
                        <BudgetTable data={BudgetData} onRemove={handleRemove} />
                    </div>
                </div>

            </div>
        </div>
    );
}
