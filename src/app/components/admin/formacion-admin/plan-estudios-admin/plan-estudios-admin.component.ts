import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PlanestudiosService } from "../../../../services/formacion/planestudios/planestudios.service";
import { Planestudios } from "../../../../interfaces/formacion/planestudios/planestudios";
import { Planestudiosresumen } from "../../../../interfaces/formacion/planestudios/planestudiosresumen";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastService } from "../../../../services/toast/toast.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-plan-estudios-admin",
  templateUrl: "./plan-estudios-admin.component.html",
  styleUrls: ["./plan-estudios-admin.component.css"],
  providers: [DatePipe],
})
export class PlanEstudiosAdminComponent implements OnInit {
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
  planEstudio: Planestudios = {
    fieldArray: [],
  };
  planestudiosresumen: Planestudiosresumen = {
    creditoCasillaUno: "",
    creditoCasillaDos: "",
    creditoCasillaTres: "",
    creditoCasillaCuatro: "",
    creditoCasillaCinco: "",
    creditoCasillaSeis: "",
    creditoCasillaSiete: "",
    creditoCasillaOcho: "",
    creditoCasillaNueve: "",
    creditoCasillaDiez: "",
    creditoCasillaTotal: "",
    porcentajeCasillaUno: "",
    porcentajeCasillaDos: "",
    porcentajeCasillaTres: "",
    porcentajeCasillaTotal: "",
  };

  // tslint:disable-next-line:max-line-length
  constructor(
    private myToast: ToastService,
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private planEstudioService: PlanestudiosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      if (this.id !== "nuevo") {
        this.planEstudioService
          .getPlanestudio(this.id)
          .subscribe((planEstudio) => (this.planEstudio = planEstudio));
      }
    });
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      if (this.id !== "nuevo") {
        this.planEstudioService
          .getPlanestudioResumen(this.id)
          .subscribe(
            (planestudiosresumen) =>
              (this.planestudiosresumen = planestudiosresumen)
          );
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
    this.war = this.planEstudio.fieldArray[0];
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
    this.planEstudio.fieldArray.push(this.newAttribute);
    this.elementoAgregado();
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.planEstudio.fieldArray.splice(index, 1);
    this.elementoEliminado();
  }
  guardar() {
    if (
      this.planEstudio.fieldArray[0] !== this.war ||
      this.planEstudio.fieldArray[0] !== this.war
    ) {
      this.error = false;
      this.modalReference.close();
      if (this.id === "nuevo") {
        this.planEstudioService.nuevoPlanestudio(this.planEstudio).subscribe(
          (data) => {
            this.showSuccess();
            this.router.navigate(["/plandeestudios"]);
            this.modalReference.close();
          },
          (error) => console.error(error)
        );
      } else {
        this.modalReference.close();
        this.planEstudioService
          .actualizarPlanestudio(this.planEstudio, this.id)
          .subscribe(
            (data) => {
              this.showInfo();
              this.router.navigate(["/plandeestudios"]);
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
  up() {
    window.scroll(0, 400);
  }
  agregarNuevo(forma: NgForm) {
    this.router.navigate(["/admi_plandeestudios", "nuevo"]);
    forma.reset({});
    this.up();
  }
  guardarResumen() {
    if (
      this.planestudiosresumen.creditoCasillaUno !== this.war ||
      this.planestudiosresumen.creditoCasillaTotal !== this.war
    ) {
      this.error = false;
      this.modalReference.close();
      if (this.id === "nuevo") {
        this.planEstudioService
          .nuevoPlanestudioResumen(this.planestudiosresumen)
          .subscribe(
            (data) => {
              this.showSuccess();
              this.router.navigate(["/plandeestudios"]);
              this.modalReference.close();
            },
            (error) => console.error(error)
          );
      } else {
        this.modalReference.close();
        this.planEstudioService
          .actualizarPlanestudioResumen(this.planestudiosresumen, this.id)
          .subscribe(
            (data) => {
              this.showInfo();
              this.router.navigate(["/plandeestudios"]);
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
}
