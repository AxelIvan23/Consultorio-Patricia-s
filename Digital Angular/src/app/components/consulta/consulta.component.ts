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
    this._server.getDrDisponible().subscribe((data : any) => {
      this.ArrayDoctores=data;
      //console.log(this.ArrayDoctores.NOMBRE);
    });
    const timer = interval(1000).subscribe(x => {
      console.log(x);
      timer.unsubscribe();
    });
     console.log("flash");
  }	

}
