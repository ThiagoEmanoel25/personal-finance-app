import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faWallet } from '@fortawesome/free-solid-svg-icons';

export default function DashboardCards({ data }) {
    const metrics = useMemo(() => {
        if (!data || data.length === 0) return { entradas: 0, saidas: 0, saldo: 0 };

        const entradas = data
            .filter(item => item.type === 'Entrada')
            .reduce((acc, item) => acc + Number(item.value), 0);

        const saidas = data
            .filter(item => item.type === 'Saída')
            .reduce((acc, item) => acc + Number(item.value), 0);

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
                    <FontAwesomeIcon icon={icon} className="w-6 h-6" />
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
                icon={faArrowUp}
            />

            {/* Saídas */}
            <Card
                title="Saídas"
                value={`R$ ${metrics.saidas.toFixed(2)}`}
                color="rose"
                icon={faArrowDown}
            />

            {/* Saldo */}
            <Card
                title="Saldo Atual"
                value={`R$ ${metrics.saldo.toFixed(2)}`}
                subtext={metrics.saldo >= 0 ? "No Azul" : "No Vermelho!"}
                color={metrics.saldo >= 0 ? "blue" : "orange"}
                icon={faWallet}
            />
        </div>
    );
}
