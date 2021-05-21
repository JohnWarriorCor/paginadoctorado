import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EgresadosService } from '../../../../../services/estudiantes/egresados/egresados.service';
import { Egresados } from '../../../../../interfaces/estudiantes/egresados/egresados';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-egresado',
  templateUrl: './egresado.component.html',
  styleUrls: ['./egresado.component.css'],
  providers: [DatePipe],
})
export class EgresadoComponent implements OnInit {
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
  egresados: any[] = [];
  egresado: Egresados = {
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
  constructor(
    public auth: AngularFireAuth,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private egresadosService: EgresadosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      this.link = parametros.id;
      if (this.id !== 'nuevo') {
        this.egresadosService
          .getEgresado(this.id)
          .subscribe((egresado) => (this.egresado = egresado));
      }
    });
    this.egresadosService.getEgresados().subscribe((data) => {
      this.egresados = data;
      console.log(this.egresados);
    });
  }
  nav() {
    this.router.navigate(['/admi_egresados', this.link]);
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
      this.imgError =
        'No puede dejar un evento sin imagen, por favor inserte un URL correspondiente';
    } else {
      this.alertBool = false;
      this.defaultImgUrl = urlimg;
      return this.defaultImgUrl;
    }
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, {
      centered: true,
      size: 'sm',
      backdrop: 'static',
      windowClass: 'fade-in',
    });
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
  }
  up() {
    window.scroll(0, 400);
  }

  guardar() {
    if (
      this.egresado.nombre !== this.war ||
      this.egresado.nombre !== this.war
    ) {
      this.error = false;
      console.log(this.egresado.nombre);
      console.log(this.war);
      this.modalReference.close();
      if (this.id === 'nuevo') {
        this.egresadosService.nuevoEgresado(this.egresado).subscribe(
          (data) => {
            this.router.navigate(['/egresados']);
            this.modalReference.close();
          },
          (error) => console.error(error)
        );
      } else {
        this.modalReference.close();
        this.egresadosService
          .actualizarEgresado(this.egresado, this.id)
          .subscribe(
            (data) => {
              this.router.navigate(['/egresados']);
              this.modalReference.close();
            },
            (error) => console.error(error)
          );
      }
    } else {
      this.error = true;
      this.passError = 'Formulario incompleto.';
      this.modalReference.close();
    }
  }
  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/admi_egresados', 'nuevo']);
    forma.reset({});
  }
}
