import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListadoService } from '../../../../services/estudiantes/listado/listado.service';
import { Listado } from '../../../../interfaces/estudiantes/listado/listado';

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
  // Herramientas ocultas
  key: any;
  user: any;
  opciones = false;
  ajustes = true;
  validar = false;
  link: any;

  // tslint:disable-next-line:max-line-length
  constructor( public datepipe: DatePipe, private modalService: NgbModal, private listadoService: ListadoService, private router: Router, private activatedRoute: ActivatedRoute) {
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
  viewOpciones(pass, user) {
    if ( pass === '7183' && user === 'admin' ) {
      this.ajustes = false;
      this.vistaEdicion = true;
    } else {
      if (pass !== '7183' && user !== 'admin') {
        this.error = true;
        this.passError = 'Usuario y contraseña incorrectas';
      } else if (pass !== '7183') {
        this.error = true;
        this.passError = 'Contraseña incorrecta';
      } else {
        this.error = true;
        this.passError = 'Usuario incorrecto';
      }
    }
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

}
