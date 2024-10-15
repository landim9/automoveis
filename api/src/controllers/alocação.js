const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAlocacao = async (req, res) => {
    try {
        const { Area, Automovel, IdConcessionaria, Quantidade } = req.body;

        if (!Area || !Automovel || !IdConcessionaria || !Quantidade) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
        }

        const alocacao = await prisma.alocacao.create({
            data: {
                Area,
                IdAutomovel: Number(Automovel),
                IdConcessionaria: Number(IdConcessionaria),
                Quantidade,
            },
        });

        res.status(201).json(alocacao);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
};

const readAlocacoes = async (req, res) => {
    try {
        const alocacoes = await prisma.alocacao.findMany({});
        res.status(200).json(alocacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar alocações!' });
    }
};

const readAlocacaoById = async (req, res) => {
    const { Area } = req.params;

    // Verifique se o ID é um número válido
    const areaId = Number(Area);
    if (isNaN(areaId)) {
        return res.status(400).json({ error: 'ID inválido!' });
    }

    try {
        const alocacao = await prisma.alocacao.findMany({
            where: { Area: areaId },
            select: {
                automoveis:true
            }
        });

        if (!alocacao) {
            return res.status(404).json({ error: 'Alocação não encontrada!' });
        }

        res.status(200).json(alocacao);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar alocação!' });
    }
};





const updateAlocacao = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAlocacao = await prisma.alocacao.update({
            where: { Id: Number(id) },
            data: req.body,
        });

        res.status(200).json(updatedAlocacao);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar alocação!' });
    }
};

const deleteAlocacao = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.alocacao.delete({
            where: { Id: Number(id) },
        });
        res.status(200).json({ message: 'Alocação deletada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar alocação!' });
    }
};

module.exports = {
    createAlocacao,
    readAlocacoes,
    updateAlocacao,
    deleteAlocacao,
    readAlocacaoById
};
