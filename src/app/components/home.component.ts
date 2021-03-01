import { Component, OnInit} from '@angular/core';
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
import 'firebase/auth';
import { map } from 'rxjs/operators';


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
  eventos: any;
  actualEvento = null;
  actualIndex = -1;
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
  obtenerEventos(): void {
    this.agendaService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.eventos = data;
    });
  }
  get sortDataEvento() {
    return this.eventos.sort((a, b) => {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      return <any> new Date(b.fechaEvento) - <any> new Date(a.fechaEvento);
    });
  }
  ngOnInit() {
    this.obtenerEventos();
  }
  up() {
    window.scroll(0, 400);
  }
}
