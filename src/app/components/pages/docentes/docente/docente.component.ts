import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfesoresService, Profesores } from '../../../../services/profesores.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  profesor: any = {};
  profesores: Profesores[] = [];

  constructor( private activatedRoute: ActivatedRoute, private profesorService: ProfesoresService, private router: Router) {
    this.activatedRoute.params.subscribe( params => {
      this.profesor = this.profesorService.getProfesor(params.id);
    });
  }
  ngOnInit() {
    this.profesores = this.profesorService.getProfesores();
  }
  verProfesor( idx: number ) {
    this.router.navigate(['/docente', idx]);
  }
}

