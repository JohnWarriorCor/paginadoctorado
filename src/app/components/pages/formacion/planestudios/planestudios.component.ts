import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-planestudios',
  templateUrl: './planestudios.component.html',
  styleUrls: ['./planestudios.component.css']
})
export class PlanestudiosComponent implements OnInit, AfterViewInit {
  asignaturas: any = [];
  constructor() { }

  ngOnInit() {
    this.asignaturas.push(
      {
        id: '1',
        asignatura: 'CIENCIAS DE LA SALUD',
        creditos: '6',
      },
      {
        id: '2',
        asignatura: 'SALUD DE POBLACIONES',
        creditos: '5',
      },
      {
        id: '3',
        asignatura: 'MEDICINA TROPICAL',
        creditos: '5',
      },
      {
        id: '4',
        asignatura: 'EPISTEMOLOGÍA DE LA SALUD',
        creditos: '6',
      },
      {
        id: '5',
        asignatura: 'METODOLOGÍA DE LA INVESTIGACIÓN EN CIENCIAS DE LA SALUD: MÉTODOS CUANTITATIVOS',
        creditos: '4',
      },
      {
        id: '6',
        asignatura: 'METODOLOGÍA DE LA INVESTIGACIÓN EN CIENCIAS DE LA SALUD: MÉTODOS CUALITATIVOS',
        creditos: '4',
      },
      {
        id: '7',
        asignatura: 'METODOLOGÍA DE LA INVESTIGACIÓN EN CIENCIAS DE LA SALUD: BIOÉTICA',
        creditos: '2',
      },
      {
        id: '8',
        asignatura: 'PROYECTO DE TESIS I',
        creditos: '10',
      },
      {
        id: '9',
        asignatura: 'COMPONENTE FLEXIBLE DE PROFUNDIZACIÓN I',
        creditos: '6',
      },
      {
        id: '10',
        asignatura: 'PROYECTO DE TESIS II',
        creditos: '8',
      },
      {
        id: '11',
        asignatura: 'COMPONENTE FLEXIBLE DE PROFUNDIZACIÓN II',
        creditos: '7',
      },
      {
        id: '12',
        asignatura: 'TESIS: ELABORACIÓN TESIS',
        creditos: '11',
      },
      {
        id: '13',
        asignatura: 'COMPONENTE FLEXIBLE DE PEDAGOGÍA',
        creditos: '4',
      },
      {
        id: '14',
        asignatura: 'TESIS: ELABORACIÓN TESIS',
        creditos: '10',
      },
      {
        id: '15',
        asignatura: 'TESIS: PASANTIAS',
        creditos: '6',
      },
      {
        id: '16',
        asignatura: 'TESIS: SOCIALIZACIÓN DE RESULTADOS EN EVENTOS CIENTÍFICOS',
        creditos: '4',
      },
      {
        id: '17',
        asignatura: 'TESIS: PREDEFENSA',
        creditos: '12',
      },
      {
        id: '18',
        asignatura: 'TESIS: DEFENSA',
        creditos: '10',
      },
      {
        id: '19',
        asignatura: 'TESIS: REDACCIÓN Y PUBLICACIÓN DE ARTÍCULOS CIENTÍFICOS',
        creditos: '8',
      },
      {
        id: '-',
        asignatura: 'TOTAL',
        creditos: '128',
      },
    );
  }
  ngAfterViewInit(): void {
    (window as any).twttr.widgets.load();
  }

}
