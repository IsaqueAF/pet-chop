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

const finalizarCompra = function ()
{
    const produtos = obterProdutos();
    if (produtos.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = 0;
    let itensHTML = '';

    produtos.forEach(element => {
        const produto = Produtos[Produtos.findIndex(item => item[0] === element[0])];
        const subtotal = produto[1] * Number(element[1]);
        total += subtotal;
        itensHTML += `<tr><td>${element[0]}</td><td>${element[1]}</td><td>R$ ${produto[1]},00</td><td>R$ ${subtotal},00</td></tr>`;
    });

    const boletoHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Boleto de Compra - Petrito</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .total { font-weight: bold; font-size: 1.2em; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <h1>Boleto de Compra - Petrito 🐾</h1>
            <p>Data: ${new Date().toLocaleDateString('pt-BR')}</p>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço Unitário</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itensHTML}
                </tbody>
                <tfoot>
                    <tr class="total">
                        <td colspan="3">Total</td>
                        <td>R$ ${total},00</td>
                    </tr>
                </tfoot>
            </table>
            <p>Obrigado pela compra! Este é um boleto fictício para fins de demonstração.</p>
            <button class="no-print" onclick="window.print()">Imprimir Boleto</button>
        </body>
        </html>
    `;

    const novaJanela = window.open('', '_blank');
    novaJanela.document.write(boletoHTML);
    novaJanela.document.close();

    // Limpar carrinho
    Produtos.forEach(element => {
        localStorage.removeItem(element[0]);
    });

    // Recarregar a página do carrinho
    location.reload();
}