import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ArticulosestuService } from "../../../../services/estudiantes/articulos/articulosestu.service";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastrService } from "ngx-toastr";
import { ListadoService } from "../../../../services/estudiantes/listado/listado.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-articulos-estudiantes",
  templateUrl: "./articulos-estudiantes.component.html",
  styleUrls: ["./articulos-estudiantes.component.css"],
})
export class ArticulosEstudiantesComponent implements OnInit {
  filterpost = "";
  indicador = "-";
  page = 1;
  pageSize = 4;
  pageArticulosProfesores = 1;
  pageSizeArticulosProfesores = 5;
  vistaEdicion = false;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  articulosEstudiantes: any[] = [];
  articuloEstudiante: any[] = [];
  loading = true;
  articulos: any[] = [];

  constructor(
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    private lsitadoEstuService: ListadoService,
    private modalService: NgbModal,
    private articulosEstuService: ArticulosestuService
  ) {
    this.lsitadoEstuService.getListados().subscribe((data) => {
      this.articulosEstudiantes = data;
    });
  }
  get sortData() {
    return this.articulos.sort((a, b) => {
      // tslint:disable-next-line:whitespace
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      return <any>new Date(b.anio) - <any>new Date(a.anio);
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
  obtenerArticulosEstudiantes(): void {
    this.articulosEstuService
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

  ngOnInit() {
    this.obtenerArticulosEstudiantes();
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: "sm",
      centered: true,
      backdrop: "static",
    });
  }

  borrarGrupo(key$: string) {
    this.lsitadoEstuService.borrarListado(key$).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        delete this.articuloEstudiante[key$];
        this.modalReference.close();
      }
    });
  }
}
