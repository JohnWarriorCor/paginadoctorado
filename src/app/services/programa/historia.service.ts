import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Historia } from '../../interfaces/programa/historia';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  historiaRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/historia.json';
  historiaURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/historia/';

  constructor( private http: Http) { }

  nuevoHistoria( historia: Historia) {
    const body = JSON.stringify(historia);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.historiaRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarHistoria( historia: Historia, key$: string ) {
    const body = JSON.stringify(historia);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.historiaURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getHistoria(key$: string) {
    const url = `${ this.historiaURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getHistorias() {
    return this.http.get( this.historiaRegistroURL ).pipe(map(res => res.json()));
  }
  borrarHistoria( key$: string) {
    const url = `${ this.historiaURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
