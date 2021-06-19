const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();

var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'consultorio',
    user : 'root',
    password : '',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});

conexion.query('SELECT * FROM empleados', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
});

//connection.end();

/*app.listen(port, () =>{
    console.log(`Servidor corriendo en puerto: ${port}`);
});*/