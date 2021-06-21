import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-videollamada',
  templateUrl: './videollamada.component.html',
  styleUrls: ['./videollamada.component.css']
})
export class VideollamadaComponent implements OnInit {

  public captures: Array<any>;
  public canvas: any;

  info: any = [];

  constructor(private _server: ServerService) {
    this.captures = []; this.canvas = document.createElement("canvas");
    if (this._server.getUserType()=="Doctor") {
        this._server.getDrNombre(this._server.getUserLogged()).subscribe((data : any) => {
            this._server.getConsulta(data[0].ID).subscribe((data2 : any) => {
                this._server.getPaciente(data2[0].ID_PACIENTE).subscribe((data3 : any) => {
                    this.info=data3[0];
                });
            });    
        });   
    }
  }

  comprobar() : boolean {
      if(this._server.getUserType()=='Doctor')
        return true;
      else
        return false;
  }

  @ViewChild('videoElement')
  videoElement: any;  
  @ViewChild("videoElement")
    public video: any;

  ngOnInit() {
    
  }

  start() {
    this.initCamera({ video: true, audio: false });
  }
   sound() {
    this.initCamera({ video: true, audio: true });
  }
  
  initCamera(config:any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia({ video: true }).then(stream => {
      //this.video.nativeElement.src = window.URL.createObjectURL(stream);
      this.video.nativeElement.srcObject = stream;
      this.video.nativeElement.play();
      this.capture();
    });
  }

  public capture() {
  	var link = document.getElementById('link');
    this.canvas.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.toDataURL("image/png"));
    link.setAttribute('download', 'MintyPaper.png');
  	link.setAttribute('href', this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  	link.click();
  }

  Irving() {
    
  }

   pause() {
    this.video.nativeElement.pause();
  }

  resume() {
    this.video.nativeElement.play();
  }

}
