import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Libros } from '../../interfaces/biblioteca/libros/libros';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class BibliotecaService {
  librosRegistroURL =
    'https://doctoradocienciasdelasaludusco.firebaseio.com/libros.json';
  librosURL = 'https://doctoradocienciasdelasaludusco.firebaseio.com/libros/';
  private dbPath = '/libros';
  gruposInvesRef: AngularFireList<Libros> = null;

  constructor(private db: AngularFireDatabase, private http: Http) {
    this.gruposInvesRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Libros> {
    return this.gruposInvesRef;
  }
  nuevoLibro(libros: Libros) {
    const body = JSON.stringify(libros);
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.librosRegistroURL, body, { headers }).pipe(
      map((res) => {
        console.log(res.json());
        return res.json();
      })
    );
  }
  actualizarLibro(libros: Libros, key$: string) {
    const body = JSON.stringify(libros);
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    const url = `${this.librosURL}/${key$}.json`;

    return this.http.put(url, body, { headers }).pipe(
      map((res) => {
        console.log(res.json());
        return res.json();
      })
    );
  }
  getLibro(key$: string) {
    const url = `${this.librosURL}/${key$}.json`;
    return this.http.get(url).pipe(map((res) => res.json()));
  }
  getLibros() {
    return this.http.get(this.librosRegistroURL).pipe(map((res) => res.json()));
  }
  borrarLibro(key$: string) {
    const url = `${this.librosURL}/${key$}.json`;
    return this.http.delete(url).pipe(map((res) => res.json()));
  }
}
