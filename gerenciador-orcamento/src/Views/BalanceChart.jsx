import { useMemo } from 'react';

export default function BalanceChart({ data }) {
    const { entradas, saidas, total } = useMemo(() => {
        if (!data || data.length === 0) return { entradas: 0, saidas: 0, total: 1 };

        const ent = data
            .filter(item => item.tipo === 'Entrada')
            .reduce((acc, item) => acc + item.quantidade, 0);

        const sai = data
            .filter(item => !item.tipo || item.tipo === 'Saída')
            .reduce((acc, item) => acc + item.quantidade, 0);

        // Define o total como o maior valor para usar de escala (100%)
        const maxVal = Math.max(ent, sai) || 1;

        return { entradas: ent, saidas: sai, total: maxVal };
    }, [data]);

    if (!data || data.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100 animate__animated animate__fadeInLeft">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Balanço Mensal</h3>

            <div className="space-y-6">
                {/* Barra de Entradas */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-gray-600 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Entradas
                        </span>
                        <span className="font-bold text-green-600">R$ {entradas.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-green-500 h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                            style={{ width: `${(entradas / total) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Barra de Saídas */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-gray-600 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Saídas
                        </span>
                        <span className="font-bold text-red-600">R$ {saidas.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-red-500 h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                            style={{ width: `${(saidas / total) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Barra de Saldo (Indicador visual) */}
                <div className="pt-4 border-t border-gray-50 mt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Taxa de Cobertura (Ganhos vs Gastos)</span>
                        <span className={`text-sm font-bold ${entradas >= saidas ? 'text-blue-600' : 'text-orange-500'}`}>
                            {saidas > 0 ? ((entradas / saidas) * 100).toFixed(0) : 100}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
