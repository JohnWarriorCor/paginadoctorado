import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListadoService } from '../../../../services/estudiantes/listado/listado.service';
import { Listado } from '../../../../interfaces/estudiantes/listado/listado';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastService } from '../../../../services/toast/toast.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
  providers: [DatePipe]
})
export class EstudianteComponent implements OnInit {
  page = 1;
  pageSize = 4;
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
  listados: any[] = [];
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
  vistaEdicion = false;
  acumFechas = 0;
  comodinAcum = 0;
  loading = true;
  link: any;

  // tslint:disable-next-line:max-line-length
  constructor( private myToast: ToastService, private toastr: ToastrService, public auth: AngularFireAuth, public datepipe: DatePipe, private modalService: NgbModal, private listadoService: ListadoService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      this.link = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.listadoService.getListado( this.id ).subscribe(listado => this.listado = listado);
      }
    });
    this.listadoService.getListados().subscribe( data => {
      this.listados = data;
      console.log(this.listados);
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
  nav() {
    this.router.navigate(['/admi_estudiante', this.link]);
  }
  ngOnInit() {
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
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
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, { size: 'sm', centered: true, backdrop: 'static' });
  }
  up() {
    window.scroll(0, 400);
  }
  guardar() {
    if ( this.listado.nombre !== this.war ||  this.listado.nombre !== this.war ) {
      this.error = false;
      console.log(this.listado.nombre);
      console.log(this.war);
      this.modalReference.close();
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
  agregarNuevo( forma: NgForm) {
    this.router.navigate(['/admi_estudiante', 'nuevo']);
    forma.reset({});
  }
  borrarPlantel() {
    this.listadoService.borrarListado(this.id).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        this.router.navigate(['/docentes']);
        delete this.listados[this.id];
        this.elementoEliminado();
        this.modalReference.close();
      }
    });
  }

}
