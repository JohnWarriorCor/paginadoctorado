import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Gruposinvestigacion } from '../../interfaces/grupoinvesti/gruposinvestigacion';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GruposinvestigacionService {

  gruposInvestigacionRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/gruposInvestigacion.json';
  gruposInvestigacionURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/gruposInvestigacion/';
  private dbPath = '/gruposInvestigacion';
  gruposInvesRef: AngularFireList<Gruposinvestigacion> = null;

  constructor(private db: AngularFireDatabase, private http: Http ) {
    this.gruposInvesRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Gruposinvestigacion> {
    return this.gruposInvesRef;
  }
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
