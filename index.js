const express= require("express");
const app = express();
const { Client } = require('pg');
const cors = require("cors");
// const bcrypt = require("bcrypt");
// const SaltRounds = 10;

const client = new Client({
    user: 'postgres',
    host: 'containers-us-west-131.railway.app',
    database: 'railway',
    password: 'lOnlgAp1iVBKNOAHirIJ',
    port: '8060',
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
client.query('SELECT * FROM login')
  .then((result) => {
    console.log('Resultado da consulta:', result.rows);
  })
  .catch((err) => {
    console.error('Erro ao executar a consulta:', err);
  });

app.post("/login",(req,res)=>{
    const email = req.body.email;
    const senha = req.body.pass;
    console.log( senha)
    client.query("SELECT * FROM LOGIN WHERE nome_usuario= ($1) AND senha = ($2)",
    [email, senha]).then((result) => {
        console.log(result.rows)
        console.log(result.rows.nome)
        res.send({msg: "Login Autorizado", nome: result.rows[0].nome ,user: result.rows[0].nome_usuario })
      })
      .catch((error) => {
        console.error('Erro na query:', error);
        res.status(500).send('Erro na execução da query');
      });
        
    }
    );
    
    app.post("/popularTabelaBacklog",(req,res)=>{
       
        const nome = req.body.nomeuser;
        
        client.query("SELECT * FROM TAREFAS WHERE usuario= ($1)",
        [nome]).then((result) => {
            console.log(result.rows)
            console.log(result.rows.titulo)
            res.send(result)
          })
          .catch((error) => {
            console.error('Erro na query:', error);
            res.status(500).send('Erro na execução da query');
          });
            
        }
        );
        app.post("/popularTabelaDesenvo",(req,res)=>{
       
          const nome = req.body.nomeuser;
          
          client.query("SELECT * FROM TAREFAS1 WHERE usuario= ($1)",
          [nome]).then((result) => {
              console.log(result.rows)
              console.log(result.rows.titulo)
              res.send(result)
            })
            .catch((error) => {
              console.error('Erro na query:', error);
              res.status(500).send('Erro na execução da query');
            });
              
          }
          );
          app.post("/ExcluirBacklog",(req,res)=>{
       
          const titulo = req.body.titulo;
          const data = req.body.data;
          const hora = req.body.hora;
          const user = req.body.user;
          
          client.query("DELETE FROM TAREFAS WHERE USUARIO = ($1) and titulo =($2) and hora = ($3) and data =($4)",
          [user,titulo,hora,data]).then((result) => {
              console.log("DELETE FROM TAREFAS WHERE USUARIO =  and titulo =($2) and hora = ($3) and data =($4)",user,titulo,hora,data)
              console.log(result.rows)
              console.log(result.rows.titulo)
              res.send(result)
            })
            .catch((error) => {
              console.error('Erro na query:', error);
              res.status(500).send('Erro na execução da query');
            });
              
          }
          );
          app.post("/popularTabelaFinished",(req,res)=>{
       
            const nome = req.body.nomeuser;
            
            client.query("SELECT * FROM TAREFAS2 WHERE usuario= ($1)",
            [nome]).then((result) => {
                console.log(result.rows)
                console.log(result.rows.titulo)
                res.send(result)
              })
              .catch((error) => {
                console.error('Erro na query:', error);
                res.status(500).send('Erro na execução da query');
              });
                
            }
            );
app.post("/inserirNaTabelaBacklog",(req,res)=>{
       
          const titulo = req.body.titul;
          const descricao = req.body.descricao;
          const data = req.body.data;
          const hora = req.body.hora;
          const user = req.body.user;
          
          
          client.query("insert into tarefas(titulo, descricao, data, hora, usuario)  values (($1),($2),($3),($4),($5))",
          [titulo,descricao,data,hora,user]).then((result) => {
              console.log(result.rows)
              console.log(result.rows.titulo)
              res.send(result)
            })
            .catch((error) => {
              console.error('Erro na query:', error);
              res.status(500).send('Erro na execução da query');
            });
              
          }
          );

app.listen(3001, ()=>{
    console.log("rodando")
});