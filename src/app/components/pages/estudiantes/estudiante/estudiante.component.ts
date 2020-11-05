import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EstudiantesService, Estudiantes } from '../../../../services/estudiantes.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  estudiante: any = {};
  estudiantes: Estudiantes[] = [];
  slides: any = [[]];

  constructor( private activatedRoute: ActivatedRoute, private estudianteService: EstudiantesService, private router: Router) {
    this.activatedRoute.params.subscribe( params => {
      this.estudiante = this.estudianteService.getEstudiante(params.id);
    });
  }
  chunk(arr, chunkSize) {
    // tslint:disable-next-line:prefer-const
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.estudiantes = this.estudianteService.getEstudiantes();
    this.slides = this.chunk(this.estudiantes, 4);
  }
  verProfesor( idx: number ) {
    this.router.navigate(['/estudiante', idx]);
  }
  up() {
    window.scroll(0, 400);
  }
}

