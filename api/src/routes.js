const express = require('express');

const router = express.Router();

const Alocação = require('./controllers/alocação');
const Automoveis = require('./controllers/automoveis');
const Clientes = require('./controllers/clientes');
const Concessionarias = require('./controllers/concessionarias');

router.get('/', (req, res) => {
    res.send('Hello World').end();
});

router.post('/alocacao', Alocação.createAlocacao);
router.get('/alocacao', Alocação.readAlocacoes);
router.get('/alocacao/:Area', Alocação.readAlocacaoById);
router.put('/alocacao/:id', Alocação.updateAlocacao)
router.delete('/alocacao/:id', Alocação.deleteAlocacao)

router.get('/automoveis', Automoveis.readAutomoveis);
router.post('/automoveis', Automoveis.createAutomovel);
router.put('/automoveis/:id',  Automoveis.updateAutomovel);
router.delete('/automoveis/:id',  Automoveis.deleteAutomovel);

router.get('/clientes', Clientes.readClientes);
router.post('/clientes', Clientes.createCliente);
router.put('/clientes/:id',  Clientes.updateCliente);
router.delete('/clientes/:id',  Clientes.deleteCliente);

router.get('/concessionaria', Concessionarias.readConcessionarias);
router.post('/concessionaria', Concessionarias.createConcessionaria);
router.put('/concessionaria/:id',  Concessionarias.updateConcessionaria);
router.delete('/concessionaria/:id',  Concessionarias.deleteConcessionaria);

module.exports = router 