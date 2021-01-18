import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlantelService } from '../../../../services/profesores/plantel/plantel.service';
import { Plantel } from '../../../../interfaces/profesores/plantel/plantel';


@Component({
  selector: 'app-planteledit',
  templateUrl: './planteledit.component.html',
  styleUrls: ['./planteledit.component.css'],
  providers: [DatePipe]
})
export class PlanteleditComponent implements OnInit {
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
  plantelProfesor: Plantel = {
    foto: '',
    nombre: '',
    sintesis: '',
    fieldArray: [],
    correo: '',
    fecha: '',
    cvlac: '',
    orcid: '',
  };

   // tslint:disable-next-line:max-line-length
   constructor( public datepipe: DatePipe, private modalService: NgbModal, private plantelService: PlantelService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.plantelService.getPlantel( this.id ).subscribe(plantelProfesor => this.plantelProfesor = plantelProfesor);
      }
    });
  }

  ngOnInit() {
    this.war = this.plantelProfesor.nombre;
    if ( this.plantelProfesor.foto === null || this.plantelProfesor.foto === '' ) {
      // tslint:disable-next-line:max-line-length
      this.defaultImgUrl = 'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/pro_null_h.png?alt=media&token=489c904c-df1c-4a53-826a-4d52546fea77';
      this.plantelProfesor.foto = this.defaultImgUrl;
      return this.plantelProfesor.foto;
    }
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
  }
  addFieldValue() {
    this.plantelProfesor.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

   deleteFieldValue(index) {
    this.plantelProfesor.fieldArray.splice(index, 1);
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }
  changeImg(urlimg) {
    console.log(urlimg);
    // tslint:disable-next-line:max-line-length
    if (urlimg === '' || urlimg === null) {
      this.defaultImgUrl = urlimg;
      this.alertBool = true;
      this.imgError = 'No puede dejar un evento sin imagen, por favor inserte un URL correspondiente';
    } else {
      this.alertBool = false;
      this.defaultImgUrl = urlimg;
      return this.defaultImgUrl;
    }
  }
  guardar() {
    if ( this.plantelProfesor.nombre !== this.war ||  this.plantelProfesor.nombre !== this.war ) {
      this.error = false;
      console.log(this.plantelProfesor.nombre);
      console.log(this.war);
      // this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.plantelService.nuevoPlantel( this.plantelProfesor ).subscribe(data => {
          this.router.navigate(['/docentes']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.plantelService.actualizarPlantel( this.plantelProfesor, this.id ).subscribe(data => {
          this.router.navigate(['/docentes']);
          this.modalReference.close();
        },
        error => console.error(error));
      }
    } else {
      this.error = true;
      this.passError = 'Formulario incompleto.';
      this.modalReference.close();
    }
  }
  up() {
    window.scroll(0, 400);
  }
  agregarNuevo( forma: NgForm ) {
    this.router.navigate(['/admi_plantel', 'nuevo']);
    forma.reset({});
    this.up();
  }

}
