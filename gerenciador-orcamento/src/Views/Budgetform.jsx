import { useState } from "react";

export default function BudgetForm({ onAdd }) {
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipo, setTipo] = useState("Saída"); // Default: Saída

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoria || !quantidade) return;
    onAdd(categoria, parseFloat(quantidade), tipo);
    setCategoria("");
    setQuantidade("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6 animate__animated animate__fadeIn">
      {/* Toggle Entrada/Saída */}
      <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg w-full md:w-fit self-start">
        <button
          type="button"
          onClick={() => setTipo("Entrada")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${tipo === "Entrada" ? "bg-green-100 text-green-700 shadow-sm dark:bg-green-900/50 dark:text-green-300" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg>
          Entrada
        </button>
        <button
          type="button"
          onClick={() => setTipo("Saída")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${tipo === "Saída" ? "bg-red-100 text-red-700 shadow-sm dark:bg-red-900/50 dark:text-red-300" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
          Saída
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Categoria (Ex: Aluguel)"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-1/2 focus:ring-2 focus:ring-blue-100 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-900"
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-100 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-900"
        />
        <button
          type="submit"
          className={`text-white rounded-lg px-6 py-2 transition-colors ${tipo === "Entrada"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
            }`}
        >
          {tipo === "Entrada" ? "Receber" : "Pagar"}
        </button>
      </div>
    </form>
  );
}
