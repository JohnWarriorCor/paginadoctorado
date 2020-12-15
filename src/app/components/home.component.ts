import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfesoresService, Profesores } from '../services/profesores.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../services/agenda/agenda.service';
import { EstudiantesService, Estudiantes } from '../services/estudiantes.service';
import { DenominacionService } from '../services/home/denominacion.service';
import { CarruselService } from '../services/home/carrusel/carrusel.service';


// tslint:disable-next-line:prefer-const

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  currentJustify = 'justified';
  g: any;
  today = new Date();
  profesor: any = {};
  estudiante: any = {};
  agenda: any[] = [];
  denominacion: any[] = [];
  activ: any[] = [];
  profesores: Profesores[] = [];
  estudiantes: Estudiantes[] = [];
  carrusel: any[] = [];
  slides: any = [[]];
  slidesAgenda: any = [[]];
  slidesEstudiante: any = [[]];
  // tslint:disable-next-line:max-line-length
  constructor(private denominaciionService: DenominacionService, private agendaService: AgendaService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private estudianteService: EstudiantesService, private profesorService: ProfesoresService, private router: Router, private carruselServices: CarruselService) {
    this.activatedRoute.params.subscribe( params => {
      this.profesor = this.profesorService.getProfesor(params.id);
    });
    this.activatedRoute.params.subscribe( params => {
      this.estudiante = this.estudianteService.getEstudiante(params.id);
    });
    this.agendaService.getAgendas().subscribe( data => {
      this.agenda = data;
    });
    this.denominaciionService.getDenominaciones().subscribe( data => {
      this.denominacion = data;
    });
    this.carruselServices.getCarruseles().subscribe( data => {
      this.carrusel = data;
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
  chunkEstudiante(arr, chunkSize) {
    // tslint:disable-next-line:prefer-const
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  chunkAgenda(arr, chunkSize) {
    // tslint:disable-next-line:prefer-const
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.profesores = this.profesorService.getProfesores();
    this.estudiantes = this.estudianteService.getEstudiantes();
    this.slides = this.chunk(this.profesores, 4);
    this.slidesEstudiante = this.chunkEstudiante(this.estudiantes, 4);
    this.slidesAgenda = this.chunkAgenda(this.activ, 2);
  }
  verProfesor( idx: number ) {
    this.router.navigate(['/docente', idx]);
  }
  verEstudiante( idx: number ) {
    this.router.navigate(['/estudiante', idx]);
  }
  up() {
    window.scroll(0, 400);
  }
}
