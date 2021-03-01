import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../services/agenda/agenda.service';
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
  agenda: any[] = [];
  denominacion: any[] = [];
  activ: any[] = [];
  carrusel: any[] = [];
  slides: any = [[]];
  slidesAgenda: any = [[]];
  slidesEstudiante: any = [[]];
  articuloEstudiante: Array<any> = [];
  articulosPro: Array<any> = [];
  // tslint:disable-next-line:no-shadowed-variable
  constructor( public auth: AngularFireAuth, private listadoService: ListadoService, private denominaciionService: DenominacionService, private agendaService: AgendaService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router, private carruselServices: CarruselService, private articulosEstuService: ArticulosestuService, private articulosProService: ArticulosproService, private plantelService: PlantelService ) {
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
    });
    this.plantelService.getPlanteles().subscribe( data => {
      this.plantelProfesores = data;
    });
  }
  ngOnInit() {
  }
  up() {
    window.scroll(0, 400);
  }
}
