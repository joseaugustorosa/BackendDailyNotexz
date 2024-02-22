const express= require("express");
const app = express();
const { Client } = require('pg');
const cors = require("cors");
const client = new Client({
  connectionString: 'postgres://ayjbqzbw:DPEBY_x71hlMmImLBNGq4AwY8rUjTQPo@tuffi.db.elephantsql.com/ayjbqzbw',
});
app.use(cors())
app.use(express.json());
client.connect()
  .then(() => {
    console.log('Conexão estabelecida com o PostgreSQL!');
})
  .catch((err) => {
    console.error('Erro ao conectar ao PostgreSQL:', err);
});
module.exports = client;
const { Login } = require('./chamadas/login.js');
const { ReadBacklog, ReadDeveloping, ReadFinished  } = require('./chamadas/buscarTarefas.js');
const { DeleteTask,InsertTask  } = require('./chamadas/InserirExcluir.js');
const { BacklogToDev,DevToFin,FinToDev,DevToBack } = require('./chamadas/mudarStatus.js');
const { buscarQuadros ,CriarQuadros } = require('./chamadas/quadros.js');
const { BuscarDevInfo, InsertDevInfo} = require('./chamadas/grid_dev.js');
//========= Configuração endPoints ============//
app.post("/login",Login);   
app.post("/popularTabelaBacklog",ReadBacklog);
app.post("/popularTabelaDesenvo", ReadDeveloping);
app.post("/popularTabelaFinished", ReadFinished);
app.post("/ExcluirBacklog",DeleteTask);         
app.post("/inserirNaTabelaBacklog",InsertTask);
app.post("/mudarStatusDev",BacklogToDev);
app.post("/mudarStatusFin",DevToFin);
app.post("/finparadev",FinToDev);
app.post("/devparaback",DevToBack);
app.post("/criarQuadro",CriarQuadros);
app.post("/buscarQuadros",buscarQuadros);
app.post("/infodevs",BuscarDevInfo);
app.post("/insertdevs",InsertDevInfo);
app.listen(3001, ()=>{
    console.log("rodando")
});
