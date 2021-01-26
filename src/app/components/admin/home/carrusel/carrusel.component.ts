import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarruselService } from '../../../../services/home/carrusel/carrusel.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
  providers: [DatePipe]
})
export class CarruselComponent implements OnInit {

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
  carrusel: any[] = [];


  // tslint:disable-next-line:max-line-length
  constructor( public auth: AngularFireAuth, public datepipe: DatePipe, private modalService: NgbModal, private carruselServices: CarruselService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.carruselServices.getCarruseles().subscribe( data => {
      this.carrusel = data;
    });
  }

  ngOnInit() {
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }
  borrarCarrusel( key$: string) {
    this.carruselServices.borrarCarrusel(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.carrusel[key$];
        this.modalReference.close();
        window.location.reload();
      }
    });
  }
}
