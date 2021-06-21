import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
    
    //Variables
    nombre = '';
    usuario = '';
    correo = 'axelaxel23@live.com';
    contrasena = '';
    dispo = 1;
    
    confirmacioncodigo : boolean = false;
    exitoso : boolean = false;
    incorrecto : boolean = false;
    formulario : boolean = true;
    
  constructor(private _server: ServerService) { 
      this.confirmacioncodigo = false;
      this.exitoso = false;
      this.incorrecto = false;
      this.formulario = true;
  }

  ngOnInit(): void {
  }
    
  enviarCorreo (){    
    console.log("correo: "+this.correo);
      this.confirmacioncodigo=true;
      this.formulario = false;
      this._server.getCorreo(this.correo).subscribe((data:any) => {
	      
      });
  }
}
