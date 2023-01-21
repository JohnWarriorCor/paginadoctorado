import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm, FormControl, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CarruselService } from "../../../../services/home/carrusel/carrusel.service";
import { Carrusel } from "../../../../interfaces/home/carrusel/carrusel";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastrService } from "ngx-toastr";
import { FilesService } from "../../../../services/upload/file.service";
import { NgbProgressbarConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-carrusel-admin",
  templateUrl: "./carrusel-admin.component.html",
  styleUrls: ["./carrusel-admin.component.css"],
  providers: [DatePipe, NgbProgressbarConfig],
})
export class CarruselAdminComponent implements OnInit {
  today = new Date();
  fecha: any;
  closeResult: string;
  defaultImgUrl: any;
  urlImage: any;
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
  carrusel: Carrusel = {
    titulo: "",
    urlImg: "",
    nameImg: "",
    urlInfo: "",
    fecha: "",
    info: "",
    estado: 1,
  };

  // CARGA DE ARCHIVOS A FIRESTORE CONTENIDO CURRICULAR
  public mensajeArchivo = "No hay ningún archivo";
  public datosFormulario = new FormData();
  public nombreArchivo = "";
  public URLPublica = "";
  public porcentaje = 0;
  public finalizado = false;
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  constructor(
    private firebaseStorage: FilesService,
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private carruselServices: CarruselService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      if (this.id !== "nuevo") {
        this.carruselServices
          .getCarrusel(this.id)
          .subscribe((carrusel) => (this.carrusel = carrusel));
      }
    });
  }

  ngOnInit() {
    this.war = this.carrusel.titulo;
    if (this.carrusel.urlImg === null || this.carrusel.urlImg === "") {
      // tslint:disable-next-line:max-line-length
      this.defaultImgUrl =
        "https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/NO%20MODIFICAR%2Fcarrusel_prueba.jpg?alt=media&token=b2e86559-cf35-4541-9cf6-9b81415817ab";
      this.carrusel.urlImg = this.defaultImgUrl;
      return this.carrusel.urlImg;
    }
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

  changeImg(urlImage) {
    console.log(urlImage);
    // tslint:disable-next-line:max-line-length
    if (urlImage === "" || urlImage === null) {
      this.defaultImgUrl = urlImage;
      this.alertBool = true;
      this.imgError =
        "No puede dejar un evento sin imagen, por favor inserte un URL correspondiente";
    } else {
      this.alertBool = false;
      this.defaultImgUrl = urlImage;
      return this.defaultImgUrl;
    }
  }

  guardar() {
    if (
      this.carrusel.titulo !== this.war ||
      this.carrusel.titulo !== this.war
    ) {
      this.error = false;
      console.log(this.carrusel.titulo);
      console.log(this.war);
      this.modalReference.close();
      if (this.id === "nuevo") {
        this.carruselServices.nuevoCarrusel(this.carrusel).subscribe(
          (data) => {
            this.showSuccess();
            this.router.navigate(["/admi_carrusel"]);
            this.modalReference.close();
          },
          (error) => console.error(error, this.showDanger())
        );
      } else {
        this.modalReference.close();
        this.carruselServices
          .actualizarCarrusel(this.carrusel, this.id)
          .subscribe(
            (data) => {
              this.showInfo();
              this.router.navigate(["/admi_carrusel"]);
              this.modalReference.close();
            },
            (error) => console.error(error, this.showWarning())
          );
      }
    } else {
      this.error = true;
      this.passError = "Formulario incompleto.";
      this.modalReference.close();
    }
  }
  

  agregarNuevo(forma: NgForm) {
    this.router.navigate(["/admi-carrusel", "nuevo"]);
    forma.reset({});
  }
  // Función para subir el archivo a Cloud Storage referenciado con la ruta de acceso
  subirArchivo() {
    this.carrusel.nameImg = this.nombreArchivo;
    this.nombreArchivo = "CARRUSEL/" + this.nombreArchivo;
    const archivo = this.datosFormulario.get("archivo");
    const referencia = this.firebaseStorage.referenciaCloudStorage(
      this.nombreArchivo
    );
    const cargar = this.firebaseStorage.cargarCloudStorage(
      this.nombreArchivo,
      archivo
    );
    // Cambia el porcentaje
    cargar.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje === 100) {
        setTimeout(() => {
          referencia.getDownloadURL().subscribe((URL) => {
            this.URLPublica = URL;
            this.finalizado = true;
            this.carrusel.urlImg = this.URLPublica;
            return [this.URLPublica, this.finalizado, this.carrusel.urlImg];
          });
        }, 2000);
        this.archivoSuccess();
      }
    });
  }
  // Evento que gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete("archivo");
        this.datosFormulario.append(
          "archivo",
          event.target.files[i],
          event.target.files[i].name
        );
      }
    } else {
      this.mensajeArchivo = "No hay un archivo seleccionado";
    }
  }

  // NOTIFICACIONES

  showSuccess() {
    this.toastr.success("Acción exitosa", "Elemento guardado", {
      timeOut: 2500,
    });
  }

  archivoSuccess() {
    this.toastr.success("Acción exitosa", "Elemento subido", {
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
}
