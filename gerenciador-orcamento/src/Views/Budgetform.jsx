// Formulário de entrada de dados do orçamento
import { useState } from "react";

export default function BudgetForm({ onAdd }) {
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoria || !valor) {
      alert("Preencha todos os campos!");
      return;
    }

    onAdd(categoria, parseFloat(valor)); // envia os dados para o controller
    setCategoria("");
    setValor("");
  };

  return (  //
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col sm:flex-row gap-3"
    >
      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="border border-gray-300 rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Valor (R$)"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="border border-gray-300 rounded p-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Adicionar
      </button>
    </form>
  );
}
