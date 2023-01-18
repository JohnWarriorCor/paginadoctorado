import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Libros } from "../../../interfaces/biblioteca/libros/libros";
import { BibliotecaService } from "../../../services/biblioteca/biblioteca.service";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";

@Component({
  selector: "app-biblioteca-admin",
  templateUrl: "./biblioteca-admin.component.html",
  styleUrls: ["./biblioteca-admin.component.css"],
  providers: [DatePipe],
})
export class BibliotecaAdminComponent implements OnInit {
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
  libro: Libros = {
    fieldArray: [],
  };

  // tslint:disable-next-line:max-line-length
  constructor(
    public auth: AngularFireAuth,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private planEstudioService: BibliotecaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      if (this.id !== "nuevo") {
        this.planEstudioService
          .getLibro(this.id)
          .subscribe((libro) => (this.libro = libro));
      }
    });
  }

  ngOnInit() {
    this.fecha = this.datepipe.transform(this.today, "dd/MM/yyyy");
    this.war = this.libro.fieldArray[0];
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, {
      centered: true,
      size: "sm",
      backdrop: "static",
      windowClass: "fade-in",
    });
  }
  addFieldValue() {
    this.libro.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.libro.fieldArray.splice(index, 1);
  }

  guardar() {
    if (
      this.libro.fieldArray[0] !== this.war ||
      this.libro.fieldArray[0] !== this.war
    ) {
      this.error = false;
      this.modalReference.close();
      if (this.id === "nuevo") {
        this.planEstudioService.nuevoLibro(this.libro).subscribe(
          (data) => {
            this.router.navigate(["/biblioteca"]);
            this.modalReference.close();
          },
          (error) => console.error(error)
        );
      } else {
        this.modalReference.close();
        this.planEstudioService.actualizarLibro(this.libro, this.id).subscribe(
          (data) => {
            this.router.navigate(["/biblioteca"]);
            this.modalReference.close();
          },
          (error) => console.error(error)
        );
      }
    } else {
      this.error = true;
      this.passError = "No puede dejar la historía vacía";
      this.modalReference.close();
    }
  }
  agregarNuevo(forma: NgForm) {
    this.router.navigate(["/admi_biblioteca", "nuevo"]);
    forma.reset({});
  }
}
