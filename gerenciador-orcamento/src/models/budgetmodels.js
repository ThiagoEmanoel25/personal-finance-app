// model lida com a integração com API e Dados

export async function getbudgetData(params) {

    return [
        { Categoria: "Alimentação", Valor : 500},
        { Categoria: "Transporte", Valor : 300},
        { Categoria: "Academia", Valor : 200},
    ];

}


export async function addbudgetRow(Categoria, Valor) {

     // Aqui futuramente vamos enviar para o Sheet2API
    return { Categoria, Valor };


}
