export default function BudgetStatsDashboard({ data }) {
  const total = data.reduce((acc, curr) => acc + curr.quantidade, 0);
  return (
    <div className="p-4 bg-white rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-2">Resumo</h2>
      <p>Total de despesas: R$ {total.toFixed(2)}</p>
    </div>
  );
}
