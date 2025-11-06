// VIEW — Tabela que exibe as despesas e permite remover linhas
export default function BudgetTable({ data, onRemove }) {
  // Se não houver dados, mostra uma mensagem amigável
  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        Nenhum item adicionado ainda.
      </p>
    );
  }

  return (
    <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="border px-4 py-2 text-left">Categoria</th>
          <th className="border px-4 py-2 text-left">Quantidade (R$)</th>
          <th className="border px-4 py-2 w-20 text-center">Ações</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className="hover:bg-gray-100 transition-colors duration-150"
          >
            <td className="border px-4 py-2">{item.categoria}</td>

            <td className="border px-4 py-2 text-right font-medium text-gray-700">
              {item.quantidade.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>

            <td className="border px-4 py-2 text-center">
              <button
                onClick={() => onRemove(index)}
                className="text-red-600 hover:text-red-800 transition"
                title="Remover linha"
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
