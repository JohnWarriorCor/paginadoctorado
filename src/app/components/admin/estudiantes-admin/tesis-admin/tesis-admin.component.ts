import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Tesis } from "../../../../interfaces/estudiantes/tesis/tesis";
import { TesisService } from "../../../../services/estudiantes/tesis/tesis.service";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastService } from "../../../../services/toast/toast.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-tesis-admin",
  templateUrl: "./tesis-admin.component.html",
  styleUrls: ["./tesis-admin.component.css"],
  providers: [DatePipe],
})
export class TesisAdminComponent implements OnInit {
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
  tesis: Tesis = {
    fieldArray: [],
  };

  // tslint:disable-next-line:max-line-length
  constructor(
    private myToast: ToastService,
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private tesisService: TesisService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      if (this.id !== "nuevo") {
        this.tesisService
          .getTesi(this.id)
          .subscribe((tesis) => (this.tesis = tesis));
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
    this.war = this.tesis.fieldArray[0];
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
    this.tesis.fieldArray.push(this.newAttribute);
    this.elementoAgregado();
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.tesis.fieldArray.splice(index, 1);
    this.elementoEliminado();
  }
  guardar() {
    if (
      this.tesis.fieldArray[0] !== this.war ||
      this.tesis.fieldArray[0] !== this.war
    ) {
      this.error = false;
      this.modalReference.close();
      if (this.id === "nuevo") {
        this.tesisService.nuevoTesi(this.tesis).subscribe(
          (data) => {
            this.router.navigate(["/tesis"]);
            this.modalReference.close();
          },
          (error) => console.error(error, this.showDanger())
        );
      } else {
        this.modalReference.close();
        this.tesisService.actualizarTesi(this.tesis, this.id).subscribe(
          (data) => {
            this.router.navigate(["/tesis"]);
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
    this.router.navigate(["/admi_tesis", "nuevo"]);
    forma.reset({});
  }
}
