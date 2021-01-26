import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DenominacionService } from '../../../../services/home/denominacion.service';
import { Denominacion } from '../../../../interfaces/home/denominacion';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-denominacion',
  templateUrl: './denominacion.component.html',
  styleUrls: ['./denominacion.component.css'],
  providers: [DatePipe]
})
export class DenominacionComponent implements OnInit {

  today = new Date();
  fecha: any;
  closeResult: string;
  defaultImgUrl: any;
  urlimg: any;
  war: any;
  modalReference: any;
  error = false;
  passError = '';
  imgError = '';
  alertBool = false;
  forma: FormGroup;
  controls: any;
  nuevo = false;
  id: string;
  denominacion: Denominacion = {
    tituloOtorgar: '',
    registroCalificado: '',
    registroCalificadoUrl: '',
    perAdmision: '',
    numCreditos: '',
    duracion: '',
    costoMatricula: '',
    cupo: '',
    fechaEdicion: '',
    mision: '',
    vision: '',
    proposito: '',
  };

  // tslint:disable-next-line:max-line-length
  constructor( public auth: AngularFireAuth, public datepipe: DatePipe, private modalService: NgbModal, private denominacionServie: DenominacionService, private router: Router, private activatedRoute: ActivatedRoute ) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.denominacionServie.getDenominacion( this.id ).subscribe(denominacion => this.denominacion = denominacion);
      }
    });
  }

  ngOnInit() {
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
    this.war = this.denominacion.tituloOtorgar;
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }

  guardar() {
    if ( this.denominacion.tituloOtorgar !== this.war ||  this.denominacion.tituloOtorgar !== this.war ) {
      this.error = false;
      this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.denominacionServie.nuevoDenominacion( this.denominacion ).subscribe(data => {
          this.router.navigate(['/inicio']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.denominacionServie.actualizarDenominacion( this.denominacion, this.id ).subscribe(data => {
          this.router.navigate(['/inicio']);
          this.modalReference.close();
        },
        error => console.error(error));
      }
    } else {
      this.error = true;
      this.passError = 'No puede dejar la denominación vacía';
      this.modalReference.close();
    }
  }
}
