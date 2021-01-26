import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gruposinvestigacion } from '../../../interfaces/grupoinvesti/gruposinvestigacion';
import { GruposinvestigacionService } from '../../../services/grupoinvesti/gruposinvestigacion.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';


@Component({
  selector: 'app-gruposinvesedit',
  templateUrl: './gruposinvesedit.component.html',
  styleUrls: ['./gruposinvesedit.component.css'],
  providers: [DatePipe]
})
export class GruposinveseditComponent implements OnInit {

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
  grupoInvestigacion: Gruposinvestigacion = {
    fieldArray: [],
  };

  // tslint:disable-next-line:max-line-length
  constructor( public auth: AngularFireAuth, public datepipe: DatePipe, private modalService: NgbModal, private grupoInvestigacionService: GruposinvestigacionService, private router: Router, private activatedRoute: ActivatedRoute ) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.grupoInvestigacionService.getGrupo( this.id ).subscribe(grupoInvestigacion => this.grupoInvestigacion = grupoInvestigacion);
      }
    });
  }

  ngOnInit() {
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
    this.war = this.grupoInvestigacion.fieldArray[0];
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }

  addFieldValue() {
    this.grupoInvestigacion.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

   deleteFieldValue(index) {
    this.grupoInvestigacion.fieldArray.splice(index, 1);
  }

  guardar() {
    if ( this.grupoInvestigacion.fieldArray[0] !== this.war ||  this.grupoInvestigacion.fieldArray[0] !== this.war ) {
      this.error = false;
      this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.grupoInvestigacionService.nuevoGrupo( this.grupoInvestigacion ).subscribe(data => {
          this.router.navigate(['/gruposinvestigacion']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.grupoInvestigacionService.actualizarGrupo( this.grupoInvestigacion, this.id ).subscribe(data => {
          this.router.navigate(['/gruposinvestigacion']);
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
    this.router.navigate(['/admi_gruposinvestigacion', 'nuevo']);
    forma.reset({});
  }

}
