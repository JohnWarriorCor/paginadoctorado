import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AgendaService } from '../../../services/agenda/agenda.service';
import { ListadoService } from '../../../services/estudiantes/listado/listado.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  page = 1;
  pageSize = 4;
  agenda: any[] = [];
  listados: any[] = [];

  vistaEdicion = false;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
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
  constructor( public auth: AngularFireAuth, private modalService: NgbModal , private router: Router, private agendaService: AgendaService, private listadoService: ListadoService) {
    this.agendaService.getAgendas().subscribe( data => {
      this.agenda = data;
    });
    this.listadoService.getListados().subscribe( data => {
      this.listados = data;
    });
  }
  ngOnInit() {
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, { size: 'sm', centered: true, backdrop: 'static' });
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
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
  up() {
    window.scroll(0, 400);
  }
  borrarPlantel( key$: string) {
    this.listadoService.borrarListado(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.listados[key$];
        this.modalReference.close();
      }
    });
  }
}
