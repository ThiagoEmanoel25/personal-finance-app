// VIEW — tabela que exibe as despesas e permite remover linhas

export default function BudgetTable({ data, onRemove }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Categoria</th>
          <th className="border px-4 py-2">Quantidade (R$)</th>
          <th className="border px-4 py-2 w-20">Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <td className="border px-4 py-2">{item.categoria}</td>
            <td className="border px-4 py-2 text-right">
              {item.quantidade.toFixed(2)}
            </td>
            <td className="border px-4 py-2 text-center">
              <button
                onClick={() => onRemove(i)}
                className="text-red-600 hover:text-red-800"
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
