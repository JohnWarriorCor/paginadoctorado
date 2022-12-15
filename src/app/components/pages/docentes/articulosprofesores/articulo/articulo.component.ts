import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PlantelService } from "../../../../../services/profesores/plantel/plantel.service";
import { Plantel } from "../../../../../interfaces/profesores/plantel/plantel";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastrService } from "ngx-toastr";
import { Articulo } from "../../../../../interfaces/profesores/articulo";
import { ArticulosproService } from "../../../../../services/profesores/articulospro/articulospro.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-articulo",
  templateUrl: "./articulo.component.html",
  styleUrls: ["./articulo.component.css"],
  providers: [DatePipe],
})
export class ArticuloComponent implements OnInit {
  pdfSource =
    "https://drive.google.com/file/d/1unOARuer2zVmdsWISIXgDH-kDgVtgOdg/preview";
  page = 1;
  pageSize = 3;
  pageArticulos = 1;
  pageSizeArticulos = 3;
  pageArticulosProfesores = 1;
  pageSizeArticulosProfesores = 4;
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
  articuloDocente: Articulo = {
    anio: "",
    autores: "",
    enlace: "",
    nombreArticulo: "",
    resumen: "",
    revista: "",
  };
  plantelProfesor: Plantel = {
    foto: "",
    nombre: "",
    sintesis: "",
    fieldArray: [],
    fieldArrayArticulos: [],
    correo: "",
    fecha: "",
    cvlac: "",
    orcid: "",
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
    private plantelService: PlantelService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articulosProService: ArticulosproService
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      console.log(parametros);
      this.id = parametros.id;
      this.idx = parametros.idx;
      this.link = parametros.id;
      if (this.id !== "nuevo") {
      }
      this.articulosProService
        .getArticuloProfesor(this.id)
        .subscribe(
          (articuloDocente) => (this.articuloDocente = articuloDocente)
        );
    });
  }

  get sortData() {
    return this.articulos.sort((a, b) => {
      return <any>new Date(b.anio) - <any>new Date(a.anio);
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

  nav() {
    this.router.navigate(["/admi_articulosProfesores", this.link]);
  }

  ngOnInit() {
    this.fecha = this.datepipe.transform(this.today, "dd/MM/yyyy");
    this.obtenerArticulos();
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
      this.plantelProfesor.nombre !== this.war ||
      this.plantelProfesor.nombre !== this.war
    ) {
      this.error = false;
      console.log(this.plantelProfesor.nombre);
      console.log(this.war);
      this.modalReference.close();
      if (this.id === "nuevo") {
        this.plantelService.nuevoPlantel(this.plantelProfesor).subscribe(
          (data) => {
            this.router.navigate(["/docentes"]);
            this.modalReference.close();
          },
          (error) => console.error(error)
        );
      } else {
        this.modalReference.close();
        this.plantelService
          .actualizarPlantel(this.plantelProfesor, this.id)
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
    this.router.navigate(["/admi_plantel", "nuevo"]);
    forma.reset({});
  }

  borrarPlantel() {
    this.plantelService.borrarPlantel(this.id).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        this.router.navigate(["/docentes"]);
        // delete this.plantelProfesores[this.id];
        this.elementoEliminado();
        this.modalReference.close();
      }
    });
  }
}
