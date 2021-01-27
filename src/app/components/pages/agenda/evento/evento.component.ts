import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../../../../services/agenda/agenda.service';
import { Agenda } from '../../../../interfaces/agenda/agenda';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastService } from '../../../../services/toast/toast.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [DatePipe]
})
export class EventoComponent implements OnInit {
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
  agendas: any = {};
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
  constructor( private myToast: ToastService, private toastr: ToastrService, public auth: AngularFireAuth, public datepipe: DatePipe, private modalService: NgbModal, private agendaServices: AgendaService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      this.agendas = this.agendaServices.getAgenda(params.id);
      this.link = params.id;
    });
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.agendaServices.getAgenda( this.id ).subscribe(agenda => this.agenda = agenda);
      }
    });
  }
  elementoEliminado() {
    this.toastr.warning( '', 'Elemento eliminado', {
      timeOut: 2500
    });
  }
  showDanger() {
    this.toastr.error('Intenten nuevamente', 'Error', {
      timeOut: 2500
    });
  }

  ngOnInit() {
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
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, { size: 'sm', centered: true, backdrop: 'static' });
  }
  nav() {
    this.router.navigate(['/admi_agenda', this.link]);
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

  borrarAgenda() {
    this.agendaServices.borrarAgenda(this.link).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
        this.showDanger();
      } else {
        delete this.agenda[this.link];
        this.elementoEliminado();
        this.modalReference.close();
        this.router.navigate(['/agenda']);
      }
    });
  }

}
