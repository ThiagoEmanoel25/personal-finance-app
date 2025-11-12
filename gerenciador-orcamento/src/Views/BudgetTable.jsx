export default function BudgetTable({ data = [] }) {
  if (!data.length) {
    return <p className="text-gray-500 text-center">Nenhum dado disponível.</p>;
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Categoria</th>
          <th className="border px-4 py-2">Quantidade (R$)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <td className="border px-4 py-2">{item.categoria}</td>
            <td className="border px-4 py-2 text-right">
              {item.quantidade.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
