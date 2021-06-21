import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funciones-enfermera',
  templateUrl: './funciones-enfermera.component.html',
  styleUrls: ['./funciones-enfermera.component.css']
})
export class FuncionesEnfermeraComponent implements OnInit {
    
    nombre = '';
    idpaciente:number =0;
    peso: number=0;
    talla: number=0;
    altura: number=0;
    temperatura: number=0;
    presionart: string='';
    pulso: number=0;
    prescripcion: string ='';
    meidicamentos: string ='';
    
    direccion: string ='';
    telefono: number = 0;
    alergias: String = '';
    sangre : string = '';
    edad: number=0;
    
  constructor(private _server: ServerService) { }

  ngOnInit(): void {
  }
    
    insertarpaciente(){
        this._server.setPraciente(this.nombre, this.direccion, this.telefono, this.alergias, this.sangre, this.edad).subscribe((data : any) => {
            if(data == true){
                //Cookies.set('usuario', this.usuario);
               //Cookies.set('ocupacion', this.ocupacion);
                console.log("registro con exito");
                this.nombre ='';
                this.direccion ='';
                this.telefono = 0;
                this.alergias = '';
                this.sangre = '';
                this.edad=0;
            }else{
                console.log("error en el regitro");
            }
        
        });
    }
}
