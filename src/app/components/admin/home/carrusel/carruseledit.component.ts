import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarruselService } from '../../../../services/home/carrusel/carrusel.service';
import { Carrusel } from '../../../../interfaces/home/carrusel/carrusel';

@Component({
  selector: 'app-carruseledit',
  templateUrl: './carruseledit.component.html',
  styleUrls: ['./carruseledit.component.css'],
  providers: [DatePipe]
})
export class CarruseleditComponent implements OnInit {
  today = new Date();
  fecha: any;
  closeResult: string;
  defaultImgUrl: any;
  urlImage: any;
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
  carrusel: Carrusel = {
    titulo: '',
    urlImg: '',
    urlInfo: '',
    fecha: '',
    info: '',
  };


  // tslint:disable-next-line:max-line-length
  constructor( public datepipe: DatePipe, private modalService: NgbModal, private carruselServices: CarruselService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.carruselServices.getCarrusel( this.id ).subscribe(carrusel => this.carrusel = carrusel);
      }
    });
  }

  ngOnInit() {
    this.war = this.carrusel.titulo;
    if ( this.carrusel.urlImg === null || this.carrusel.urlImg === '' ) {
      // tslint:disable-next-line:max-line-length
      this.defaultImgUrl = 'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/carrusel_prueba.jpg?alt=media&token=840ed11f-f7ac-4977-82aa-14311bd9acb3';
      this.carrusel.urlImg = this.defaultImgUrl;
      return this.carrusel.urlImg;
    }
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }

  changeImg(urlImage) {
    console.log(urlImage);
    // tslint:disable-next-line:max-line-length
    if (urlImage === '' || urlImage === null) {
      this.defaultImgUrl = urlImage;
      this.alertBool = true;
      this.imgError = 'No puede dejar un evento sin imagen, por favor inserte un URL correspondiente';
    } else {
      this.alertBool = false;
      this.defaultImgUrl = urlImage;
      return this.defaultImgUrl;
    }
  }

  guardar() {
    if ( this.carrusel.titulo !== this.war ||  this.carrusel.titulo !== this.war ) {
      this.error = false;
      console.log(this.carrusel.titulo);
      console.log(this.war);
      this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.carruselServices.nuevoCarrusel( this.carrusel ).subscribe(data => {
          this.router.navigate(['/admi_carrusel']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.carruselServices.actualizarCarrusel( this.carrusel, this.id ).subscribe(data => {
          this.router.navigate(['/admi_carrusel']);
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
    this.router.navigate(['/admi_agenda', 'nuevo']);
    forma.reset({});
  }
}
