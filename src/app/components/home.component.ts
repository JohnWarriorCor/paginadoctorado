import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfesoresService, Profesores } from '../services/profesores.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../services/agenda/agenda.service';
import { EstudiantesService, Estudiantes } from '../services/estudiantes.service';
import { DenominacionService } from '../services/home/denominacion.service';
import { CarruselService } from '../services/home/carrusel/carrusel.service';
import { ArticulosestuService } from '../services/estudiantes/articulos/articulosestu.service';
import { ArticulosproService } from '../services/profesores/articulospro/articulospro.service';
import { ListadoService } from '../services/estudiantes/listado/listado.service';
import { PlantelService } from '../services/profesores/plantel/plantel.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';
import firebase from '@firebase/app';


// tslint:disable-next-line:prefer-const

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  pageEstudiantes = 1;
  pageSizeEstudiantes = 4;
  pageProfesores = 1;
  pageSizeProfesores = 4;
  currentJustify = 'justified';
  g: any;
  today = new Date();
  plantelProfesores: any[] = [];
  listados: any[] = [];
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
  articuloEstudiante: Array<any> = [];
  articulosPro: Array<any> = [];
  // tslint:disable-next-line:no-shadowed-variable
  constructor( public auth: AngularFireAuth, private listadoService: ListadoService, private denominaciionService: DenominacionService, private agendaService: AgendaService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private estudianteService: EstudiantesService, private profesorService: ProfesoresService, private router: Router, private carruselServices: CarruselService, private articulosEstuService: ArticulosestuService, private articulosProService: ArticulosproService, private plantelService: PlantelService ) {
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
    this.articulosEstuService.getArticuloEstudiantes().subscribe( data => {
      this.articuloEstudiante = data;
    });
    this.articulosProService.getArticuloProfesores().subscribe( data => {
      this.articulosPro = data;
    });
    this.listadoService.getListados().subscribe( data => {
      this.listados = data;
      console.log(this.listados);
    });
    this.plantelService.getPlanteles().subscribe( data => {
      this.plantelProfesores = data;
      console.log(this.plantelProfesores);
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
