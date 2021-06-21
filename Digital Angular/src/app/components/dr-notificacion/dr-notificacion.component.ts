import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dr-notificacion',
  templateUrl: './dr-notificacion.component.html',
  styleUrls: ['./dr-notificacion.component.css']
})
export class DrNotificacionComponent implements OnInit {

  constructor(private _server: ServerService) { }

  id: number;
  

  ngOnInit(): void {
  	const timer = interval(400).subscribe((x) => {
      this._server.getDrDisponible('2').subscribe((data : any) => {
      	if (data.length>0) {
      		console.log(this._server.getUserLogged()+data[0].USUARIO);
      		if (data[0].USUARIO == this._server.getUserLogged()) {
		      	this.id=Number(data[0].ID);
		      	console.log(data[0].ID);
		      	var notificacion: HTMLElement = document.getElementById('container-not')|| new HTMLElement();
		      	notificacion.style.top = "0vh";
		    }
	    }
      });
      
    });
  }

  Aceptar() {
  	this._server.setDisponibilidad(this.id,'3').subscribe((data2 : any) => {
  		var notificacion: HTMLElement = document.getElementById('container-not')|| new HTMLElement();
      	notificacion.style.top = "-23vh";
  		var link = document.getElementById('ToCall');
        link.click();
    });
  }
  Rechazar() {
  	var notificacion: HTMLElement = document.getElementById('container-not')|| new HTMLElement();
      	notificacion.style.top = "-23vh";
  	this._server.setDisponibilidad(this.id,'0').subscribe((data2 : any) => {
    });
  }
}
