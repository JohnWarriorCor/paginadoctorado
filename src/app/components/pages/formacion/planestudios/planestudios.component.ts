import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PlanestudiosService } from '../../../../services/formacion/planestudios/planestudios.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-planestudios',
  templateUrl: './planestudios.component.html',
  styleUrls: ['./planestudios.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PlanestudiosComponent implements OnInit {
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  planEstudios: Array<any> = [];
  planEstudioResumen: any[] = [];
  loading = true;
  // Herramientas ocultas
  key: any;
  user: any;
  opciones = false;
  ajustes = true;
  validar = false;
  error = false;
  passError = '';

  constructor( public auth: AngularFireAuth, private planestudiosService: PlanestudiosService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router) {
    this.planestudiosService.getPlanestudios().subscribe( data => {
      this.planEstudios = data;
    });
    this.planestudiosService.getPlanestudiosResumen().subscribe( data => {
      this.planEstudioResumen = data;
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
  borrarPlan( key$: string) {
    this.planestudiosService.borrarPlanestudio(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.planEstudios[key$];
        this.modalReference.close();
      }
    });
  }

}
