import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    
    usuario = "";
    
  constructor() {
    this.usuario = Cookies.get('usuario');
  }
    
    

  ngOnInit(): void {
      this.usuario = Cookies.get('usuario');
  }
    
    
    usuariologeado(){
        if(Cookies.get('usuario')==""){
            return false;
        }else{
            return true;
        }
    }
    
    desconetar(){
        Cookies.set('usuario', '');
    }
    /*
    $(function() {
            this.$(".toggle").on("click", function() {
                if ($(".item").hasClass("active")) {
                    $(".item").removeClass("active");
                    $(this).find("a").html("<i class='fas fa-bars'></i>");
                } else {
                    $(".item").addClass("active");
                    $(this).find("a").html("<i class='fas fa-times'></i>");
                }
            });
    });*/
}
