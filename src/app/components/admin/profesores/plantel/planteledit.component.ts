import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../../../../services/agenda/agenda.service';
import { Agenda } from '../../../../interfaces/agenda/agenda';


@Component({
  selector: 'app-planteledit',
  templateUrl: './planteledit.component.html',
  styleUrls: ['./planteledit.component.css'],
  providers: [DatePipe]
})
export class PlanteleditComponent implements OnInit {
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
  agenda: Agenda = {
    titulo: '',
    img: '',
    resenia: '',
    parrafo: '',
    fechaEvento: '',
    fechaPublicacion: '',
    url: '',
  };

   // tslint:disable-next-line:max-line-length
   constructor( public datepipe: DatePipe, private modalService: NgbModal, private agendaServices: AgendaService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.agendaServices.getAgenda( this.id ).subscribe(agenda => this.agenda = agenda);
      }
    });
  }

  ngOnInit() {
    this.war = this.agenda.titulo;
    if ( this.agenda.img === null || this.agenda.img === '' ) {
      // tslint:disable-next-line:max-line-length
      this.defaultImgUrl = 'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/pro_null_h.png?alt=media&token=489c904c-df1c-4a53-826a-4d52546fea77';
      this.agenda.img = this.defaultImgUrl;
      return this.agenda.img;
    }
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

}
