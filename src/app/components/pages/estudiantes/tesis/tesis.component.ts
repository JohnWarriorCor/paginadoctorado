import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TesisService } from '../../../../services/estudiantes/tesis/tesis.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-tesis',
  templateUrl: './tesis.component.html',
  styleUrls: ['./tesis.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TesisComponent implements OnInit, AfterViewInit {
  cpage = 1;
  pageSize = 4;
  vistaEdicion = false;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  tesis: Array<any> = [];
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
  constructor(public auth: AngularFireAuth, private tesisService: TesisService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router) {
    this.tesisService.getTesis().subscribe( data => {
      this.tesis = data;
    });
  }
  refresh() {
    window.location.reload();
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    (window as any).twttr.widgets.load();
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, { size: 'sm', centered: true, backdrop: 'static' });
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
  borrarGrupo( key$: string) {
    this.tesisService.borrarTesi(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.tesis[key$];
        this.modalReference.close();
      }
    });
  }

}
