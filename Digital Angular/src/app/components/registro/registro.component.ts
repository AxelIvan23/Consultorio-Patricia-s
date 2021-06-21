import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
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
    show: boolean;
    
  constructor(private _server: ServerService) { 
      this.confirmacioncodigo = false;
      this.exitoso = false;
      this.incorrecto = false;
      this.formulario = true;
      this.show = false;
      
  }

  ngOnInit(): void {
  }
    
    enviarCorreo (){    
        this.confirmacioncodigo=true;
        this.formulario = false;
        this._server.getCorreo(this.correo).subscribe((data : any) => {});
    }
    
    mostrarContrasena(){
        this.show = !this.show;
  }
}
