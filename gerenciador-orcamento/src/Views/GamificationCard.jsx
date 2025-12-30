import { useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faShieldAlt, faRocket, faGem } from '@fortawesome/free-solid-svg-icons';

export default function GamificationCard({ data }) {
    // 1. Lógica do Nível (XP = Saldo Atual)
    const { saldo, entradas } = useMemo(() => {
        const ent = data
            .filter((item) => item.type === "Entrada")
            .reduce((acc, curr) => acc + Number(curr.value), 0);
        const sai = data
            .filter((item) => item.type === "Saída")
            .reduce((acc, curr) => acc + Number(curr.value), 0);
        return { saldo: ent - sai, entradas: ent };
    }, [data]);

    // Nível: Cada R$ 500 = 1 Nível. (Ex: R$ 1500 = Nível 3)
    const currentLevel = Math.max(1, Math.floor(saldo / 500) + 1);
    const nextLevelXp = currentLevel * 500;
    const currentXp = Math.max(0, saldo); // XP não pode ser negativo visualmente
    const progressPercent = Math.min(100, Math.max(0, ((currentXp % 500) / 500) * 100));

    // 2. Lógica do "Mão de Vaca" (Dias sem gastar)
    const daysWithoutSpending = useMemo(() => {
        const expenses = data
            .filter((item) => item.type === "Saída")
            .map((item) => new Date(item.date).getTime()) // Assumindo formato YYYY-MM-DD ou ISO
            .sort((a, b) => b - a); // Mais recente primeiro

        if (expenses.length === 0) return 30; // Se nunca gastou, é um monge!

        const lastExpenseDate = new Date(expenses[0]);
        const today = new Date();

        // Diferença em dias
        const diffTime = Math.abs(today - lastExpenseDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }, [data]);

    // Badge Logic
    const hasBadgeSaver = daysWithoutSpending >= 3; // 3 dias sem gastar
    const hasBadgeInvestor = saldo > (entradas * 0.2) && entradas > 0; // Guardou 20% do ganho
    const hasBadgeRich = saldo > 5000; // Saldo acima de 5k

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 animate__animated animate__fadeIn">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faGamepad} className="text-purple-500" />
                    Nível {currentLevel}: {getTitle(currentLevel)}
                </h3>
                <span className="text-sm font-medium text-gray-500">{currentXp} / {nextLevelXp} XP</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-6">
                <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>

            {/* Badges Area */}
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sua Coleção</h4>
            <div className="grid grid-cols-3 gap-2">

                {/* Badge 1: Mão de Vaca */}
                <Badge
                    active={hasBadgeSaver}
                    icon={faShieldAlt}
                    title="Mão de Vaca"
                    desc="3+ dias sem gastar"
                />

                {/* Badge 2: Investidor */}
                <Badge
                    active={hasBadgeInvestor}
                    icon={faRocket}
                    title="Investidor"
                    desc="Guardou +20%"
                />

                {/* Badge 3: Magnata */}
                <Badge
                    active={hasBadgeRich}
                    icon={faGem}
                    title="Magnata"
                    desc="Caixa > R$ 5k"
                />

            </div>

            {/* Streak Info */}
            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700 text-center">
                <p className="text-sm text-gray-500">
                    Sequência Atual: <span className="font-bold text-green-600">{daysWithoutSpending} dias</span> sem despesas!
                </p>
            </div>

        </div>
    );
}

// Sub-componente simples para Badge
function Badge({ active, icon, title, desc }) {
    return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${active
            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 opacity-100"
            : "bg-gray-50 dark:bg-gray-700/50 border-gray-100 dark:border-gray-600 opacity-40 grayscale"
            }`}>
            <div className="mb-1 text-blue-500">
                <FontAwesomeIcon icon={icon} size="lg" />
            </div>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{title}</span>
            <span className="text-[10px] text-gray-400 leading-tight">{desc}</span>
        </div>
    )
}

// Títulos divertidos por nível
function getTitle(level) {
    if (level <= 1) return "Estagiário";
    if (level <= 3) return "Junior";
    if (level <= 5) return "Pleno";
    if (level <= 10) return "Sênior";
    return "Warren Buffett";
}
