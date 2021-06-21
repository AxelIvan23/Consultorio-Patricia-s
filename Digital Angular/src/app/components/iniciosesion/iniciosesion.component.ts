import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormsModule } from '@angular/forms';
import * as Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent implements OnInit {
    
    
    usuario ='';
    contrasena ='';
    mostrar : boolean = false;
    mostrar2 : boolean = true;
    
    ocupacion = '';
    
  constructor(private _server: ServerService) {
      this.usuario = "";
      this.contrasena = "";
      this.mostrar = false;
      this.mostrar2 = true;
      
  }

  ngOnInit(): void {
  }
    
    logearse(){
    console.log(this.usuario  + "  y  "+ this.contrasena);
        
    this._server.getUsuariosDoc(this.contrasena, this.usuario).subscribe((data : any) => {
        if(data == true){
            Cookies.set('usuario', this.usuario);
        }else{
            console.log("uy no no hay usuario")
        }
        
        });
        this.mostrar = true;
        this.mostrar2 = false;
        this.ocupacion = "doctor";
    }


}
