import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import "firebase/auth";
import firebase from "@firebase/app";
import { Router } from "@angular/router";
import { ToastService } from "../../../services/toast/toast.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  open = false;
  emailstring = "mailto:doctoradoencienciasdelasalud@usco.edu.co";
  today = new Date();
  vistaEdicion = false;
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  viewRecuperar = true;
  viewPass = false;
  hidePass = true;
  email = "";
  pass = "";
  
  constructor(
    private myToast: ToastService,
    private toastr: ToastrService,
    public toastService: ToastService,
    public auth: AngularFireAuth,
    private router: Router,
    private modalService: NgbModal
  ) {}
  showSuccess() {
    this.toastr.success("Acceso exitoso", "Bienvenido", {
      timeOut: 2500,
    });
  }
  showExit() {
    this.toastr.error("", "Sesión cerrada", {
      timeOut: 2500,
    });
  }
  showInfo(email) {
    this.toastr.info(email, "Mensaje enviado al correo:", {
      timeOut: 2500,
    });
  }
  showWarning() {
    this.toastr.warning(
      "Correo o contraseña incorrectos",
      "Verifique las credenciales",
      {
        timeOut: 2500,
      }
    );
  }
  showWarningMail() {
    this.toastr.warning("Correo no registrado", "Verifique el correo escrito", {
      timeOut: 2500,
    });
  }
  recuperar() {
    this.viewRecuperar = false;
  }
  view() {
    this.viewPass = true;
    this.hidePass = false;
  }
  hide() {
    this.viewPass = false;
    this.hidePass = true;
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: "sm",
      centered: true,
      backdrop: "static",
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
  ngOnInit() {}
  loginWith() {
    // tslint:disable-next-line:new-parens
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.auth.signOut();
    this.showExit();
  }
  showData() {
    this.auth.user.subscribe((res) => {
      console.log(res);
    });
  }
  passEmail() {
    this.auth.auth
      .sendPasswordResetEmail(this.email)
      .then((res) => {
        console.log(res);
        this.showInfo(this.email);
        this.modalReference.close();
      })
      .catch((err) => console.log("Error cl:", err, this.showWarningMail()));
  }
  customLogin() {
    this.auth.auth
      .signInWithEmailAndPassword(this.email, this.pass)
      .then((res) => {
        console.log(res);
        this.showSuccess();
        this.modalReference.close();
      })
      .catch((err) => console.log("Error cl:", err, this.showWarning()));
  }
}
