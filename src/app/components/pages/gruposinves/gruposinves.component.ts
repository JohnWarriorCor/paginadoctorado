import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-gruposinves',
  templateUrl: './gruposinves.component.html',
  styleUrls: ['./gruposinves.component.css']
})

// tslint:disable-next-line:directive-class-suffix
export class GruposinvesComponent implements OnInit, AfterViewInit {
  gruposInv: any = [];
  constructor() { }

  ngOnInit() {
    this.gruposInv.push(
      {
        id: 'COL0019991',
        nombre: 'Carlos Finlay',
        lider: 'Nicolás Arturo Núñez Gómez',
        clasi: 'A1'
      },
      {
        id: 'COL0024427',
        nombre: 'Mi Dneuropsy',
        lider: 'Efraín Amaya Vargas	',
        clasi: 'A1'
      },
      {
        id: 'COL0014556',
        nombre: 'Parasitología y medicina tropical',
        lider: 'Jairo Antonio Rodríguez Rodríguez	',
        clasi: 'A1'
      },
      {
        id: 'COL0035331',
        nombre: 'Laboratorio de medicina genómica',
        lider: 'Henry Ostos Alfonso',
        clasi: 'A1'
      },
      {
        id: 'COL0088925',
        nombre: 'Neurored',
        lider: 'Jairo Antonio Rodríguez Rodríguez	',
        clasi: 'A1'
      },
      {
        id: 'COL0022253',
        nombre: 'Agroindustria',
        lider: 'Nelson Gutiérrez Guzmán',
        clasi: 'A'
      },
      {
        id: 'COL0029379',
        nombre: 'Cuidar',
        lider: 'Dolly Orfilia Arias	',
        clasi: 'A'
      },
      {
        id: 'COL0022244',
        nombre: 'Ecosistemas sur-colombianos',
        lider: 'Alfredo Olaya Amaya',
        clasi: 'B'
      },
      {
        id: 'COL0001627',
        nombre: 'Culturas, conflictos y subjetividades',
        lider: 'William Fernando Torres S',
        clasi: 'B'
      },
      {
        id: 'COL0044063',
        nombre: 'Nuevas visiones del derecho',
        lider: 'German Alfonso López Daza',
        clasi: 'B'
      },
      {
        id: 'COL0101419',
        nombre: 'Biología de la re-producción',
        lider: 'Manuel García Flórez',
        clasi: 'C'
      },
      {
        id: 'COL0047038',
        nombre: 'Salud y grupos vulnerables',
        lider: 'Claudia Andrea Ramírez',
        clasi: 'D'
      },
    );
  }
  ngAfterViewInit(): void {
    (window as any).twttr.widgets.load();
  }

}
