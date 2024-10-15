const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const concessionarias = require("./concessionarias.json");
const automoveis = require("./automoveis.json");
const clientes = require("./clientes.json");
const alocacoes = require("./alocacao.json");

async function main() {
    // Criar concessionárias
    const createdConcessionarias = {};
    for (const concessionaria of concessionarias) {
        const createdConcessionaria = await prisma.concessionaria.create({
            data: {
                Concessionaria: concessionaria.Concessionaria,
            }
        });
        createdConcessionarias[createdConcessionaria.Id] = createdConcessionaria; // Armazenar a concessionária criada
        console.log(`Concessionária criada: ${createdConcessionaria.Concessionaria}`);
    }

    // Criar automóveis
    const createdAutomoveis = {};
    for (const automovel of automoveis) {
        const createdAutomovel = await prisma.automoveis.create({
            data: {
                Modelo: automovel.Modelo,
                Preco: automovel.Preco,
            }
        });
        createdAutomoveis[createdAutomovel.Id] = createdAutomovel; // Armazenar o automóvel criado
        console.log(`Automóvel criado: ${createdAutomovel.Modelo}`);
    }

    // Criar clientes
    const createdClientes = {};
    for (const cliente of clientes) {
        const createdCliente = await prisma.clientes.create({
            data: {
                Nome: cliente.Nome,
            }
        });
        createdClientes[createdCliente.Id] = createdCliente; // Armazenar o cliente criado
        console.log(`Cliente criado: ${createdCliente.Nome}`);
    }

    // Criar alocações
    for (const alocacao of alocacoes) {
        const createdAlocacao = await prisma.alocacao.create({
            data: {
                Area: alocacao.Area,
                Automovel: alocacao.Automovel,
                IdConcessionaria: alocacao.IdConcessionaria, // Relacionar com o id da concessionária
                Quantidade: alocacao.Quantidade,
            }
        });
        console.log(`Alocação criada: ${createdAlocacao.Area} - ${createdAlocacao.Automovel}`);
    }

}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
