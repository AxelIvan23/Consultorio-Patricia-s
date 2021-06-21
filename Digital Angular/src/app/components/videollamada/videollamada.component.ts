import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-videollamada',
  templateUrl: './videollamada.component.html',
  styleUrls: ['./videollamada.component.css']
})
export class VideollamadaComponent implements OnInit {

  public captures: Array<any>;
  public canvas: any;

  constructor() {this.captures = []; this.canvas = document.createElement("canvas");}



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
