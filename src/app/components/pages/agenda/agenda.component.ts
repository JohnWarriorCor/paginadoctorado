import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../../../services/agenda/agenda.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  providers: [DatePipe]
})

export class AgendaComponent implements OnInit {
  filterpost = '';
  page = 1;
  pageSize = 4;
  vistaEdicion = false;
  fecha: any;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  agenda: any[] = [];
  loading = true;
  anios = [];
  dias = [];
  mes: any[] = [{
    id: '-01-',
    name: 'Enero',
  },
  {
    id: '-02-',
    name: 'Febrero',
  },
  {
    id: '-03-',
    name: 'Marzo',
  },
  {
    id: '-04-',
    name: 'Abril',
  },
  {
    id: '-05-',
    name: 'Mayo',
  },
  {
    id: '-06-',
    name: 'Junio',
  },
  {
    id: '-07-',
    name: 'Julio',
  },
  {
    id: '-08-',
    name: 'Agosto',
  },
  {
    id: '-09-',
    name: 'Sptiembre',
  },
  {
    id: '-10-',
    name: 'Octubre',
  },
  {
    id: '-11-',
    name: 'Noviembre',
  },
  {
    id: '-12-',
    name: 'Diciemebre',
  },
  ];
  eventos: any;
  actualEvento = null;
  actualIndex = -1;
  constructor( public datepipe: DatePipe, private toastr: ToastrService, public auth: AngularFireAuth, private agendaService: AgendaService, private modalService: NgbModal ) {
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

  ngOnInit(): void {
    for (let index = 2016; index <= (new Date()).getFullYear(); index++) {
      this.anios.push(index.toString());
    }
    this.fecha = this.datepipe.transform(this.today, 'yyyy-mm-dd');
    for (let index = 1; index <= 31; index++) {
      this.dias.push(index.toString());
    }
    this.obtenerEventos();
  }

  refreshList(): void {
    this.actualEvento = null;
    this.actualIndex = -1;
    this.obtenerEventos();
  }
  setActiveTutorial(evento, index): void {
    this.actualEvento = evento;
    this.actualIndex = index;
  }

  obtenerEventos(): void {
    this.agendaService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.eventos = data;
    });
  }


  borrarAgenda( key$: string) {
    this.agendaService.borrarAgenda(key$).subscribe( respuesta => {
      if ( respuesta ) {
        this.showDanger();
      } else {
        delete this.agenda[key$];
        this.elementoEliminado();
        this.modalReference.close();
      }
    });
  }
}
