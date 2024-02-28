const express= require("express");
const app = express();
const client = require('../index');
const cors = require("cors");
app.use(cors())
app.use(express.json());
async function BuscarDevInfo(req,res) {
  
    const user = req.body.user;  
     
    client.query("SELECT * FROM DEV WHERE USUARIO  = ($1)",
    [user]).then((result) => {       
        res.send(result)
    })
    .catch((error) => {
            console.error('Erro na query:', error);
            res.status(500).send('Erro na execução da query');
    });          
}
async function InsertDevInfo(req,res) {
  
    const user = req.body.user;  
    const descricao = req.body.descricao;  
    const tempo = req.body.tempo;  
    const data_inicio = req.body.data_inicio;  
    const data_fim = req.body.data_fim;  
    const extra_feedback = req.body.extra_feedback;  
    const responsavel = req.body.responsavel;  
    const setor = req.body.setor;  
    const nome = req.body.nome;  
    const otimizacao = req.body.otimizacao;  
     
    client.query("INSERT INTO DEV (nome, descricao, tempo, data_inicio,data_fim,extra_feedback,responsavel,setor,otimizacao,usuario) values (($1), ($2),($3),($4),($5),($6),($7),($8),($9),($10))",
    [nome, descricao, tempo,data_inicio, data_fim, extra_feedback, responsavel, setor,otimizacao,user]).then((result) => {       
        res.send(result)
    })
    .catch((error) => {
            console.error('Erro na query:', error);
            res.status(500).send('Erro na execução da query');
    });          
}
async function editDev(req,res) {
  
    const id = req.body.id;  
    const descricao = req.body.descricao;  
    const tempo = req.body.tempo;  
    const data_inicio = req.body.data_inicio;  
    const data_fim = req.body.data_fim;  
    const extra_feedback = req.body.extra_feedback;  
    const responsavel = req.body.responsavel;  
    const setor = req.body.setor;  
    const nome = req.body.nome;  
    const otimizacao = req.body.otimizacao;  
    console.log(req.body)
    client.query("UPDATE  DEV set nome = ($1) , descricao = ($2 )  , tempo = ($3 )  , data_inicio = ($4 )  , data_fim = ($5 )  , extra_feedback = ($6)  , responsavel = ($7 )  , setor = ($8 ) , otimizacao = ($9 ) where id = ($10)",
    [nome, descricao, tempo,data_inicio, data_fim, extra_feedback, responsavel, setor,otimizacao,id]).then((result) => {       
        res.send(result)
    })
    .catch((error) => {
            console.error('Erro na query:', error);
            res.status(500).send('Erro na execução da query');
    });          
}
async function deleteDev(req,res) {
  
    const id = req.body.id;  
   
    client.query("Delete from dev where id = ($1)",
    [id]).then((result) => {       
        res.send(result)
    })
    .catch((error) => {
            console.error('Erro na query:', error);
            res.status(500).send('Erro na execução da query');
    });          
}
module.exports = { BuscarDevInfo,InsertDevInfo,editDev,deleteDev};