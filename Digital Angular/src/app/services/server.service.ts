import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  getQuery(query : string) {
    const url = `http://localhost:3000/${query}`;
    return this.http.get(url);
  }

  getDrDisponible(disp) {
  	return this.getQuery(`DrDisp/${disp}`).pipe(map(data => {
  		return data;
  	}));
  }
    
    getCorreo(correo){
        return this.getQuery(`Registro/${correo}`).pipe(map(data => {
            return data;
        }));
    }
    
    getUsuariosDoc(contra, user) {
        return this.getQuery(`Doctor/${contra}/${user}`).pipe(map(data => {
            return data;
        }));
    }
    
    setDisponibilidad(id,disp) {
    return this.getQuery(`setDr/${id}/${disp}`).pipe(map(data => {
          return data;
      }));
  }
}
