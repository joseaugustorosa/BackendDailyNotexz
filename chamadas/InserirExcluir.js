const express= require("express");
const app = express();
const client = require('../index');
const cors = require("cors");
app.use(cors())
app.use(express.json());
async function DeleteTask(req,res) {
    const id = req.body.id;
    const user = req.body.user;  
     
    client.query("DELETE FROM TAREFAS WHERE id = ($1) and usuario = ($2)",
    [id,user]).then((result) => {       
        res.send(result)
    })
    .catch((error) => {
            console.error('Erro na query:', error);
            res.status(500).send('Erro na execução da query');
    });          
}
async function InsertTask(req,res) {
    const titulo = req.body.titul;
    const descricao = req.body.descricao;
    const data = req.body.data;
    const hora = req.body.hora;
    const user = req.body.user;
    const id = req.body.id;  
    const quadro = req.body.quadro      
    client.query("insert into tarefas(titulo, descricao, data, hora, usuario,status,id, quadro)  values (($1),($2),($3),($4),($5), 'backlog', ($6), ($7))",
    [titulo,descricao,data,hora,user,id, quadro]).then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
    });
              
}  
module.exports = { DeleteTask,InsertTask };