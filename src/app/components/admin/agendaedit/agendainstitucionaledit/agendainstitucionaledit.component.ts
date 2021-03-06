import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Agenda } from '../../../../interfaces/agenda/agenda';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastService } from '../../../../services/toast/toast.service';
import { ToastrService } from 'ngx-toastr';
import { AgendainstitucionalService } from '../../../../services/agenda/agendainstitucional.service';

@Component({
  selector: 'app-agendainstitucionaledit',
  templateUrl: './agendainstitucionaledit.component.html',
  styleUrls: ['./agendainstitucionaledit.component.css'],
  providers: [DatePipe]
})
export class AgendainstitucionaleditComponent implements OnInit {
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

  constructor( private myToast: ToastService, private toastr: ToastrService, public auth: AngularFireAuth, public datepipe: DatePipe, private modalService: NgbModal, private agendaServices: AgendainstitucionalService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.agendaServices.getAgenda( this.id ).subscribe(agenda => this.agenda = agenda);
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
  imgChange() {
    this.toastr.info( '', 'Imagen cambiada con éxito', {
      timeOut: 2500
    });
  }
  imgNone() {
    this.toastr.error('No puede dejar un evento sin imagen, por favor inserte un URL correspondiente', 'Error', {
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
    this.war = this.agenda.titulo;
    if ( this.agenda.img === null || this.agenda.img === '' ) {
      // tslint:disable-next-line:max-line-length
      this.defaultImgUrl = 'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/NO%20MODIFICAR%2Fcomunicado.png?alt=media&token=aa7d3518-ad8f-41dc-bbb4-9bf7ea615b51';
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
      this.imgNone();
    } else {
      this.alertBool = false;
      this.defaultImgUrl = urlimg;
      this.imgChange();
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
          this.showSuccess();
          this.router.navigate(['/agenda']);
          this.modalReference.close();
        },
        error => console.error(error, this.showDanger()));
      } else {
        this.modalReference.close();
        this.agendaServices.actualizarAgenda( this.agenda, this.id ).subscribe(data => {
          this.showInfo();
          this.router.navigate(['/agenda']);
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
  agregarNuevo( forma: NgForm) {
    this.router.navigate(['/admi_agenda', 'nuevo']);
    forma.reset({});
  }
}
