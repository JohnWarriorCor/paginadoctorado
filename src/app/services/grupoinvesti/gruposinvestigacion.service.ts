import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Gruposinvestigacion } from '../../interfaces/grupoinvesti/gruposinvestigacion';

@Injectable({
  providedIn: 'root'
})
export class GruposinvestigacionService {

  gruposInvestigacionRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/gruposInvestigacion.json';
  gruposInvestigacionURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/gruposInvestigacion/';

  constructor( private http: Http ) { }
  nuevoGrupo( grupoInvestigacion: Gruposinvestigacion) {
    const body = JSON.stringify(grupoInvestigacion);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.gruposInvestigacionRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarGrupo( grupoInvestigacion: Gruposinvestigacion, key$: string ) {
    const body = JSON.stringify(grupoInvestigacion);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.gruposInvestigacionURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getGrupo(key$: string) {
    const url = `${ this.gruposInvestigacionURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getGrupos() {
    return this.http.get( this.gruposInvestigacionRegistroURL ).pipe(map(res => res.json()));
  }
  borrarGrupo( key$: string) {
    const url = `${ this.gruposInvestigacionURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
