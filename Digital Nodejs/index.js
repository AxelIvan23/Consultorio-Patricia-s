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
        user: 'kyleigh.johns@ethereal.email',
        pass: '59H4aFj1sReg9saeU8'
    }
});

app.get('/DrDisp/:disp', function(req, res) {
  var disp = req.params['disp'];
	conexion.query(`SELECT * FROM doctor WHERE DISPONIBILIDAD=${disp};`, function (error, results, fields) {
		    if (error)
		        throw error;
        var resultados = [];
		    results.forEach(result => {
		        resultados.push(result);
		    });  
        res.send(resultados);  
		});
});

app.get('/DrUser/:user', function(req, res) {
  var user = req.params['user'];
  conexion.query(`SELECT * FROM doctor WHERE USUARIO="${user}";`, function (error, results, fields) {
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
    res.send('hola');
});

//incio de sesion Doctores
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
});

//Inicio de sesion enfermeras
app.get('/Enfermera/:contra/:user', function(req,res){
    var contra = req.params["contra"];
    var user = req.params["user"];
    console.log(contra + user);
    conexion.query(`SELECT * FROM enfermera WHERE  USUARIO = "${user}" AND CONTRASENA = "${contra}";`, function (error, results, fields){
        if (error)
		        throw error;
        
        var confirmacion2 = "";
        results.forEach(result => {
		        console.log(result);
            confirmacion2 =result;
        }); 
        console.log(confirmacion2);
        if(confirmacion2 == "")
            res.send(false);
        else
            res.send(true);
    })
});

//Registro del doctor
app.get('/RegistroDoc/:nombre/:usuario/:correo/:contra/:disponibilidad', function(req,res){
    var nombre = req.params["nombre"];
    var usuario = req.params["usuario"];
    var correo = req.params["correo"];
    var contra = req.params["contra"];
    var disponibilidad = req.param["disponibilidad"];
    conexion.query(`INSERT INTO doctor ( NOMBRE, DISPONIBILIDAD, USUARIO, CONTRASENA, CORREO) VALUES ('${nombre}', 0, '${usuario}', '${contra}', '${correo}');`, function (error, results, fields){
        if (error){
             throw error;
            res.send(false)
        }
        else{
            res.send(true);
        }
        results.forEach(result => {
		        console.log(result);
        }); 
    })
});

app.get('/RegistroPaci/:nombre/:direccion/:telefono/:alergias/:sangre/:edad', function(req,res){
    var nombre = req.params["nombre"];
    var direccion = req.params["direccion"];
    var telefono = req.params["telefono"];
    var alergias = req.params["alergias"];
    var sangre = req.params["sangre"];
    var edad = req.params["edad"];
    conexion.query(`INSERT INTO paciente ( NOMBRE, DIRECCION, TELEFONO, ALERGIAS, TIPOSANGRE, EDAD) VALUES ( '${nombre}', '${direccion}', '${telefono}', '${alergias}', '${sangre}', '${edad}');`, function (error, results, fields){
        if (error){
             throw error;
             res.send(false)
        }
        else{
            conexion.query(`SELECT * FROM paciente WHERE NOMBRE = '${nombre}' and DIRECCION = '${direccion}' and TELEFONO = '${telefono}';`, function (error, results, fields){
              results.forEach(result => {
                  console.log(result);
                  res.send(result);
              }); 
            });
        }
    })
});

app.get('/setLlamada/:id_dr/:id_paciente', function(req,res){
    var id_dr = req.params["id_dr"];
    var id_paciente = req.params["id_paciente"];
    conexion.query(`INSERT INTO videollamada (ID_DR,ID_PACIENTE) VALUES (${id_dr}, ${id_paciente});`, function (error, results, fields){
        if (error)
            throw error;
        
        var confirmacion = "";
        console.log(confirmacion);
        if(confirmacion == "")
            res.send(false);
        else
            res.send(true);
    })
});

app.get('/getConsulta/:id', function(req, res) {
  var id = req.params['id'];
  conexion.query(`SELECT * FROM videollamada WHERE ID_DR=${id} ORDER BY ROOM DESC LIMIT 1;`, function (error, results, fields) {
        if (error)
            throw error;
        var resultados = [];
        results.forEach(result => {
            resultados.push(result);
        });  
        res.send(resultados);  
    });
});

app.get('/getPaciente/:id', function(req, res) {
  var id = req.params['id'];
  conexion.query(`SELECT * FROM paciente WHERE ID=${id};`, function (error, results, fields) {
        if (error)
            throw error;
        var resultados = [];
        results.forEach(result => {
            resultados.push(result);
        });  
        res.send(resultados);  
    });
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