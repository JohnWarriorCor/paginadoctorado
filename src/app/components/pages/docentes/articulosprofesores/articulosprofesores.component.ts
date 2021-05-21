import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticulosproService } from '../../../../services/profesores/articulospro/articulospro.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articulosprofesores',
  templateUrl: './articulosprofesores.component.html',
  styleUrls: ['./articulosprofesores.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticulosprofesoresComponent implements OnInit, AfterViewInit {
  cpage = 1;
  pageSize = 4;
  vistaEdicion = false;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  articulosPro: Array<any> = [];
  loading = true;

  constructor(
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    private articulosProService: ArticulosproService,
    private modalService: NgbModal
  ) {
    this.articulosProService.getArticuloProfesores().subscribe((data) => {
      this.articulosPro = data;
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

  ngOnInit() {}

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

  borrarGrupo(key$: string) {
    this.articulosProService
      .borrarArticuloProfesor(key$)
      .subscribe((respuesta) => {
        if (respuesta) {
          console.error(respuesta);
        } else {
          delete this.articulosPro[key$];
          this.modalReference.close();
        }
      });
  }
}
