const Produtos = [
    ["Ração Premium", 120],
    ["Ração Premium Cães", 120],
    ["Coleira Ajustável", 45],
    ["Brinquedo Mordedor", 35],
    ["Ração Premium Gatos", 98],
    ["Arranhador Torre", 150],
    ["Areia Higiênica", 45],
    ["Ração Especial para Aves", 28],
    ["Gaiola Grande", 220],
    ["Bebedouro Automático", 18],
    ["Ração Tropical", 30],
    ["Aquário 50L", 350],
    ["Filtro Externo", 120],
    ["Banho Completo", 60],
    ["Tosa Higiênica", 75],
    ["Consulta Veterinária", 120]
];
        
const adicionarCarrinho = function (produto)
{
    localStorage.setItem(produto, Number(localStorage.getItem(produto)) + 1);
}

const obterProdutos = function ()
{
    const produtos = []

    Produtos.forEach(element => {
        quantidade = localStorage.getItem(element[0]);
        if (quantidade)
        {
            produtos[produtos.length] = [element[0], quantidade];
        }
    });

    return produtos;
}