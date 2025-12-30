import { useState, useEffect } from "react";
import GamificationCard from "./GamificationCard";

export default function Badges() {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) return;

            const response = await fetch("http://localhost:3001/api/orcamento", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            }
        } catch (error) {
            console.error("Erro ao carregar dados para conquistas:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate__animated animate__fadeIn">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Suas Conquistas</h1>
                <p className="text-gray-500 dark:text-gray-400">Acompanhe seu progresso e desbloqueie medalhas</p>
            </header>

            {/* Reusing the logic from GamificationCard but presenting in a larger context if needed.
          For now, just mounting the card itself is enough as it encapsulates all logic. */}

            {loading ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">Carregando conquistas...</div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <GamificationCard data={transactions} />

                    {/* Future expansion: Add a "Locked Badges" section here */}
                </div>
            )}
        </div>
    );
}
