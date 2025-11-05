import { useEffect, useState } from "react";
import { loadBudgetdata, handleAddRow} from "./controllers/budgetController";
import { Budgetform, BudgetStatsDashboard, BudgetTable } from "./Views";


export default function App() {
    const [budgetData, setBudgetData] = useState([]);

    // Carrega dados quando o app inicia
    useEffect(() => {
        loadBudgetdata(setBudgetData);
}, []);

    const handleAdd = (categoria, valor) => {
        handleAddRow(categoria, valor, setBudgetData);
    };

return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Gerenciador de Orçamento
        </h1>
        <div className="w-full max-w-3x1 bg white p-6 rounded-lg shadow">
            <Budgetform onAdd={handleAdd} />
            <BudgetTable onAdd={budgetData}/>
            <BudgetStatsDashboard data={budgetData}/>
        </div>
        </div>
);
}

