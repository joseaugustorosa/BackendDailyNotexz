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
module.exports = { BuscarDevInfo};