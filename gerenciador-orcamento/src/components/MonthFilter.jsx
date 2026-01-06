import { useState, useEffect } from 'react';

export default function MonthFilter({ onFilterChange }) {
    const currentDate = new Date();
    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [year, setYear] = useState(currentDate.getFullYear());

    useEffect(() => {
        onFilterChange(month, year);
    }, [month, year]);

    const months = [
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 3, label: 'Março' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Maio' },
        { value: 6, label: 'Junho' },
        { value: 7, label: 'Julho' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Setembro' },
        { value: 10, label: 'Outubro' },
        { value: 11, label: 'Novembro' },
        { value: 12, label: 'Dezembro' }
    ];

    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);

    return (
        <div className="flex gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-fit animate__animated animate__fadeIn">
            <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Mês:</label>
                <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="border rounded-lg px-3 py-1.5 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                >
                    {months.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Ano:</label>
                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="border rounded-lg px-3 py-1.5 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                >
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
