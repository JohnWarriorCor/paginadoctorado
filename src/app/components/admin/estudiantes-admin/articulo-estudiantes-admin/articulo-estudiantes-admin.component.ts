import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Articulosestu } from "../../../../interfaces/estudiantes/articulos/articulosestu";
import { ArticulosestuService } from "../../../../services/estudiantes/articulos/articulosestu.service";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-articulo-estudiantes-admin",
  templateUrl: "./articulo-estudiantes-admin.component.html",
  styleUrls: ["./articulo-estudiantes-admin.component.css"],
  providers: [DatePipe],
})
export class ArticuloEstudiantesAdminComponent implements OnInit {
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

  newAttribute: any = {};
  articulosEstu: Articulosestu = {
    anio: "",
    autores: "",
    enlace: "",
    nombreArticulo: "",
    resumen: "",
    revista: "",
  };

  // tslint:disable-next-line:max-line-length
  constructor(
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private articulosEstuService: ArticulosestuService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      if (this.id !== "nuevo") {
        this.articulosEstuService
          .getArticuloEstudiante(this.id)
          .subscribe((articulosEstu) => (this.articulosEstu = articulosEstu));
      }
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

  ngOnInit() {
    this.fecha = this.datepipe.transform(this.today, "dd/MM/yyyy");
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, {
      centered: true,
      size: "sm",
      backdrop: "static",
      windowClass: "fade-in",
    });
  }
  guardar() {
    if (
      this.articulosEstu.nombreArticulo !== this.war ||
      this.articulosEstu.nombreArticulo !== this.war
    ) {
      this.error = false;
      this.modalReference.close();
      if (this.id === "nuevo") {
        this.articulosEstuService
          .nuevoArticuloEstudiante(this.articulosEstu)
          .subscribe(
            (data) => {
              this.showSuccess();
              this.router.navigate(["/articulosEstudiantes"]);
              this.modalReference.close();
            },
            (error) => console.error(error, this.showDanger())
          );
      } else {
        this.modalReference.close();
        this.articulosEstuService
          .actualizarArticuloEstudiante(this.articulosEstu, this.id)
          .subscribe(
            (data) => {
              this.showInfo();
              this.router.navigate(["/articulosEstudiantes"]);
              this.modalReference.close();
            },
            (error) => console.error(error, this.showWarning())
          );
      }
    } else {
      this.error = true;
      this.passError = "No puede dejar la historía vacía";
      this.modalReference.close();
    }
  }
  agregarNuevo(forma: NgForm) {
    this.router.navigate(["/admi_articulosEstudiantes", "nuevo"]);
    forma.reset({});
  }
}
