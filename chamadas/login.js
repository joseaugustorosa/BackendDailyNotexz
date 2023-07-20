const express= require("express");
const app = express();
const client = require('../index');
const cors = require("cors");
app.use(cors())
app.use(express.json());


async function Login(req, res) {
    const email = req.body.email;
    const senha = req.body.pass;
    if (email === null || email.trim() === '' || senha === null || senha.trim() === '') {
        res.send({msg: "EM BRANCO OU NULO"})
    } else {
        client.query("SELECT * FROM LOGIN WHERE usuario= ($1) AND senha = ($2)",
        [email, senha]).then((result) => {
            res.send({msg: "LOGIN AUTORIZADO", nome: result.rows[0].nome ,user: result.rows[0].usuario })
        })
        .catch((error) => {
            res.send({msg: "NÃO ENCONTRADO"})
        });    
    }             
}
module.exports = { Login };