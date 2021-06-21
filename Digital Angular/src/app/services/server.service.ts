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

  getDrNombre(user) {
    return this.getQuery(`DrUser/${user}`).pipe(map(data => {
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
    
    getUsuariosEnfe(contra, user){
        return this.getQuery(`Enfermera/${contra}/${user}`).pipe(map(data => {
            return data;
        }));
    }
    
    getRegistro(nombre, usuario, correo, contra, disponibilidad){
        return this.getQuery(`RegistroDoc/${nombre}/${usuario}/${correo}/${contra}/${disponibilidad}`).pipe(map(data => {
            return data;
        }));
    }

    setPraciente(nombre, direccion, telefono, alergias, sangre, edad){
        return this.getQuery(`RegistroPaci/${nombre}/${direccion}/${telefono}/${alergias}/${sangre}/${edad}`).pipe(map(data => {
            return data;
        }));
    }
    
    setDisponibilidad(id,disp) {
    return this.getQuery(`setDr/${id}/${disp}`).pipe(map(data => {
          return data;
      }));
  }
  getUserLogged() {
    return this.cookies.get("usuario");
    // Aquí iría el endpoint para devolver el usuario para un token
  }
}
