import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Articulosestu } from '../../../../interfaces/estudiantes/articulos/articulosestu';
import { ArticulosestuService } from '../../../../services/estudiantes/articulos/articulosestu.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-articulosestuedit',
  templateUrl: './articulosestuedit.component.html',
  styleUrls: ['./articulosestuedit.component.css'],
  providers: [DatePipe]
})
export class ArticulosestueditComponent implements OnInit {

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
  articulosEstu: Articulosestu = {
    fieldArray: [],
  };

  // tslint:disable-next-line:max-line-length
  constructor(public auth: AngularFireAuth, public datepipe: DatePipe, private modalService: NgbModal, private articulosEstuService: ArticulosestuService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.articulosEstuService.getArticuloEstudiante( this.id ).subscribe(articulosEstu => this.articulosEstu = articulosEstu);
      }
    });
  }

  ngOnInit() {
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
    this.war = this.articulosEstu.fieldArray[0];
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }
  addFieldValue() {
    this.articulosEstu.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
   }

   deleteFieldValue(index) {
    this.articulosEstu.fieldArray.splice(index, 1);
   }
   guardar() {
    if ( this.articulosEstu.fieldArray[0] !== this.war ||  this.articulosEstu.fieldArray[0] !== this.war ) {
      this.error = false;
      this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.articulosEstuService.nuevoArticuloEstudiante( this.articulosEstu ).subscribe(data => {
          this.router.navigate(['/articulosEstudiantes']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.articulosEstuService.actualizarArticuloEstudiante( this.articulosEstu, this.id ).subscribe(data => {
          this.router.navigate(['/articulosEstudiantes']);
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
    this.router.navigate(['/admi_articulosEstudiantes', 'nuevo']);
    forma.reset({});
  }

}
