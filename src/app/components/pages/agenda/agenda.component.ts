import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AgendaService } from '../../../services/agenda/agenda.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastService } from '../../../services/toast/toast.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
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

  constructor( private myToast: ToastService, private toastr: ToastrService, public auth: AngularFireAuth, private agendaService: AgendaService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router ) {
    this.agendaService.getAgendas().subscribe( data => {
      this.agenda = data;
    });
  }
  elementoEliminado() {
    this.toastr.warning( '', 'Elemento eliminado', {
      timeOut: 2500
    });
  }
  showDanger() {
    this.toastr.error('Intenten nuevamente', 'Error', {
      timeOut: 2500
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
  borrarAgenda( key$: string) {
    this.agendaService.borrarAgenda(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
        this.showDanger();
      } else {
        delete this.agenda[key$];
        this.elementoEliminado();
        this.modalReference.close();
      }
    });
  }
}
