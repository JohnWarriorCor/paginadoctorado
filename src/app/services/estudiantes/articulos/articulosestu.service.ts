import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Articulosestu } from '../../../interfaces/estudiantes/articulos/articulosestu';

@Injectable({
  providedIn: 'root'
})
export class ArticulosestuService {

  articulosestuRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/articulosEstudiantes.json';
  articulosestuURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/articulosEstudiantes/';

  constructor( private http: Http ) { }

  nuevoArticuloEstudiante( articulosestu: Articulosestu) {
    const body = JSON.stringify(articulosestu);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.articulosestuRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarArticuloEstudiante( articulosestu: Articulosestu, key$: string ) {
    const body = JSON.stringify(articulosestu);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.articulosestuURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getArticuloEstudiante(key$: string) {
    const url = `${ this.articulosestuURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getArticuloEstudiantes() {
    return this.http.get( this.articulosestuRegistroURL ).pipe(map(res => res.json()));
  }
  borrarArticuloEstudiante( key$: string) {
    const url = `${ this.articulosestuURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
