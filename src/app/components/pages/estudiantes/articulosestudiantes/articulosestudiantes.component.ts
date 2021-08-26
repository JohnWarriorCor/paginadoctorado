import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticulosestuService } from '../../../../services/estudiantes/articulos/articulosestu.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { ListadoService } from '../../../../services/estudiantes/listado/listado.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-articulosestudiantes',
  templateUrl: './articulosestudiantes.component.html',
  styleUrls: ['./articulosestudiantes.component.css'],
})
export class ArticulosestudiantesComponent implements OnInit {
  filterpost = '';
  indicador = '-';
  page = 1;
  pageSize = 4;
  vistaEdicion = false;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  articulosEstudiantes: any[] = [];
  articuloEstudiante: any[] = [];
  loading = true;

  constructor(
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    private articulosEstuService: ListadoService,
    private modalService: NgbModal
  ) {
    this.articulosEstuService.getListados().subscribe((data) => {
      this.articulosEstudiantes = data;
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
  obtenerArticulosEstudiantes(): void {
    this.articulosEstuService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.articuloEstudiante = data;
      });
  }

  ngOnInit() {
    this.obtenerArticulosEstudiantes();
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
  }

  borrarGrupo(key$: string) {
    this.articulosEstuService
      .borrarListado(key$)
      .subscribe((respuesta) => {
        if (respuesta) {
          console.error(respuesta);
        } else {
          delete this.articuloEstudiante[key$];
          this.modalReference.close();
        }
      });
  }
}
