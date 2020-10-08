import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tesis',
  templateUrl: './tesis.component.html',
  styleUrls: ['./tesis.component.css']
})
export class TesisComponent implements OnInit {
  listadoTesis: any = [];

  constructor() { }

  ngOnInit() {
    this.listadoTesis.push(
      {
        no: '1',
        // tslint:disable-next-line:max-line-length
        tesis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        autor: 'Autor o Autores',
        director: 'Director de la tesis realizada',
        opc: 'Descarga'
      },
      {
        no: '2',
        // tslint:disable-next-line:max-line-length
        tesis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        autor: 'Autor o Autores',
        director: 'Director de la tesis realizada',
        opc: 'Descarga'
      },
      {
        no: '3',
        // tslint:disable-next-line:max-line-length
        tesis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        autor: 'Autor o Autores',
        director: 'Director de la tesis realizada',
        opc: 'Descarga'
      },
    );
  }

}
