const express= require("express");
const app = express();
const client = require('../index');
const cors = require("cors");
app.use(cors())
app.use(express.json());

async function BacklogToDev(req, res) {
    const titulo = req.body.titulo;
    const user = req.body.user;
    const id = req.body.id;
    client.query("update tarefas set status ='developing' where titulo =($1) and usuario = ($2) and id = ($3)",
    [titulo,user,id]).then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
    client.query("commit").then((result) => {
   
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
        
}
async function DevToFin(req, res) {
    const titulo = req.body.titulo;
    const user = req.body.user;
    const id = req.body.id;
    client.query("update tarefas set status ='finished' where titulo =($1) and usuario = ($2) and id = ($3)",
    [titulo,user,id]).then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
    client.query("commit").then((result) => {
   
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
        
}
async function FinToDev(req, res) {
    const titulo = req.body.titulo;
    const user = req.body.user;
    const id = req.body.id;
    client.query("update tarefas set status ='developing' where titulo =($1) and usuario = ($2) and id = ($3)",
    [titulo,user,id]).then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
    client.query("commit").then((result) => {
   
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
        
}
async function DevToBack(req, res) {
    const titulo = req.body.titulo;
    const user = req.body.user;
    const id = req.body.id;
    client.query("update tarefas set status ='backlog' where titulo =($1) and usuario = ($2) and id = ($3)",
    [titulo,user,id]).then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
    client.query("commit").then((result) => {
   
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
        
}

module.exports = { BacklogToDev,DevToFin,FinToDev,DevToBack };
