import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { interval } from 'rxjs';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  id_paciente: Number = 0;
    nombre = '';
    idpaciente:number =0;
    peso: number=0;
    talla: number=0;
    altura: number=0;
    temperatura: number=0;
    presionart: string='';
    pulso: number=0;
    prescripcion: string ='';
    medicamentos: string ='';

  constructor(private _server: ServerService, private _activatedRoute: ActivatedRoute) { 
    this._activatedRoute.params.subscribe( param =>  {
      console.log(param.id);
       this.id_paciente = Number(param.id);
    })
  }

  ArrayDoctores: any = [];

  ngOnInit(): void {
  }

  @ViewChild('videoPlayer') videoplayer: any;

  ConsultarDoctor() {
    var cargando: HTMLElement = document.getElementById('cargando')|| new HTMLElement();
    cargando.style.display = "block";
    this.videoplayer.nativeElement.play();

    var num=1;
    this._server.getDrDisponible('0').subscribe((data : any) => {
        this.ArrayDoctores=data;
        //console.log(this.ArrayDoctores.NOMBRE);
        const timer = interval(11000).subscribe((x=1) => {
          if (num>=this.ArrayDoctores.length) {
            timer.unsubscribe();
            console.log("No se encontraron Doctores disponibles :o");
          }
          else {
            console.log(num);
            if (this.PeticionDoctor(Number(this.ArrayDoctores[num].ID))) {
              timer.unsubscribe();
              var link = document.getElementById('ToCall');
              link.click();
            }
          }
          num++;
        });
        if (this.ArrayDoctores.length>0) {
          if (this.PeticionDoctor(Number(this.ArrayDoctores[0].ID))) {
                timer.unsubscribe();
                var link = document.getElementById('ToCall');
                link.click();
          }
        }
        //console.log("flash: "+ this.ArrayDoctores.length);
    });
  }	

  PeticionDoctor(id: number) : boolean {
    var dato = 0;
    this._server.setDisponibilidad(id,'2').subscribe((data : any) => {
      
    });
    this.sleep(10000);
    this._server.getDrDisponible('3').subscribe((data : any) => {
      if (data.length>0) {
          dato=1;
          this._server.setDisponibilidad(id,'1').subscribe((data : any) => {
            this._server.setVideollamada(id,this.id_paciente).subscribe((data : any) => {
              var link = document.getElementById('ToCall');
              link.click();
            });
          });
      } else {
        this._server.setDisponibilidad(id,'0').subscribe((data : any) => {});
      }
    });
    this.sleep(400);
    if (dato==0)
      return false;
    else
      return true;
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

}
