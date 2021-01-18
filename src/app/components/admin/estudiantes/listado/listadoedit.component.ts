import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListadoService } from '../../../../services/estudiantes/listado/listado.service';
import { Listado } from '../../../../interfaces/estudiantes/listado/listado';

@Component({
  selector: 'app-listadoedit',
  templateUrl: './listadoedit.component.html',
  styleUrls: ['./listadoedit.component.css'],
  providers: [DatePipe]
})
export class ListadoeditComponent implements OnInit {
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
  newAttribute: any = {};
  listado: Listado = {
    foto: '',
    nombre: '',
    sintesis: '',
    fieldArray: [],
    correo: '',
    fecha: '',
    cvlac: '',
    orcid: '',
  };

   // tslint:disable-next-line:max-line-length
   constructor( public datepipe: DatePipe, private modalService: NgbModal, private listadoService: ListadoService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.listadoService.getListado( this.id ).subscribe(listado => this.listado = listado);
      }
    });
  }

  ngOnInit() {
    this.war = this.listado.nombre;
    if ( this.listado.foto === null || this.listado.foto === '' ) {
      // tslint:disable-next-line:max-line-length
      this.defaultImgUrl = 'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/pro_null_h.png?alt=media&token=489c904c-df1c-4a53-826a-4d52546fea77';
      this.listado.foto = this.defaultImgUrl;
      return this.listado.foto;
    }
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
  }
  addFieldValue() {
    this.listado.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

   deleteFieldValue(index) {
    this.listado.fieldArray.splice(index, 1);
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }
  changeImg(urlimg) {
    console.log(urlimg);
    // tslint:disable-next-line:max-line-length
    if (urlimg === '' || urlimg === null) {
      this.defaultImgUrl = urlimg;
      this.alertBool = true;
      this.imgError = 'No puede dejar un evento sin imagen, por favor inserte un URL correspondiente';
    } else {
      this.alertBool = false;
      this.defaultImgUrl = urlimg;
      return this.defaultImgUrl;
    }
  }
  guardar() {
    if ( this.listado.nombre !== this.war ||  this.listado.nombre !== this.war ) {
      this.error = false;
      console.log(this.listado.nombre);
      console.log(this.war);
      // this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.listadoService.nuevoListado( this.listado ).subscribe(data => {
          this.router.navigate(['/estudiantes']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.listadoService.actualizarListado( this.listado, this.id ).subscribe(data => {
          this.router.navigate(['/estudiantes']);
          this.modalReference.close();
        },
        error => console.error(error));
      }
    } else {
      this.error = true;
      this.passError = 'Formulario incompleto.';
      this.modalReference.close();
    }
  }
  up() {
    window.scroll(0, 400);
  }
  agregarNuevo( forma: NgForm ) {
    this.router.navigate(['/admi_estudiante', 'nuevo']);
    forma.reset({});
    this.up();
  }

}
