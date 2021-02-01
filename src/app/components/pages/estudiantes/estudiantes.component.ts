import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AgendaService } from '../../../services/agenda/agenda.service';
import { ListadoService } from '../../../services/estudiantes/listado/listado.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastService } from '../../../services/toast/toast.service';
import { ToastrService } from 'ngx-toastr';

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

  // tslint:disable-next-line:max-line-length
  constructor( private myToast: ToastService, private toastr: ToastrService, public auth: AngularFireAuth, private modalService: NgbModal , private router: Router, private agendaService: AgendaService, private listadoService: ListadoService) {
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
  up() {
    window.scroll(0, 400);
  }
  borrarPlantel( key$: string) {
    this.listadoService.borrarListado(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.listados[key$];
        this.elementoEliminado();
        this.modalReference.close();
      }
    });
  }
}
