import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm, FormControl, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Agenda } from "../../../../interfaces/agenda/agenda";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastrService } from "ngx-toastr";
import { AgendainstitucionalService } from "../../../../services/agenda/agendainstitucional.service";
import { NgbProgressbarConfig } from "@ng-bootstrap/ng-bootstrap";
import { FilesService } from "../../../../services/upload/file.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-evento-institucional-admin",
  templateUrl: "./evento-institucional-admin.component.html",
  styleUrls: ["./evento-institucional-admin.component.css"],
  providers: [DatePipe, NgbProgressbarConfig],
})
export class EventoInstitucionalAdminComponent implements OnInit {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "0",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    sanitize: false,
    toolbarPosition: "top",
  };
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
  agenda: Agenda = {
    titulo: "",
    img: "",
    nameImg: "",
    resenia: "",
    parrafo: "",
    fechaEvento: "",
    fechaPublicacion: "",
    url: "",
  };
  // CARGA DE ARCHIVOS A FIRESTORE CONTENIDO CURRICULAR
  public mensajeArchivo = "No hay un archivo";
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
    private agendaServices: AgendainstitucionalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      if (this.id !== "nuevo") {
        this.agendaServices
          .getAgenda(this.id)
          .subscribe((agenda) => (this.agenda = agenda));
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
  imgChange() {
    this.toastr.info("", "Imagen cambiada con éxito", {
      timeOut: 2500,
    });
  }
  imgNone() {
    this.toastr.error(
      "No puede dejar un evento sin imagen, por favor inserte un URL correspondiente",
      "Error",
      {
        timeOut: 2500,
      }
    );
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
    this.war = this.agenda.titulo;
    if (this.agenda.img === null || this.agenda.img === "") {
      // tslint:disable-next-line:max-line-length
      this.defaultImgUrl =
        "https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/NO%20MODIFICAR%2Fcomunicado.png?alt=media&token=aa7d3518-ad8f-41dc-bbb4-9bf7ea615b51";
      this.agenda.img = this.defaultImgUrl;
      return this.agenda.img;
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

  changeImg(urlimg) {
    console.log(urlimg);
    // tslint:disable-next-line:max-line-length
    if (urlimg === "" || urlimg === null) {
      this.defaultImgUrl = urlimg;
      this.alertBool = true;
      this.imgNone();
    } else {
      this.alertBool = false;
      this.defaultImgUrl = urlimg;
      this.imgChange();
      return this.defaultImgUrl;
    }
  }

  guardar() {
    if (this.agenda.titulo !== this.war || this.agenda.titulo !== this.war) {
      this.error = false;
      console.log(this.agenda.titulo);
      console.log(this.war);
      this.modalReference.close();
      if (this.id === "nuevo") {
        this.agendaServices.nuevoAgenda(this.agenda).subscribe(
          (data) => {
            this.showSuccess();
            this.router.navigate(["/agendaInstitucional"]);
            this.modalReference.close();
          },
          (error) => console.error(error, this.showDanger())
        );
      } else {
        this.modalReference.close();
        this.agendaServices.actualizarAgenda(this.agenda, this.id).subscribe(
          (data) => {
            this.showInfo();
            this.router.navigate(["/agendaInstitucional"]);
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
    this.router.navigate(["/admi_agenda", "nuevo"]);
    forma.reset({});
  }
  // Función para subir el archivo a Cloud Storage referenciado con la ruta de acceso
  subirArchivo() {
    this.agenda.nameImg = this.nombreArchivo;
    this.nombreArchivo = "EVENTOS/INSTITUCIONALES/" + this.nombreArchivo;
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
            this.agenda.img = this.URLPublica;
            return [this.URLPublica, this.finalizado, this.agenda.img];
          });
        }, 2000);
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
}
