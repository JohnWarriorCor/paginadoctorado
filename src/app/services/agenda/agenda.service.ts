import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Agenda } from '../../interfaces/agenda/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  agendaRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/agenda.json';
  agendaURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/agenda/';

  constructor( private http: Http ) { }

  nuevoAgenda( agenda: Agenda) {
    const body = JSON.stringify(agenda);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.agendaRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarAgenda( agenda: Agenda, key$: string ) {
    const body = JSON.stringify(agenda);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.agendaURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getAgenda(key$: string) {
    const url = `${ this.agendaURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getAgendas() {
    return this.http.get( this.agendaRegistroURL ).pipe(map(res => res.json()));
  }
  borrarAgenda( key$: string) {
    const url = `${ this.agendaURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
