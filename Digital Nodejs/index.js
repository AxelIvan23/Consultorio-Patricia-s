const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const port = process.env.PORT || 3000;
const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
}


var mensaje = "Hola  que tal este es tu código de verificación: \n\n ";

var codigo = 14225;

var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    port : '3306',
    database : 'consultorio',
    user : 'root',
    password : '',
});


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kyleigh.johns@ethereal.email',
        pass: '59H4aFj1sReg9saeU8'
    }
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

app.get('/Registro/:correo', function(req, res){
    console.log(req.params['correo']);
    var correo = req.params['correo'];
    var mailOptions = {
      from: 'kyleigh.johns@ethereal.email',
      to: correo,
      subject: 'Codigo de verificacion',
      text: (mensaje + codigo)
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
          res.send("");
      }
    });
});

app.get('/Doctor/:contra/:user', function(req,res){
    var contra = req.params["contra"];
    var user = req.params["user"];
    console.log(contra + user);
    conexion.query(`SELECT * FROM doctor WHERE  USUARIO = "${user}" AND CONTRASENA = "${contra}";`, function (error, results, fields){
        if (error)
		        throw error;
        
        var confirmacion = "";
        results.forEach(result => {
		        console.log(result);
            confirmacion =result;
        }); 
        console.log(confirmacion);
        if(confirmacion == "")
            res.send(false);
        else
            res.send(true);
    })
})

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