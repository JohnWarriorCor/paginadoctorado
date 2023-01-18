import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ArticulosproService } from "../../../../services/profesores/articulospro/articulospro.service";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastrService } from "ngx-toastr";
import { PlantelService } from "../../../../services/profesores/plantel/plantel.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-articulos-docentes",
  templateUrl: "./articulos-docentes.component.html",
  styleUrls: ["./articulos-docentes.component.css"],
})
export class ArticulosDocentesComponent implements OnInit {
  filterpost = "";
  indicador = "-";
  page = 1;
  pageSize = 2;
  pageArticulos = 1;
  pageSizeArticulos = 2;
  pageArticulosProfesores = 1;
  pageSizeArticulosProfesores = 6;
  agenda: any[] = [];
  plantelProfesores: any[] = [];

  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  loading = true;

  profesores: any[] = [];
  articulos: any[] = [];
  actualProfesor = null;
  actualArticulo = null;
  eventos: any[] = [];
  actualEvento = null;
  actualIndex = -1;
  eventosPrograma: any[] = [];
  eventosInstitucional: any[] = [];

  constructor(
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    private modalService: NgbModal,
    private plantelService: PlantelService,
    private articulosProService: ArticulosproService
  ) {
    this.plantelService.getPlanteles().subscribe((data) => {
      this.plantelProfesores = data;
    });
  }
  get sortData() {
    return this.articulos.sort((a, b) => {
      // tslint:disable-next-line:whitespace
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      return <any>new Date(b.anio) - <any>new Date(a.anio);
    });
  }

  showSuccess() {
    this.toastr.success("Acción exitosa", "Elemento guardado", {
      timeOut: 2500,
    });
  }

  showDanger() {
    this.toastr.error("Intenten nuevamente", "Error al guardar", {
      timeOut: 2500,
    });
  }

  showInfo() {
    this.toastr.info("", "Elemento actualizado", {
      timeOut: 2500,
    });
  }

  showWarning() {
    this.toastr.warning("Intenten nuevamente", "Error al actualizar", {
      timeOut: 2500,
    });
  }

  elementoAgregado() {
    this.toastr.info("", "Elemento agregado", {
      timeOut: 2500,
    });
  }

  elementoEliminado() {
    this.toastr.warning("", "Elemento eliminado", {
      timeOut: 2500,
    });
  }

  refresh() {
    window.location.reload();
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, {
      centered: true,
      size: "sm",
      backdrop: "static",
      windowClass: "fade-in",
    });
  }

  ngOnInit() {
    this.obtenerProfesores();
    this.obtenerArticulos();
  }
  refreshList(): void {
    this.actualProfesor = null;
    this.actualIndex = -1;
    this.obtenerProfesores();
  }
  setActiveTutorial(evento, index): void {
    this.actualProfesor = evento;
    this.actualIndex = index;
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
      });
  }
  obtenerArticulos(): void {
    this.articulosProService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.articulos = data;
      });
  }

  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: "sm",
      centered: true,
      backdrop: "static",
    });
  }

  borrarPlantel(key$: string) {
    this.plantelService.borrarPlantel(key$).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        delete this.plantelProfesores[key$];
        this.elementoEliminado();
        this.modalReference.close();
      }
    });
  }
}
