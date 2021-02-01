import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EgresadosService } from '../../../../services/estudiantes/egresados/egresados.service';
import { Egresados } from '../../../../interfaces/estudiantes/egresados/egresados';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastService } from '../../../../services/toast/toast.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-egresadosedit',
  templateUrl: './egresadosedit.component.html',
  styleUrls: ['./egresadosedit.component.css'],
  providers: [DatePipe]
})
export class EgresadoseditComponent implements OnInit {

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
  egresados: Egresados = {
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
   constructor( private myToast: ToastService, private toastr: ToastrService, public auth: AngularFireAuth, public datepipe: DatePipe, private modalService: NgbModal, private egresadosService: EgresadosService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.egresadosService.getEgresado( this.id ).subscribe(egresados => this.egresados = egresados);
      }
    });
  }
  showSuccess() {
    this.toastr.success('Acción exitosa', 'Elemento guardado', {
      timeOut: 2500
    });
  }
  showDanger() {
    this.toastr.error('Intenten nuevamente', 'Error al guardar', {
      timeOut: 2500
    });
  }
  showInfo() {
    this.toastr.info( '', 'Elemento actualizado', {
      timeOut: 2500
    });
  }
  showWarning() {
    this.toastr.warning( 'Intenten nuevamente', 'Error al actualizar', {
      timeOut: 2500
    });
  }
  elementoAgregado() {
    this.toastr.info( '', 'Elemento agregado', {
      timeOut: 2500
    });
  }
  elementoEliminado() {
    this.toastr.warning( '', 'Elemento eliminado', {
      timeOut: 2500
    });
  }

  ngOnInit() {
    this.war = this.egresados.nombre;
    if ( this.egresados.foto === null || this.egresados.foto === '' ) {
      // tslint:disable-next-line:max-line-length
      this.defaultImgUrl = 'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/pro_null_h.png?alt=media&token=489c904c-df1c-4a53-826a-4d52546fea77';
      this.egresados.foto = this.defaultImgUrl;
      return this.egresados.foto;
    }
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
  }
  addFieldValue() {
    this.egresados.fieldArray.push(this.newAttribute);
    this.elementoAgregado();
    this.newAttribute = {};
  }

   deleteFieldValue(index) {
    this.egresados.fieldArray.splice(index, 1);
    this.elementoEliminado();
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
    if ( this.egresados.nombre !== this.war ||  this.egresados.nombre !== this.war ) {
      this.error = false;
      console.log(this.egresados.nombre);
      console.log(this.war);
      // this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.egresadosService.nuevoEgresado( this.egresados ).subscribe(data => {
          this.showSuccess();
          this.router.navigate(['/egresados']);
          this.modalReference.close();
        },
        error => console.error(error, this.showDanger()));
      } else {
        this.modalReference.close();
        this.egresadosService.actualizarEgresado( this.egresados, this.id ).subscribe(data => {
          this.showInfo();
          this.router.navigate(['/egresado', this.id]);
          this.modalReference.close();
        },
        error => console.error(error, this.showWarning()));
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
    this.router.navigate(['/admi_egresados', 'nuevo']);
    forma.reset({});
    this.up();
  }

}
