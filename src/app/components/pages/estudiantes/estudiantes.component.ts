import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListadoService } from '../../../services/estudiantes/listado/listado.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AgendaprogramaService } from '../../../services/agenda/agendaprograma.service';
import { AgendainstitucionalService } from '../../../services/agenda/agendainstitucional.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
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
  eventosPrograma: any;
  eventosInstitucional: any;
  // tslint:disable-next-line:max-line-length
  constructor(
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    private modalService: NgbModal,
    private agendaProgramaService: AgendaprogramaService,
    private agendaInstitucionalService: AgendainstitucionalService,
    private listadoService: ListadoService
  ) {
    this.listadoService.getListados().subscribe((data) => {
      this.listados = data;
    });
  }
  get sortDataPrograma() {
    return this.eventosPrograma.sort((a, b) => {
      // tslint:disable-next-line:whitespace
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      return <any> new Date(b.fechaEvento) - <any> new Date(a.fechaEvento);
    });
  }
  obtenerEventosPrograma(): void {
    this.agendaProgramaService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.eventosPrograma = data;
      });
  }
  get sortDataInstitucional() {
    return this.eventosInstitucional.sort((a, b) => {
      // tslint:disable-next-line:whitespace
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      return <any> new Date(b.fechaEvento) - <any> new Date(a.fechaEvento);
    });
  }
  obtenerEventosInstitucional(): void {
    this.agendaInstitucionalService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.eventosInstitucional = data;
      });
  }
  ngOnInit() {
    this.obtenerEventosPrograma();
    this.obtenerEventosInstitucional();
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, {
      centered: true,
      size: 'sm',
      backdrop: 'static',
      windowClass: 'fade-in',
    });
  }
  showSuccess() {
    this.toastr.success('Acción exitosa', 'Elemento guardado', {
      timeOut: 2500,
    });
  }
  showDanger() {
    this.toastr.error('Intenten nuevamente', 'Error al guardar', {
      timeOut: 2500,
    });
  }
  showInfo() {
    this.toastr.info('', 'Elemento actualizado', {
      timeOut: 2500,
    });
  }
  showWarning() {
    this.toastr.warning('Intenten nuevamente', 'Error al actualizar', {
      timeOut: 2500,
    });
  }
  elementoAgregado() {
    this.toastr.info('', 'Elemento agregado', {
      timeOut: 2500,
    });
  }
  elementoEliminado() {
    this.toastr.warning('', 'Elemento eliminado', {
      timeOut: 2500,
    });
  }
  up() {
    window.scroll(0, 400);
  }
  borrarPlantel(key$: string) {
    this.listadoService.borrarListado(key$).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        delete this.listados[key$];
        this.elementoEliminado();
        this.modalReference.close();
      }
    });
  }
}
