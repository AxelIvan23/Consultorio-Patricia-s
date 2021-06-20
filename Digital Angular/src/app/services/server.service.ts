import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getQuery(query : string) {
    const url = `http://localhost:4200/${query}`;
    return this.http.get(url);
  }

  getDrDisponible() {
  	return this.getQuery(`DrDisp`).pipe(map(data => {
  		return data;
  	}));
  }
    
    getCorreo(correo){
        return this.getQuery(`Registro/${correo}`).pipe(map(data => {
            return data;
        }));
    }
}
