import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../../../services/agenda/agenda.service';
import { Agenda } from '../../../interfaces/agenda/agenda';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-agendaedit',
  templateUrl: './agendaedit.component.html',
  styleUrls: ['./agendaedit.component.css'],
  providers: [DatePipe]
})
export class AgendaeditComponent implements OnInit {
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

  // tslint:disable-next-line:no-shadowed-variable
  constructor( public auth: AngularFireAuth, public datepipe: DatePipe, private modalService: NgbModal, private agendaServices: AgendaService, private router: Router, private activatedRoute: ActivatedRoute) {
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
      this.defaultImgUrl = 'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/comunicado.png?alt=media&token=0ffc510f-7150-4ced-9cb4-e6c8f39119e8';
      this.agenda.img = this.defaultImgUrl;
      return this.agenda.img;
    }
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
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
    if ( this.agenda.titulo !== this.war ||  this.agenda.titulo !== this.war ) {
      this.error = false;
      console.log(this.agenda.titulo);
      console.log(this.war);
      this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.agendaServices.nuevoAgenda( this.agenda ).subscribe(data => {
          this.router.navigate(['/agenda']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.agendaServices.actualizarAgenda( this.agenda, this.id ).subscribe(data => {
          this.router.navigate(['/agenda']);
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
