import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanestudiosService } from '../../../../services/formacion/planestudios/planestudios.service';
import { Planestudios } from '../../../../interfaces/formacion/planestudios/planestudios';

@Component({
  selector: 'app-planestudiosedit',
  templateUrl: './planestudiosedit.component.html',
  styleUrls: ['./planestudiosedit.component.css'],
  providers: [DatePipe]
})
export class PlanestudioseditComponent implements OnInit {
  today = new Date();
  fecha: any;
  closeResult: string;
  defaultImgUrl: any;
  urlimg: any;
  war: any;
  modalReference: any;
  error = false;
  passError = '';
  imgError = '';
  alertBool = false;
  forma: FormGroup;
  controls: any;
  nuevo = false;
  id: string;

  newAttribute: any = {};
  planEstudio: Planestudios = {
    fieldArray: [],
  };

  // tslint:disable-next-line:max-line-length
  constructor(public datepipe: DatePipe, private modalService: NgbModal, private planEstudioService: PlanestudiosService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.planEstudioService.getPlanestudio( this.id ).subscribe(grupoInvestigacion => this.planEstudio = grupoInvestigacion);
      }
    });
  }

  ngOnInit() {
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
    this.war = this.planEstudio.fieldArray[0];
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }
  addFieldValue() {
    this.planEstudio.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
   }

   deleteFieldValue(index) {
    this.planEstudio.fieldArray.splice(index, 1);
   }
   guardar() {
    if ( this.planEstudio.fieldArray[0] !== this.war ||  this.planEstudio.fieldArray[0] !== this.war ) {
      this.error = false;
      this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.planEstudioService.nuevoPlanestudio( this.planEstudio ).subscribe(data => {
          this.router.navigate(['/plandeestudios']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.planEstudioService.actualizarPlanestudio( this.planEstudio, this.id ).subscribe(data => {
          this.router.navigate(['/plandeestudios']);
          this.modalReference.close();
        },
        error => console.error(error));
      }
    } else {
      this.error = true;
      this.passError = 'No puede dejar la historía vacía';
      this.modalReference.close();
    }
  }
  agregarNuevo( forma: NgForm) {
    this.router.navigate(['/admi_plandeestudios', 'nuevo']);
    forma.reset({});
  }

}
