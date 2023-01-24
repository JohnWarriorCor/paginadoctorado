import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";
import { Denominacion } from "../../interfaces/home/denominacion";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class DenominacionService {
  denominacionRegistroURL =
    "https://doctoradocienciasdelasaludusco.firebaseio.com/denominacion.json";
  denominacionURL =
    "https://doctoradocienciasdelasaludusco.firebaseio.com/denominacion/";
  private dbPath = "/denominacion";
  denominacionRef: AngularFireList<Denominacion> = null;

  constructor(private db: AngularFireDatabase, private http: Http) {
    this.denominacionRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Denominacion> {
    return this.denominacionRef;
  }

  nuevoDenominacion(denominacion: Denominacion) {
    const body = JSON.stringify(denominacion);
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    return this.http.post(this.denominacionRegistroURL, body, { headers }).pipe(
      map((res) => {
        console.log(res.json());
        return res.json();
      })
    );
  }
  actualizarDenominacion(denominacion: Denominacion, key$: string) {
    const body = JSON.stringify(denominacion);
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const url = `${this.denominacionURL}/${key$}.json`;

    return this.http.put(url, body, { headers }).pipe(
      map((res) => {
        console.log(res.json());
        return res.json();
      })
    );
  }
  getDenominacion(key$: string) {
    const url = `${this.denominacionURL}/${key$}.json`;
    return this.http.get(url).pipe(map((res) => res.json()));
  }
  getDenominaciones() {
    return this.http
      .get(this.denominacionRegistroURL)
      .pipe(map((res) => res.json()));
  }
  borrarDenominacion(key$: string) {
    const url = `${this.denominacionURL}/${key$}.json`;
    return this.http.delete(url).pipe(map((res) => res.json()));
  }
}
