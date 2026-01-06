import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BudgetForm, BudgetTable, DashboardCards, BalanceChart, CategoryChart, GamificationCard } from "./index.js";
import MonthFilter from "../components/MonthFilter";

export default function Dashboard() {
    const [BudgetData, setBudgetData] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [filter, setFilter] = useState({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    };

    // Função para buscar dados do backend (com filtro)
    const fetchTransactions = async () => {
        try {
            const { month, year } = filter;
            const response = await axios.get(`http://localhost:3001/api/orcamento?month=${month}&year=${year}`, config);
            setBudgetData(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem('authToken');
                window.location.reload();
            }
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [filter]);

    const handleAdd = async (transaction) => {
        try {
            // Se transaction já vier com date (ex: do form), usa, senão usa now
            const payload = { ...transaction, date: transaction.date || new Date() };
            await axios.post("http://localhost:3001/api/orcamento", payload, config);
            toast.success("Adicionado com sucesso!");
            fetchTransactions();
        } catch (error) {
            console.error("Erro ao adicionar:", error);
            toast.error("Erro ao adicionar.");
        }
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdate = async (updatedTransaction) => {
        try {
            await axios.put(`http://localhost:3001/api/orcamento/${updatedTransaction._id}`, updatedTransaction, config);
            toast.success("Atualizado com sucesso!");
            setEditingTransaction(null);
            fetchTransactions();
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            toast.error("Erro ao atualizar.");
        }
    };

    const handleRemove = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            try {
                await axios.delete(`http://localhost:3001/api/orcamento/${id}`, config);
                toast.success("Removido com sucesso!");
                fetchTransactions();
            } catch (error) {
                console.error("Erro ao remover:", error);
                toast.error("Erro ao remover.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col p-4 md:p-8 animate__animated animate__fadeIn">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Gerenciador de Orçamento
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">Painel de Controle Financeiro</p>
                </div>

                {/* Logout Button Simulation */}
                <button
                    onClick={() => {
                        localStorage.removeItem('authToken');
                        window.location.reload();
                    }}
                    className="text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                >
                    Sair
                </button>
            </header>

            {/* Grid Layout: Desktop 2 Columns, Mobile 1 Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Esquerda: Dashboard (Stats) - Ocupa 7 colunas no desktop */}
                <div className="lg:col-span-7 space-y-6">
                    <GamificationCard data={BudgetData} />
                    <DashboardCards data={BudgetData} />
                    <BalanceChart data={BudgetData} />
                    <CategoryChart data={BudgetData} />
                </div>

                {/* Direita: Operacional (Form + Table) - Ocupa 5 colunas no desktop */}
                <div className="lg:col-span-5 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">Lançamentos</h2>

                    {/* Filtro de Mês/Ano */}
                    <div className="flex justify-between items-center mb-4">
                        <MonthFilter onFilterChange={(m, y) => setFilter({ month: m, year: y })} />
                    </div>

                    <BudgetForm
                        onAdd={handleAdd}
                        onUpdate={handleUpdate}
                        initialData={editingTransaction}
                        onCancelEdit={() => setEditingTransaction(null)}
                    />
                    <div className="mt-4">
                        <BudgetTable
                            data={BudgetData}
                            onRemove={handleRemove}
                            onEdit={handleEdit}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
