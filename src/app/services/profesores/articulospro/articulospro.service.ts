import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Articulospro } from '../../../interfaces/profesores/articulospro/articulospro';

@Injectable({
  providedIn: 'root'
})
export class ArticulosproService {
  articulosproRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/articulosProfesores.json';
  articulosproURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/articulosProfesores/';

  constructor( private http: Http ) { }

  nuevoArticuloProfesor( articulospro: Articulospro) {
    const body = JSON.stringify(articulospro);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.articulosproRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarArticuloProfesor( articulospro: Articulospro, key$: string ) {
    const body = JSON.stringify(articulospro);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.articulosproURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getArticuloProfesor(key$: string) {
    const url = `${ this.articulosproURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getArticuloProfesores() {
    return this.http.get( this.articulosproRegistroURL ).pipe(map(res => res.json()));
  }
  borrarArticuloProfesor( key$: string) {
    const url = `${ this.articulosproURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
