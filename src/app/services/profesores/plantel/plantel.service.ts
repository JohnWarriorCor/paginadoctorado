import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Plantel } from '../../../interfaces/profesores/plantel/plantel';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PlantelService {
  plantelRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/plantelProfesores.json';
  plantelURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/plantelProfesores/';
  private dbPath = '/plantelProfesores';
  plantelRef: AngularFireList<Plantel> = null;


  constructor(private db: AngularFireDatabase, private http: Http ) {
    this.plantelRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Plantel> {
    return this.plantelRef;
  }
  nuevoPlantel( plantelProfesores: Plantel) {
    const body = JSON.stringify(plantelProfesores);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.plantelRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarPlantel( plantelProfesores: Plantel, key$: string ) {
    const body = JSON.stringify(plantelProfesores);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.plantelURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getPlantel(key$: string) {
    const url = `${ this.plantelURL }/${ key$ }.json`;
    console.log(`${ this.plantelURL }/${ key$ }/${'fieldArrayArticulos'}/${'0'}.json`);
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getArticuloProfesor(key$: string, idx$: string) {
    const url = `${ this.plantelURL }/${ key$ }/${'fieldArrayArticulos'}/${idx$}.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getPlanteles() {
    return this.http.get( this.plantelRegistroURL ).pipe(map(res => res.json()));
  }
  borrarPlantel( key$: string) {
    const url = `${ this.plantelURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
