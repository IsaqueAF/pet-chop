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

const atualizarTotal = function ()
{
    const produtos = obterProdutos();
    let total = 0;

    produtos.forEach(element => {
        const produto = Produtos[Produtos.findIndex(item => item[0] === element[0])];
        total += produto[1] * Number(element[1]);
    });

    document.querySelector('.resumo h2').textContent = `Total: R$ ${total.toFixed(2)}`;
}

const atualizarQuantidade = function (produto)
{
    const quantidade = Number(localStorage.getItem(produto));
    document.querySelector(`.quantidade_${Produtos.findIndex(item => item[0] === produto)}`).textContent = quantidade;
}

const adicionarProduto = function (produto)
{
    localStorage.setItem(produto, Number(localStorage.getItem(produto)) + 1);
    atualizarQuantidade(produto);
    atualizarTotal();
}

const retirarProduto = function (produto)
{
    if (Number(localStorage.getItem(produto)) > 1)
    {
        localStorage.setItem(produto, Number(localStorage.getItem(produto)) - 1);
        atualizarQuantidade(produto);
        atualizarTotal();
    }
}

const removerProduto = function (produto)
{
    localStorage.removeItem(produto);
    document.querySelector(`.item_carrinho_${Produtos.findIndex(item => item[0] === produto)}`).remove();
    atualizarTotal();
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