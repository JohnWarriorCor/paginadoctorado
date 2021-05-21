import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticulosestuService } from '../../../../services/estudiantes/articulos/articulosestu.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-articulosestudiantes',
  templateUrl: './articulosestudiantes.component.html',
  styleUrls: ['./articulosestudiantes.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticulosestudiantesComponent implements OnInit, AfterViewInit {
  cpage = 1;
  pageSize = 4;
  vistaEdicion = false;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  articuloEstudiante: Array<any> = [];
  loading = true;

  constructor(
    public auth: AngularFireAuth,
    private articulosEstuService: ArticulosestuService,
    private modalService: NgbModal,
  ) {
    this.articulosEstuService.getArticuloEstudiantes().subscribe((data) => {
      this.articuloEstudiante = data;
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
    this.articulosEstuService
      .borrarArticuloEstudiante(key$)
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
