import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AgendaService } from '../../../services/agenda/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AgendaComponent implements OnInit {
  page = 1;
  pageSize = 4;
  vistaEdicion = false;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  agenda: any[] = [];
  loading = true;
  // Herramientas ocultas
  key: any;
  user: any;
  opciones = false;
  ajustes = true;
  validar = false;
  error = false;
  passError = '';

  // tslint:disable-next-line:max-line-length
  constructor( private agendaService: AgendaService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router ) {
    this.agendaService.getAgendas().subscribe( data => {
      this.agenda = data;
    });
  }

  refresh() {
    window.location.reload();
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, { size: 'sm', centered: true, backdrop: 'static' });
  }

  ngOnInit() {
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
  borrarAgenda( key$: string) {
    this.agendaService.borrarAgenda(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.agenda[key$];
        this.modalReference.close();
      }
    });
  }
}
