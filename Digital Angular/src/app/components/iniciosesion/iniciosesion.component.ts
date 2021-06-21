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
    
    doctor: boolean = false;
    enfer : boolean = true;
    
    ocupacion = '';
    
  constructor(private _server: ServerService) {
      this.mostrar = false;
      this.mostrar2 = true;
      this.doctor = true;
      this.usuario ='';
      this.contrasena = '';
      this.ocupacion = '';
      this.enfer = false;
      
  }

  ngOnInit(): void {
      this.doctor = true;
      this.enfer = false;
    }
    
    activarboton1(){
        this.doctor = true;
        this.enfer = false;
    }
    
    activarboton2(){
        this.doctor = false;
        this.enfer = true;
    }
    
    logearsedoc(){
        console.log(this.usuario  + "  y  "+ this.contrasena);
        
        this._server.getUsuariosDoc(this.contrasena, this.usuario).subscribe((data : any) => {
            if(data == true){
                Cookies.set('usuario', this.usuario);
                Cookies.set('ocupacion', this.ocupacion);
                this.mostrar = true;
                this.mostrar2 = false;
            }else{
                console.log("uy no no hay usuario");
                this.usuario ='';
                this.contrasena ='';
            }
        
        });
    }

    logearsenfer(){
        this._server.getUsuariosEnfe(this.contrasena, this.usuario).subscribe((data : any) => {
            if(data == true){
                Cookies.set('usuario', this.usuario);
                Cookies.set('ocupacion', this.ocupacion);
                this.mostrar = true;
                this.mostrar2 = false;
            }else{
                console.log("uy no no hay usuario");
                this.usuario ='';
                this.contrasena ='';
            }
        
        });
    }


}
