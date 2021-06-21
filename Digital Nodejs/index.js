const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const port = process.env.PORT || 3000;
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);

var corsOptions = {
    origin: "http://localhost:8080"
}

var mensaje = "Hola  que tal este es tu código de verificación: \n\n ";

var codigo = 14225;

var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    port : '3307',
    database : 'consultorio',
    user : 'root',
    password : '',
});

app.use(cors());

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dakota.schaden43@ethereal.email',
        pass: '5ywSmymbcG3MvdM32g'
    }
});

app.get('/DrDisp/:disp', function(req, res) {
  var disp = req.params['disp'];
	conexion.query(`SELECT * FROM doctor WHERE DISPONIBILIDAD=${disp};`, function (error, results, fields) {
		    if (error)
		        throw error;
        var resultados = [];
		    results.forEach(result => {
		        console.log(result);
		        resultados.push(result);
		    });  
        res.send(resultados);  
		});
});

app.get('/setDr/:id/:disp', function(req, res) {
  var id = req.params['id'];
  var disp = req.params['disp'];
  conexion.query(`UPDATE doctor SET DISPONIBILIDAD = ${disp} WHERE doctor.ID = ${id};`, function (error, results, fields) {
        if (error)
            throw error;
        res.send('');  
    });
});

app.get('/Registro/:correo', function(req, res){
    var correo = req.params['correo'];
    console.log(correo);
    /*var mailOptions = {
      from: 'dakota.schaden43@ethereal.email',
      to: correo,
      subject: 'Codigo de verificacion',
      text: (mensaje + codigo)
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });*/
    res.send('hola');
});

io.on('connection', (socket) => {
  socket.on('stream', (image) => {
    socket.broadcast.emit('stream', image);
  })
});

//conexion.end();
http.listen(port, () => {
   console.log(`Servidor corriendo en puerto: ${port}`);
   conexion.connect(function(err) {
      if (err) {
          console.error('Error de conexion: ' + err.stack);
          return;
      }
  });
});