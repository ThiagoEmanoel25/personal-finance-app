import { useState } from "react";

export default function BudgetForm({ onAdd }) {
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoria || !quantidade) return;
    onAdd(categoria, parseFloat(quantidade));
    setCategoria("");
    setQuantidade("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="border rounded-lg px-3 py-2 w-1/2"
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        className="border rounded-lg px-3 py-2 w-1/4"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
      >
        Adicionar
      </button>
    </form>
  );
}
