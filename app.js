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

        const resultado = await client.query(
            'SELECT * FROM produtos'
        );

        console.log(resultado.rows);

    } catch (erro) {

        console.log('❌ Erro ao listar itens:', erro.message);

    } finally {

        await client.end();

    }
}

listarProdutos();