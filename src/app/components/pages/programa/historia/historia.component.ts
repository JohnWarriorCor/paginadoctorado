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
  // Herramientas ocultas
  key: any;
  user: any;
  opciones = false;
  ajustes = true;
  validar = false;
  error = false;
  passError = '';

  // tslint:disable-next-line:max-line-length
  constructor(public auth: AngularFireAuth, private historiaService: HistoriaService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router) {
    this.historiaService.getHistorias().subscribe( data => {
      this.historia = data;
    });
  }

  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, { size: 'sm', centered: true, backdrop: 'static' });
  }

  ngOnInit() {
  }
  viewOpciones(pass, user) {
    if ( pass === '7183' && user === 'admin' ) {
      this.ajustes = false;
      this.validar = true;
    } else {
      if (pass !== '7183' && user !== 'admin') {
        this.error = true;
        this.passError = 'Usuario y contraseña incorrectas';
      } else if (pass !== '7183') {
        this.error = true;
        this.passError = 'Contraseña incorrecta';
      } else {
        this.error = true;
        this.passError = 'Usuario incorrecto';
      }
    }
  }
  borrarHistoria( key$: string) {
    this.historiaService.borrarHistoria(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.historia[key$];
        this.modalReference.close();
      }
    });
  }
}
