const express= require("express");
const app = express();
const { Client } = require('pg');
const cors = require("cors");

//Novo banco ELEPHANTSQL
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
    client.query("SELECT * FROM LOGIN WHERE usuario= ($1) AND senha = ($2)",
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
        
        client.query("SELECT * FROM TAREFAS WHERE usuario= ($1) and status ='backlog' ",
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
          
          client.query("SELECT * FROM TAREFAS WHERE usuario= ($1) and status = 'developing'",
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
       
          const id = req.body.id;
          const user = req.body.user;
          
          
          client.query("DELETE FROM TAREFAS WHERE id = ($1) and usuario = ($2)",
          [id,user]).then((result) => {
            
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
            
            client.query("SELECT * FROM TAREFAS WHERE usuario= ($1) and status =  'finished' ",
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
          const id = req.body.id;
          
          
          client.query("insert into tarefas(titulo, descricao, data, hora, usuario,status,id)  values (($1),($2),($3),($4),($5), 'backlog', ($6))",
          [titulo,descricao,data,hora,user,id]).then((result) => {
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
          app.post("/mudarStatusDev",(req,res)=>{
       
            const titulo = req.body.titulo;
            const descricao = req.body.descricao;
            const data = req.body.data;
            const hora = req.body.hora;
            const user = req.body.user;
            
            console.log(titulo)
            console.log(user)

            client.query("update tarefas set status ='developing' where titulo =($1) and usuario = ($2)",
            [titulo,user]).then((result) => {
                console.log(result.rows)
                console.log(result.rows.titulo)
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
            );
            app.post("/mudarStatusDev",(req,res)=>{
       
              const titulo = req.body.titulo;
              const descricao = req.body.descricao;
              const data = req.body.data;
              const hora = req.body.hora;
              const user = req.body.user;
              
              console.log(titulo)
              console.log(user)
  
              client.query("update tarefas set status ='developing' where titulo =($1) and usuario = ($2)",
              [titulo,user]).then((result) => {
                  console.log(result.rows)
                  console.log(result.rows.titulo)
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
              );
            app.post("/mudarStatusFin",(req,res)=>{
       
              const titulo = req.body.titulo;
              const descricao = req.body.descricao;
              const data = req.body.data;
              const hora = req.body.hora;
              const user = req.body.user;
              
              
              client.query("update tarefas set status= 'finished' where titulo=($1) and status = 'developing' and usuario = ($2)",
              [titulo,user]).then((result) => {
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
              app.post("/finparadev",(req,res)=>{
       
                const titulo = req.body.titulo;
                
                const user = req.body.user;
                
                
                client.query("update tarefas set status= 'developing' where titulo=($1) and status ='finished' and usuario = ($2)",
                [titulo,user]).then((result) => {
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
                app.post("/devparaback",(req,res)=>{
       
                  const titulo = req.body.titulo;
                  const descricao = req.body.descricao;
                  const data = req.body.data;
                  const hora = req.body.hora;
                  const user = req.body.user;
                  
                  console.log(titulo)
                  console.log(user)
                  client.query("update tarefas set status= 'backlog' where titulo=($1) and status ='developing' and usuario = ($2)",
                  [titulo,user]).then((result) => {
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
