import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Listado } from '../../../interfaces/estudiantes/listado/listado';

@Injectable({
  providedIn: 'root'
})
export class EgresadosService {
  egresadoRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/listadoEgresados.json';
  egresadoURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/listadoEgresados/';

  constructor( private http: Http ) { }

  nuevoEgresado( listado: Listado) {
    const body = JSON.stringify(listado);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.egresadoRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarEgresado( listado: Listado, key$: string ) {
    const body = JSON.stringify(listado);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.egresadoURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getEgresado(key$: string) {
    const url = `${ this.egresadoURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getEgresados() {
    return this.http.get( this.egresadoRegistroURL ).pipe(map(res => res.json()));
  }
  borrarEgresado( key$: string) {
    const url = `${ this.egresadoURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
