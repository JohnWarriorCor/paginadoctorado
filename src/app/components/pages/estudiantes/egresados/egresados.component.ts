import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-egresados',
  templateUrl: './egresados.component.html',
  styleUrls: ['./egresados.component.css']
})
export class EgresadosComponent implements OnInit {
  profesores2: any = [];
  page = 1;
  pageSize = 4;

  constructor() { }

  ngOnInit() {
    this.profesores2.push(
      {
        id: '1',
        foto: '/assets/pro_null_h.png',
        nombre: 'Nombre de egresado',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Síntesis: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        correo: 'correo@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000574422',
        orcid: 'https://orcid.org/signin',
      },
      );
  }

}
