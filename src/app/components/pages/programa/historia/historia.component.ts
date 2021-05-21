import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HistoriaService } from '../../../../services/programa/historia.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HistoriaComponent implements OnInit {
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  historia: any[] = [];
  loading = true;

  constructor(
    public auth: AngularFireAuth,
    private historiaService: HistoriaService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.historiaService.getHistorias().subscribe((data) => {
      this.historia = data;
    });
  }

  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
  }

  ngOnInit() {}

  borrarHistoria(key$: string) {
    this.historiaService.borrarHistoria(key$).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        delete this.historia[key$];
        this.modalReference.close();
      }
    });
  }
}
