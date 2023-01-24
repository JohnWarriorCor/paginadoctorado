import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastrService } from "ngx-toastr";
import { Articulo } from "../../../../../interfaces/profesores/articulo";
import { Egresados } from "../../../../../interfaces/estudiantes/egresados/egresados";
import { EgresadosService } from "../../../../../services/estudiantes/egresados/egresados.service";

@Component({
  selector: "app-articulo-egresados",
  templateUrl: "./articulo-egresados.component.html",
  styleUrls: ["./articulo-egresados.component.css"],
  providers: [DatePipe],
})
export class ArticuloEgresadosComponent implements OnInit {
  pdfSource =
    "https://drive.google.com/file/d/1unOARuer2zVmdsWISIXgDH-kDgVtgOdg/preview";
  page = 1;
  pageSize = 3;
  pageArticulos = 1;
  pageSizeArticulos = 3;
  today = new Date();
  fecha: any;
  closeResult: string;
  defaultImgUrl: any;
  urlimg: any;
  war: any;
  modalReference: any;
  error = false;
  passError = "";
  imgError = "";
  alertBool = false;
  forma: FormGroup;
  controls: any;
  nuevo = false;
  id: string;
  idx: string;
  newAttribute: any = {};
  articulos: any = [];
  articuloEstudiante: Articulo = {
    anio: "",
    autores: "",
    enlace: "",
    nombreArticulo: "",
    resumen: "",
    revista: "",
  };
  listadoEstudiantes: Egresados = {
    foto: "",
    codigo: 0,
    nombre: "",
    sintesis: "",
    fieldArray: [],
    fieldArrayArticulos: [],
    correo: "",
    fecha: "",
    cvlac: "",
    orcid: "",
    estado: 0,
  };
  slides: any = [[]];

  vistaEdicion = false;
  acumFechas = 0;
  comodinAcum = 0;
  loading = true;
  link: any;

  constructor(
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private egresadoService: EgresadosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      console.log(parametros);
      this.id = parametros.id;
      this.idx = parametros.idx;
      this.link = parametros.id;
      if (this.id !== "nuevo") {
        this.egresadoService
          .getEgresado(this.id)
          .subscribe(
            (listadoEstudiantes) =>
              (this.listadoEstudiantes = listadoEstudiantes)
          );
      }
      this.egresadoService
        .getArticuloEgresado(this.id, this.idx)
        .subscribe(
          (articuloEstudiante) => (this.articuloEstudiante = articuloEstudiante)
        );
    });
  }
  nav() {
    this.router.navigate(["/admi-egresados", this.link]);
  }
  ngOnInit() {
    this.fecha = this.datepipe.transform(this.today, "dd/MM/yyyy");
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
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, {
      centered: true,
      size: "sm",
      backdrop: "static",
      windowClass: "fade-in",
    });
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: "sm",
      centered: true,
      backdrop: "static",
    });
  }
  verProfesor(idx: number) {
    this.router.navigate(["/docente", idx]);
  }
  up() {
    window.scroll(0, 400);
  }
  guardar() {
    if (
      this.listadoEstudiantes.nombre !== this.war ||
      this.listadoEstudiantes.nombre !== this.war
    ) {
      this.error = false;
      console.log(this.listadoEstudiantes.nombre);
      console.log(this.war);
      this.modalReference.close();
      if (this.id === "nuevo") {
        this.egresadoService.nuevoEgresado(this.listadoEstudiantes).subscribe(
          (data) => {
            this.router.navigate(["/docentes"]);
            this.modalReference.close();
          },
          (error) => console.error(error)
        );
      } else {
        this.modalReference.close();
        this.egresadoService
          .actualizarEgresado(this.listadoEstudiantes, this.id)
          .subscribe(
            (data) => {
              this.router.navigate(["/docentes"]);
              this.modalReference.close();
            },
            (error) => console.error(error)
          );
      }
    } else {
      this.error = true;
      this.passError = "Formulario incompleto.";
      this.modalReference.close();
    }
  }
  agregarNuevo(forma: NgForm) {
    this.router.navigate(["/admi-egresadoss", "nuevo"]);
    forma.reset({});
  }
  borrarPlantel() {
    this.egresadoService.borrarEgresado(this.id).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        this.router.navigate(["/egresados"]);
        // delete this.plantelProfesores[this.id];
        this.elementoEliminado();
        this.modalReference.close();
      }
    });
  }
}
