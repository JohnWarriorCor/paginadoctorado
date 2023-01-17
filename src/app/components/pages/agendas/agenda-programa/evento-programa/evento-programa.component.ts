import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm, FormControl, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Agenda } from "../../../../../interfaces/agenda/agenda";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastrService } from "ngx-toastr";
import { AgendaprogramaService } from "../../../../../services/agenda/agendaprograma.service";
import { FilesService } from "../../../../../services/upload/file.service";

@Component({
  selector: "app-evento-programa",
  templateUrl: "./evento-programa.component.html",
  styleUrls: ["./evento-programa.component.css"],
  providers: [DatePipe],
})
export class EventoProgramaComponent implements OnInit {
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
  agendas: any = {};
  vistaEdicion = false;
  acumFechas = 0;
  comodinAcum = 0;
  loading = true;
  link: any;

  constructor(
    private firebaseStorage: FilesService,
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private agendaServices: AgendaprogramaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.agendas = this.agendaServices.getAgenda(params.id);
      this.link = params.id;
    });
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      if (this.id !== "nuevo") {
        this.agendaServices
          .getAgenda(this.id)
          .subscribe((agenda) => (this.agenda = agenda));
      }
    });
  }
  elementoEliminado() {
    this.toastr.warning("", "Elemento eliminado", {
      timeOut: 2500,
    });
  }
  showDanger() {
    this.toastr.error("Intenten nuevamente", "Error", {
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

  changeImg(urlimg) {
    console.log(urlimg);
    // tslint:disable-next-line:max-line-length
    if (urlimg === "" || urlimg === null) {
      this.defaultImgUrl = urlimg;
      this.alertBool = true;
      this.imgError =
        "No puede dejar un evento sin imagen, por favor inserte un URL correspondiente";
    } else {
      this.alertBool = false;
      this.defaultImgUrl = urlimg;
      return this.defaultImgUrl;
    }
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: "sm",
      centered: true,
      backdrop: "static",
    });
  }
  nav() {
    this.router.navigate(["/admi_agendaPrograma", this.link]);
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
            this.router.navigate(["/agendaPrograma"]);
            this.modalReference.close();
          },
          (error) => console.error(error)
        );
      } else {
        this.modalReference.close();
        this.agendaServices.actualizarAgenda(this.agenda, this.id).subscribe(
          (data) => {
            this.router.navigate(["/agendaPrograma"]);
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
    this.router.navigate(["/admi_agendaPrograma", "nuevo"]);
    forma.reset({});
  }

  borrarAgenda() {
    this.nombreArchivo = "EVENTOS/PROGRAMA/";
    this.firebaseStorage.deleteFileStorage(
      this.nombreArchivo,
      this.agenda[this.link].nameImg
    );
    this.agendaServices.borrarAgenda(this.link).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
        this.showDanger();
      } else {
        delete this.agenda[this.link];
        this.elementoEliminado();
        this.modalReference.close();
        this.router.navigate(["/agendaPrograma"]);
      }
    });
  }
}
