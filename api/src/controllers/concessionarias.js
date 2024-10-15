const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createConcessionaria = async (req, res) => {
    try {
        const { Concessionaria } = req.body;

        if (!Concessionaria) {
            return res.status(400).json({ error: 'Nome da concessionária é obrigatório!' });
        }

        const concessionaria = await prisma.concessionaria.create({
            data: {
                Concessionaria,
            },
        });

        res.status(201).json(concessionaria);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
};

const readConcessionarias = async (req, res) => {
    try {
        const concessionarias = await prisma.concessionaria.findMany({});
        res.status(200).json(concessionarias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar concessionárias!' });
    }
};

const updateConcessionaria = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedConcessionaria = await prisma.concessionaria.update({
            where: { Id: Number(id) },
            data: req.body,
        });

        res.status(200).json(updatedConcessionaria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar concessionária!' });
    }
};

const deleteConcessionaria = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.concessionaria.delete({
            where: { Id: Number(id) },
        });
        res.status(200).json({ message: 'Concessionária deletada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar concessionária!' });
    }
};

module.exports = {
    createConcessionaria,
    readConcessionarias,
    updateConcessionaria,
    deleteConcessionaria,
};
