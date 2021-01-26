import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GruposinvestigacionService } from '../../../services/grupoinvesti/gruposinvestigacion.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-gruposinves',
  templateUrl: './gruposinves.component.html',
  styleUrls: ['./gruposinves.component.css'],
  encapsulation: ViewEncapsulation.None,
})

// tslint:disable-next-line:directive-class-suffix
export class GruposinvesComponent implements OnInit, AfterViewInit {
  page = 1;
  pageSize = 4;
  vistaEdicion = false;
  today = new Date();
  gruposInv: any = [];
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  grupoInvestigacion: Array<any> = [];
  loading = true;
  // Herramientas ocultas
  key: any;
  user: any;
  opciones = false;
  ajustes = true;
  validar = false;
  error = false;
  passError = '';

  constructor(public auth: AngularFireAuth, private grupoInvestigacionService: GruposinvestigacionService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router) {
    this.grupoInvestigacionService.getGrupos().subscribe( data => {
      this.grupoInvestigacion = data;
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
    this.grupoInvestigacionService.borrarGrupo(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.grupoInvestigacion[key$];
        this.modalReference.close();
      }
    });
  }

}
