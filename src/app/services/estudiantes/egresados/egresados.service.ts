import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Egresados } from '../../../interfaces/estudiantes/egresados/egresados';

@Injectable({
  providedIn: 'root'
})
export class EgresadosService {
  egresadoRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/listadoEgresados.json';
  egresadoURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/listadoEgresados/';
  private dbPath = '/listadoEgresados';
  listadoRef: AngularFireList<Egresados> = null;

  constructor(private db: AngularFireDatabase, private http: Http ) {
    this.listadoRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Egresados> {
    return this.listadoRef;
  }

  nuevoEgresado( listado: Egresados) {
    const body = JSON.stringify(listado);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.egresadoRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarEgresado( listado: Egresados, key$: string ) {
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
