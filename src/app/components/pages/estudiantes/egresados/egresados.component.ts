import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EgresadosService } from '../../../../services/estudiantes/egresados/egresados.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { AgendaprogramaService } from '../../../../services/agenda/agendaprograma.service';

@Component({
  selector: 'app-egresados',
  templateUrl: './egresados.component.html',
  styleUrls: ['./egresados.component.css'],
})
export class EgresadosComponent implements OnInit {
  page = 1;
  pageSize = 3;
  agenda: any[] = [];
  agresados: any[] = [];

  vistaEdicion = false;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  loading = true;

  constructor(
    public auth: AngularFireAuth,
    private modalService: NgbModal,
    private agendaProgramaService: AgendaprogramaService,
    private egresadosService: EgresadosService
  ) {
    this.agendaProgramaService.getAgendas().subscribe((data) => {
      this.agenda = data;
    });
    this.egresadosService.getEgresados().subscribe((data) => {
      this.agresados = data;
    });
  }
  ngOnInit() {}
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
        delete this.agresados[key$];
        this.modalReference.close();
      }
    });
  }
}
