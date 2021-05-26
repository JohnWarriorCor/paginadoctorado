import { Component, OnInit } from '@angular/core';
import { EventService } from '@crystalui/angular-lightbox';
import { PlantelService } from '../../../../services/profesores/plantel/plantel.service';
import { ListadoService } from '../../../../services/estudiantes/listado/listado.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
})
export class GaleriaComponent implements OnInit {
  profesores: any[] = [];
  estudiantes: any[] = [];
  constructor(
    private eventService: EventService,
    private plantelService: PlantelService,
    public auth: AngularFireAuth,
    private listadoService: ListadoService
  ) {
    const subs = this.eventService.emitter.subscribe((event) => {
      console.log(event);
    });
  }
  obtenerProfesores(): void {
    this.plantelService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.profesores = data;
      });
  }
  obtenerEstudiantes(): void {
    this.listadoService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.estudiantes = data;
      });
  }

  ngOnInit() {
    this.obtenerProfesores();
    this.obtenerEstudiantes();
  }
}
