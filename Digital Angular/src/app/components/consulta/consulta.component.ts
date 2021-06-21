import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(private _server: ServerService) { }

  ArrayDoctores: any = [];
    
    nombre='';

  ngOnInit(): void {
  }

  ConsultarDoctor() {
    this._server.getDrDisponible('0').subscribe((data : any) => {
        this.ArrayDoctores=data;
        //console.log(this.ArrayDoctores.NOMBRE);
        const timer = interval(10000).subscribe((x=Number(this.ArrayDoctores[0].ID)) => {
          if (x>=this.ArrayDoctores.length) {
            timer.unsubscribe();
            console.log("No se encontraron Doctores disponibles :o");
          }
          else {
            console.log(x);
            if (this.PeticionDoctor(Number(this.ArrayDoctores[x].ID)))
              timer.unsubscribe();
          }
        });

        //console.log("flash: "+ this.ArrayDoctores.length);
    });
  }	

  PeticionDoctor(id: number) : boolean {
    this._server.setDisponibilidad(id,'2').subscribe((data : any) => {
    });
    return false;
  }

}
