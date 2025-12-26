
export default function BudgetTable({ data = [], onRemove }) {
  if (!data.length) {
    return <p className="text-gray-500 text-center">Nenhum dado disponível.</p>;
  }

  return (
    <div className="w-full overflow-x-auto animate__animated animate__fadeInUp">
      <table className="w-full border-collapse border border-gray-100 rounded-lg min-w-[600px]">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
            <th className="px-4 py-3 text-left font-semibold">Data</th>
            <th className="px-4 py-3 text-left font-semibold">Categoria</th>
            <th className="px-4 py-3 text-left font-semibold">Valor</th>
            <th className="px-4 py-3 w-16 text-center"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {data.map((item, index) => (
            <tr
              key={item._id || index}
              className="hover:bg-blue-50 transition-colors duration-150 group"
            >
              <td className="px-4 py-3 text-gray-600 text-sm">{
                new Date(item.date).toLocaleDateString('pt-BR') || "-"
              }</td>

              <td className="px-4 py-3 font-medium text-gray-800">{item.category}</td>

              <td className={`px-4 py-3 font-mono font-medium ${item.type === 'Entrada' ? 'text-green-600' : 'text-gray-700'
                }`}>
                {item.type === 'Entrada' ? '+' : '-'} {Number(item.value).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>

              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onRemove(item._id)}
                  className="text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                  title="Remover linha"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
