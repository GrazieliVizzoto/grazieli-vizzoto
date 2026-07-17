import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

// Configuração da conexão
// São as mesmas informações que você usa no pgAdmin!
const client = new Client({
    host:     'localhost',  // onde o banco está rodando
    port:     5432,         // porta padrão do PostgreSQL
    user:     'postgres',   // usuário do banco
    password: 'root',       // a mesma senha que você usa no pgAdmin
    database: 'controle_almoxarifado' // o banco que criamos agora pouco
});

async function listarProdutos() {
    try {
        await client.connect();

        const resultado = await client.query('SELECT * FROM produtos');

        console.table(resultado.rows);

    } catch (erro) {
        console.log('❌ Erro ao listar produtos:', erro.message);

    } finally {
        await client.end();
    }
}

listarProdutos();

async function cadastrarProduto(valorUnitario, categoria, quantidade) {
    try {
        // Validações
        if (valorUnitario <= 0) {
            console.log("❌ O valor unitário deve ser maior que zero.");
            return;
        }

        if (quantidade < 0) {
            console.log("❌ A quantidade não pode ser negativa.");
            return;
        }

        if (!categoria || categoria.trim() === "") {
            console.log("❌ A categoria é obrigatória.");
            return;
        }

        await client.connect();

        await client.query(
            `INSERT INTO estoque (valor_unitario, categoria, quantidade)
             VALUES ($1, $2, $3)`,
            [valorUnitario, categoria, quantidade]
        );

        console.log("✅ Produto cadastrado com sucesso!");

    } catch (erro) {
        console.log("❌ Erro ao cadastrar produto:", erro.message);

    } finally {
        await client.end();
    }
}

// Exemplo de uso
cadastrarProduto(15.90, "Alimentos", 20);