// Exibe estatísticas simples do orçamento
export default function BudgetStatsDashboard({ data }) {
  if (!data || data.length === 0) return null;

  const total = data.reduce((acc, item) => acc + item.quantidade, 0);
  const media = total / data.length;

  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-blue-800 mb-2">Resumo</h2>
      <p>
        Total gasto:{" "}
        <span className="font-bold text-blue-700">R$ {total.toFixed(2)}</span>
      </p>
      <p>
        Média por categoria:{" "}
        <span className="font-bold text-blue-700">R$ {media.toFixed(2)}</span>
      </p>
    </div>
  );
}
