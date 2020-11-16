import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../../../services/agenda/agenda.service';
import { Agenda } from '../../../interfaces/agenda/agenda';

@Component({
  selector: 'app-agendaedit',
  templateUrl: './agendaedit.component.html',
  styleUrls: ['./agendaedit.component.css']
})
export class AgendaeditComponent implements OnInit {
  closeResult: string;
  defaultImgUrl: any;
  urlimg: any;
  war: any;
  modalReference: any;
  error = false;
  passError = '';
  forma: FormGroup;
  controls: any;
  nuevo = false;
  id: string;
  agenda: Agenda = {
    titulo: '',
    img: '',
    reseña: '',
    parrafo: '',
    fecha: '',
    url: '',
  };


  // tslint:disable-next-line:max-line-length
  constructor( private modalService: NgbModal, private agendaServices: AgendaService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.agendaServices.getHistoria( this.id ).subscribe(agenda => this.agenda = agenda);
      }
    });
  }

  ngOnInit() {
    this.war = this.agenda.titulo;
    // tslint:disable-next-line:max-line-length
    this.defaultImgUrl = 'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/imgprueba.png?alt=media&token=e1113798-cb57-4aef-973f-037680c3c124';
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }

  changeImg(urlimg) {
    // tslint:disable-next-line:max-line-length
    this.defaultImgUrl = urlimg;
    return this.defaultImgUrl;
  }

  guardar() {
    if ( this.agenda.titulo !== this.war ||  this.agenda.titulo !== this.war ) {
      this.error = false;
      console.log(this.agenda.titulo);
      console.log(this.war);
      this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.agendaServices.nuevoHistoria( this.agenda ).subscribe(data => {
          this.router.navigate(['/agenda']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.agendaServices.actualizarHistoria( this.agenda, this.id ).subscribe(data => {
          this.router.navigate(['/agenda']);
          this.modalReference.close();
        },
        error => console.error(error));
      }
    } else {
      console.log('pasó');
      this.error = true;
      this.passError = 'No puede dejar la publicación vacía';
      this.modalReference.close();
    }
  }
  agregarNuevo( forma: NgForm) {
    this.router.navigate(['/admi_agenda', 'nuevo']);
    forma.reset({});
  }
}
