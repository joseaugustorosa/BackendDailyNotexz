const express= require("express");
const app = express();
const client = require('../index');
const cors = require("cors");
app.use(cors())
app.use(express.json());
async function ReadBacklog(req,res) {
    const nome = req.body.nomeuser;
    const quadro = req.body.quadro;
    client.query("SELECT * FROM TAREFAS WHERE usuario= ($1) and status ='backlog' and quadro = ($2)",
    [nome,quadro]).then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
}
async function ReadDeveloping(req,res) {
    const nome = req.body.nomeuser;
    const quadro = req.body.quadro;
    client.query("SELECT * FROM TAREFAS WHERE usuario= ($1) and status = 'developing' and quadro = ($2)",
    [nome,quadro]).then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
}
async function ReadFinished(req,res) {
    const nome = req.body.nomeuser;
    const quadro = req.body.quadro;
    client.query("SELECT * FROM TAREFAS WHERE usuario= ($1) and status =  'finished'  and quadro = ($2)",
    [nome,quadro]).then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
}
module.exports = { ReadBacklog, ReadDeveloping, ReadFinished };