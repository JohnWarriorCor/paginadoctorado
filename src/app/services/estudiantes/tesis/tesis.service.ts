import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Tesis } from '../../../interfaces/estudiantes/tesis/tesis';

@Injectable({
  providedIn: 'root'
})
export class TesisService {

  tesisRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/planestudio.json';
  tesisURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/planestudio/';

  constructor( private http: Http ) { }

  nuevoTesi( tesis: Tesis) {
    const body = JSON.stringify(tesis);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.tesisRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarTesi( tesis: Tesis, key$: string ) {
    const body = JSON.stringify(tesis);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.tesisURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getTesi(key$: string) {
    const url = `${ this.tesisURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getTesis() {
    return this.http.get( this.tesisRegistroURL ).pipe(map(res => res.json()));
  }
  borrarTesi( key$: string) {
    const url = `${ this.tesisURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
