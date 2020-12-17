import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Planestudios } from '../../../interfaces/formacion/planestudios/planestudios';

@Injectable({
  providedIn: 'root'
})
export class PlanestudiosService {

  planestudioRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/planestudio.json';
  planestudioURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/planestudio/';

  constructor( private http: Http ) { }

  nuevoPlanestudio( planestudio: Planestudios) {
    const body = JSON.stringify(planestudio);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.planestudioRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarPlanestudio( planestudio: Planestudios, key$: string ) {
    const body = JSON.stringify(planestudio);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.planestudioURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getPlanestudio(key$: string) {
    const url = `${ this.planestudioURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getPlanestudios() {
    return this.http.get( this.planestudioRegistroURL ).pipe(map(res => res.json()));
  }
  borrarPlanestudio( key$: string) {
    const url = `${ this.planestudioURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
