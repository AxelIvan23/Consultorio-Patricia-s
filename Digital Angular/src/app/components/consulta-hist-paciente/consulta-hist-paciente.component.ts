import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-hist-paciente',
  templateUrl: './consulta-hist-paciente.component.html',
  styleUrls: ['./consulta-hist-paciente.component.css']
})
export class ConsultaHistPacienteComponent implements OnInit {

   public desplegar:boolean;

    constructor() { 
          this.desplegar = false;
    }

    ngOnInit(): void {
    }

    desplegarInfo(value: boolean){
        this.desplegar = value;
    }
}
