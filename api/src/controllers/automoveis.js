const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAutomovel = async (req, res) => {
    try {
        const { Modelo, Preco } = req.body;

        if (!Modelo || !Preco) {
            return res.status(400).json({ error: 'Modelo e Preço são obrigatórios!' });
        }

        const automovel = await prisma.automoveis.create({
            data: {
                Modelo,
                Preco,
            },
        });

        res.status(201).json(automovel);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
};

const readAutomoveis = async (req, res) => {
    try {
        const automoveis = await prisma.automoveis.findMany({});
        res.status(200).json(automoveis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar automóveis!' });
    }
};

const updateAutomovel = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAutomovel = await prisma.automoveis.update({
            where: { Id: Number(id) },
            data: req.body,
        });

        res.status(200).json(updatedAutomovel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar automóvel!' });
    }
};

const deleteAutomovel = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.automoveis.delete({
            where: { Id: Number(id) },
        });
        res.status(200).json({ message: 'Automóvel deletado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar automóvel!' });
    }
};

module.exports = {
    createAutomovel,
    readAutomoveis,
    updateAutomovel,
    deleteAutomovel,
};
