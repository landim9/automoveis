const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCliente = async (req, res) => {
    try {
        const { Nome } = req.body;

        if (!Nome) {
            return res.status(400).json({ error: 'Nome é obrigatório!' });
        }

        const cliente = await prisma.clientes.create({
            data: {
                Nome,
            },
        });

        res.status(201).json(cliente);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
};

const readClientes = async (req, res) => {
    try {
        const clientes = await prisma.clientes.findMany({});
        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar clientes!' });
    }
};

const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCliente = await prisma.clientes.update({
            where: { Id: Number(id) },
            data: req.body,
        });

        res.status(200).json(updatedCliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar cliente!' });
    }
};

const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.clientes.delete({
            where: { Id: Number(id) },
        });
        res.status(200).json({ message: 'Cliente deletado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar cliente!' });
    }
};

module.exports = {
    createCliente,
    readClientes,
    updateCliente,
    deleteCliente,
};
