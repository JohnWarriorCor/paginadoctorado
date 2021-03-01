import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Agenda } from '../../interfaces/agenda/agenda';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  agendaRegistroURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/agenda.json';
  agendaURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/agenda/';
  private dbPath = '/agenda';
  agendaRef: AngularFireList<Agenda> = null;

  constructor(private db: AngularFireDatabase, private http: Http ) {
    this.agendaRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Agenda> {
    return this.agendaRef;
  }
  nuevoAgenda( agenda: Agenda) {
    const body = JSON.stringify(agenda);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.agendaRegistroURL, body, {headers} ).pipe(map(res => {
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
