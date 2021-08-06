import { Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EgresadosService } from '../../../../services/estudiantes/egresados/egresados.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AgendaprogramaService } from '../../../../services/agenda/agendaprograma.service';

@Component({
  selector: 'app-egresados',
  templateUrl: './egresados.component.html',
  styleUrls: ['./egresados.component.css']
})
export class EgresadosComponent implements OnInit {
  filterpost = '';
  page = 1;
  pageSize = 3;
  agenda: any[] = [];
  listados: any[] = [];

  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;

  fecha: any;
  defaultImgUrl: any;
  urlimg: any;
  war: any;
  error = false;
  passError = '';
  imgError = '';
  alertBool = false;
  controls: any;
  nuevo = false;
  id: string;
  link: any;
  newAttribute: any = {};
  loading = true;
  egresados: any[] = [];
  actualEgresado: any;
  actualIndex = -1;

  constructor(
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    private modalService: NgbModal,
    private agendaProgramaService: AgendaprogramaService,
    private egresadosService: EgresadosService
  ) {
    this.agendaProgramaService.getAgendas().subscribe((data) => {
      this.agenda = data;
    });
    this.egresadosService.getEgresados().subscribe((data) => {
      this.listados = data;
    });
  }
  obtenerEgresados(): void {
    this.egresadosService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.egresados = data;
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
  ngOnInit() {
    this.obtenerEgresados();
  }
  refreshList(): void {
    this.actualEgresado = null;
    this.actualIndex = -1;
    this.obtenerEgresados();
  }
  setActiveTutorial(evento, index): void {
    this.actualEgresado = evento;
    this.actualIndex = index;
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

  up() {
    window.scroll(0, 400);
  }
  borrarPlantel(key$: string) {
    this.egresadosService.borrarEgresado(key$).subscribe((respuesta) => {
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
