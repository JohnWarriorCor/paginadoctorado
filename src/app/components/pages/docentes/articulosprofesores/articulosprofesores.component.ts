import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticulosproService } from '../../../../services/profesores/articulospro/articulospro.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { PlantelService } from '../../../../services/profesores/plantel/plantel.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-articulosprofesores',
  templateUrl: './articulosprofesores.component.html',
  styleUrls: ['./articulosprofesores.component.css'],
})
export class ArticulosprofesoresComponent implements OnInit, AfterViewInit {
  filterpost = '';
  indicador = '-';
  page = 1;
  pageSize = 3;
  pageArticulos = 1;
  pageSizeArticulos = 3;
  agenda: any[] = [];
  plantelProfesores: any[] = [];

  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  loading = true;

  profesores: any[] = [];
  actualProfesor = null;
  eventos: any[] = [];
  actualEvento = null;
  actualIndex = -1;
  eventosPrograma: any[] = [];
  eventosInstitucional: any[] = [];

  constructor(
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    private articulosProService: ArticulosproService,
    private modalService: NgbModal,
    private plantelService: PlantelService
  ) {
    this.plantelService.getPlanteles().subscribe((data) => {
      this.plantelProfesores = data;
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

  refresh() {
    window.location.reload();
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, {
      centered: true,
      size: 'sm',
      backdrop: 'static',
      windowClass: 'fade-in',
    });
  }

  ngOnInit() {
    this.obtenerProfesores();
  }
  refreshList(): void {
    this.actualProfesor = null;
    this.actualIndex = -1;
    this.obtenerProfesores();
  }
  setActiveTutorial(evento, index): void {
    this.actualProfesor = evento;
    this.actualIndex = index;
  }
  obtenerProfesores(): void {
    this.plantelService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.profesores = data;
      });
  }


  ngAfterViewInit(): void {
    (window as any).twttr.widgets.load();
  }

  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
  }

  borrarPlantel(key$: string) {
    this.plantelService.borrarPlantel(key$).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        delete this.plantelProfesores[key$];
        this.elementoEliminado();
        this.modalReference.close();
      }
    });
  }
}
