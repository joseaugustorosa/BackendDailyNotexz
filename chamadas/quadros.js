const express= require("express");
const app = express();
const client = require('../index');
const cors = require("cors");
app.use(cors())
app.use(express.json());


async function buscarQuadros(req, res) {
    const user = req.body.nomeuser;
    console.log(user)
    if (user === null || user.trim() === '' ) {
        res.send({msg: "USER INDEFINIDO"})
    } else {
        client.query("SELECT * FROM QUADROS WHERE usuario= ($1) ",
        [user]).then((result) => {
            console.log(result.rows[0].quadro)
            res.send(result)
        })
        .catch((error) => {
            res.send({msg: "NÃO ENCONTRADO"})
        });    
    }        
}
async function CriarQuadros(req, res) {
    const user = req.body.nomeuser;
    const nome = req.body.title;
   
    if (user === null || user.trim() === '' ||user === null || user.trim() === '' ) {
        res.send({msg: "DADO INDEFINIDO"})
    } else {
        client.query("insert into quadros(usuario, quadro) values ('($1)','($2)')",
        [user,nome]).then((result) => {
            res.send(result)
        })
        .catch((error) => {
            res.send({msg: "NÃO ENCONTRADO"})
        });    
    }        
}




module.exports = { buscarQuadros ,CriarQuadros };