import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

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

  setDisponibilidad(id,disp) {
    return this.getQuery(`setDr/${id}/${disp}`).pipe(map(data => {
          return data;
      }));
  }
}
