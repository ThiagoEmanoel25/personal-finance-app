// BudgetController.js - Agora usando a API Real do Backend MongoDB

const API_URL = "http://localhost:3001/api/orcamento";

// Helper para pegar o token
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken"); // Busca o token salvo no Login
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Anexa o "Crachá"
    };
};

/**
 * Carrega transações do backend
 */
export const loadBudgetData = async (setBudgetData) => {
    try {
        const response = await fetch(API_URL, {
            headers: getAuthHeaders()
        });

        if (response.status === 401 || response.status === 403) {
            // Token expirou ou inválido -> Logout forçado
            localStorage.removeItem("authToken");
            window.location.href = "/login";
            return;
        }

        const data = await response.json();
        setBudgetData(data); // O backend já manda ordenado
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
};

/**
 * Adiciona nova transação
 */
export const handleAddRow = async (setBudgetData, categoria, valor, tipo) => {
    if (!categoria || !valor) {
        alert("Preencha categoria e valor!");
        return;
    }

    const newItem = {
        category: categoria,
        value: parseFloat(valor),
        type: tipo, // "Entrada" ou "Saída"
        date: new Date() // Backend usa isso ou cria lá
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(newItem)
        });

        const savedItem = await response.json();

        // Atualiza estado local (Adiciona no topo)
        setBudgetData((prevData) => [savedItem, ...prevData]);
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
};

/**
 * Remove transação pelo ID
 */
export const removeBudgetRow = async (setBudgetData, id) => {
    // Nota: Agora removemos pelo _id do Mongo, não por index do array
    // O frontend precisa passar o objeto completo ou o ID

    // Como o BudgetTable provavelmente passa o index, precisamos adaptar.
    // Mas o ideal é que o BudgetTable passe o ID.
    // VOU ASSUMIR QUE O BUDGETTABLE VAI PASSAR O ID AGORA.

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });

        // Remove da lista visual
        setBudgetData((prevData) => prevData.filter((item) => item._id !== id));

    } catch (error) {
        console.error("Erro ao deletar:", error);
    }
};
