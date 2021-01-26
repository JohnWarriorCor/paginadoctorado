import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';
import firebase from '@firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {
  open = false;
  emailstring = 'mailto:doctoradoencienciasdelasalud@usco.edu.co';
  today = new Date();
  page = 1;
  pageSize = 3;
  agenda: any[] = [];
  plantelProfesores: any[] = [];

  vistaEdicion = false;
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  loading = true;
  // Herramientas ocultas
  key: any;
  user: any;
  opciones = false;
  ajustes = true;
  validar = false;
  error = false;
  passError = '';
  email = '';
  pass = '';

  // tslint:disable-next-line:no-shadowed-variable
  constructor(public auth: AngularFireAuth, private router: Router, private modalService: NgbModal) {
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, { size: 'sm', centered: true, backdrop: 'static' });
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }
  loginWith() {
    // tslint:disable-next-line:new-parens
    this.auth.auth.signInWithPopup( new auth.GoogleAuthProvider );
  }
  logout() {
    this.auth.auth.signOut();
  }
  showData() {
    this.auth.user.subscribe( res => {
      console.log(res);
    });
  }
  passEmail() {
    this.auth.auth.sendPasswordResetEmail(this.email);
  }
  customLogin() {
    this.auth.auth.signInWithEmailAndPassword(this.email, this.pass)
    .then( res => {
      console.log(res);
    })
    .catch(err => console.log('Error cl:', err));
  }
  ngOnInit() {
  }
}
