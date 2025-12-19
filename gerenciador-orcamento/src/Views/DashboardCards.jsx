import { useMemo } from 'react';

export default function DashboardCards({ data }) {
    const metrics = useMemo(() => {
        if (!data || data.length === 0) return { entradas: 0, saidas: 0, saldo: 0 };

        const entradas = data
            .filter(item => item.tipo === 'Entrada')
            .reduce((acc, item) => acc + item.quantidade, 0);

        const saidas = data
            .filter(item => !item.tipo || item.tipo === 'Saída') // Retrocompatibilidade: sem tipo = saída
            .reduce((acc, item) => acc + item.quantidade, 0);

        return { entradas, saidas, saldo: entradas - saidas };
    }, [data]);

    const Card = ({ title, value, subtext, color, icon }) => (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all animate__animated animate__fadeInDown`}>
            <div className={`absolute right-0 top-0 w-24 h-24 bg-${color}-50 rounded-full -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform`}></div>
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
                    <h3 className={`text-2xl font-bold text-${color}-600`}>{value}</h3>
                    {subtext && <p className="text-xs text-gray-400 mt-1 font-medium">{subtext}</p>}
                </div>
                <div className={`p-3 bg-${color}-100 rounded-lg text-${color}-600`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Entradas */}
            <Card
                title="Entradas"
                value={`R$ ${metrics.entradas.toFixed(2)}`}
                color="emerald"
                icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg>
                }
            />

            {/* Saídas */}
            <Card
                title="Saídas"
                value={`R$ ${metrics.saidas.toFixed(2)}`}
                color="rose"
                icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                }
            />

            {/* Saldo */}
            <Card
                title="Saldo Atual"
                value={`R$ ${metrics.saldo.toFixed(2)}`}
                subtext={metrics.saldo >= 0 ? "No Azul" : "No Vermelho!"}
                color={metrics.saldo >= 0 ? "blue" : "orange"}
                icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                }
            />
        </div>
    );
}
