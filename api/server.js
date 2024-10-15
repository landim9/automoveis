require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');

const router = require('./src/routes.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);


const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});