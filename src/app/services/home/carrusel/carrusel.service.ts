import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";
import { Carrusel } from "../../../interfaces/home/carrusel/carrusel";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class CarruselService {
  carruselRegistroURL =
    "https://doctoradocienciasdelasaludusco.firebaseio.com/carrusel.json";
  carruselURL =
    "https://doctoradocienciasdelasaludusco.firebaseio.com/carrusel/";
  private dbPath = "/carrusel";
  carruselRef: AngularFireList<Carrusel> = null;

  constructor(private db: AngularFireDatabase, private http: Http) {
    this.carruselRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Carrusel> {
    return this.carruselRef;
  }

  nuevoCarrusel(carrusel: Carrusel) {
    const body = JSON.stringify(carrusel);
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    return this.http.post(this.carruselRegistroURL, body, { headers }).pipe(
      map((res) => {
        console.log(res.json());
        return res.json();
      })
    );
  }

  actualizarCarrusel(carrusel: Carrusel, key$: string) {
    const body = JSON.stringify(carrusel);
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const url = `${this.carruselURL}/${key$}.json`;

    return this.http.put(url, body, { headers }).pipe(
      map((res) => {
        console.log(res.json());
        return res.json();
      })
    );
  }

  getCarrusel(key$: string) {
    const url = `${this.carruselURL}/${key$}.json`;
    return this.http.get(url).pipe(map((res) => res.json()));
  }
  
  getCarruseles() {
    return this.http
      .get(this.carruselRegistroURL)
      .pipe(map((res) => res.json()));
  }

  borrarCarrusel(key$: string) {
    const url = `${this.carruselURL}/${key$}.json`;
    return this.http.delete(url).pipe(map((res) => res.json()));
  }
}
