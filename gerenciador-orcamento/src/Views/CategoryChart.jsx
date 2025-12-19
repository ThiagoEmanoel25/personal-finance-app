import { useMemo } from 'react';
import { JSCharting } from 'jscharting-react';

export default function CategoryChart({ data }) {
    const chartConfig = useMemo(() => {
        if (!data || data.length === 0) return null;

        // Filtra apenas saídas e agrupa por categoria
        const grouped = data.reduce((acc, item) => {
            if (item.tipo === 'Entrada') return acc; // Ignora entradas
            const cat = item.categoria || "Outros";
            acc[cat] = (acc[cat] || 0) + item.quantidade;
            return acc;
        }, {});

        const points = Object.entries(grouped).map(([name, y]) => ({ name, y }));

        if (points.length === 0) return null;

        return {
            type: 'pie donut', // Pizza com furo (Donut) fica mais moderno
            legend_visible: true,
            legend_position: 'bottom',
            title_label_text: 'Gastos por Categoria',
            title_label_style_fontWeight: 'bold',
            title_label_color: '#374151',
            defaultSeries: {
                shape_padding: 0.2, // Espaçamento entre as fatias
                palette: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'] // Cores personalizadas
            },
            series: [{
                name: 'Gastos',
                points: points
            }]
        };
    }, [data]);

    if (!chartConfig) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100 animate__animated animate__fadeInLeft animate__delay-1s">
            {/* Container responsivo para o gráfico */}
            <div className="h-80 w-full">
                <JSCharting options={chartConfig} />
            </div>
        </div>
    );
}
