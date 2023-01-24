import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DenominacionService } from "../services/home/denominacion.service";
import { CarruselService } from "../services/home/carrusel/carrusel.service";
import { ArticulosestuService } from "../services/estudiantes/articulos/articulosestu.service";
import { ArticulosproService } from "../services/profesores/articulospro/articulospro.service";
import { ListadoService } from "../services/estudiantes/listado/listado.service";
import { PlantelService } from "../services/profesores/plantel/plantel.service";
import { EgresadosService } from "../services/estudiantes/egresados/egresados.service";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { map } from "rxjs/operators";
import { AgendaprogramaService } from "../services/agenda/agendaprograma.service";
import { AgendainstitucionalService } from "../services/agenda/agendainstitucional.service";
import { CountUp } from "countup.js";

// tslint:disable-next-line:prefer-const

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  pageEstudiantes = 1;
  pageSizeEstudiantes = 3;
  pageEgresados = 1;
  pageSizeEgresados = 3;
  pageProfesores = 1;
  pageSizeProfesores = 3;
  currentJustify = "justified";
  g: any;
  today = new Date();
  egresadosPrograma: any[] = [];
  plantelProfesores: any[] = [];
  profesores: any[] = [];
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
  eventosPrograma: any[] = [];
  eventosInstitucionales: any[] = [];
  actualEvento = null;
  actualIndex = -1;
  estudiantes: any[] = [];
  //countUp = new CountUp('countEst', 1000, { enableScrollSpy: true });

  countEst: number;
  countDoc: number;
  countEgr: number;
  countCre: number;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(
    public auth: AngularFireAuth,
    private listadoService: ListadoService,
    private denominaciionService: DenominacionService,
    private agendaProgramaService: AgendaprogramaService,
    private agendaInstitucionalService: AgendainstitucionalService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private carruselServices: CarruselService,
    private articulosEstuService: ArticulosestuService,
    private articulosProService: ArticulosproService,
    private plantelService: PlantelService,
    private egresadosService: EgresadosService
  ) {
    this.agendaProgramaService.getAgendas().subscribe((data) => {
      this.agenda = data;
    });
    /* this.denominaciionService.getDenominaciones().subscribe((data) => {
      this.denominacion = data;
    }); */
    /* this.carruselServices.getCarruseles().subscribe((data) => {
      this.carrusel = data;
    }); */
    this.articulosEstuService.getArticuloEstudiantes().subscribe((data) => {
      this.articuloEstudiante = data;
    });
    this.articulosProService.getArticuloProfesores().subscribe((data) => {
      this.articulosPro = data;
    });
   /*  this.listadoService.getListados().subscribe((data) => {
      this.listados = data;
    });
    this.plantelService.getPlanteles().subscribe((data) => {
      this.plantelProfesores = data;
    });
    this.egresadosService.getEgresados().subscribe((data) => {
      this.egresadosPrograma = data;
    }); */
  }

  ngOnInit() {
    this.obtenerEventosPrograma();
    this.obtenerEventosInstitucionales();
    this.obtenerEstudiantes();
    this.obtenerProfesores();
    this.obtenerCarrusel();
    this.obtenerDenominacion();
    this.obtenerEgresados();
  }

  obtenerCarrusel(): void {
    this.carruselServices
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.carrusel = data;
      });
  }

  obtenerDenominacion() {
    this.denominaciionService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.denominacion = data;
        setTimeout(() => {
          let temp: number =+data[0].numCreditos;
          this.countCre = temp;
        }, 2000);
      });
  }

  get sortDataCarrusel() {
    return this.carrusel.sort((a, b) => {
      return <any>new Date(b.fecha) - <any>new Date(a.fecha);
    });
  }

  obtenerProfesores(): void {
    this.plantelService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.profesores = data;
        setTimeout(() => {
          this.countDoc = data.length;
        }, 2000);
        console.log(data.length);
      });
  }

  get sortDataDocentes() {
    return this.profesores.sort((a, b) => {
      return <any>new Date(b.fecha) - <any>new Date(a.fecha);
    });
  }

  obtenerEstudiantes(): void {
    this.listadoService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.estudiantes = data;
        setTimeout(() => {
          this.countEst = data.length;
        }, 2000);
      });
  }

  obtenerEgresados(): void {
    this.egresadosService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.egresadosPrograma = data;
        setTimeout(() => {
          this.countEgr = data.length;
        }, 2000);
      });
  }

  obtenerEventosPrograma(): void {
    this.agendaProgramaService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.eventosPrograma = data;
      });
  }
  obtenerEventosInstitucionales(): void {
    this.agendaInstitucionalService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.eventosInstitucionales = data;
      });
  }
  get sortDataEventoPrograma() {
    return this.eventosPrograma.sort((a, b) => {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      return <any>new Date(b.fechaEvento) - <any>new Date(a.fechaEvento);
    });
  }
  get sortDataEventoInstitucional() {
    return this.eventosInstitucionales.sort((a, b) => {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      return <any>new Date(b.fechaEvento) - <any>new Date(a.fechaEvento);
    });
  }

  up() {
    window.scroll(0, 400);
  }
}
