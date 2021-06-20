const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
}

var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    port : '3306',
    database : 'consultorio',
    user : 'root',
    password : '',
});

app.use(cors());

app.get('/DrDisp', function(req, res) {
	conexion.query('SELECT * FROM doctor WHERE DISPONIBILIDAD=0;', function (error, results, fields) {
		    if (error)
		        throw error;
		    results.forEach(result => {
		        console.log(result);
		        res.send(result);
		    });    
		});
});



//conexion.end();
app.listen(port, () =>{
    console.log(`Servidor corriendo en puerto: ${port}`);
    conexion.connect(function(err) {
	    if (err) {
	        console.error('Error de conexion: ' + err.stack);
	        return;
	    }
	});
});